import {
	IProductCardViewData,
	IProductCardViewSettings,
} from '../../../types/components/view/gallery/ProductCardView';
import { BaseModalView } from '../modal/BaseModalView';

const categoryClassMap = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	другое: 'card__category_other',
	дополнительное: 'card__category_additional',
	кнопка: 'card__category_button',
} as const;

export class ProductCardModalView extends BaseModalView<
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
				this.settings.events.emit('basket:change', {
					id: this.element.dataset.id,
				});
			});
		} else {
			this.element.addEventListener('click', () => {
				this.settings.events.emit('product:show-details', {
					id: this.element.dataset.id,
				});
			});
		}
	}

	getModalContent() {
		return this.element;
	}

	set id(value: string) {
		this.element.dataset.id = value;
	}

	set title(value: string) {
		this.titleEl.textContent = value;
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

	set image(value: string) {
		if (this.imageEl) {
			this.imageEl.src = value;
		}
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

	set description(value: string) {
		if (this.descriptionEl) {
			this.descriptionEl.textContent = value;
		}
	}

	set isInBasket(isInBasket: boolean) {
		if (!this.cardButton) {
			return;
		}

		if (isInBasket) {
			this.cardButton.textContent = 'Убрать из корзины';
		} else {
			this.cardButton.textContent = 'В корзину';
		}
	}
}
