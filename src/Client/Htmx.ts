import htmx, {type HtmxResponseInfo} from "htmx.org";
export const Htmx = htmx as unknown as typeof htmx.default;

/**
 * Provides details about an `htmx` event.
 */
export type HtmxEventDetail = HtmxResponseInfo & {

	/**
	 * The element involved in the operation that just occurred.
	 */
	elt: Element;
};
