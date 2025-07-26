import {
	IOrderPaymentViewData,
	IOrderPaymentViewSettings,
} from '../../../types/components/view/order/OrderPaymentView';
import { OrderFromView } from './OrderFormView';

export class OrderPaymentModalView extends OrderFromView<
	IOrderPaymentViewData,
	IOrderPaymentViewSettings
> {
	protected paymentButtons: NodeListOf<HTMLButtonElement>;
	protected addressInput: HTMLInputElement;

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
				this.settings.events.emit('order:payment-change', {
					payment: btn.name as IOrderPaymentViewData['payment'],
				});
			});
		});

		this.addressInput.addEventListener('input', (e) => {
			this.settings.events.emit('order:address-change', {
				address: (e.target as HTMLInputElement).value,
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
	}

	set address(value: string) {
		this.addressInput.value = value;
	}
}
