/**
 * A component that activates the items of a menu, based on the current document URL.
 */
export class MenuActivator extends HTMLElement {

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("menu-activator", this);
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		this.#update();
		addEventListener("popstate", this.#update);
		document.body.addEventListener("htmx:afterRequest", this.#update);
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		removeEventListener("popstate", this.#update);
		document.body.removeEventListener("htmx:afterRequest", this.#update);
	}

	/**
	 * Updates this component.
	 * @param event The dispatched event.
	 */
	readonly #update: (event?: Event) => void = () => {
		for (const element of this.querySelectorAll(".active")) element.classList.remove("active");
		for (const element of this.querySelectorAll("a")) if (element.href == location.href) {
			element.classList.add("active");
			element.closest(".dropdown")?.querySelector(".dropdown-toggle")?.classList.add("active");
		}
	};
}

/**
 * Declaration merging.
 */
declare global {

	/**
	 * The map of HTML tag names.
	 */
	interface HTMLElementTagNameMap {
		"menu-activator": MenuActivator;
	}
}
