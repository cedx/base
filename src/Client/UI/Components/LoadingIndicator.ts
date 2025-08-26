/**
 * A component that shows up when an HTTP request starts, and hides when all concurrent HTTP requests are completed.
 */
export class LoadingIndicator extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["fade"];

	/**
	 * The number of concurrent HTTP requests.
	 */
	#requestCount = 0;

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("loading-indicator", this);
	}

	/**
	 * Value indicating whether to apply a transition.
	 */
	get fade(): boolean {
		return this.hasAttribute("fade");
	}
	set fade(value: boolean) {
		this.toggleAttribute("fade", value);
	}

	/**
	 * Method invoked when an attribute has been changed.
	 * @param attribute The attribute name.
	 * @param oldValue The previous attribute value.
	 * @param newValue The new attribute value.
	 */
	attributeChangedCallback(attribute: string, oldValue: string|null, newValue: string|null): void {
		if (newValue != oldValue) switch (attribute) {
			case "fade": this.#updateFade(newValue != null); break;
			// No default
		}
	}

	/**
	 * Hides the loading indicator.
	 * @param options Value indicating whether to force the loading indicator to hide.
	 */
	hide(options: {force?: boolean} = {}): void {
		this.#requestCount--;
		if (this.#requestCount <= 0 || options.force) {
			this.#requestCount = 0;
			this.classList.add("hide");
			this.classList.remove("show");
			document.body.classList.remove("loading");
		}
	}

	/**
	 * Shows the loading indicator.
	 */
	show(): void {
		this.#requestCount++;
		this.classList.remove("hide");
		this.classList.add("show");
		document.body.classList.add("loading");
	}

	/**
	 * Updates the value indicating whether to apply a transition.
	 * @param value The new value.
	 */
	#updateFade(value: boolean): void {
		this.classList.toggle("fade", value);
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
		"loading-indicator": LoadingIndicator;
	}
}
