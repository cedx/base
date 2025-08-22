/**
 * Defines the position of an element.
 */
export const Position = Object.freeze({

	/**
	 * Top left.
	 */
	TopStart: "TopStart",

	/**
	 * Top center.
	 */
	TopCenter: "TopCenter",

	/**
	 * Top right.
	 */
	TopEnd: "TopEnd",

	/**
	 * Middle left.
	 */
	MiddleStart: "MiddleStart",

	/**
	 * Middle center.
	 */
	MiddleCenter: "MiddleCenter",

	/**
	 * Middle right.
	 */
	MiddleEnd: "MiddleEnd",

	/**
	 * Bottom left.
	 */
	BottomStart: "BottomStart",

	/**
	 * Bottom center.
	 */
	BottomCenter: "BottomCenter",

	/**
	 * Bottom right.
	 */
	BottomEnd: "BottomEnd"
});

/**
 * Defines the placement of an element.
 */
export type Position = typeof Position[keyof typeof Position];

/**
 * Returns the CSS representation of the specified position.
 * @param position The position.
 * @returns The CSS representation of the specified position.
 */
export function toCss(position: Position): string {
	switch (position) {
		case Position.TopCenter: return "top-0 start-50 translate-middle-x";
		case Position.TopEnd: return "top-0 end-0";
		case Position.MiddleStart: return "top-50 start-0 translate-middle-y";
		case Position.MiddleCenter: return "top-50 start-50 translate-middle";
		case Position.MiddleEnd: return "top-50 end-0 translate-middle-y";
		case Position.BottomStart: return "bottom-0 start-0";
		case Position.BottomCenter: return "bottom-0 start-50 translate-middle-x";
		case Position.BottomEnd: return "bottom-0 end-0";
		default: return "top-0 start-0";
	}
}
