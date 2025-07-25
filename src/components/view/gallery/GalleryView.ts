import { IProduct } from '../../../types';
import { cloneTemplate } from '../../../utils/utils';
import { ProductCardModalView } from './ProductCardView';
import { View } from '../../base/View';
import {
	IGalleryViewData,
	IGalleryViewSettings,
} from '../../../types/components/view/gallery/GalleryView';
import { settings } from '../../../utils/constants';

export class GalleryView extends View<IGalleryViewData, IGalleryViewSettings> {
	set products(items: IProduct[]) {
		this.element.innerHTML = '';
		items.forEach((product) => {
			const card = new ProductCardModalView(
				cloneTemplate(settings.TEMPLATES.CARD_CATALOG),
				{ events: this.settings.events }
			);
			this.element.appendChild(card.render(product));
		});
	}
}
