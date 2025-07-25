import { IProduct } from '../../../../types';
import { IEvents } from '../../../../components/base/events';

export interface IGalleryViewData {
	products: IProduct[];
}

export interface IGalleryViewSettings {
	events: IEvents;
}
