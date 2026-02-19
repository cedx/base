/**
 * A component that moves back in the session history when clicked.
 */
export class BackButton extends HTMLElement {

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

	/**
	 * Moves back in the session history.
	 * @param event The dispatched event.
	 */
	goBack(event?: Event): void {
		event?.preventDefault();
		history.go(-this.steps);
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
