import { IView } from '../../types/components/base/View';
import { ensureElement } from '../../utils/utils';

// Базовое отображение
export abstract class View<T, S extends object = object>
	implements IView<T, S>
{
	// чтобы при копировании создавать дочерний класс, не зная его имени
	['constructor']!: new (root: HTMLElement, settings: S) => this;

	constructor(public element: HTMLElement, protected readonly settings: S) {
		this.init();
		if (!this.element) {
			throw new Error('Element is not defined');
		}
	}

	protected init() {
		// noop
	}

	copy(settings?: S) {
		return new this.constructor(
			this.element.cloneNode(true) as HTMLElement,
			Object.assign({}, this.settings, settings ?? {})
		);
	}

	render(data: Partial<T>): HTMLElement {
		if (typeof data === 'object') {
			Object.assign(this, data);
		}
		return this.element;
	}

	protected querySelector<T extends HTMLElement>(
		selector: string,
		context?: HTMLElement
	): T {
		if (context) {
			return context.querySelector<T>(selector);
		}

		return this.element.querySelector<T>(selector);
	}

	protected ensureElement<T extends HTMLElement>(
		selector: string,
		context?: HTMLElement
	): T {
		return ensureElement<T>(selector, context ?? this.element);
	}
}
