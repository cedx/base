/**
 * A component that moves back in the session history when clicked.
 */
export class TypeAhead extends HTMLElement {

	/**
	 * Creates a new back button.
	 */
	constructor() {
		super();
	}

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("type-ahead", this);
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
