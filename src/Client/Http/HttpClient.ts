import {HttpError} from "./HttpError.js";

/**
 * Performs HTTP requests.
 */
export class HttpClient {

	/**
	 * The base URL of the remote service.
	 */
	readonly baseUrl: URL;

	/**
	 * The function returning the component used as loading indicator.
	 */
	readonly #loadingIndicator: () => ILoadingIndicator|null;

	/**
	 * Creates a new HTTP client.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options: HttpClientOptions = {}) {
		const url = options.baseUrl ? (options.baseUrl instanceof URL ? options.baseUrl.href : options.baseUrl) : document.baseURI;
		this.baseUrl = new URL(url.endsWith("/") ? url : `${url}/`);
		this.#loadingIndicator = options.loadingIndicator ?? (() => document.body.querySelector("loading-indicator") as ILoadingIndicator|null);
	}

	/**
	 * Performs a DELETE request.
	 * @param url The URL of the resource to fetch.
	 * @param options The request options.
	 * @returns The server response.
	 */
	delete(url?: string|URL, options?: RequestInit): Promise<Response> {
		return this.#fetch("DELETE", url, null, options);
	}

	/**
	 * Performs a GET request.
	 * @param url The URL of the resource to fetch.
	 * @param options The request options.
	 * @returns The server response.
	 */
	get(url?: string|URL, options?: RequestInit): Promise<Response> {
		return this.#fetch("GET", url, null, options);
	}

	/**
	 * Performs a PATCH request.
	 * @param url The URL of the resource to fetch.
	 * @param body The request body.
	 * @param options The request options.
	 * @returns The server response.
	 */
	patch(url?: string|URL, body?: unknown, options?: RequestInit): Promise<Response> {
		return this.#fetch("PATCH", url, body, options);
	}

	/**
	 * Performs a POST request.
	 * @param url The URL of the resource to fetch.
	 * @param body The request body.
	 * @param options The request options.
	 * @returns The server response.
	 */
	post(url?: string|URL, body?: unknown, options?: RequestInit): Promise<Response> {
		return this.#fetch("POST", url, body, options);
	}

	/**
	 * Performs a PUT request.
	 * @param url The URL of the resource to fetch.
	 * @param body The request body.
	 * @param options The request options.
	 * @returns The server response.
	 */
	put(url?: string|URL, body?: unknown, options?: RequestInit): Promise<Response> {
		return this.#fetch("PUT", url, body, options);
	}

	/**
	 * Performs a custom HTTP request.
	 * @param method The HTTP method.
	 * @param url The URL of the resource to fetch.
	 * @param body The request body.
	 * @param options The request options.
	 * @returns The server response.
	 */
	async #fetch(method: string, url: string|URL = "", body: unknown = null, options: RequestInit = {}): Promise<Response> {
		const headers = new Headers(options.headers);
		if (!headers.has("accept")) headers.set("accept", "application/json");

		if (body && !(body instanceof Blob || body instanceof FormData || body instanceof URLSearchParams)) {
			if (typeof body != "string") body = JSON.stringify(body);
			if (!headers.has("content-type")) headers.set("content-type", "application/json");
		}

		const loadingIndicator = this.#loadingIndicator();
		try {
			loadingIndicator?.start();
			const request = new Request(new URL(url, this.baseUrl), {...options, method, headers, body} as RequestInit);
			const response = await fetch(request);
			if (!response.ok) throw new HttpError(response);
			return response;
		}
		finally {
			loadingIndicator?.stop();
		}
	}
}

/**
 * Defines the options of a {@link HttpClient} instance.
 */
export type HttpClientOptions = Partial<{

	/**
	 * The base URL of the remote service.
	 */
	baseUrl: string|URL;

	/**
	 * The function returning the component used as loading indicator.
	 */
	loadingIndicator: () => ILoadingIndicator|null;
}>;

/**
 * A component that shows up when an HTTP request starts, and hides when all concurrent HTTP requests are completed.
 */
export interface ILoadingIndicator {

	/**
	 * Starts the loading indicator.
	 */
	start: () => void;

	/**
	 * Stops the loading indicator.
	 * @param options Value indicating whether to force the loading indicator to stop.
	 */
	stop: (options?: {force?: boolean}) => void;
}
