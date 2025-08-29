import {KeyboardModifiers} from "../KeyboardModifiers.js";

/**
 * Represents a shortcut key associated with an element.
 */
export class KeyboardAccelerator extends HTMLElement {

	/**
	 * The mapping between the modifier names and their values.
	 */
	static readonly #modifiers = new Map(Object.entries(KeyboardModifiers).filter(([key]) => key != "None"));

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("keyboard-accelerator", this);
	}

	/**
	 * Identifies the key for the keyboard accelerator.
	 */
	get key(): string {
		return (this.getAttribute("key") ?? "").trim();
	}
	set key(value: string) {
		this.setAttribute("key", value);
	}

	/**
	 * Identifies the modifiers for the keyboard accelerator.
	 */
	get modifiers(): number {
		return (this.getAttribute("modifiers") ?? "").split(",")
			.map(value => value.trim())
			.reduce<number>((modifiers, value) => modifiers | (KeyboardAccelerator.#modifiers.get(value) ?? 0), KeyboardModifiers.None);
	}
	set modifiers(value: number) {
		this.setAttribute("modifiers", !value ? "None" : KeyboardAccelerator.#modifiers.entries()
			.filter(([, flag]) => (value & flag) != 0)
			.map(([key]) => key)
			.toArray().join(", "));
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		addEventListener("keyup", this.#activateChildContent, {capture: true});
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		removeEventListener("keyup", this.#activateChildContent, {capture: true});
	}

	/**
	 * Activates the child content when the specified keyboard event designates the same key and modifiers as this keyboard accelerator.
	 * @param event The dispatched event.
	 */
	readonly #activateChildContent: (event: KeyboardEvent) => void = event => {
		if (event.key != this.key) return;

		const {activeElement} = document;
		if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) return;

		const {modifiers} = this;
		if (!(modifiers & KeyboardModifiers.Ctrl) && event.ctrlKey) return;
		if (!(modifiers & KeyboardModifiers.Shift) && event.shiftKey) return;
		if (!(modifiers & KeyboardModifiers.Alt) && event.altKey) return;
		if (!(modifiers & KeyboardModifiers.Meta) && event.metaKey) return;

		event.stopPropagation();
		(this.firstElementChild as HTMLElement|null)?.click();
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
		"keyboard-accelerator": KeyboardAccelerator;
	}
}
