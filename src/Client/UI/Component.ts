import {LitElement, type CSSResultGroup} from "lit";

/**
 * Optional base class for UI components. Alternatively, components may extend {@link LitElement} directly.
 */
export abstract class Component extends LitElement {

	/**
	 * The component styles.
	 */
	static override styles: CSSResultGroup = [document.adoptedStyleSheets];

	/**
	 * Value indicating whether this component uses a shadow root.
	 */
	readonly #useShadowRoot: boolean;

	/**
	 * Creates a new component.
	 * @param options Value indicating whether this component uses a shadow root.
	 */
	constructor(options: {shadowRoot?: boolean} = {}) {
		super();
		this.#useShadowRoot = options.shadowRoot ?? false;
	}

	/**
	 * Returns the node into which this component should render.
	 * @returns The node into which this component should render.
	 */
	protected override createRenderRoot(): DocumentFragment|HTMLElement {
		return this.#useShadowRoot ? super.createRenderRoot() : this;
	}
}
