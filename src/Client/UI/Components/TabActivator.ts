import {Tab} from "bootstrap";
import {StorageArea} from "../StorageArea.js";

/**
 * A component that activates a tab, based on its index saved in the web storage.
 */
export class TabActivator extends HTMLElement {

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("tab-activator", this);
	}

	/**
	 * The one-based index of the active tab.
	 */
	get activeTabIndex(): number {
		const index = Number.parseInt(this.storage.getItem(this.storageKey) ?? "1");
		return Math.max(1, Math.min(this.tabs.length, Number.isNaN(index) ? 1 : index));
	}
	set activeTabIndex(value: number) {
		this.storage.setItem(this.storageKey, value.toString());
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
	get tabs(): NodeListOf<HTMLButtonElement> {
		return this.querySelectorAll(".nav-tabs button");
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		const {activeTabIndex, tabs} = this;
		for (let index = 1; index <= tabs.length; index++) {
			const tab = tabs.item(index - 1);
			tab.addEventListener("click", () => this.activeTabIndex = index);
			if (index == activeTabIndex) Tab.getOrCreateInstance(tab).show();
		}
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		console.log("disconnectedCallback");
		if (this.storageArea == StorageArea.Session) this.storage.removeItem(this.storageKey);
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
