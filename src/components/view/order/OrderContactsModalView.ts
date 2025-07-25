import {
	IOrderContactsViewData,
	IOrderContactsViewSettings,
} from '../../../types/components/view/order/OrderContactsView';
import { OrderFromView } from './OrderFormView';

export class OrderContactsModalView extends OrderFromView<
	IOrderContactsViewData,
	IOrderContactsViewSettings
> {
	private emailInput: HTMLInputElement;
	private phoneInput: HTMLInputElement;

	init() {
		super.init();

		this.emailInput = this.ensureElement<HTMLInputElement>(
			'input[name="email"]'
		);
		this.phoneInput = this.ensureElement<HTMLInputElement>(
			'input[name="phone"]'
		);

		this.emailInput.addEventListener('input', () => {
			this.settings.events.emit('order:email-change', { email: this.email });
		});
		this.phoneInput.addEventListener('input', () => {
			this.settings.events.emit('order:phone-change', { phone: this.phone });
		});
	}

	handleSubmit(e: SubmitEvent) {
		super.handleSubmit(e);
		this.settings.events.emit('order:submit');
	}

	set email(value: string) {
		this.emailInput.value = value;
	}

	get email(): string {
		return this.emailInput.value;
	}

	set phone(value: string) {
		this.phoneInput.value = value;
	}

	get phone(): string {
		return this.phoneInput.value;
	}
}
