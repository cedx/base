/**
 * A component that shows up when the network is unavailable, and hides when connectivity is restored.
 */
export class OfflineIndicator extends HTMLElement {

	/**
	 * Creates a new offline indicator.
	 */
	constructor() {
		super();
		this.#updateHiddenState();
	}

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("offline-indicator", this);
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		for (const event of ["online", "offline"]) addEventListener(event, this.#updateHiddenState);
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		for (const event of ["online", "offline"]) removeEventListener(event, this.#updateHiddenState);
	}

	/**
	 * Hides this component.
	 */
	hide(): void {
		this.hidden = true;
	}

	/**
	 * Shows this component.
	 */
	show(): void {
		this.hidden = false;
	}

	/**
	 * Updates the hidden state of this component according to the {@link navigator.onLine} property.
	 */
	readonly #updateHiddenState: () => void = () =>
		this.hidden = navigator.onLine;
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
