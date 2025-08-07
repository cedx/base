import {html, LitElement, type TemplateResult} from "lit";
import {customElement} from "lit/decorators.js";

/**
 * A component that shows up when the network is unavailable, and hides when connectivity is restored.
 */
@customElement("offline-indicator")
export class OfflineIndicator extends LitElement {

	/**
	 * Creates a new offline indicator.
	 */
	constructor() {
		super();
		this.hidden = navigator.onLine;
	}

	/**
	 * Method invoked when this component is connected.
	 */
	override connectedCallback(): void {
		super.connectedCallback();
		for (const event of ["online", "offline"]) addEventListener(event, this);
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	override disconnectedCallback(): void {
		for (const event of ["online", "offline"]) removeEventListener(event, this);
		super.disconnectedCallback();
	}

	/**
	 * Handles the events.
	 */
	handleEvent(): void {
		this.hidden = navigator.onLine;
	}

	/**
	 * Renders this component.
	 * @returns The view template.
	 */
	protected override render(): TemplateResult {
		return html`<slot></slot>`;
	}
}
