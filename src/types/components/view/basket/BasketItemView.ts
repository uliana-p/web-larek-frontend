import { IProduct } from '../../../../types';
import { IEvents } from '../../../../components/base/events';

export type IBasketItemViewData = IProduct;

export interface IBasketItemViewSettings {
	events: IEvents;
}
