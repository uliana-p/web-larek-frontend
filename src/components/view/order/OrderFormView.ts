import { BaseModalView } from '../modal/BaseModalView';

export abstract class OrderFromView<
	T,
	S extends object = object
> extends BaseModalView<T, S> {
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

	set errors(value: string[] | undefined) {
		this.errorsElement.innerHTML = value?.at(0) ?? '';
	}
}
