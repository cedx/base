namespace Belin.Base;

using System.Globalization;

/// <summary>
/// Provides extension members for dates and times.
/// </summary>
public static class DateTimeExtensions {
	extension(DateTime value) {

		/// <summary>
		/// The quarter corresponding to this date.
		/// </summary>
		public int Quarter => (value.Month - 1) / 3 + 1;

		/// <summary>
		/// The week number corresponding to this date.
		/// </summary>
		public int WeekOfYear => value.GetWeekOfYear();

		/// <summary>
		/// Gets the week number corresponding to this date.
		/// </summary>
		/// <param name="culture">An object that supplies culture-specific formatting information.</param>
		/// <returns>The week number corresponding to this date.</returns>
		public int GetWeekOfYear(CultureInfo? culture = null) {
			culture ??= CultureInfo.CurrentCulture;
			return culture.Calendar.GetWeekOfYear(value, culture.DateTimeFormat.CalendarWeekRule, culture.DateTimeFormat.FirstDayOfWeek);
		}
	}
}
