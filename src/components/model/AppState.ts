import { IOrderForm, IPaymentType, IProduct } from '../../types';
import { IAppState } from '../../types/components/model/AppState';
import { IProductModel } from '../../types/components/model/ProductModel';

export class AppModel implements IAppState {
	private _products: IProduct[] = [];
	private _basket: IProduct[] = [];

	private _orderForm: IOrderForm = {
		payment: null,
		email: '',
		address: '',
		phone: '',
		formErrors: {},
	};

	get products(): IProductModel[] {
		return this._products.map<IProductModel>((p) => ({
			...p,
			isInBasket: this.isInBasket(p),
		}));
	}

	set products(products: IProduct[]) {
		this._products = products;
	}

	get basket() {
		return this._basket;
	}

	get orderForm() {
		return this._orderForm;
	}

	setEmail(email: string) {
		this._orderForm.email = email;
		this.validateForm();
	}

	setPhone(phone: string) {
		this._orderForm.phone = phone;
		this.validateForm();
	}

	setAddress(address: string) {
		this._orderForm.address = address;
		this.validateForm();
	}

	setPayment(payment: IPaymentType) {
		this._orderForm.payment = payment;
		this.validateForm();
	}

	validateEmail() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		this.orderForm.formErrors.email = undefined;
		if (!this.orderForm.email) {
			this._orderForm.formErrors.email = 'Нужно ввести email';
		} else if (!emailRegex.test(this._orderForm.email)) {
			this._orderForm.formErrors.email = 'Некорректный email';
		}
	}

	validatePhone() {
		this.orderForm.formErrors.phone = undefined;

		const phoneRegex = /^\+7\d{10}$/;
		if (!this.orderForm.phone) {
			this._orderForm.formErrors.phone = 'Нужно ввести телефон';
		} else if (!phoneRegex.test(this._orderForm.phone.replace(/\s/g, ''))) {
			this._orderForm.formErrors.phone = 'Некорректный телефон';
		}
	}

	validateAddress() {
		this.orderForm.formErrors.address = undefined;

		if (!this.orderForm.address) {
			this._orderForm.formErrors.address = 'Нужно ввести адрес';
		}
	}

	validatePayment() {
		this.orderForm.formErrors.payment = undefined;

		if (!this.orderForm.payment) {
			this._orderForm.formErrors.payment = 'Нужно выбрать способ оплаты';
		}
	}

	validateForm() {
		this.validateEmail();
		this.validatePhone();
		this.validateAddress();
		this.validatePayment();
	}

	addToBasket(product: IProduct) {
		this._basket.push(product);
	}

	isInBasket(product: IProduct) {
		return this._basket.some((p) => p.id === product.id);
	}

	removeFromBasket(product: IProduct) {
		this._basket = this._basket.filter((p) => p.id !== product.id);
	}

	resetOrderForm() {
		this._orderForm = {
			payment: null,
			email: '',
			address: '',
			phone: '',
			formErrors: {},
		};
	}

	clearBasket() {
		this._basket = [];
	}
}
