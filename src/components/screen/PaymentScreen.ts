import { IPaymentScreenSettings } from '../../types/components/screen/PaymentScreen';
import { settings } from '../../utils/constants';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { Screen } from '../base/Screen';
import { AppModel } from '../model/AppState';
import { OrderPaymentModalView } from '../view/order/OrderPaymentModalView';

export class PaymentScreen extends Screen<object, IPaymentScreenSettings> {
	protected paymentModalView: OrderPaymentModalView;

	init() {
		super.init();

		this.element = ensureElement(settings.SELECTORS.PAGE);
		this.paymentModalView = new OrderPaymentModalView(
			cloneTemplate(settings.TEMPLATES.ORDER),
			{ events: this.settings.events }
		);
	}

	update(state: AppModel) {
		const errors = [
			state.orderForm.formErrors.payment,
			state.orderForm.formErrors.address,
		].filter(Boolean);

		this.paymentModalView.render({
			payment: state.orderForm.payment,
			address: state.orderForm.address,
			isDisabled: errors.some(Boolean),
			errors,
		});
	}

	getModalContent() {
		return this.paymentModalView.getModalContent();
	}
}
