namespace Belin.Base;

using System.Globalization;

/// <summary>
/// Provides extension members for strings.
/// </summary>
public static class StringExtensions {
	extension(string value) {

		/// <summary>
		/// Converts the first character of this string to uppercase.
		/// </summary>
		/// <param name="culture">An object that supplies culture-specific formatting information.</param>
		/// <returns>The processed string.</returns>
		public string Capitalize(CultureInfo? culture = null) =>
			value.Length == 0 ? "" : char.ToUpper(value[0], culture ?? CultureInfo.CurrentCulture) + value[1..];
	}
}
