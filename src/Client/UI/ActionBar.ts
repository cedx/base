/**
 * An action bar located under the navigation bar.
 */
export class ActionBar extends HTMLElement {

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("action-bar", this);
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--navbar-height"));
		const mainOffset = this.offsetHeight + (Number.isNaN(navbarHeight) ? 0 : navbarHeight);
		document.documentElement.style.setProperty("--main-offset", `${mainOffset}px`);
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		document.documentElement.style.removeProperty("--main-offset");
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
		"action-bar": ActionBar;
	}
}
