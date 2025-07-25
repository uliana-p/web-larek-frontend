import {
	IBasketViewData,
	IBasketViewSettings,
} from '../../../types/components/view/basket/BasketView';
import { IProduct } from '../../../types';
import { settings } from '../../../utils/constants';
import { cloneTemplate } from '../../../utils/utils';
import { View } from '../../base/View';
import { BasketItemView } from './BasketItemView';

export class BasketModalView extends View<
	IBasketViewData,
	IBasketViewSettings
> {
	protected basketList: HTMLElement;
	protected button: HTMLButtonElement;
	protected priceEl: HTMLSpanElement;

	init() {
		this.basketList = this.ensureElement('.basket__list');
		this.button = this.ensureElement('.basket__button');
		this.priceEl = this.ensureElement('.basket__price');

		this.button.addEventListener('click', () => {
			this.settings.events.emit('order:payment');
		});
	}

	getModalContent() {
		return this.element;
	}

	set products(products: IProduct[]) {
		if (products.length === 0) {
			this.basketList.classList.add('.basket_empty');
			this.basketList.innerHTML = 'Корзина пуста';
			return;
		}

		this.basketList.innerHTML = '';
		products.forEach((product, index) => {
			const card = new BasketItemView(
				cloneTemplate(settings.TEMPLATES.CARD_BASKET),
				{ events: this.settings.events }
			);
			this.basketList.appendChild(card.render({ ...product, index }));
		});
	}

	set isDisabled(value: boolean) {
		this.button.disabled = value;
	}

	set price(value: number) {
		this.priceEl.textContent = `${value} синапсов`;
	}
}
