/**
 * A component that moves back in the session history when clicked.
 */
export class TypeAhead extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["list", "query"];

	/**
	 * The debounced handler used to look up the query.
	 */
	#debounced: (value: string) => void = () => { /* Noop */ };

	/**
	 * The previous query.
	 */
	#previousQuery = "";

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("type-ahead", this);
	}

	/**
	 * The function invoked when the query has been changed.
	 */
	set handler(callback: (query: string) => Promise<string[]>) { // eslint-disable-line accessor-pairs
		this.#debounced = this.#debounce(async query => { // eslint-disable-line @typescript-eslint/no-misused-promises
			try { this.#updateItems(await callback(query)); }
			catch { this.#updateItems([]); }
		}, this.wait);
	}

	/**
	 * The data list identifier.
	 */
	get list(): string {
		return (this.getAttribute("list") ?? "").trim();
	}
	set list(value: string) {
		this.setAttribute("list", value);
	}

	/**
	 * The minimum character length needed before triggering autocomplete suggestions.
	 */
	get minLength(): number {
		const value = Number(this.getAttribute("minLength"));
		return Math.max(1, Number.isNaN(value) ? 1 : value);
	}
	set minLength(value: number) {
		this.setAttribute("minLength", value.toString());
	}

	/**
	 * The query to look up.
	 */
	get query(): string {
		return (this.getAttribute("query") ?? "").trim();
	}
	set query(value: string) {
		this.setAttribute("query", value);
	}

	/**
	 * The delay in milliseconds to wait before triggering autocomplete suggestions.
	 */
	get wait(): number {
		const value = Number(this.getAttribute("wait"));
		return Math.max(0, Number.isNaN(value) ? 300 : value);
	}
	set wait(value: number) {
		this.setAttribute("wait", value.toString());
	}

	/**
	 * Method invoked when an attribute has been changed.
	 * @param attribute The attribute name.
	 * @param oldValue The previous attribute value.
	 * @param newValue The new attribute value.
	 */
	attributeChangedCallback(attribute: string, oldValue: string|null, newValue: string|null): void {
		if (newValue != oldValue) switch (attribute) {
			case "list": this.#updateList(newValue ?? ""); break;
			case "query": this.#updateQuery(newValue ?? ""); break;
			// No default
		}
	}

	/**
	 * Postpones the invocation of the specified callback until after a given delay has elapsed since the last time it was invoked.
	 * @param callback The function to debounce.
	 * @param delay The delay to wait, in milliseconds.
	 * @returns The debounced function.
	 */
	#debounce(callback: (value: string) => void, delay: number): (value: string) => void {
		let timer = 0;
		return value => {
			if (timer) clearTimeout(timer);
			timer = window.setTimeout(callback, delay, value);
		};
	}

	/**
	 * Updates the identifier of the underlying data list.
	 * @param value The new value.
	 */
	#updateList(value: string): void {
		this.firstElementChild!.id = value.trim();
	}

	/**
	 * Updates the query to look up.
	 * @param value The new value.
	 */
	#updateQuery(value: string): void {
		const query = value.trim();
		if (query != this.#previousQuery) {
			this.#previousQuery = query;
			if (query.length < this.minLength) this.#updateItems([]);
			else this.#debounced(query);
		}
	}

	/**
	 * Updates the items of the underlying data list.
	 * @param values The new values.
	 */
	#updateItems(values: string[]): void {
		this.firstElementChild!.replaceChildren(...values.map(value => {
			const option = document.createElement("option");
			option.value = value;
			return option;
		}));
	}
}

/**
 * Declaration merging.
 */
declare global {

	/**
	 * The map of HTML tag names.
	 */
	interface HTMLElementTagNameMap {
		"type-ahead": TypeAhead;
	}
}
