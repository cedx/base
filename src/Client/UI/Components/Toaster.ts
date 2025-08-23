import {Context} from "../Context.js";
import {createDocumentFragment} from "../ElementExtensions.js";
import {Position, toCss} from "../Position.js";

/**
 * Represents a notification.
 */
export interface IToast {

	/**
	 * Value indicating whether to apply a fade transition.
	 */
	animation?: boolean;

	/**
	 * Value indicating whether to automatically hide the toast.
	 */
	autoHide?: boolean;

	/**
	 * The title displayed in the header.
	 */
	caption: string;

	/**
	 * The child content displayed in the body.
	 */
	childContent: DocumentFragment|string;

	/**
	 * The default contextual modifier.
	 */
	context?: Context;

	/**
	 * The culture used to format the relative time.
	 */
	culture?: Intl.Locale;

	/**
	 * The delay, in milliseconds, to hide the toast.
	 */
	delay?: number;

	/**
	 * The icon displayed next to the caption.
	 */
	icon?: string;
}

/**
 * Manages the notifications.
 */
export class Toaster extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["position"];

	/**
	 * The template for a toast.
	 */
	readonly #toastTemplate: DocumentFragment = this.querySelector("template")!.content;

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("toaster-container", this);
	}

	/**
	 * Value indicating whether to apply a fade transition.
	 */
	get animation(): boolean {
		return this.hasAttribute("animation");
	}
	set animation(value: boolean) {
		if (value) this.setAttribute("animation", "");
		else this.removeAttribute("animation");
	}

	/**
	 * Value indicating whether to automatically hide the toasts.
	 */
	get autoHide(): boolean {
		return this.hasAttribute("autohide");
	}
	set autoHide(value: boolean) {
		if (value) this.setAttribute("autohide", "");
		else this.removeAttribute("autohide");
	}

	/**
	 * The default contextual modifier.
	 */
	get context(): Context {
		const value = this.getAttribute("context") as Context;
		return Object.values(Context).includes(value) ? value : Context.Info;
	}
	set context(value: Context) {
		this.setAttribute("context", value);
	}

	/**
	 * The default culture used to format the relative times.
	 */
	get culture(): Intl.Locale {
		const value = this.getAttribute("culture") ?? "";
		return new Intl.Locale(value.trim() || navigator.language);
	}
	set culture(value: Intl.Locale) {
		this.setAttribute("culture", value.toString());
	}

	/**
	 * The default delay, in milliseconds, to hide the toasts.
	 */
	get delay(): number {
		const value = Number(this.getAttribute("delay"));
		return Math.max(1, Number.isNaN(value) ? 5_000 : value);
	}
	set delay(value: number) {
		this.setAttribute("delay", value.toString());
	}

	/**
	 * The default icon displayed next to the captions.
	 */
	get icon(): string {
		return (this.getAttribute("icon") ?? "").trim();
	}
	set icon(value: string) {
		this.setAttribute("icon", value);
	}

	/**
	 * The toaster placement.
	 */
	get position(): Position {
		const value = this.getAttribute("position") as Position;
		return Object.values(Position).includes(value) ? value : Position.BottomEnd;
	}
	set position(value: Position) {
		this.setAttribute("position", value);
	}

	/**
	 * Method invoked when an attribute has been changed.
	 * @param attribute The attribute name.
	 * @param oldValue The previous attribute value.
	 * @param newValue The new attribute value.
	 */
	attributeChangedCallback(attribute: string, oldValue: string|null, newValue: string|null): void {
		if (newValue != oldValue) switch (attribute) {
			case "position":
				this.#updatePosition(Object.values(Position).includes(newValue as Position) ? newValue as Position : Position.BottomEnd);
				break;
			// No default
		}
	}

	/**
	 * Shows a toast.
	 * @param context The contextual modifier.
	 * @param caption The title displayed in the toast header.
	 * @param childContent The child content displayed in the toast body.
	 */
	notify(context: Context, caption: string, childContent: DocumentFragment|string): void {
		this.show({context, caption, childContent});
	}

	/**
	 * Shows the specified toast.
	 * @param toast The toast to show.
	 */
	show(toast: IToast): void {
		const item = document.createElement("toaster-item");
		item.addEventListener("hidden.bs.toast", () => item.remove());
		item.appendChild((this.#toastTemplate.cloneNode(true) as DocumentFragment).querySelector(".toast")!);

		item.animation = toast.animation ?? this.animation;
		item.autoHide = toast.autoHide ?? this.autoHide;
		item.caption = toast.caption;
		item.childContent = typeof toast.childContent == "string" ? createDocumentFragment(toast.childContent) : toast.childContent;
		item.context = toast.context ?? this.context;
		item.culture = toast.culture ?? this.culture;
		item.delay = toast.delay ?? this.delay;
		item.icon = toast.icon ?? this.icon;

		this.firstElementChild!.appendChild(item);
		item.show();
	}

	/**
	 * Updates the toaster placement.
	 * @param value The new value.
	 */
	#updatePosition(value: Position): void {
		const {classList} = this.firstElementChild!;
		classList.remove(...Object.values(Position).flatMap(position => toCss(position).split(" ")));
		classList.add(...toCss(value).split(" "));
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
		"toaster-container": Toaster;
	}
}
