export interface IView<T, S extends object = object> {
	element: HTMLElement;
	copy(settings?: S): IView<T, S>;
	render(data?: Partial<T>): HTMLElement;
}
