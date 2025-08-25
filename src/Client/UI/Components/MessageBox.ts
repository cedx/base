import {Modal} from "bootstrap";
import {Context, getIcon, toCss} from "../Context.js";
import {DialogResult} from "../DialogResult.js";
import {createDocumentFragment} from "../ElementExtensions.js";
import {Variant} from "../Variant.js";
import type {DialogButton, IDialogButton} from "./DialogButton.js";

/**
 * Represents a message to display in a dialog box.
 */
export interface IMessage {

	/**
	 * Value indicating whether to apply a fade transition.
	 */
	animation?: boolean;

	/**
	 * The child content displayed in the body.
	 */
	body: DocumentFragment|string;

	/**
	 * The title displayed in the header.
	 */
	caption: string;

	/**
	 * Value indicating whether to vertically center this message box.
	 */
	centered?: boolean;

	/**
	 * A contextual modifier.
	 */
	context?: Context;

	/**
	 * The child content displayed in the footer.
	 */
	footer?: DocumentFragment|string;

	/**
	 * The icon displayed next to the body.
	 */
	icon?: string|null;

	/**
	 * Value indicating whether the body is scrollable.
	 */
	scrollable?: boolean;
}

/**
 * Displays a message window, also known as dialog box, which presents a message to the user.
 */
