import { View } from '../../base/View';

export class BaseModalView<T, S extends object> extends View<T, S> {
	getModalContent(): HTMLElement {
		return this.element;
	}
}
