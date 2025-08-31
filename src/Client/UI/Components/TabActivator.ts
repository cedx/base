import {Tab} from "bootstrap";
import {StorageArea} from "../StorageArea.js";

/**
 * A component that activates a tab, based on its index saved in the web storage.
 */
export class TabActivator extends HTMLElement {

	/**
	 * Creates a new tab activator.
	 */
	constructor() {
		super();
		const {tabs} = this;
		for (let index = 0; index < tabs.length; index++)
			tabs.item(index).addEventListener("show.bs.tab", () => this.activeTabIndex = index);
	}

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("tab-activator", this);
	}

	/**
	 * The index of the active tab.
	 */
	get activeTabIndex(): number {
		const index = Number(this.storage.getItem(this.storageKey) ?? "1");
		return Math.max(0, Math.min(this.tabs.length - 1, Number.isNaN(index) ? 0 : index - 1));
	}
	set activeTabIndex(value: number) {
		this.storage.setItem(this.storageKey, (value + 1).toString());
	}

	/**
	 * The storage object corresponding to the current {@link storageArea}.
	 */
	get storage(): globalThis.Storage {
		return this.storageArea == StorageArea.Local ? localStorage : sessionStorage;
	}

	/**
	 * The storage area to use.
	 */
	get storageArea(): StorageArea {
		const value = this.getAttribute("storagearea") as StorageArea;
		return Object.values(StorageArea).includes(value) ? value : StorageArea.Session;
	}
	set storageArea(value: StorageArea) {
		this.setAttribute("storagearea", value);
	}

	/**
	 * The key of the storage entry providing the active tab index.
	 */
	get storageKey(): string {
		const value = this.getAttribute("storagekey") ?? "";
		return value.trim() || "ActiveTabIndex";
	}
	set storageKey(value: string) {
		this.setAttribute("storagekey", value);
	}

	/**
	 * The tab list.
	 */
	get tabs(): NodeListOf<HTMLElement> {
		return this.querySelectorAll('[data-bs-toggle="tab"]');
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		Tab.getOrCreateInstance(this.tabs.item(this.activeTabIndex)).show();
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
		"tab-activator": TabActivator;
	}
}
