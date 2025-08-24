import {Context, toCss as contextCss} from "../Context.js";
import {DialogResult} from "../DialogResult.js";
import {Variant, toCss as variantCss} from "../Variant.js";

/**
 * Represents a dialog box button.
 */
export class DialogButton extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["context", "icon", "label", "value", "variant"];

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("dialog-button", this);
	}

	/**
	 * A contextual modifier.
	 */
	get context(): Context|null {
		const value = this.getAttribute("context") as Context;
		return Object.values(Context).includes(value) ? value : null;
	}
	set context(value: Context|null) {
		if (value) this.setAttribute("context", value);
		else this.removeAttribute("context");
	}

	/**
	 * The button icon.
	 */
	get icon(): string|null {
		const value = this.getAttribute("icon") ?? "";
		return value.trim() || null;
	}
	set icon(value: string|null) {
		if (value) this.setAttribute("icon", value);
		else this.removeAttribute("icon");
	}

	/**
	 * The button label.
	 */
	get label(): string {
		return (this.getAttribute("label") ?? "").trim();
	}
	set label(value: string) {
		this.setAttribute("label", value);
	}

	/**
	 * The button value.
	 */
	get value(): DialogResult {
		const value = this.getAttribute("value") as DialogResult;
		return Object.values(DialogResult).includes(value) ? value : DialogResult.None;
	}
	set value(value: DialogResult) {
		this.setAttribute("value", value);
	}

	/**
	 * A tone variant.
	 */
	get variant(): Variant|null {
		const value = this.getAttribute("variant") as Variant;
		return Object.values(Variant).includes(value) ? value : null;
	}
	set variant(value: Variant|null) {
		if (value) this.setAttribute("variant", value);
		else this.removeAttribute("variant");
	}

	/**
	 * Method invoked when an attribute has been changed.
	 * @param attribute The attribute name.
	 * @param oldValue The previous attribute value.
	 * @param newValue The new attribute value.
	 */
	attributeChangedCallback(attribute: string, oldValue: string|null, newValue: string|null): void {
		if (newValue != oldValue) switch (attribute) {
			case "context": this.#updateContext(Object.values(Context).includes(newValue as Context) ? newValue as Context : null); break;
			case "icon": this.#updateIcon(newValue); break;
			case "label": this.#updateLabel(newValue ?? ""); break;
			case "value": this.#updateValue(Object.values(DialogResult).includes(newValue as DialogResult) ? newValue as DialogResult : DialogResult.None); break;
			case "variant": this.#updateVariant(Object.values(Variant).includes(newValue as Variant) ? newValue as Variant : null); break;
			// No default
		}
	}

	/**
	 * Updates the contextual modifier.
	 * @param value The new value.
	 */
	#updateContext(value: Context|null): void {
		const {classList} = this.querySelector("button")!;
		classList.remove(...Object.values(Context).map(context => `btn-${contextCss(context)}`));
		if (value) classList.add(`btn-${contextCss(value)}`);
	}

	/**
	 * Updates the button icon.
	 * @param value The new value.
	 */
	#updateIcon(value: string|null): void {
		const element = this.querySelector<HTMLElement>(".icon")!;
		const icon = (value ?? "").trim();
		element.textContent = icon;
		element.hidden = !icon;
	}

	/**
	 * Updates the button label.
	 * @param value The new value.
	 */
	#updateLabel(value: string): void {
		const element = this.querySelector("span")!;
		const label = value.trim();
		element.textContent = label;
		element.hidden = !label;
		this.querySelector(".icon")!.classList.toggle("me-1", !element.hidden);
	}

	/**
	 * Updates the button value.
	 * @param value The new value.
	 */
	#updateValue(value: DialogResult): void {
		this.querySelector("button")!.value = value;
	}

	/**
	 * Updates the tone variant.
	 * @param value The new value.
	 */
	#updateVariant(value: Variant|null): void {
		const {classList} = this.querySelector("button")!;
		classList.remove(...Object.values(Variant).map(variant => `btn-${variantCss(variant)}`));
		if (value) classList.add(`btn-${variantCss(value)}`);
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
		"dialog-button": DialogButton;
	}
}
