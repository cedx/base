namespace Belin.Base;

using System.Globalization;

/// <summary>
/// Provides extension methods for dates and times.
/// </summary>
public static class StringExtensions {

	/// <summary>
	/// Converts the first character of the specified string to uppercase.
	/// </summary>
	/// <param name="value">The string to process.</param>
	/// <param name="culture">An object that supplies culture-specific formatting information.</param>
	/// <returns>The processed string.</returns>
	public static string Capitalize(this string value, CultureInfo? culture = null) =>
		value.Length == 0 ? string.Empty : char.ToUpper(value[0], culture ?? CultureInfo.CurrentCulture) + value[1..];
}
