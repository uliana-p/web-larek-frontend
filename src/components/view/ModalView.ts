import { ensureElement } from '../../utils/utils';
import { View } from '../base/View';

export class ModalView extends View<object, object> {
	private container: HTMLElement;
	private closeButton: HTMLButtonElement;
	private contentElement: HTMLElement;
	private pageWrapper: HTMLElement;

	init() {
		this.container = this.ensureElement<HTMLElement>('.modal__container');
		this.closeButton = this.ensureElement<HTMLButtonElement>('.modal__close');
		this.contentElement = this.ensureElement<HTMLElement>('.modal__content');
		this.pageWrapper = ensureElement<HTMLElement>('.page__wrapper');

		this.element.addEventListener('click', this.close.bind(this));
		this.closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', (event) =>
			event.stopPropagation()
		);
	}

	set content(value: HTMLElement | undefined) {
		if (value) {
			this.contentElement.replaceChildren(value);
		} else {
			this.contentElement.replaceChildren();
		}
	}

	open() {
		this.element.classList.add('modal_active');
		this.pageWrapper.classList.add('page__wrapper_locked');
	}

	close() {
		this.element.classList.remove('modal_active');
		this.pageWrapper.classList.remove('page__wrapper_locked');
		this.content = undefined;
	}
}
