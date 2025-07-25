import { ICreatedOrder, IMakeOrder, IProduct } from '../../types';
import { Api, ApiListResponse } from '../base/api';

export class LarekApi extends Api {
	private readonly cdnUrl: string;

	constructor(cdnUrl: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdnUrl = cdnUrl;
	}

	async getProducts(): Promise<IProduct[]> {
		const products = await this.get<ApiListResponse<IProduct>>('/product');

		return products.items.map((item) => {
			return {
				...item,
				image: this.cdnUrl + item.image,
			};
		});
	}

	async makeOrder(value: IMakeOrder): Promise<ICreatedOrder> {
		return await this.post<ICreatedOrder>('/order', value);
	}
}
