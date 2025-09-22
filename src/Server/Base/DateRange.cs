namespace Belin.Base;

using System.Globalization;
using System.Text.Json.Serialization;

/// <summary>
/// Defines a date range.
/// </summary>
/// <param name="Start">The start date.</param>
/// <param name="End">The end date.</param>
/// <param name="Type">The range type.</param>
public readonly record struct DateRange(DateTime Start, DateTime End, DateRangeType Type = DateRangeType.Custom): IEquatable<DateRange> {

	/// <summary>
	/// Creates a date range corresponding to the day including the specified date.
	/// </summary>
	/// <param name="date">The date.</param>
	/// <returns>The date range corresponding to the day including the specified date.</returns>
	public static DateRange Day(DateTime date) => new(
		date.Date,
		new DateTime(date.Year, date.Month, date.Day, 23, 59, 59, 999),
		DateRangeType.Day
	);

	/// <summary>
	/// Creates a date range corresponding to the month including the specified date.
	/// </summary>
	/// <param name="date">The date.</param>
	/// <returns>The date range corresponding to the month including the specified date.</returns>
	public static DateRange Month(DateTime date) => new(
		new DateTime(date.Year, date.Month, 1),
		new DateTime(date.Year, date.Month, DateTime.DaysInMonth(date.Year, date.Month), 23, 59, 59, 999),
		DateRangeType.Month
	);

	/// <summary>
	/// Creates a date range corresponding to the quarter including the specified date.
	/// </summary>
	/// <param name="date">The date.</param>
	/// <returns>The date range corresponding to the quarter including the specified date.</returns>
	public static DateRange Quarter(DateTime date) {
		var firstMonth = (date.GetQuarter() * 3) - 2;
		var lastMonth = firstMonth + 2;
		return new(
			new DateTime(date.Year, firstMonth, 1),
			new DateTime(date.Year, lastMonth, DateTime.DaysInMonth(date.Year, lastMonth), 23, 59, 59, 999),
			DateRangeType.Quarter
		);
	}

	/// <summary>
	/// Creates a date range corresponding to the week including the specified date.
	/// </summary>
	/// <param name="date">The date.</param>
	/// <returns>The date range corresponding to the week including the specified date.</returns>
	public static DateRange Week(DateTime date) {
		var delta = -(((int) date.DayOfWeek + 6) % 7);
		var sunday = date.AddDays(delta + 6);
		return new(
			date.AddDays(delta).Date,
			new DateTime(sunday.Year, sunday.Month, sunday.Day, 23, 59, 59, 999),
			DateRangeType.Week
		);
	}

	/// <summary>
	/// Creates a date range corresponding to the year including the specified date.
	/// </summary>
	/// <param name="date">The date.</param>
	/// <returns>The date range corresponding to the year including the specified date.</returns>
	public static DateRange Year(DateTime date) => new(
		new DateTime(date.Year, 1, 1),
		new DateTime(date.Year, 12, 31, 23, 59, 59, 999),
		DateRangeType.Year
	);

	/// <summary>
	/// Determines whether the specified object is equal to this object.
	/// </summary>
	/// <param name="other">An object to compare with this object.</param>
	/// <returns><see langword="true"/> if the specified object is equal to this object, otherwise <see langword="false"/>.</returns>
	public bool Equals(DateRange? other) => other is not null && Start == other.Value.Start && End == other.Value.End;

	/// <summary>
	/// Gets the label corresponding to this date range.
	/// </summary>
	/// <param name="culture">An object that supplies culture-specific formatting information.</param>
	/// <returns>The label corresponding to this date range.</returns>
	public string GetLabel(CultureInfo? culture = null) => Type switch {
		DateRangeType.Day => Start.ToString("d MMM yyyy", culture),
		DateRangeType.Week => Start.ToString($"S{Start.GetWeekOfYear(culture)} yyyy", culture),
		DateRangeType.Month => Start.ToString("MMMM yyyy", culture),
		DateRangeType.Quarter => Start.ToString($"T{Start.GetQuarter()} yyyy", culture),
		DateRangeType.Year => Start.Year.ToString(culture),
		_ => End.ToString("d MMM yyyy", culture)
	};
}

/// <summary>
/// Defines the type of a date range.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum DateRangeType {

	/// <summary>
	/// A custom date range.
	/// </summary>
	Custom,

	/// <summary>
	/// A whole day.
	/// </summary>
	Day,

	/// <summary>
	/// A whole week.
	/// </summary>
	Week,

	/// <summary>
	/// A whole month.
	/// </summary>
	Month,

	/// <summary>
	/// A whole quarter.
	/// </summary>
	Quarter,

	/// <summary>
	/// A whole year.
	/// </summary>
	Year
}
