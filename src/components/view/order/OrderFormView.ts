import { View } from '../../base/View';

export class OrderFromView<T, S extends object = object> extends View<T, S> {
	protected submitButton: HTMLButtonElement;
	protected errorsElement: HTMLElement;

	init() {
		super.init();

		this.submitButton = this.ensureElement<HTMLButtonElement>(
			'.modal__actions .button'
		);
		this.errorsElement = this.ensureElement<HTMLElement>('.form__errors');
		this.element.addEventListener('submit', this.handleSubmit.bind(this));
	}

	handleSubmit(e: SubmitEvent) {
		e.preventDefault();
	}

	set isDisabled(value: boolean) {
		this.submitButton.disabled = value;
	}

	get isDisabled(): boolean {
		return this.submitButton.disabled;
	}

	set errors(value: string[] | undefined) {
		this.errorsElement.innerHTML = value?.at(0) ?? '';
	}

	get errors(): string[] | undefined {
		return this.errorsElement.innerText
			? [this.errorsElement.innerText]
			: undefined;
	}
}
