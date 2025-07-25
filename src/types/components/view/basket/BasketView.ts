import { IProduct } from '../../../../types';
import { IEvents } from '../../../../components/base/events';

export interface IBasketViewData {
	products: IProduct[];
	price: number;
	isDisabled: boolean;
}

export interface IBasketViewSettings {
	events: IEvents;
}
