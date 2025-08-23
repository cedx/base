/**
 * A component that moves back one page in the session history when clicked.
 */
export class BackButton extends HTMLElement {

	/**
	 * Creates a new back button.
	 */
	constructor() {
		super();
		this.addEventListener("click", this.#goBack);
	}

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("back-button", this);
	}

	/**
	 * Moves back one page in the session history.
	 * @param event The dispatched event.
	 */
	#goBack: (event: Event) => void = event => {
		event.preventDefault();
		history.back();
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
		"back-button": BackButton;
	}
}
