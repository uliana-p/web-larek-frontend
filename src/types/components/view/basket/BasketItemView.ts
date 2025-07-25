import { IProduct } from '../../../../types';
import { IEvents } from '../../../../components/base/events';

export type IBasketItemViewData = IProduct & { index: number };

export interface IBasketItemViewSettings {
	events: IEvents;
}
