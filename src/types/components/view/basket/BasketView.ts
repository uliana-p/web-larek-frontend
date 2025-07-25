import { IProduct } from '../../../../types';
import { IEvents } from '../../../../components/base/events';

export interface IBasketViewData {
	products: IProduct[];
	isDisabled: boolean;
}

export interface IBasketViewSettings {
	events: IEvents;
}
