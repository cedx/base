/**
 * Specifies the lifetime of a service.
 */
export const ServiceLifetime = Object.freeze({

	/**
	 * Specifies that a single instance of the service will be created.
	 */
	Singleton: 0,

	/**
	 * Specifies that a new instance of the service will be created every time it is requested.
	 */
	Transient: 1
});

/**
 * Specifies the lifetime of a service.
 */
export type ServiceLifetime = typeof ServiceLifetime[keyof typeof ServiceLifetime];
