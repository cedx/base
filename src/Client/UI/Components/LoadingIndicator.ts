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
	 * Starts the loading indicator.
	 */
	start(): void {
		this.#requestCount++;
		this.hidden = false;
	}

	/**
	 * Stops the loading indicator.
	 * @param options Value indicating whether to force the loading indicator to stop.
	 */
	stop(options: {force?: boolean} = {}): void {
		this.#requestCount--;
		if (options.force || this.#requestCount <= 0) {
			this.#requestCount = 0;
			this.hidden = true;
		}
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
