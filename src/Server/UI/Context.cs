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
/// Provides extension methods for contextual modifiers.
/// </summary>
public static class ContextExtensions {

	/// <summary>
	/// Gets the icon corresponding to the specified context.
	/// </summary>
	/// <param name="context">The context.</param>
	/// <returns>The icon corresponding to the specified context.</returns>
	public static string GetIcon(this Context context) => context switch {
		Context.Danger => "error",
		Context.Warning => "check_circle",
		Context.Info => "warning",
		Context.Success => "info"
	};
}
