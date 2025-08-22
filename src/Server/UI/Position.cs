namespace Belin.Base.UI;

using System.Text.Json.Serialization;

/// <summary>
/// Defines the placement of an element.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Position {

	/// <summary>
	/// Top left.
	/// </summary>
	TopLeft,

	/// <summary>
	/// Top center.
	/// </summary>
	TopCenter,

	/// <summary>
	/// Top right.
	/// </summary>
	TopRight,

	/// <summary>
	/// Middle left.
	/// </summary>
	MiddleLeft,

	/// <summary>
	/// Middle center.
	/// </summary>
	MiddleCenter,

	/// <summary>
	/// Middle right.
	/// </summary>
	MiddleRight,

	/// <summary>
	/// Bottom left.
	/// </summary>
	BottomLeft,

	/// <summary>
	/// Bottom center.
	/// </summary>
	BottomCenter,

	/// <summary>
	/// Bottom right.
	/// </summary>
	BottomRight
}
