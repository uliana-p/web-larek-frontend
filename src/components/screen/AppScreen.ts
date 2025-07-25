import { IProduct } from '../../types';
import { IAppScreenSettings } from '../../types/components/screen/AppScreen';
import { settings } from '../../utils/constants';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { Screen } from '../base/Screen';
import { AppModel } from '../model/AppState';
import { GalleryView } from '../view/gallery/GalleryView';
import { ProductCardView } from '../view/gallery/ProductCardView';

export class AppScreen extends Screen<object, IAppScreenSettings> {
	declare gallery: GalleryView;
	detailsCardView: ProductCardView;

	private _selectedProductId: string | null = null;

	init() {
		this.element = ensureElement(settings.SELECTORS.PAGE);
		this.gallery = new GalleryView(ensureElement(settings.SELECTORS.GALLERY), {
			events: this.settings.events,
		});
		this.detailsCardView = new ProductCardView(
			cloneTemplate(settings.TEMPLATES.CARD_PREVIEW),
			{ events: this.settings.events }
		);
	}

	set products(products: IProduct[]) {
		this.gallery.render({ products });
	}

	selectProduct(id: string) {
		this._selectedProductId = id;
	}

	update(state: AppModel) {
		this.gallery.render({ products: state.products });
		const selectedProduct = state.products.find(
			(p) => p.id === this._selectedProductId
		);

		if (selectedProduct) {
			this.detailsCardView.render(selectedProduct);
		}
	}
}
