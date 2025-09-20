namespace Belin.Base;

using System.Globalization;

/// <summary>
/// Provides extension methods for dates and times.
/// </summary>
public static class DateTimeExtensions {

	/// <summary>
	/// Gets the quarter corresponding to the specified date.
	/// </summary>
	/// <param name="date">The date.</param>
	/// <returns>The quarter corresponding to the specified date.</returns>
	public static int GetQuarter(this DateTime date) => (date.Month - 1) / 3 + 1;

	/// <summary>
	/// Gets the week number corresponding to the specified date.
	/// </summary>
	/// <param name="date">The date.</param>
	/// <param name="culture">The current culture.</param>
	/// <returns>The week number corresponding to the specified date.</returns>
	public static int GetWeekOfYear(this DateTime date, CultureInfo? culture = null) {
		culture ??= CultureInfo.CurrentCulture;
		return culture.Calendar.GetWeekOfYear(date, culture.DateTimeFormat.CalendarWeekRule, culture.DateTimeFormat.FirstDayOfWeek);
	}
}
