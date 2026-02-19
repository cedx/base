import Htmx, {type HtmxResponseInfo} from "htmx.org";
export default Htmx as unknown as typeof Htmx.default;

/**
 * Provides details about an `htmx` event.
 */
export type HtmxEventDetail = HtmxResponseInfo & {

	/**
	 * The element involved in the operation that just occurred.
	 */
	elt: Element;
};
