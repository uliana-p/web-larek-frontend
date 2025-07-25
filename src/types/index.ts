export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export type IPaymentType = 'card' | 'cash';

export interface IMakeOrder {
	payment: IPaymentType | null;
	email: string;
	address: string;
	phone: string;
	total: number;
	items: string[];
}

export interface ICreatedOrder {
	id: string;
	total: number;
}

export type IOrderForm = Omit<IMakeOrder, 'items' | 'total'> & {
	formErrors: {
		email?: string;
		phone?: string;
		address?: string;
		payment?: string;
	};
};
