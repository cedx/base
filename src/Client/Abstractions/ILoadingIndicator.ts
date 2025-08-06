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
