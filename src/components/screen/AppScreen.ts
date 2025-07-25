import { IProduct } from '../../types';
import { IAppScreenSettings } from '../../types/components/screen/AppScreen';
import { settings } from '../../utils/constants';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { Screen } from '../base/Screen';
import { AppModel } from '../model/AppState';
import { GalleryView } from '../view/gallery/GalleryView';
import { ProductCardModalView } from '../view/gallery/ProductCardView';

export class AppScreen extends Screen<object, IAppScreenSettings> {
	protected gallery: GalleryView;
	protected detailsCardView: ProductCardModalView;

	init() {
		this.element = ensureElement(settings.SELECTORS.PAGE);
		this.gallery = new GalleryView(ensureElement(settings.SELECTORS.GALLERY), {
			events: this.settings.events,
		});
		this.detailsCardView = new ProductCardModalView(
			cloneTemplate(settings.TEMPLATES.CARD_PREVIEW),
			{ events: this.settings.events }
		);
	}

	set products(products: IProduct[]) {
		this.gallery.render({ products });
	}

	update(state: AppModel) {
		this.gallery.render({ products: state.products });

		if (state.selectedProduct) {
			this.detailsCardView.render(state.selectedProduct);
		}
	}

	getModalContent() {
		return this.detailsCardView.getModalContent();
	}
}
