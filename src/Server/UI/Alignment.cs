namespace Belin.Base.UI;

using System.Text.Json.Serialization;

/// <summary>
/// Defines the alignment of a component.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Alignment {

	/// <summary>
	/// The element is aligned at the start.
	/// </summary>
	Start,

	/// <summary>
	/// The element is aligned in the center.
	/// </summary>
	Center,

	/// <summary>
	/// The element is aligned at the end.
	/// </summary>
	End
}
