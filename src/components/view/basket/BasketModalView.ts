import { IBasketViewData, IBasketViewSettings } from '../../../types/components/view/basket/BasketView';
import { IProduct } from '../../../types';
import { settings } from '../../../utils/constants';
import { cloneTemplate } from '../../../utils/utils';
import { View } from '../../base/View';
import { BasketItemView } from './BasketItemView';

export class BasketModalView extends View<
	IBasketViewData,
	IBasketViewSettings
> {
	declare basketList: HTMLElement;
	declare button: HTMLButtonElement;

	init() {
		this.basketList = this.ensureElement('.basket__list');
		this.button = this.ensureElement('.basket__button');

		this.button.addEventListener('click', () => {
			this.settings.events.emit('order:payment');
		});
	}

	set products(products: IProduct[]) {
		if (products.length === 0) {
			this.basketList.classList.add('.basket_empty');
			this.basketList.innerHTML = 'Корзина пуста';
			return;
		}

		this.basketList.innerHTML = '';
		products.forEach((product) => {
			const card = new BasketItemView(
				cloneTemplate(settings.TEMPLATES.CARD_BASKET),
				{ events: this.settings.events }
			);
			this.basketList.appendChild(card.render(product));
		});
	}

	set isDisabled(value: boolean) {
		this.button.disabled = value;
	}

	get isDisabled() {
		return this.button.disabled;
	}
}
