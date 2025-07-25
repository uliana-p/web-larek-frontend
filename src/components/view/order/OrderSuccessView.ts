import {
	IOrderSuccessViewData,
	IOrderSuccessViewSettings,
} from '../../../types/components/view/order/OrderSuccessView';
import { View } from '../../base/View';

export class OrderSuccessView extends View<
	IOrderSuccessViewData,
	IOrderSuccessViewSettings
> {
	protected closeButton: HTMLButtonElement;
	protected description: HTMLElement;

	init() {
		this.closeButton = this.ensureElement<HTMLButtonElement>(
			'.order-success__close'
		);
		this.description = this.ensureElement<HTMLElement>(
			'.order-success__description'
		);
		this.closeButton.addEventListener('click', () => {
			this.settings.events.emit('order:success-close');
		});
	}

	render(data: IOrderSuccessViewData) {
		this.description.textContent = `Списано ${data.total} синапсов`;
		return this.element;
	}
}
