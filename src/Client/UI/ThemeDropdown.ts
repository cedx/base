import {MenuAlignment} from "#Html/MenuAlignment.js";
import {themeIcon, themeLabel, ThemeMode} from "#Html/ThemeMode.js";
import {html, LitElement, type TemplateResult} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import {classMap} from "lit/directives/class-map.js";
import {when} from "lit/directives/when.js";

/**
 * A dropdown menu for switching the color mode.
 */
@customElement("theme-dropdown")
export class ThemeDropdown extends LitElement {

	/**
	 * The alignment of the dropdown menu.
	 */
	@property() alignment: MenuAlignment = MenuAlignment.End;

	/**
	 * The label of the dropdown menu.
	 */
	@property() label = "";

	/**
	 * The key of the storage entry providing the saved theme.
	 */
	@property() storageKey = "ThemeMode";

	/**
	 * The current theme.
	 */
	@state() private themeMode: ThemeMode;

	/**
	 * The media query used to check the system theme.
	 */
	readonly #mediaQuery = matchMedia("(prefers-color-scheme: dark)");

	/**
	 * Creates a new theme dropdown.
	 */
	constructor() {
		super();
		const theme = localStorage.getItem(this.storageKey) as ThemeMode;
		this.themeMode = Object.values(ThemeMode).includes(theme) ? theme : ThemeMode.System;
	}

	/**
	 * The current theme mode.
	 */
	get theme(): ThemeMode { return this.themeMode; }
	set theme(value: ThemeMode) {
		localStorage.setItem(this.storageKey, this.themeMode = value);
		this.#applyTheme();
	}

	/**
	 * Method invoked when this component is connected.
	 */
	override connectedCallback(): void {
		super.connectedCallback();
		this.#applyTheme();
		this.#mediaQuery.addEventListener("change", this);
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	override disconnectedCallback(): void {
		this.#mediaQuery.removeEventListener("change", this);
		super.disconnectedCallback();
	}

	/**
	 * Handles the events.
	 */
	handleEvent(): void {
		this.#applyTheme();
	}

	/**
	 * Returns the node into which this component should render.
	 * @returns The node into which this component should render.
	 */
	protected override createRenderRoot(): DocumentFragment|HTMLElement {
		return this;
	}

	/**
	 * Renders this component.
	 * @returns The view template.
	 */
	protected override render(): TemplateResult {
		return html`
			<li class="nav-item dropdown">
				<a class="dropdown-toggle nav-link" data-bs-toggle="dropdown" href="#">
					<i class="icon icon-fill">${themeIcon(this.themeMode)}</i>
					${when(this.label, () => html`<span class="ms-1">${this.label}</span>`)}
				</a>
				<ul class="dropdown-menu ${classMap({"dropdown-menu-end": this.alignment == MenuAlignment.End})}">
					${Object.values(ThemeMode).map(value => html`
						<li>
							<button class="dropdown-item d-flex align-items-center justify-content-between" @click=${() => this.theme = value}>
								<span><i class="icon icon-fill me-1">${themeIcon(value)}</i> ${themeLabel(value)}</span>
								${when(value == this.themeMode, () => html`<i class="icon ms-2">check</i>`)}
							</button>
						</li>
					`)}
				</ul>
			</li>
		`;
	}

	/**
	 * Applies the theme to the document.
	 */
	#applyTheme(): void {
		const theme = this.themeMode == ThemeMode.System ? (this.#mediaQuery.matches ? ThemeMode.Dark : ThemeMode.Light) : this.themeMode;
		document.documentElement.dataset.bsTheme = theme.toLowerCase();
	}
}
