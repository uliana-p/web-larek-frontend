import { EventEmitter } from './components/base/events';
import { AppModel } from './components/model/AppState';
import './scss/styles.scss';
import { LarekApi } from './components/model/LarekApi';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { ModalContainerView } from './components/view/modal/ModalContainerView';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IPaymentType } from './types';
import { BasketModalView } from './components/view/basket/BasketModalView';
import { BasketButtonView } from './components/view/basket/BasketButtonView';
import { GalleryView } from './components/view/gallery/GalleryView';
import { ProductCardModalView } from './components/view/gallery/ProductCardView';
import { OrderContactsModalView } from './components/view/order/OrderContactsModalView';
import { OrderPaymentModalView } from './components/view/order/OrderPaymentModalView';
import { OrderSuccessView } from './components/view/order/OrderSuccessView';

const events = new EventEmitter();
const state = new AppModel(events);
const api = new LarekApi(CDN_URL, API_URL);

const contactsModalView = new OrderContactsModalView(
	cloneTemplate(settings.TEMPLATES.CONTACTS),
	{ events }
);
const basketButtonView = new BasketButtonView(
	ensureElement(settings.SELECTORS.HEADER_BASKET),
	{ events }
);
const basketModalView = new BasketModalView(
	cloneTemplate(settings.TEMPLATES.BASKET),
	{ events }
);
const modalContainerView = new ModalContainerView(
	ensureElement(settings.SELECTORS.MODAL),
	{ events }
);
const galleryView = new GalleryView(ensureElement(settings.SELECTORS.GALLERY), {
	events,
});
const detailsCardView = new ProductCardModalView(
	cloneTemplate(settings.TEMPLATES.CARD_PREVIEW),
	{ events }
);

const paymentModalView = new OrderPaymentModalView(
	cloneTemplate(settings.TEMPLATES.ORDER),
	{ events }
);

const successModalView = new OrderSuccessView(
	cloneTemplate(settings.TEMPLATES.SUCCESS),
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
	modalContainerView.content = basketModalView.getModalContent();
	modalContainerView.open();
});

events.on<{ id: string }>('product:show-details', ({ id }) => {
	state.selectProduct(id);

	modalContainerView.content = detailsCardView.getModalContent();
	modalContainerView.open();
});

events.on<{ id: string }>('basket:change', ({ id }) => {
	state.toggleProductInBasket(id);
});

events.on('order:payment', () => {
	state.resetOrderForm();

	modalContainerView.content = paymentModalView.getModalContent();
	modalContainerView.open();
});

events.on('order:contacts', () => {
	modalContainerView.content = contactsModalView.getModalContent();
	modalContainerView.open();
});

events.on('order:success', () => {
	modalContainerView.content = successModalView.getModalContent();
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
			successModalView.render({ total: order.total });
			modalContainerView.content = successModalView.getModalContent();
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

events.on<AppModel>('model:products-change', (state) => {
	galleryView.render({ products: state.products });
	basketButtonView.render({ counter: state.basket.length });
});

events.on<AppModel>('model:basket-change', (state) => {
	if (state.selectedProduct) {
		detailsCardView.render(state.selectedProduct);
	}

	basketButtonView.render({ counter: state.basket.length });
	basketModalView.render({
		products: state.basket,
		isDisabled: state.basket.length === 0,
		price: state.basket.reduce((acc, product) => acc + product.price, 0),
	});
});

events.on<AppModel>('model:order-form-change', (state) => {
	const contactErrors = [
		state.orderForm.formErrors.email,
		state.orderForm.formErrors.phone,
	].filter(Boolean);

	contactsModalView.render({
		email: state.orderForm.email,
		phone: state.orderForm.phone,
		isDisabled: contactErrors.some(Boolean),
		errors: contactErrors,
	});

	const paymentErrors = [
		state.orderForm.formErrors.payment,
		state.orderForm.formErrors.address,
	].filter(Boolean);

	paymentModalView.render({
		payment: state.orderForm.payment,
		address: state.orderForm.address,
		isDisabled: paymentErrors.some(Boolean),
		errors: paymentErrors,
	});
});

events.on<AppModel>('model:selected-product-change', (state) => {
	detailsCardView.render(state.selectedProduct);
});
