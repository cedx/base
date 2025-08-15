/**
 * Commonly used environment names.
 */
export const Environment = Object.freeze({

	/**
	 * Specifies the development environment.
	 */
	Development: "Development",

	/**
	 * Specifies the production environment.
	 */
	Production: "Production",

	/**
	 * Specifies the staging environment.
	 */
	Staging: "Staging"
});

/**
 * Commonly used environment names.
 */
export type Environment = typeof Environment[keyof typeof Environment];
