namespace Belin.Base.UI;

using System.Text.Json.Serialization;

/// <summary>
/// Enumerates different themes an operating system or application can show.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum AppTheme {

	/// <summary>
	/// The system theme.
	/// </summary>
	System,

	/// <summary>
	/// The light theme.
	/// </summary>
	Light,

	/// <summary>
	/// The dark theme.
	/// </summary>
	Dark
}

/// <summary>
/// Provides extension methods for application themes.
/// </summary>
public static class AppThemeExtensions {

	/// <summary>
	/// Gets the icon corresponding to the specified theme.
	/// </summary>
	/// <param name="theme">The application theme.</param>
	/// <returns>The icon corresponding to the specified theme.</returns>
	public static string GetIcon(this AppTheme theme) => theme switch {
		AppTheme.System => "contrast",
		AppTheme.Light => "light_mode",
		AppTheme.Dark => "dark_mode"
	};

	/// <summary>
	/// Gets the label corresponding to the specified theme.
	/// </summary>
	/// <param name="theme">The application theme.</param>
	/// <returns>The label corresponding to the specified theme.</returns>
	public static string GetLabel(this AppTheme theme) => theme switch {
		AppTheme.System => "Auto",
		AppTheme.Light => "Clair",
		AppTheme.Dark => "Sombre"
	};
}
