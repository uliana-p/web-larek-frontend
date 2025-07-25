import { EventEmitter } from './components/base/events';
import { AppModel } from './components/model/AppState';
import './scss/styles.scss';
import { LarekApi } from './components/model/LarekApi';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { ModalView } from './components/view/ModalView';
import { AppScreen } from './components/screen/AppScreen';
import { ensureElement } from './utils/utils';
import { BasketScreen } from './components/screen/BasketScreen';
import { ContactScreen } from './components/screen/ContactScreen';
import { PaymentScreen } from './components/screen/PaymentScreen';
import { IPaymentType } from './types';
import { OrderSuccessScreen } from './components/screen/OrderSuccessScreen';

const events = new EventEmitter();
const state = new AppModel();
const api = new LarekApi(CDN_URL, API_URL);

const appScreen = new AppScreen({ events });
const basketScreen = new BasketScreen({ events });
const contactScreen = new ContactScreen({ events });
const paymentScreen = new PaymentScreen({ events });
const successScreen = new OrderSuccessScreen({ events });

const modal = new ModalView(ensureElement(settings.SELECTORS.MODAL), {
	events,
});

api.getProducts().then((products) => {
	state.products = products;
	appScreen.update(state);
});

events.on('basket:open', () => {
	basketScreen.update(state);

	modal.content = basketScreen.basketModalView.element;
	modal.open();
});

events.on<{ id: string }>('product:show-details', ({ id }) => {
	appScreen.selectProduct(id);
	appScreen.update(state);

	modal.content = appScreen.detailsCardView.element;
	modal.open();
});

events.on<{ id: string }>('basket:add', ({ id }) => {
	const product = state.products.find((p) => p.id === id);
	if (!product) return;

	state.addToBasket(product);

	appScreen.update(state);
	basketScreen.update(state);
});

events.on<{ id: string }>('basket:remove', ({ id }) => {
	const product = state.products.find((p) => p.id === id);
	if (!product) return;

	state.removeFromBasket(product);

	appScreen.update(state);
	basketScreen.update(state);
});

events.on('order:payment', () => {
	state.resetOrderForm();
	paymentScreen.update(state);

	modal.content = paymentScreen.paymentModalView.element;
	modal.open();
});

events.on('order:contacts', () => {
	modal.content = contactScreen.contactsModalView.element;
	modal.open();
});

events.on('order:success', () => {
	modal.content = successScreen.successModalView.element;
	modal.open();
});

events.on('order:success-close', () => {
	modal.close();
});

events.on('order:submit', () => {
	api
		.makeOrder({
			payment: state.orderForm.payment,
			email: state.orderForm.email,
			address: state.orderForm.address,
			phone: state.orderForm.phone,
			total: state.basket.reduce((acc, item) => acc + item.price, 0),
			items: state.basket.map((item) => item.id),
		})
		.then((order) => {
			modal.content = successScreen.successModalView.element;
			successScreen.update({ total: order.total });
			modal.open();
		})
		.catch((error) => {
			console.error(error);
			modal.close();
		})
		.finally(() => {
			state.clearBasket();
			appScreen.update(state);
			basketScreen.update(state);
		});
});

events.on<{ payment: IPaymentType }>('order:payment-change', ({ payment }) => {
	state.setPayment(payment);
	paymentScreen.update(state);
});

events.on<{ address: string }>('order:address-change', ({ address }) => {
	state.setAddress(address);
	paymentScreen.update(state);
});

events.on<{ email: string }>('order:email-change', ({ email }) => {
	state.setEmail(email);
	contactScreen.update(state);
});

events.on<{ phone: string }>('order:phone-change', ({ phone }) => {
	state.setPhone(phone);
	contactScreen.update(state);
});
