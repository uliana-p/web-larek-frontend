import { IOrderForm, IProduct } from '../../../types';
import { IProductModel } from './ProductModel';

export interface IAppState {
	basket: IProduct[];
	products: IProductModel[];
	orderForm: IOrderForm;
}
