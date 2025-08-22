namespace Belin.Base.UI;

using System.Text.Json.Serialization;

/// <summary>
/// Defines the size of a component.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Size {

	/// <summary>
	/// An extra small size.
	/// </summary>
	ExtraSmall,

	/// <summary>
	/// A small size.
	/// </summary>
	Small,

	/// <summary>
	/// A medium size.
	/// </summary>
	Medium,

	/// <summary>
	/// A large size.
	/// </summary>
	Large,

	/// <summary>
	/// An extra large size.
	/// </summary>
	ExtraLarge,

	/// <summary>
	/// An extra extra large size.
	/// </summary>
	ExtraExtraLarge
}

/// <summary>
/// Provides extension methods for component sizes.
/// </summary>
public static class SizeExtensions {

	/// <summary>
	/// Returns the Bootstrap representation of the specified size.
	/// </summary>
	/// <param name="size">The size.</param>
	/// <returns>The Bootstrap representation of the specified size.</returns>
	public static string ToBoostrap(this Size size) => size switch {
		Size.ExtraSmall => "xs",
		Size.Small => "sm",
		Size.Medium => "md",
		Size.Large => "lg",
		Size.ExtraLarge => "xl",
		Size.ExtraExtraLarge => "xxl"
	};
}
