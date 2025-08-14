import {StatusCode} from "./StatusCode.js";

/**
 * An error thrown by the HTTP client.
 */
export class HttpRequestError extends globalThis.Error {

	/**
	 * The validation errors.
	 */
	#validationErrors: Map<string, string>|null = null;

	/**
	 * Creates a new HTTP error.
	 * @param response The HTTP response.
	 */
	constructor(response: Response) {
		super(`${response.status} ${response.statusText}`, {cause: response});
		this.name = "HttpRequestError";
	}

	/**
	 * The HTTP response.
	 */
	override get cause(): Response {
		return super.cause as Response;
	}

	/**
	 * Value indicating whether the response's status code is between 400 and 499.
	 */
	get isClientError(): boolean {
		const {statusCode} = this;
		return statusCode >= 400 && statusCode < 500;
	}

	/**
	 * Value indicating whether the response's status code is between 500 and 599.
	 */
	get isServerError(): boolean {
		const {statusCode} = this;
		return statusCode >= 500 && statusCode < 600;
	}

	/**
	 * The HTTP status code.
	 */
	get statusCode(): StatusCode {
		return this.cause.status as StatusCode;
	}

	/**
	 * The validation errors.
	 */
	get validationErrors(): Promise<Map<string, string>> {
		return this.#validationErrors
			? Promise.resolve(this.#validationErrors)
			: this.#parseValidationErrors().then(errors => this.#validationErrors = errors);
	}

	/**
	 * Parses the validation errors returned in the body of the specified response.
	 * @returns The validation errors provided by the response body.
	 */
	async #parseValidationErrors(): Promise<Map<string, string>> {
		try {
			const statuses: StatusCode[] = [StatusCode.BadRequest, StatusCode.UnprocessableContent];
			const ignoreBody = this.cause.bodyUsed || !statuses.includes(this.statusCode);
			return new Map(ignoreBody ? [] : Object.entries(await this.cause.json() as Record<string, string>));
		}
		catch {
			return new Map;
		}
	}
}
