import {
	IBasketItemViewData,
	IBasketItemViewSettings,
} from '../../../types/components/view/basket/BasketItemView';
import { View } from '../../base/View';

export class BasketItemView extends View<
	IBasketItemViewData,
	IBasketItemViewSettings
> {
	protected titleEl: HTMLSpanElement;
	protected priceEl: HTMLSpanElement;
	protected deleteButton: HTMLButtonElement;
	protected indexEl: HTMLSpanElement;

	init() {
		this.titleEl = this.ensureElement<HTMLSpanElement>('.card__title');
		this.priceEl = this.ensureElement<HTMLSpanElement>('.card__price');
		this.deleteButton = this.ensureElement<HTMLButtonElement>(
			'.basket__item-delete'
		);
		this.indexEl = this.ensureElement<HTMLSpanElement>('.basket__item-index');

		this.deleteButton.addEventListener('click', () => {
			this.settings.events.emit('basket:change', {
				id: this.element.dataset.id,
			});
		});
	}

	set id(value: string) {
		this.element.dataset.id = value;
	}

	set title(value: string) {
		this.titleEl.textContent = value;
	}

	set index(value: number) {
		this.indexEl.textContent = String(value + 1);
	}

	set price(value: number | null) {
		this.element.dataset.price = String(value);
		if (value === null) {
			return;
		}

		this.priceEl.textContent = `${value} синапсов`;
	}
}
