import { IPaymentType } from '../../../../types';
import { IEvents } from '../../../../components/base/events';

export interface IOrderPaymentViewData {
	payment: IPaymentType;
	address: string;
	isDisabled: boolean;
	errors: string[] | undefined;
}

export interface IOrderPaymentViewSettings {
	events: IEvents;
}
