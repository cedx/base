/**
 * A component that shows up when the network is unavailable, and hides when connectivity is restored.
 */
export class OfflineIndicator extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["fade"];

	/**
	 * The abort controller used to remove the event listeners.
	 */
	#abortController: AbortController|null = null;

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("offline-indicator", this);
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
	 * Value indicating whether this component is shown.
	 */
	get isShown(): boolean {
		return this.classList.contains("show");
	}

	/**
	 * Value indicating whether to initially show this component.
	 */
	get open(): boolean {
		return this.hasAttribute("open");
	}
	set open(value: boolean) {
		this.toggleAttribute("open", value);
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
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		this.#abortController = new AbortController;
		for (const event of ["online", "offline"]) addEventListener(event, this.#updateVisibility, {signal: this.#abortController.signal});
		if (this.open) this.show();
		else this.#updateVisibility();
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		this.#abortController?.abort();
	}

	/**
	 * Hides this offline indicator.
	 */
	hide(): void {
		this.classList.remove("show");
		this.classList.add("hide");
	}

	/**
	 * Shows this offline indicator.
	 */
	show(): void {
		this.classList.remove("hide");
		this.classList.add("show");
	}

	/**
	 * Updates the value indicating whether to apply a transition.
	 * @param value The new value.
	 */
	#updateFade(value: boolean): void {
		this.classList.toggle("fade", value);
	}

	/**
	 * Updates the visibility of this component.
	 */
	readonly #updateVisibility: () => void = () => {
		if (navigator.onLine) this.hide();
		else this.show();
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
		"offline-indicator": OfflineIndicator;
	}
}
