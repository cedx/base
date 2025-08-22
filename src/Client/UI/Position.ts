/**
 * Defines the placement of an element.
 */
export const Position = Object.freeze({

	/**
	 * Top left.
	 */
	TopLeft: "TopLeft",

	/**
	 * Top center.
	 */
	TopCenter: "TopCenter",

	/**
	 * Top right.
	 */
	TopRight: "TopRight",

	/**
	 * Middle left.
	 */
	MiddleLeft: "MiddleLeft",

	/**
	 * Middle center.
	 */
	MiddleCenter: "MiddleCenter",

	/**
	 * Middle right.
	 */
	MiddleRight: "MiddleRight",

	/**
	 * Bottom left.
	 */
	BottomLeft: "BottomLeft",

	/**
	 * Bottom center.
	 */
	BottomCenter: "BottomCenter",

	/**
	 * Bottom right.
	 */
	BottomRight: "BottomRight"
});

/**
 * Defines the placement of an element.
 */
export type Position = typeof Position[keyof typeof Position];
