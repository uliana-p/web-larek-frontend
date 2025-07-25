import { IBasketScreenSettings } from '../../types/components/screen/BasketScreen';
import { settings } from '../../utils/constants';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { Screen } from '../base/Screen';
import { AppModel } from '../model/AppState';
import { BasketButtonView } from '../view/basket/BasketButtonView';
import { BasketModalView } from '../view/basket/BasketModalView';

export class BasketScreen extends Screen<object, IBasketScreenSettings> {
	protected basketButton: BasketButtonView;
	protected basketModalView: BasketModalView;

	init() {
		this.element = ensureElement(settings.SELECTORS.PAGE);
		this.basketButton = new BasketButtonView(
			ensureElement(settings.SELECTORS.HEADER_BASKET),
			{ events: this.settings.events }
		);
		this.basketModalView = new BasketModalView(
			cloneTemplate(settings.TEMPLATES.BASKET),
			{
				events: this.settings.events,
			}
		);
	}

	getModalContent() {
		return this.basketModalView.getModalContent();
	}

	update(state: AppModel) {
		this.basketButton.render({ counter: state.basket.length });
		this.basketModalView.render({
			products: state.basket,
			isDisabled: state.basket.length === 0,
			price: state.basket.reduce((acc, product) => acc + product.price, 0),
		});
	}
}
