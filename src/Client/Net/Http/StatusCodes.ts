/**
 * Provides common HTTP status codes.
 */
export const StatusCodes = Object.freeze({

	/**
	 * The `OK` status code.
	 */
	OK: 200,

	/**
	 * The `Created` status code.
	 */
	Created: 201,

	/**
	 * The `No Content` status code.
	 */
	NoContent: 204,

	/**
	 * The `Moved Permanently` status code.
	 */
	MovedPermanently: 301,

	/**
	 * The `Found` status code.
	 */
	Found: 302,

	/**
	 * The `Not Modified` status code.
	 */
	NotModified: 304,

	/**
	 * The `Temporary Redirect` status code.
	 */
	TemporaryRedirect: 307,

	/**
	 * The `Permanent Redirect` status code.
	 */
	PermanentRedirect: 308,

	/**
	 * The `Bad Request` status code.
	 */
	BadRequest: 400,

	/**
	 * The `Unauthorized` status code.
	 */
	Unauthorized: 401,

	/**
	 * The `Payment Required` status code.
	 */
	PaymentRequired: 402,

	/**
	 * The `Forbidden` status code.
	 */
	Forbidden: 403,

	/**
	 * The `Not Found` status code.
	 */
	NotFound: 404,

	/**
	 * The `Method Not Allowed` status code.
	 */
	MethodNotAllowed: 405,

	/**
	 * The `Not Acceptable` status code.
	 */
	NotAcceptable: 406,

	/**
	 * The `Request Timeout` status code.
	 */
	RequestTimeout: 408,

	/**
	 * The `Conflict` status code.
	 */
	Conflict: 409,

	/**
	 * The `Payload Too Large` status code.
	 */
	PayloadTooLarge: 413,

	/**
	 * The `Unsupported Media Type` status code.
	 */
	UnsupportedMediaType: 415,

	/**
	 * The `Authentication Timeout` status code.
	 */
	AuthenticationTimeout: 419,

	/**
	 * The `Unprocessable Content` status code.
	 */
	UnprocessableContent: 422,

	/**
	 * The `Too Many Requests` status code.
	 */
	TooManyRequests: 429,

	/**
	 * The `Internal Server Error` status code.
	 */
	InternalServerError: 500,

	/**
	 * The `Not Implemented` status code.
	 */
	NotImplemented: 501,

	/**
	 * The `Bad Gateway` status code.
	 */
	BadGateway: 502,

	/**
	 * The `Service Unavailable` status code.
	 */
	ServiceUnavailable: 503,

	/**
	 * The `Gateway Timeout` status code.
	 */
	GatewayTimeout: 504,

	/**
	 * The `Bandwidth Limit Exceeded` status
	 */
	BandwidthLimitExceeded: 509
});

/**
 * Provides common HTTP status codes.
 */
export type StatusCodes = typeof StatusCodes[keyof typeof StatusCodes];
