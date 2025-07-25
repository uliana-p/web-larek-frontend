import {
	IOrderContactsViewData,
	IOrderContactsViewSettings,
} from '../../../types/components/view/order/OrderContactsView';
import { OrderFromView } from './OrderFormView';

export class OrderContactsModalView extends OrderFromView<
	IOrderContactsViewData,
	IOrderContactsViewSettings
> {
	protected emailInput: HTMLInputElement;
	protected phoneInput: HTMLInputElement;

	init() {
		super.init();

		this.emailInput = this.ensureElement<HTMLInputElement>(
			'input[name="email"]'
		);
		this.phoneInput = this.ensureElement<HTMLInputElement>(
			'input[name="phone"]'
		);

		this.emailInput.addEventListener('input', (e) => {
			this.settings.events.emit('order:email-change', {
				email: (e.target as HTMLInputElement).value,
			});
		});
		this.phoneInput.addEventListener('input', (e) => {
			this.settings.events.emit('order:phone-change', {
				phone: (e.target as HTMLInputElement).value,
			});
		});
	}

	handleSubmit(e: SubmitEvent) {
		super.handleSubmit(e);
		this.settings.events.emit('order:submit');
	}

	set email(value: string) {
		this.emailInput.value = value;
	}

	set phone(value: string) {
		this.phoneInput.value = value;
	}
}
