import {Modal} from "bootstrap";
import {type Context, cssClass as contextCssClass, icon as contextIcon} from "../Context.js";
import {DialogResult} from "../DialogResult.js";
import {html} from "../Tag.js";
import {Variant, cssClass as variantCssClass} from "../Variant.js";

/**
 * Represents a dialog box button.
 */
export interface IDialogButton {

	/**
	 * The button icon.
	 */
	icon?: string;

	/**
	 * The button label.
	 */
	label?: string;

	/**
	 * The button value.
	 */
	value?: string;

	/**
	 * A tone variant.
	 */
	variant?: Variant;
}

/**
 * Represents a message to display in a dialog box.
 */
export interface IDialogMessage {

	/**
	 * The child content displayed in the body.
	 */
	body: DocumentFragment;

	/**
	 * The title displayed in the header.
	 */
	caption: string;

	/**
	 * The child content displayed in the footer.
	 */
	footer?: DocumentFragment;
}

/**
 * Displays a dialog box, which presents a message to the user.
 */
export class DialogBox extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["caption", "centered", "fade", "modal", "scrollable"];

	/**
	 * The underlying Bootstrap modal.
	 */
	#modal!: Modal;

	/**
	 * The function invoked to resolve the dialog result.
	 */
	#resolve!: (value: string) => void;

	/**
	 * The promise providing the dialog result.
	 */
	#result: string = DialogResult.None;

	/**
	 * Creates a new dialog box.
	 */
	constructor() {
		super();
		this.firstElementChild!.addEventListener("hide.bs.modal", () => this.#resolve(this.#result));
		this.querySelector(".btn-close")!.addEventListener("click", this.#close);
		for (const button of this.querySelectorAll(".modal-footer button")) button.addEventListener("click", this.#close);
	}

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("dialog-box", this);
	}

	/**
	 * The child content displayed in the body.
	 */
	set body(value: DocumentFragment) { // eslint-disable-line accessor-pairs
		this.querySelector(".modal-body")!.replaceChildren(...value.childNodes);
	}

	/**
	 * The title displayed in the header.
	 */
	get caption(): string {
		return (this.getAttribute("caption") ?? "").trim();
	}
	set caption(value: string) {
		this.setAttribute("caption", value);
	}

	/**
	 * Value indicating whether to vertically center this dialog box.
	 */
	get centered(): boolean {
		return this.hasAttribute("centered");
	}
	set centered(value: boolean) {
		this.toggleAttribute("centered", value);
	}

	/**
	 * Value indicating whether to apply a transition.
	 */
	get fade(): boolean {
		return this.hasAttribute("fade");
	}
	set fade(value: boolean) {
		this.toggleAttribute("fade", value);
	}

	/**
	 * The child content displayed in the footer.
	 */
	set footer(value: DocumentFragment) { // eslint-disable-line accessor-pairs
		const footer = this.querySelector<HTMLElement>(".modal-footer")!;
		footer.hidden = !value.hasChildNodes();
		footer.replaceChildren(...value.childNodes);
	}

	/**
	 * Value indicating whether to this dialog box will not close when clicking outside of it.
	 */
	get modal(): boolean {
		return this.hasAttribute("modal");
	}
	set modal(value: boolean) {
		this.toggleAttribute("modal", value);
	}

	/**
	 * Value indicating whether to initially show this component.
	 */
	get open(): boolean {
		return this.hasAttribute("open");
	}
	set open(value: boolean) {
		this.toggleAttribute("open", value);
	}

	/**
	 * The dialog result.
	 */
	get result(): string {
		return this.#result;
	}

	/**
	 * Value indicating whether the body is scrollable.
	 */
	get scrollable(): boolean {
		return this.hasAttribute("scrollable");
	}
	set scrollable(value: boolean) {
		this.toggleAttribute("scrollable", value);
	}

	/**
	 * Method invoked when an attribute has been changed.
	 * @param attribute The attribute name.
	 * @param oldValue The previous attribute value.
	 * @param newValue The new attribute value.
	 */
	attributeChangedCallback(attribute: string, oldValue: string|null, newValue: string|null): void {
		if (newValue != oldValue) switch (attribute) {
			case "caption": this.#updateCaption(newValue ?? ""); break;
			case "centered": this.#updateCentered(newValue != null); break;
			case "fade": this.#updateFade(newValue != null); break;
			case "modal": this.#updateModal(newValue != null); break;
			case "scrollable": this.#updateScrollable(newValue != null); break;
			// No default
		}
	}

	/**
	 * Shows an alert message with an "OK" button by default.
	 * @param context The contextual modifier.
	 * @param caption The title displayed in the header.
	 * @param message The child content displayed in the body.
	 * @param buttons The buttons displayed in the footer.
	 * @returns The dialog result.
	 */
	alert(context: Context, caption: string, message: DocumentFragment, buttons: IDialogButton[] = []): Promise<string> {
		return this.show({
			caption,
			body: html`
				<div class="d-flex gap-2">
					<i class="icon icon-fill fs-1 text-${contextCssClass(context)}"> ${contextIcon(context)}</i>
					<div class="flex-grow-1">${message}</div>
				</div>
			`,
			footer: html`
				${(buttons.length ? buttons : [{label: "OK", value: DialogResult.OK, variant: Variant.Primary}]).map(button => html`
					<button class="btn btn-${variantCssClass(button.variant ?? Variant.Primary)}" type="button" value="${button.value ?? DialogResult.None}">
						${button.icon ? html`<i class="icon ${button.label ? "me-1" : ""}">${button.icon}</i>` : ""}
						${button.label}
					</button>
				`)}
			`
		});
	}

	/**
	 * Closes this dialog box.
	 * @param result The dialog result.
	 */
	close(result: string = DialogResult.None): void {
		this.#result = result;
		this.#modal.hide();
	}

	/**
	 * Shows a confirmation message with two buttons, "OK" and "Cancel".
	 * @param context The contextual modifier.
	 * @param caption The title displayed in the header.
	 * @param message The child content displayed in the body.
	 * @returns The dialog result.
	 */
	confirm(context: Context, caption: string, message: DocumentFragment): Promise<string> {
		return this.alert(context, caption, message, [
			{label: "OK", value: DialogResult.OK, variant: Variant.Primary},
			{label: "Annuler", value: DialogResult.Cancel, variant: Variant.Secondary}
		]);
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		this.#modal = new Modal(this.firstElementChild!);
		if (this.open) void this.show();
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		this.#modal.dispose();
	}

	/**
	 * Shows a message.
	 * @param message The message to show.
	 * @returns The dialog result.
	 */
	show(message: IDialogMessage|null = null): Promise<string> {
		if (message) {
			const footer = message.footer ?? document.createDocumentFragment();
			for (const button of footer.querySelectorAll("button")) button.addEventListener("click", this.#close);
			this.body = message.body;
			this.caption = message.caption;
			this.footer = footer;
		}

		const {promise, resolve} = Promise.withResolvers<string>();
		this.#resolve = resolve;
		this.#result = DialogResult.None;
		this.#modal.show();
		return promise;
	}

	/**
	 * Closes this dialog box.
	 * @param event The dispatched event.
	 */
	readonly #close: (event: Event) => void = event => {
		event.preventDefault();
		this.close((event.currentTarget as HTMLButtonElement).value);
	};

	/**
	 * Updates the title displayed in the header.
	 * @param value The new value.
	 */
	#updateCaption(value: string): void {
		this.querySelector(".modal-title")!.textContent = value.trim();
	}

	/**
	 * Updates the value indicating whether to vertically center this dialog box.
	 * @param value The new value.
	 */
	#updateCentered(value: boolean): void {
		this.querySelector(".modal-dialog")!.classList.toggle("modal-dialog-centered", value);
	}

	/**
	 * Updates the value indicating whether to apply a transition.
	 * @param value The new value.
	 */
	#updateFade(value: boolean): void {
		this.firstElementChild!.classList.toggle("fade", value);
	}

	/**
	 * Updates the value indicating whether to this dialog box will not close when clicking outside of it.
	 * @param value The new value.
	 */
	#updateModal(value: boolean): void {
		(this.firstElementChild! as HTMLElement).dataset.bsBackdrop = value ? "static" : "true";
	}

	/**
	 * Updates the value indicating whether the body is scrollable.
	 * @param value The new value.
	 */
	#updateScrollable(value: boolean): void {
		this.querySelector(".modal-dialog")!.classList.toggle("modal-dialog-scrollable", value);
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
		"dialog-box": DialogBox;
	}
}
