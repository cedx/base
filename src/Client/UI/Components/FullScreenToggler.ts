/**
 * A component for toggling an element to full-screen.
 */
export class FullScreenToggler extends HTMLElement {

	/**
	 * The abort controller used to remove the event listeners.
	 */
	#abortController: AbortController|null = null;

	/**
	 * The target element.
	 */
	#element: Element = document.body;

	/**
	 * The handle to the underlying platform wake lock.
	 */
	#sentinel: WakeLockSentinel|null = null;

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("fullscreen-toggler", this);
	}

	/**
	 * The CSS selector specifying the target element.
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
		this.toggleAttribute("wakeLock", value);
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		this.#abortController = new AbortController;
		document.addEventListener("visibilitychange", this.#onVisibilityChanged, {signal: this.#abortController.signal});
		this.#element = document.querySelector(this.target) ?? document.body;
		this.#element.addEventListener("fullscreenchange", this.#onFullScreenChanged, {signal: this.#abortController.signal});
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		this.#abortController?.abort();
	}

	/**
	 * Toggles the full-screen mode of the associated element.
	 * @param event The dispatched event.
	 * @returns Completes when the full-screen mode has been toggled.
	 */
	async toggleFullScreen(event?: Event): Promise<void> {
		event?.preventDefault();
		if (document.fullscreenElement) await document.exitFullscreen();
		else await this.#element.requestFullscreen();
	}

	/**
	 * Acquires a new wake lock.
	 * @returns Completes when the wake lock has been acquired.
	 */
	async #acquireWakeLock(): Promise<void> {
		if (this.wakeLock && (!this.#sentinel || this.#sentinel.released)) this.#sentinel = await navigator.wakeLock.request();
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
	 * @returns Completes when the wake lock has been released.
	 */
	async #releaseWakeLock(): Promise<void> {
		if (this.#sentinel && !this.#sentinel.released) await this.#sentinel.release();
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
