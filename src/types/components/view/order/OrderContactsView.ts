import { IEvents } from '../../../../components/base/events';

export interface IOrderContactsViewData {
	email: string;
	phone: string;
	isDisabled: boolean;
	errors: string[] | undefined;
}

export interface IOrderContactsViewSettings {
	events: IEvents;
}
