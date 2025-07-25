import { settings } from '../../utils/constants';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { Screen } from '../base/Screen';
import { IOrderSuccessScreenSettings } from '../../types/components/screen/OrderSuccessScreen';
import { OrderSuccessView } from '../view/order/OrderSuccessView';
import { IOrderSuccessViewData } from '../../types/components/view/order/OrderSuccessView';

export class OrderSuccessScreen extends Screen<
	object,
	IOrderSuccessScreenSettings
> {
	successModalView: OrderSuccessView;

	init() {
		this.element = ensureElement(settings.SELECTORS.PAGE);
		this.successModalView = new OrderSuccessView(
			cloneTemplate(settings.TEMPLATES.SUCCESS),
			{
				events: this.settings.events,
			}
		);
	}

	update(data: IOrderSuccessViewData) {
		this.successModalView.render(data);
	}
}
