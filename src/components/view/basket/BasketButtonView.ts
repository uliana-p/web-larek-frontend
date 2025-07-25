import {
	IBasketButtonViewData,
	IBasketButtonViewSettings,
} from '../../../types/components/view/basket/BasketButtonView';
import { View } from '../../base/View';

export class BasketButtonView extends View<
	IBasketButtonViewData,
	IBasketButtonViewSettings
> {
	protected declare counterElement: HTMLElement;

	init() {
		this.counterElement = this.querySelector('.header__basket-counter');
		this.element.addEventListener('click', () => {
			this.settings.events.emit('basket:open');
		});
	}

	set counter(value: number) {
		this.counterElement.textContent = String(value);
	}
}
