/**
 * A component that shows up when an HTTP request starts, and hides when all concurrent HTTP requests are completed.
 */
export class LoadingIndicator extends HTMLElement {

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
	 * Hides the loading indicator.
	 * @param options Value indicating whether to force the loading indicator to hide.
	 */
	hide(options: {force?: boolean} = {}): void {
		this.#requestCount--;
		if (this.#requestCount <= 0 || options.force) {
			this.#requestCount = 0;
			this.classList.add("hide");
			this.classList.remove("show");
		}
	}

	/**
	 * Shows the loading indicator.
	 */
	show(): void {
		this.#requestCount++;
		this.classList.remove("hide");
		this.classList.add("show");
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
