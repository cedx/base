import {LitElement, type CSSResultGroup} from "lit";

/**
 * Optional base class for UI components. Alternatively, components may extend {@link LitElement} directly.
 */
export abstract class ComponentBase extends LitElement {

	/**
	 * The component styles.
	 */
	static override styles: CSSResultGroup = [document.adoptedStyleSheets];

	/**
	 * Value indicating whether a shadow DOM tree should be attached to this component.
	 */
	readonly #attachShadow: boolean;

	/**
	 * Creates a new component.
	 * @param options Value indicating whether a shadow DOM tree should be attached to this component.
	 */
	constructor(options: {attachShadow?: boolean} = {}) {
		super();
		this.#attachShadow = options.attachShadow ?? false;
	}

	/**
	 * Returns the node into which this component should render.
	 * @returns The node into which this component should render.
	 */
	protected override createRenderRoot(): DocumentFragment|HTMLElement {
		return this.#attachShadow ? super.createRenderRoot() : this;
	}
}
