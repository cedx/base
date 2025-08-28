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
		this.#updateAnchors();
		addEventListener("popstate", this.#updateAnchors);
		document.body.addEventListener("htmx:afterRequest", this.#updateAnchors);
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		removeEventListener("popstate", this.#updateAnchors);
		document.body.removeEventListener("htmx:afterRequest", this.#updateAnchors);
	}

	/**
	 * Updates the state of anchors.
	 * @param event The dispatched event.
	 */
	readonly #updateAnchors: (event?: Event) => void = () => {
		for (const anchor of this.querySelectorAll("a"))
			if (anchor.href != location.href) anchor.classList.remove("active");
			else {
				anchor.classList.add("active");
				anchor.closest(".dropdown")?.querySelector('[data-bs-toggle="dropdown"]')?.classList.add("active");
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
