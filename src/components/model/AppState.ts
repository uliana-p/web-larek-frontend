import { IOrderForm, IPaymentType, IProduct } from '../../types';
import { IAppState } from '../../types/components/model/AppState';
import { IProductModel } from '../../types/components/model/ProductModel';
import { IEvents } from '../base/events';

export class AppModel implements IAppState {
	protected _products: IProductModel[] = [];
	protected _basket: IProduct[] = [];
	protected _selectedProduct: IProductModel | null = null;
	protected _orderForm: IOrderForm = {
		payment: null,
		email: '',
		address: '',
		phone: '',
		formErrors: {},
	};

	constructor(protected events: IEvents) {}

	get products(): IProductModel[] {
		return this._products;
	}

	set products(products: IProduct[]) {
		this._products = products.map((p) => {
			const isInBasket = this.isInBasket(p);
			return {
				...p,
				isInBasket,
			};
		});
		this.events.emit('model:products-change', this);
	}

	get basket() {
		return this._basket;
	}

	get selectedProduct() {
		return this._selectedProduct;
	}

	selectProduct(id: string) {
		this._selectedProduct = this.products.find((p) => p.id === id) || null;
		this.events.emit('model:selected-product-change', this);
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

	private validateEmail() {
		this.orderForm.formErrors.email = undefined;
		if (!this.orderForm.email) {
			this._orderForm.formErrors.email = 'Нужно ввести email';
		}
	}

	private validatePhone() {
		this.orderForm.formErrors.phone = undefined;

		if (!this.orderForm.phone) {
			this._orderForm.formErrors.phone = 'Нужно ввести телефон';
		}
	}

	private validateAddress() {
		this.orderForm.formErrors.address = undefined;

		if (!this.orderForm.address) {
			this._orderForm.formErrors.address = 'Нужно ввести адрес';
		}
	}

	private validatePayment() {
		this.orderForm.formErrors.payment = undefined;

		if (!this.orderForm.payment) {
			this._orderForm.formErrors.payment = 'Нужно выбрать способ оплаты';
		}
	}

	private validateForm() {
		this.validateEmail();
		this.validatePhone();
		this.validateAddress();
		this.validatePayment();
		this.events.emit('model:order-form-change', this);
	}

	private isInBasket(product: IProduct) {
		return this._basket.some((p) => p.id === product.id);
	}

	resetOrderForm() {
		this._orderForm = {
			payment: null,
			email: '',
			address: '',
			phone: '',
			formErrors: {},
		};
		this.validateForm();
	}

	clearBasket() {
		this._basket = [];
		this.events.emit('model:basket-change', this);
	}

	toggleProductInBasket(id: string) {
		const product = this.products.find((p) => p.id === id);
		if (!product) return;

		if (this.isInBasket(product)) {
			this._basket = this._basket.filter((p) => p.id !== product.id);
		} else {
			this._basket.push(product);
		}

		this.products.forEach((p) => {
			if (p.id === id) {
				p.isInBasket = !p.isInBasket;
			}
		});

		this.events.emit('model:basket-change', this);
	}
}
