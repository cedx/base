/**
 * A component that activates the items of a menu based on the current document URL.
 */
export class MenuActivator extends HTMLElement {

	/**
	 * Creates a new menu activator.
	 */
	constructor() {
		super();
		this.attachShadow({mode: "open"}).appendChild(document.createElement("slot"));
	}

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
		const menu = this.shadowRoot!.querySelector("slot")!.assignedElements().at(0);
		if (menu) for (const anchor of menu.getElementsByTagName("a"))
			if (anchor.href != location.href) anchor.classList.remove("active");
			else {
				anchor.classList.add("active");
				anchor.closest(".nav-item.dropdown")?.querySelector(".nav-link")?.classList.add("active");
			}
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
		"menu-activator": MenuActivator;
	}
}
