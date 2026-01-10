namespace Belin.Base.UI;

using System.Text.Json.Serialization;

/// <summary>
/// Defines the size of an element.
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
/// Provides extension members for element sizes.
/// </summary>
public static class SizeExtensions {
	extension(Size size) {

		/// <summary>
		/// The CSS representation of this size.
		/// </summary>
		public string CssClass => size switch {
			Size.ExtraSmall => "xs",
			Size.Small => "sm",
			Size.Medium => "md",
			Size.Large => "lg",
			Size.ExtraLarge => "xl",
			Size.ExtraExtraLarge => "xxl"
		};
	}
}
