namespace Belin.Base.UI;

using System.Text.Json.Serialization;

/// <summary>
/// Defines contextual modifiers.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Context {

	/// <summary>
	/// A danger.
	/// </summary>
	Danger,

	/// <summary>
	/// A warning.
	/// </summary>
	Warning,

	/// <summary>
	/// An information.
	/// </summary>
	Info,

	/// <summary>
	/// A success.
	/// </summary>
	Success
}

/// <summary>
/// Provides extension members for contextual modifiers.
/// </summary>
public static class ContextExtensions {
	extension(Context context) {

		/// <summary>
		/// The CSS representation of this context.
		/// </summary>
		public string CssClass => context.ToString().ToLowerInvariant();

		/// <summary>
		/// The icon corresponding to this context.
		/// </summary>
		public string Icon => context switch {
			Context.Danger => "error",
			Context.Warning => "warning",
			Context.Info => "info",
			Context.Success => "check_circle"
		};
	}
}
