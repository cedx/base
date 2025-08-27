import {Modal} from "bootstrap";
import {type Context, getIcon, toCss} from "../Context.js";
import {DialogResult} from "../DialogResult.js";
import {html} from "../Tag.js";
import {Variant} from "../Variant.js";
import type {DialogButton, IDialogButton} from "./DialogButton.js";

/**
 * Represents a message to display in a dialog box.
 */
export interface IMessage {

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
	 * The template for a button.
	 */
	readonly #buttonTemplate: DocumentFragment = this.querySelector("template")!.content;

	/**
	 * The underlying Bootstrap modal.
	 */
	#modal!: Modal;

	/**
	 * The function invoked to return the dialog box result.
	 */
	#resolve: (value: string) => void = () => { /* Noop */ };

	/**
	 * The dialog result.
	 */
	#result: string = DialogResult.None;

	/**
	 * Creates a new dialog box.
	 */
	constructor() {
		super();
		this.firstElementChild!.addEventListener("hidden.bs.modal", () => this.#resolve(this.#result));
		this.querySelector(".btn-close")!.addEventListener("click", event => this.#close(event));
		for (const button of this.querySelectorAll(".modal-footer button")) button.addEventListener("click", event => this.#close(event));
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
			case "modal": this.#updateModal(newValue != null); break;
			case "fade": this.#updateFade(newValue != null); break;
			case "scrollable": this.#updateScrollable(newValue != null); break;
			// No default
		}
	}

	/**
	 * Shows an alert message with an "OK" button.
	 * @param context The contextual modifier.
	 * @param caption The title displayed in the header.
	 * @param body The child content displayed in the body.
	 * @returns The dialog box result.
	 */
	alert(context: Context, caption: string, body: DocumentFragment): Promise<DialogResult> {
		return this.show(context, caption, this.#getBodyTemplate(context, body), [
			{label: "OK", value: DialogResult.OK, variant: Variant.Primary}
		]);
	}

	/**
	 * Closes this dialog box.
	 * @param result The dialog box result.
	 */
	close(result: string = DialogResult.None): void {
		this.#result = result;
		this.#modal.hide();
	}

	/**
	 * Shows a confirmation message with two buttons, "OK" and "Cancel".
	 * @param context The contextual modifier.
	 * @param caption The title displayed in the header.
	 * @param body The child content displayed in the body.
	 * @returns The dialog box result.
	 */
	confirm(context: Context, caption: string, body: DocumentFragment): Promise<DialogResult> {
		return this.show(context, caption, this.#getBodyTemplate(context, body), [
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
	 * @returns The dialog box result.
	 */
	show(message?: IMessage): Promise<DialogResult>;

	/**
	 * Shows a message.
	 * @param context The contextual modifier.
	 * @param caption The title displayed in the header.
	 * @param body The child content displayed in the body.
	 * @param buttons The buttons displayed in the footer.
	 * @returns The dialog box result.
	 */
	show(context: Context, caption: string, body: DocumentFragment, buttons?: IDialogButton[]): Promise<DialogResult>;

	/**
	 * Shows a message.
	 * @param message The message to show, or the contextual modifier.
	 * @param caption The title displayed in the header.
	 * @param body The child content displayed in the body.
	 * @param buttons The buttons displayed in the footer.
	 * @returns The dialog box result.
	 */
	show(message: IMessage|Context|null = null, caption = "", body = document.createDocumentFragment(), buttons: IDialogButton[] = []): Promise<DialogResult> {
		if (typeof message == "string") {
			const footer = document.createDocumentFragment();
			footer.append(...buttons.map(button => this.#createButton(button)));
			message = {body, caption, footer};
		}

		if (message) {
			const footer = message.footer ?? document.createDocumentFragment();
			for (const button of footer.querySelectorAll("button")) button.addEventListener("click", event => this.#close(event));
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
	#close(event: Event): void {
		event.preventDefault();
		this.close((event.target as Element).closest("button")!.value);
	}

	/**
	 * Creates the component instance corresponding to the specified button.
	 * @param button An object describing the appearance of the button.
	 * @returns The component instance corresponding to the specified button.
	 */
	#createButton(button: IDialogButton): DialogButton {
		const element = document.createElement("dialog-button");
		const childContent = (this.#buttonTemplate.cloneNode(true) as DocumentFragment).querySelector("button")!;
		childContent.addEventListener("click", event => this.#close(event));
		element.appendChild(childContent);

		element.context = button.context ?? null;
		element.icon = button.icon ?? null;
		element.label = button.label ?? "";
		element.value = button.value ?? DialogResult.None;
		element.variant = button.variant ?? null;
		return element;
	}

	/**
	 * Gets the body template corresponding to the specified context and message.
	 * @param context The contextual modifier.
	 * @param message The child content displayed in the body.
	 * @returns The body template corresponding to the specified context and message.
	 */
	#getBodyTemplate(context: Context, message: DocumentFragment): DocumentFragment {
		return html`
			<div class="d-flex gap-2">
				<i class="icon icon-fill fs-1 text-${toCss(context)}"> ${getIcon(context)}</i>
				<div class="flex-grow-1">${message}</div>
			</div>
		`;
	}

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
