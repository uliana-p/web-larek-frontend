import {
	IOrderPaymentViewData,
	IOrderPaymentViewSettings,
} from '../../../types/components/view/order/OrderPaymentView';
import { OrderFromView } from './OrderFormView';

export class OrderPaymentModalView extends OrderFromView<
	IOrderPaymentViewData,
	IOrderPaymentViewSettings
> {
	private paymentButtons: NodeListOf<HTMLButtonElement>;
	private addressInput: HTMLInputElement;

	init() {
		super.init();

		this.paymentButtons = this.element.querySelectorAll(
			'.order__buttons .button'
		);
		this.addressInput = this.ensureElement<HTMLInputElement>(
			'input[name="address"]'
		);

		this.paymentButtons.forEach((btn) => {
			btn.addEventListener('click', () => {
				this.payment = btn.name as IOrderPaymentViewData['payment'];
				this.settings.events.emit('order:payment-change', {
					payment: this.payment,
				});
			});
		});

		this.addressInput.addEventListener('input', () => {
			this.settings.events.emit('order:address-change', {
				address: this.address,
			});
		});
	}

	handleSubmit(e: SubmitEvent) {
		super.handleSubmit(e);

		this.settings.events.emit('order:contacts', {
			payment: this.payment,
			address: this.address,
		});
	}

	set payment(value: IOrderPaymentViewData['payment']) {
		this.paymentButtons.forEach((btn) => {
			btn.classList.toggle('button_alt-active', btn.name === value);
		});
		this.element.dataset.payment = value;
	}

	get payment(): IOrderPaymentViewData['payment'] {
		return this.element.dataset.payment as IOrderPaymentViewData['payment'];
	}

	set address(value: string) {
		this.addressInput.value = value;
	}

	get address(): string {
		return this.addressInput.value;
	}
}