export class MessageBox extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["animation", "caption", "centered", "context", "icon", "scrollable"];

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
	#resolve: (value: DialogResult) => void = () => { /* Noop */ };

	/**
	 * The dialog result.
	 */
	#result: DialogResult = DialogResult.None;

	/**
	 * Creates a new message box.
	 */
	constructor() {
		super();
		this.firstElementChild!.addEventListener("hidden.bs.modal", () => this.#resolve(this.#result));
		this.querySelector(".btn-close")!.addEventListener("click", this.#close);
		for (const button of this.querySelectorAll(".modal-footer button")) button.addEventListener("click", this.#close);
	}

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("message-box", this);
	}

	/**
	 * Value indicating whether to apply a fade transition.
	 */
	get animation(): boolean {
		return this.hasAttribute("animation");
	}
	set animation(value: boolean) {
		this.toggleAttribute("animation", value);
	}

	/**
	 * The child content displayed in the body.
	 */
	set body(value: DocumentFragment) { // eslint-disable-line accessor-pairs
		this.querySelector(".modal-body > div")!.replaceChildren(...value.childNodes);
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
	 * Value indicating whether to vertically center this message box.
	 */
	get centered(): boolean {
		return this.hasAttribute("centered");
	}
	set centered(value: boolean) {
		this.toggleAttribute("centered", value);
	}

	/**
	 * A contextual modifier.
	 */
	get context(): Context {
		const value = this.getAttribute("context") as Context;
		return Object.values(Context).includes(value) ? value : Context.Info;
	}
	set context(value: Context) {
		this.setAttribute("context", value);
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
	 * The icon displayed next to the body.
	 */
	get icon(): string|null {
		const value = this.getAttribute("icon") ?? "";
		return value.trim() || null;
	}
	set icon(value: string|null) {
		this.toggleAttribute("icon", Boolean(value));
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
			case "animation": this.#updateAnimation(newValue != null); break;
			case "caption": this.#updateCaption(newValue ?? ""); break;
			case "centered": this.#updateCentering(newValue != null); break;
			case "context": this.#updateContext(Object.values(Context).includes(newValue as Context) ? newValue as Context : Context.Info); break;
			case "icon": this.#updateIcon(newValue); break;
			case "scrollable": this.#updateScrolling(newValue != null); break;
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
	async alert(context: Context, caption: string, body: DocumentFragment|string): Promise<DialogResult> {
		return await this.show(context, caption, body, [
			{label: "OK", value: DialogResult.OK, variant: Variant.Primary}
		]);
	}

	/**
	 * Closes this message box.
	 * @param result The dialog box result.
	 */
	close(result: DialogResult = DialogResult.None): void {
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
	async confirm(context: Context, caption: string, body: DocumentFragment|string): Promise<DialogResult> {
		return await this.show(context, caption, body, [
			{label: "OK", value: DialogResult.OK, variant: Variant.Primary},
			{label: "Annuler", value: DialogResult.Cancel, variant: Variant.Secondary}
		]);
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		this.#modal = new Modal(this.firstElementChild!);
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		this.#modal.dispose();
	}

	/**
	 * Shows a message.
	 * @param context The contextual modifier.
	 * @param caption The title displayed in the header.
	 * @param body The child content displayed in the body.
	 * @param buttons The buttons displayed in the footer.
	 * @returns The dialog box result.
	 */
	show(context: Context, caption: string, body: DocumentFragment|string, buttons?: IDialogButton[]): Promise<DialogResult>;

	/**
	 * Shows a message.
	 * @param message The message to show.
	 * @returns The dialog box result.
	 */
	show(message: IMessage): Promise<DialogResult>;

	/**
	 * Shows a message.
	 * @param message The message to show, or the contextual modifier.
	 * @param caption The title displayed in the header.
	 * @param body The child content displayed in the body.
	 * @param buttons The buttons displayed in the footer.
	 * @returns The dialog box result.
	 */
	show(message: IMessage|Context, caption = "", body: DocumentFragment|string = "", buttons: IDialogButton[] = []): Promise<DialogResult> {
		if (typeof message == "string") {
			const footer = document.createDocumentFragment();
			footer.append(...buttons.map(button => this.#createButton(button)));
			message = {context: message, caption, body, footer};
		}

		this.body = typeof message.body == "string" ? createDocumentFragment(message.body) : message.body;
		this.caption = message.caption;
		this.context = message.context ?? Context.Info;
		this.icon = message.icon ?? getIcon(this.context);

		const footer = typeof message.footer == "string" ? createDocumentFragment(message.footer) : (message.footer ?? document.createDocumentFragment());
		for (const button of footer.querySelectorAll("button")) button.addEventListener("click", this.#close);
		this.footer = footer;

		const {promise, resolve} = Promise.withResolvers<DialogResult>();
		this.#resolve = resolve;
		this.#result = DialogResult.None;
		this.#modal.show();
		return promise;
	}

	/**
	 * Closes this message box.
	 * @param event The dispatched event.
	 */
	readonly #close: (event: Event) => void = event => {
		const button = (event.target as Element).closest("button")!;
		this.close(Object.values(DialogResult).includes(button.value as DialogResult) ? button.value as DialogResult : DialogResult.None)
	}

	/**
	 * Creates the component instance corresponding to the specified button.
	 * @param button An object describing the appearance of the button.
	 * @returns The component instance corresponding to the specified button.
	 */
	#createButton(button: IDialogButton): DialogButton {
		const element = document.createElement("dialog-button");
		const childContent = (this.#buttonTemplate.cloneNode(true) as DocumentFragment).querySelector("button")!;
		childContent.addEventListener("click", this.#close);
		element.appendChild(childContent);

		element.context = button.context ?? null;
		element.icon = button.icon ?? null;
		element.label = button.label ?? "";
		element.value = button.value ?? DialogResult.None;
		element.variant = button.variant ?? null;
		return element;
	}

	/**
	 * Updates the message box animation.
	 * @param value The new value.
	 */
	#updateAnimation(value: boolean): void {
		this.firstElementChild!.classList.toggle("fade", value);
	}

	/**
	 * Updates the title displayed in the header.
	 * @param value The new value.
	 */
	#updateCaption(value: string): void {
		this.querySelector(".modal-title")!.textContent = value.trim();
	}

	/**
	 * Updates the centering of this message box.
	 * @param value The new value.
	 */
	#updateCentering(value: boolean): void {
		this.querySelector(".modal-dialog")!.classList.toggle("modal-dialog-centered", value);
	}

	/**
	 * Updates the contextual modifier.
	 * @param value The new value.
	 */
	#updateContext(value: Context): void {
		const {classList} = this.querySelector(".modal-body > .icon")!;
		classList.remove(...Object.values(Context).map(context => `text-${toCss(context)}`));
		classList.add(`text-${toCss(value)}`);
	}

	/**
	 * Updates the icon displayed next to the body.
	 * @param value The new value.
	 */
	#updateIcon(value: string|null): void {
		this.querySelector(".modal-body > .icon")!.textContent = (value ?? "").trim() || getIcon(this.context);
	}

	/**
	 * Updates the body scrolling.
	 * @param value The new value.
	 */
	#updateScrolling(value: boolean): void {
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
		"message-box": MessageBox;
	}
}
