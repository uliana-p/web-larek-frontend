import { EventEmitter } from './components/base/events';
import { AppModel } from './components/model/AppState';
import './scss/styles.scss';
import { LarekApi } from './components/model/LarekApi';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { ModalContainerView } from './components/view/modal/ModalContainerView';
import { AppScreen } from './components/screen/AppScreen';
import { ensureElement } from './utils/utils';
import { BasketScreen } from './components/screen/BasketScreen';
import { ContactScreen } from './components/screen/ContactScreen';
import { PaymentScreen } from './components/screen/PaymentScreen';
import { IPaymentType } from './types';
import { OrderSuccessScreen } from './components/screen/OrderSuccessScreen';

const events = new EventEmitter();
const state = new AppModel(events);
const api = new LarekApi(CDN_URL, API_URL);

const appScreen = new AppScreen({ events });
const basketScreen = new BasketScreen({ events });
const contactScreen = new ContactScreen({ events });
const paymentScreen = new PaymentScreen({ events });
const successScreen = new OrderSuccessScreen({ events });

const modalContainerView = new ModalContainerView(
	ensureElement(settings.SELECTORS.MODAL),
	{ events }
);

api
	.getProducts()
	.then((products) => {
		state.products = products;
	})
	.catch((error) => {
		console.error(error);
	});

events.on('basket:open', () => {
	modalContainerView.content = basketScreen.getModalContent();
	modalContainerView.open();
});

events.on<{ id: string }>('product:show-details', ({ id }) => {
	state.selectProduct(id);

	modalContainerView.content = appScreen.getModalContent();
	modalContainerView.open();
});

events.on<{ id: string }>('basket:change', ({ id }) => {
	state.toggleProductInBasket(id);
});

events.on('order:payment', () => {
	state.resetOrderForm();

	modalContainerView.content = paymentScreen.getModalContent();
	modalContainerView.open();
});

events.on('order:contacts', () => {
	modalContainerView.content = contactScreen.getModalContent();
	modalContainerView.open();
});

events.on('order:success', () => {
	modalContainerView.content = successScreen.getModalContent();
	modalContainerView.open();
});

events.on('order:success-close', () => {
	modalContainerView.close();
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
			successScreen.update({ total: order.total });

			modalContainerView.content = successScreen.getModalContent();
			modalContainerView.open();
		})
		.catch((error) => {
			console.error(error);
			modalContainerView.close();
		})
		.finally(() => {
			state.clearBasket();
		});
});

events.on<{ payment: IPaymentType }>('order:payment-change', ({ payment }) => {
	state.setPayment(payment);
});

events.on<{ address: string }>('order:address-change', ({ address }) => {
	state.setAddress(address);
});

events.on<{ email: string }>('order:email-change', ({ email }) => {
	state.setEmail(email);
});

events.on<{ phone: string }>('order:phone-change', ({ phone }) => {
	state.setPhone(phone);
});

events.on<AppModel>('model:order-form-change', (state) => {
	paymentScreen.update(state);
});

events.on<AppModel>('model:products-change', (state) => {
	appScreen.update(state);
	basketScreen.update(state);
});

events.on<AppModel>('model:basket-change', (state) => {
	appScreen.update(state);
	basketScreen.update(state);
});

events.on<AppModel>('model:order-form-change', (state) => {
	paymentScreen.update(state);
});

events.on<AppModel>('model:order-form-change', (state) => {
	contactScreen.update(state);
	paymentScreen.update(state);
});

events.on<AppModel>('model:selected-product-change', (state) => {
	appScreen.update(state);
});
