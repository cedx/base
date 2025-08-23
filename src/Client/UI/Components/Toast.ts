import {Toast as BootstrapToast} from "bootstrap";
import {Context, getIcon, toCss} from "../Context.js";

/**
 * Represents a notification.
 */
export class Toast extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["animation", "caption", "context", "culture", "icon", "open"];

	/**
	 * The time units.
	 */
	static readonly #timeUnits: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour"];

	/**
	 * The formatter used to format the relative time.
	 */
	#formatter!: Intl.RelativeTimeFormat;

	/**
	 * The time at which this component was initially shown.
	 */
	#initialTime = Date.now();

	/**
	 * The timer identifier.
	 */
	#timer = 0;

	/**
	 * The underlying Bootstrap toast.
	 */
	#toast!: BootstrapToast;

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("toaster-item", this);
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
	 * Value indicating whether to automatically hide this toast.
	 */
	get autoHide(): boolean {
		return this.hasAttribute("autohide");
	}
	set autoHide(value: boolean) {
		if (value) this.setAttribute("autohide", "");
		else this.removeAttribute("autohide");
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
	 * The child content displayed in the body.
	 */
	set childContent(value: DocumentFragment) { // eslint-disable-line accessor-pairs
		this.querySelector(".toast-body")!.replaceChildren(...value.childNodes);
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
	 * The culture used to format the relative time.
	 */
	get culture(): Intl.Locale {
		const value = this.getAttribute("culture") ?? "";
		return new Intl.Locale(value.trim() || navigator.language);
	}
	set culture(value: Intl.Locale) {
		this.setAttribute("culture", value.toString());
	}

	/**
	 * The delay, in milliseconds, to hide this toast.
	 */
	get delay(): number {
		const value = Number(this.getAttribute("delay"));
		return Math.max(0, Number.isNaN(value) ? 5_000 : value);
	}
	set delay(value: number) {
		this.setAttribute("delay", value.toString());
	}

	/**
	 * The time elapsed since this component was initially shown, in milliseconds.
	 */
	get elapsedTime(): number {
		return Date.now() - this.#initialTime;
	}

	/**
	 * The icon displayed next to the caption.
	 */
	get icon(): string {
		const value = this.getAttribute("icon") ?? "";
		return value.trim() || getIcon(this.context);
	}
	set icon(value: string) {
		this.setAttribute("icon", value);
	}

	/**
	 * Value indicating whether to initially show this toast.
	 */
	get open(): boolean {
		return this.hasAttribute("open");
	}
	set open(value: boolean) {
		if (value) this.setAttribute("open", "");
		else this.removeAttribute("open");
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
			case "context": this.#updateContext(Object.values(Context).includes(newValue as Context) ? newValue as Context : Context.Info); break;
			case "culture": this.#formatter = new Intl.RelativeTimeFormat((newValue ?? "").trim() || navigator.language, {style: "long"}); break;
			case "icon": this.#updateIcon(newValue ?? ""); break;
			case "open": this.#updateVisibility(newValue != null); break;
			// No default
		}
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		const toast = this.querySelector(".toast")!;
		toast.addEventListener("hidden.bs.toast", () => clearInterval(this.#timer));
		toast.addEventListener("show.bs.toast", () => this.#timer = window.setInterval(this.#updateElapsedTime, 1_000));

		const {animation, autoHide: autohide, delay} = this;
		this.#toast = new BootstrapToast(toast, {animation, autohide, delay});
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		clearInterval(this.#timer);
		this.#toast.dispose();
	}

	/**
	 * Hides this toast.
	 */
	hide(): void {
		this.#toast.hide();
	}

	/**
	 * Shows this toast.
	 */
	show(): void {
		if (!this.#toast.isShown()) {
			this.#initialTime = Date.now();
			this.#updateElapsedTime();
		}

		this.#toast.show();
	}

	/**
	 * Formats the specified elapsed time.
	 * @param elapsed The elapsed time, in seconds.
	 * @returns The formated time.
	 */
	#formatTime(elapsed: number): string {
		let index = 0;
		while (elapsed > 60 && index < Toast.#timeUnits.length) {
			elapsed /= 60;
			index++;
		}

		return this.#formatter.format(Math.ceil(-elapsed), Toast.#timeUnits[index]);
	}

	/**
	 * Updates the toast animation.
	 * @param value The new value.
	 */
	#updateAnimation(value: boolean): void {
		const {classList} = this.firstElementChild!;
		if (value) classList.add("fade");
		else classList.remove("fade");
	}

	/**
	 * Updates the title displayed in the header.
	 * @param value The new value.
	 */
	#updateCaption(value: string): void {
		this.querySelector(".toast-header b")!.textContent = value.trim();
	}

	/**
	 * Updates the title displayed in the header.
	 * @param value The new value.
	 */
	#updateContext(value: Context): void {
		const contexts = Object.values(Context);

		let {classList} = this.querySelector(".toast-header")!;
		classList.remove(...contexts.map(context => `toast-header-${toCss(context)}`));
		classList.add(`toast-header-${toCss(value)}`);

		({classList} = this.querySelector(".toast-header .icon")!);
		classList.remove(...contexts.map(context => `text-${toCss(context)}`));
		classList.add(`text-${toCss(value)}`);
	}

	/**
	 * Updates the label corresponding to the elapsed time.
	 */
	readonly #updateElapsedTime: () => void = () => {
		const {elapsedTime} = this;
		this.querySelector(".toast-header small")!.textContent = elapsedTime > 0 ? this.#formatTime(elapsedTime / 1_000) : "";
	};

	/**
	 * Updates the icon displayed next to the caption.
	 * @param value The new value.
	 */
	#updateIcon(value: string): void {
		this.querySelector(".toast-header .icon")!.textContent = value.trim() || getIcon(this.context);
	}

	/**
	 * Updates the toast visibility.
	 * @param value The new value.
	 */
	#updateVisibility(value: boolean): void {
		const {classList} = this.firstElementChild!;
		if (value) classList.add("show");
		else classList.remove("show");
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
		"toaster-item": Toast;
	}
}
