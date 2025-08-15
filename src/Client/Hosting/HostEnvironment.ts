import {Environment} from "./Environment.js";

/**
 * Provides information about the hosting environment an application is running in.
 */
export class HostEnvironment {

	/**
	 * The name of the application.
	 */
	readonly applicationName: string;

	/**
	 * The path to the directory that contains the application content files.
	 */
	readonly contentRootPath: string;

	/**
	 * The name of the environment.
	 */
	readonly environmentName: string;

	/**
	 * Creates a new host environment.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options: HostEnvironmentOptions = {}) {
		this.applicationName = options.applicationName ?? document.head.querySelector<HTMLMetaElement>('meta[name="application-name"]')?.content ?? location.hostname;
		this.contentRootPath = options.contentRootPath ?? document.head.querySelector("base")?.getAttribute("href") ?? "/";
		this.environmentName = options.environmentName ?? Environment.Production;
	}

	/**
	 * Checks if the current environment name is {@link Environment.Development}.
	 * @returns `true` if the environment name is {@link Environment.Development}, otherwise `false`.
	 */
	get isDevelopment(): boolean {
		return this.isEnvironment(Environment.Development);
	}

	/**
	 * Checks if the current environment name is {@link Environment.Production}.
	 * @returns `true` if the environment name is {@link Environment.Production}, otherwise `false`.
	 */
	get isProduction(): boolean {
		return this.isEnvironment(Environment.Production);
	}

	/**
	 * Checks if the current environment name is {@link Environment.Staging}.
	 * @returns `true` if the environment name is {@link Environment.Staging}, otherwise `false`.
	 */
	get isStaging(): boolean {
		return this.isEnvironment(Environment.Staging);
	}

	/**
	 * Compares the current host environment name against the specified value.
	 * @param environmentName The environment name to validate against.
	 * @returns `true` if the specified name is the same as the current environment, otherwise `false`.
	 */
	isEnvironment(environmentName: string): boolean {
		return this.environmentName == environmentName;
	}
}

/**
 * Defines the options of a {@link HostEnvironment} instance.
 */
export type HostEnvironmentOptions = Partial<{

	/**
	 * The name of the application.
	 */
	applicationName: string;

	/**
	 * The path to the directory that contains the application content files.
	 */
	contentRootPath: string;

	/**
	 * The name of the environment.
	 */
	environmentName: string;
}>;
