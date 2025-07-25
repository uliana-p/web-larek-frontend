import { IOrderForm, IPaymentType, IProduct } from '../../../types';
import { IProductModel } from './ProductModel';

export interface IAppState {
	products: IProductModel[];
	readonly basket: IProduct[];
	readonly orderForm: IOrderForm;
	readonly selectedProduct: IProductModel | null;

	setEmail(email: string): void;
	setPhone(phone: string): void;
	setAddress(address: string): void;
	setPayment(payment: IPaymentType): void;
	toggleProductInBasket(id: string): void;
	resetOrderForm(): void;
	clearBasket(): void;
}
