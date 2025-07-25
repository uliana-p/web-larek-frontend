import { IContactScreenSettings } from '../../types/components/screen/ContactScreen';
import { settings } from '../../utils/constants';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { Screen } from '../base/Screen';
import { AppModel } from '../model/AppState';
import { OrderContactsModalView } from '../view/order/OrderContactsModalView';

export class ContactScreen extends Screen<object, IContactScreenSettings> {
	protected contactsModalView: OrderContactsModalView;

	init() {
		super.init();

		this.element = ensureElement(settings.SELECTORS.PAGE);
		this.contactsModalView = new OrderContactsModalView(
			cloneTemplate(settings.TEMPLATES.CONTACTS),
			{ events: this.settings.events }
		);
	}

	update(state: AppModel) {
		const errors = [
			state.orderForm.formErrors.email,
			state.orderForm.formErrors.phone,
		].filter(Boolean);

		this.contactsModalView.render({
			email: state.orderForm.email,
			phone: state.orderForm.phone,
			isDisabled: errors.some(Boolean),
			errors,
		});
	}

	getModalContent() {
		return this.contactsModalView.getModalContent();
	}
}
