import { IEvents } from '../../../../components/base/events';
import { IProductModel } from '../../model/ProductModel';

export type IProductCardViewData = IProductModel;

export interface IProductCardViewSettings {
	events: IEvents;
}
