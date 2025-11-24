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
/// Provides extension members for application themes.
/// </summary>
public static class AppThemeExtensions {
	extension(AppTheme appTheme) {

		/// <summary>
		/// The icon corresponding to this theme.
		/// </summary>
		public string Icon => appTheme switch {
			AppTheme.System => "contrast",
			AppTheme.Light => "light_mode",
			AppTheme.Dark => "dark_mode"
		};

		/// <summary>
		/// The label corresponding to this theme.
		/// </summary>
		public string Label => appTheme switch {
			AppTheme.System => "Auto",
			AppTheme.Light => "Clair",
			AppTheme.Dark => "Sombre"
		};
	}
}
