namespace Belin.Base.UI;

using System.Text.Json.Serialization;

/// <summary>
/// Defines the position of an element.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Position {

	/// <summary>
	/// Top left.
	/// </summary>
	TopStart,

	/// <summary>
	/// Top center.
	/// </summary>
	TopCenter,

	/// <summary>
	/// Top right.
	/// </summary>
	TopEnd,

	/// <summary>
	/// Middle left.
	/// </summary>
	MiddleStart,

	/// <summary>
	/// Middle center.
	/// </summary>
	MiddleCenter,

	/// <summary>
	/// Middle right.
	/// </summary>
	MiddleEnd,

	/// <summary>
	/// Bottom left.
	/// </summary>
	BottomStart,

	/// <summary>
	/// Bottom center.
	/// </summary>
	BottomCenter,

	/// <summary>
	/// Bottom right.
	/// </summary>
	BottomEnd
}

/// <summary>
/// Provides extension members for element positions.
/// </summary>
public static class PositionExtensions {
	extension(Position position) {

		/// <summary>
		/// The CSS representation of this position.
		/// </summary>
		public string CssClass => position switch {
			Position.TopStart => "top-0 start-0",
			Position.TopCenter => "top-0 start-50 translate-middle-x",
			Position.TopEnd => "top-0 end-0",
			Position.MiddleStart => "top-50 start-0 translate-middle-y",
			Position.MiddleCenter => "top-50 start-50 translate-middle",
			Position.MiddleEnd => "top-50 end-0 translate-middle-y",
			Position.BottomStart => "bottom-0 start-0",
			Position.BottomCenter => "bottom-0 start-50 translate-middle-x",
			Position.BottomEnd => "bottom-0 end-0"
		};
	}
}
