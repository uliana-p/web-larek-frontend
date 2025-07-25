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

	init() {
		this.titleEl = this.ensureElement<HTMLSpanElement>('.card__title');
		this.priceEl = this.ensureElement<HTMLSpanElement>('.card__price');
		this.deleteButton = this.ensureElement<HTMLButtonElement>(
			'.basket__item-delete'
		);

		this.deleteButton.addEventListener('click', () => {
			this.settings.events.emit('basket:remove', { id: this.id });
		});
	}

	set id(value: string) {
		this.element.dataset.id = value;
	}

	get id(): string {
		return this.element.dataset.id || '';
	}

	get title() {
		return this.titleEl.textContent || '';
	}

	set title(value: string) {
		this.titleEl.textContent = value;
	}

	get price(): number | null {
		const price = Number(this.element.dataset.price);
		if (Number.isNaN(price)) {
			return null;
		}

		return price;
	}

	set price(value: number | null) {
		this.element.dataset.price = String(value);
		if (value === null) {
			return;
		}

		this.priceEl.textContent = `${value} синапсов`;
	}
}
