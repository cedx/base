/**
 * Provides HTTP methods.
 */
export const HttpMethods = Object.freeze({

	/**
	 * The `CONNECT` HTTP method.
	 */
	Connect: "CONNECT",

	/**
	 * The `DELETE` HTTP method.
	 */
	Delete: "DELETE",

	/**
	 * The `GET` HTTP method.
	 */
	Get: "GET",

	/**
	 * The `HEAD` HTTP method.
	 */
	Head: "HEAD",

	/**
	 * The `OPTIONS` HTTP method.
	 */
	Options: "OPTIONS",

	/**
	 * The `PATCH` HTTP method.
	 */
	Patch: "PATCH",

	/**
	 * The `POST` HTTP method.
	 */
	Post: "POST",

	/**
	 * The `PUT` HTTP method.
	 */
	Put: "PUT",

	/**
	 * The `TRACE` HTTP method.
	 */
	Trace: "TRACE"
});

/**
 * Provides HTTP methods.
 */
export type HttpMethods = typeof HttpMethods[keyof typeof HttpMethods];
