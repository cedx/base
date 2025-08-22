import {Duration} from "@cedx/base/Duration.js";
import {Context, getIcon, toCss} from "@cedx/base/UI/Context.js";
import {Toast as BootstrapToast} from "bootstrap";

/**
 * Represents a notification message.
 */
export class Toast extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["caption", "context", "culture", "icon"];

	/**
	 * The time units.
	 */
	static readonly #timeUnits: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour"];

	/**
	 * The formatter used to format the relative time.
	 */
	#formatter!: Intl.RelativeTimeFormat;

	/**
	 * The toast header.
	 */
	readonly #header = this.querySelector(".toast-header")!;

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
	 * Value indicating whether to automatically hide the toast.
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
	 * The delay, in milliseconds, to hide the toast.
	 */
	get delay(): number {
		const value = Number(this.getAttribute("delay"));
		return Math.max(1, Number.isNaN(value) ? 5_000 : value);
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
		return value.trim() || getIcon(Context.Info);
	}
	set icon(value: string) {
		this.setAttribute("icon", value);
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
			case "context": this.#updateContext(Object.values(Context).includes(newValue as Context) ? newValue as Context : Context.Info); break;
			case "culture": this.#formatter = new Intl.RelativeTimeFormat((newValue ?? "").trim() || navigator.language, {style: "long"}); break;
			case "icon": this.#updateIcon(newValue ?? ""); break;
			// No default
		}
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		const toast = this.querySelector(".toast")!;
		toast.addEventListener("hidden.bs.toast", () => clearInterval(this.#timer));
		toast.addEventListener("show.bs.toast", () => this.#timer = window.setInterval(this.#updateElapsedTime, Duration.Second));

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
	 * Updates the title displayed in the header.
	 * @param value The new value.
	 */
	#updateCaption(value: string): void {
		this.#header.querySelector("b")!.textContent = value.trim();
	}

	/**
	 * Updates the title displayed in the header.
	 * @param value The new value.
	 */
	#updateContext(value: Context): void {
		const contexts = Object.values(Context);

		let {classList} = this.#header;
		classList.remove(...contexts.map(context => `toast-header-${toCss(context)}`));
		classList.add(`toast-header-${value}`);

		({classList} = this.#header.querySelector(".icon")!);
		classList.remove(...contexts.map(context => `text-${toCss(context)}`));
		classList.add(`text-${value}`);
	}

	/**
	 * Updates the label corresponding to the elapsed time.
	 */
	readonly #updateElapsedTime: () => void = () => {
		const {elapsedTime} = this;
		this.#header.querySelector("small")!.textContent = elapsedTime > 0 ? this.#formatTime(elapsedTime / Duration.Second) : "";
	};

	/**
	 * Updates the icon displayed next to the caption.
	 * @param value The new value.
	 */
	#updateIcon(value: string): void {
		this.#header.querySelector(".icon")!.textContent = value.trim() || getIcon(Context.Info);
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
