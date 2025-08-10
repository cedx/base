namespace Belin.Base.UI;

using System.Text.Json.Serialization;

/// <summary>
/// Defines the alignment of a dropdown menu.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum MenuAlignment {

	/// <summary>
	/// The dropdown menu is left aligned.
	/// </summary>
	Start,

	/// <summary>
	/// The dropdown menu is right aligned.
	/// </summary>
	End
}
