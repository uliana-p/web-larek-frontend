import {
	IProductCardViewData,
	IProductCardViewSettings,
} from '../../../types/components/view/gallery/ProductCardView';
import { View } from '../../base/View';

const categoryClassMap = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	другое: 'card__category_other',
	дополнительное: 'card__category_additional',
	кнопка: 'card__category_button',
} as const;

export class ProductCardView extends View<
	IProductCardViewData,
	IProductCardViewSettings
> {
	protected titleEl: HTMLSpanElement;
	protected priceEl: HTMLSpanElement;

	protected categoryEl?: HTMLSpanElement;
	protected imageEl?: HTMLImageElement;
	protected descriptionEl: HTMLParagraphElement | null;
	protected cardButton: HTMLButtonElement | null;

	init() {
		this.titleEl = this.ensureElement<HTMLSpanElement>('.card__title');
		this.priceEl = this.ensureElement<HTMLSpanElement>('.card__price');
		this.imageEl = this.querySelector<HTMLImageElement>('.card__image');
		this.categoryEl = this.querySelector<HTMLSpanElement>('.card__category');

		this.descriptionEl =
			this.querySelector<HTMLParagraphElement>('.card__text');
		this.cardButton = this.querySelector<HTMLButtonElement>('.card__button');

		if (this.cardButton) {
			this.cardButton.addEventListener('click', () => {
				if (this.isInBasket) {
					this.settings.events.emit('basket:remove', { id: this.id });
				} else {
					this.settings.events.emit('basket:add', { id: this.id });
				}
			});
		}

		this.element.addEventListener('click', () => {
			this.settings.events.emit('product:show-details', { id: this.id });
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
			this.priceEl.textContent = 'Бесценно';
			if (this.cardButton) {
				this.cardButton.disabled = true;
			}
			return;
		}

		if (this.cardButton) {
			this.cardButton.disabled = false;
		}

		this.priceEl.textContent = `${value} синапсов`;
	}

	get image() {
		return this.imageEl?.src || '';
	}

	set image(value: string) {
		if (this.imageEl) {
			this.imageEl.src = value;
		}
	}

	get category() {
		return this.categoryEl?.textContent || '';
	}

	set category(value: string) {
		if (!this.categoryEl) {
			return;
		}

		this.categoryEl.classList.remove(...Object.values(categoryClassMap));
		const categoryClassName =
			categoryClassMap[value as keyof typeof categoryClassMap];

		if (categoryClassName) this.categoryEl.classList.add(categoryClassName);

		this.categoryEl.textContent = value;
	}

	get description() {
		return this.descriptionEl?.textContent || '';
	}

	set description(value: string) {
		if (this.descriptionEl) {
			this.descriptionEl.textContent = value;
		}
	}

	set isInBasket(isInBasket: boolean) {
		if (!this.cardButton) {
			return;
		}

		this.element.dataset.isInBasket = String(isInBasket);

		if (isInBasket) {
			this.cardButton.textContent = 'Убрать из корзины';
		} else {
			this.cardButton.textContent = 'В корзину';
		}
	}

	get isInBasket() {
		return this.element.dataset.isInBasket === 'true';
	}
}
