/**
 * A component that moves back one page in the session history when clicked.
 */
export class BackButton extends HTMLElement {

	/**
	 * Creates a new back button.
	 */
	constructor() {
		super();
		this.addEventListener("click", () => history.go(-this.steps));
	}

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("back-button", this);
	}

	/**
	 * The number of pages to go back.
	 */
	get steps(): number {
		const value = Number(this.getAttribute("steps"));
		return Math.max(0, Number.isNaN(value) ? 1 : value);
	}
	set steps(value: number) {
		this.setAttribute("steps", value.toString());
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
