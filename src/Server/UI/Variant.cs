namespace Belin.Base.UI;

using System.Text.Json.Serialization;

/// <summary>
/// Defines tone variants.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Variant {

	/// <summary>
	/// A dark variant.
	/// </summary>
	Dark,

	/// <summary>
	/// A light variant.
	/// </summary>
	Light,

	/// <summary>
	/// A primary variant.
	/// </summary>
	Primary,

	/// <summary>
	/// A secondary variant.
	/// </summary>
	Secondary
}

/// <summary>
/// Provides extension methods for tone variants.
/// </summary>
public static class VariantExtensions {

	/// <summary>
	/// Returns the CSS representation of the specified variant.
	/// </summary>
	/// <param name="variant">The variant.</param>
	/// <returns>The CSS representation of the specified variant.</returns>
	public static string ToCss(this Variant variant) => variant.ToString().ToLowerInvariant();
}
