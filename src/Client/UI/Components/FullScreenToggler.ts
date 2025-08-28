/**
 * A component for toggling an element to full-screen.
 */
export class FullScreenToggler extends HTMLElement {

	/**
	 * The associated element.
	 */
	#element: Element = document.body;

	/**
	 * The handle to the underlying platform wake lock.
	 */
	#sentinel: WakeLockSentinel|null = null;

	/**
	 * Creates a new full-screen toggler.
	 */
	constructor() {
		super();
		this.addEventListener("click", this.toggleFullScreen.bind(this)); // eslint-disable-line @typescript-eslint/no-misused-promises
	}

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("fullscreen-toggler", this);
	}

	/**
	 * The CSS selector used to target the element.
	 */
	get target(): string {
		const value = this.getAttribute("target") ?? "";
		return value.trim() || "body";
	}
	set target(value: string) {
		this.setAttribute("target", value);
	}

	/**
	 * Value indicating whether to prevent the device screen from dimming or locking when in full-screen mode.
	 */
	get wakeLock(): boolean {
		return this.hasAttribute("wakeLock");
	}
	set wakeLock(value: boolean) {
		this.toggleAttribute("target", value);
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		document.addEventListener("visibilitychange", this.#onVisibilityChanged);
		this.#element = document.querySelector(this.target) ?? document.body;
		this.#element.addEventListener("fullscreenchange", this.#onFullScreenChanged);
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		document.removeEventListener("visibilitychange", this.#onVisibilityChanged);
		this.#element.removeEventListener("fullscreenchange", this.#onFullScreenChanged);
	}

	/**
	 * Toggles the full-screen mode of the associated element.
	 * @param event The dispatched event.
	 * @returns Resolves when the full-screen mode has been toggled.
	 */
	async toggleFullScreen(event?: Event): Promise<void> {
		event?.preventDefault();
		if (document.fullscreenElement) await document.exitFullscreen();
		else await this.#element.requestFullscreen();
	}

	/**
	 * Acquires a new wake lock.
	 * @returns Resolves when the wake lock has been acquired.
	 */
	async #acquireWakeLock(): Promise<void> {
		if (this.#sentinel && !this.#sentinel.released) return;
		if (this.wakeLock) this.#sentinel = await navigator.wakeLock.request();
	}

	/**
	 * Acquires or releases the wake lock when the document enters or exits the full-screen mode.
	 * @param event The dispatched event.
	 */
	readonly #onFullScreenChanged: (event: Event) => void = () => {
		if (document.fullscreenElement) void this.#acquireWakeLock();
		else void this.#releaseWakeLock();
	};

	/**
	 * Eventually acquires a new wake lock when the document visibility has changed.
	 * @param event The dispatched event.
	 */
	readonly #onVisibilityChanged: (event: Event) => void = () => {
		if (document.fullscreenElement && !document.hidden) void this.#acquireWakeLock();
	};

	/**
	 * Releases the acquired wake lock.
	 * @returns Resolves when the wake lock has been released.
	 */
	async #releaseWakeLock(): Promise<void> {
		if (!this.#sentinel || this.#sentinel.released) return;
		await this.#sentinel.release();
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
		"fullscreen-toggler": FullScreenToggler;
	}
}
