/**
 * A component that shows up when the network is unavailable, and hides when connectivity is restored.
 */
export class OfflineIndicator extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["fade"];

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
		this.#updateVisibility();
		for (const event of ["online", "offline"]) addEventListener(event, this.#updateVisibility);
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		for (const event of ["online", "offline"]) removeEventListener(event, this.#updateVisibility);
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
		this.classList.toggle("hide", navigator.onLine);
		this.classList.toggle("show", !navigator.onLine);
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
