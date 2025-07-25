export interface IView<T, S extends object = object> {
	copy(settings?: S): IView<T, S>;
	render(data?: Partial<T>): HTMLElement;
}
