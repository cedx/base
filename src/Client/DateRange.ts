import {atMidnight, daysInMonth, getQuarter, getWeekOfYear} from "./Date.js";
import {TimeSpan} from "./TimeSpan.js";

/**
 * Defines the type of a date range.
 */
export const DateRangeType = Object.freeze({

	/**
	 * A custom date range.
	 */
	Custom: "Custom",

	/**
	 * A whole day.
	 */
	Day: "Day",

	/**
	 * A whole week.
	 */
	Week: "Week",

	/**
	 * A whole month.
	 */
	Month: "Month",

	/**
	 * A whole quarter.
	 */
	Quarter: "Quarter",

	/**
	 * A whole year.
	 */
	Year: "Year"
});

/**
 * Defines the type of a date range.
 */
export type DateRangeType = typeof DateRangeType[keyof typeof DateRangeType];

/**
 * Defines a date range.
 */
export class DateRange {

	/**
	 * The end date.
	 */
	readonly end: Date;

	/**
	 * The start date.
	 */
	readonly start: Date;

	/**
	 * The range type.
	 */
	readonly type: DateRangeType;

	/**
	 * Creates a new date range.
	 * @param start The start date.
	 * @param end The end date.
	 * @param type The range type.
	 */
	constructor(start: Date, end: Date, type: DateRangeType = DateRangeType.Custom) {
		this.start = start;
		this.end = end;
		this.type = type;
	}

	/**
	 * Creates a new date range from the specified JSON object.
	 * @param json A JSON object representing a date range.
	 * @returns The instance corresponding to the specified JSON object.
	 */
	static fromJson(json: Record<string, any>): DateRange {
		return new this(
			new Date(typeof json.start == "string" ? json.start : Date.now()),
			new Date(typeof json.end == "string" ? json.end : Date.now()),
			Object.values(DateRangeType).includes(json.type as DateRangeType) ? json.type as DateRangeType : DateRangeType.Custom
		);
	}

	/**
	 * Creates a date range corresponding to the day including the specified date.
	 * @param date The date.
	 * @returns The date range corresponding to the day including the specified date.
	 */
	static day(date: Date): DateRange {
		return new this(atMidnight(date), new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999), DateRangeType.Day);
	}

	/**
	 * Creates a date range corresponding to the month including the specified date.
	 * @param date The date.
	 * @returns The date range corresponding to the month including the specified date.
	 */
	static month(date: Date): DateRange {
		return new this(
			new Date(date.getFullYear(), date.getMonth(), 1),
			new Date(date.getFullYear(), date.getMonth(), daysInMonth(date), 23, 59, 59, 999),
			DateRangeType.Month
		);
	}

	/**
	 * Creates a date range corresponding to the quarter including the specified date.
	 * @param date The date.
	 * @returns The date range corresponding to the quarter including the specified date.
	 */
	static quarter(date: Date): DateRange {
		const firstMonth = (getQuarter(date) * 3) - 3;
		const lastMonth = firstMonth + 2;
		return new this(
			new Date(date.getFullYear(), firstMonth, 1),
			new Date(date.getFullYear(), lastMonth, daysInMonth(new Date(date.getFullYear(), lastMonth, 1)), 23, 59, 59, 999),
			DateRangeType.Quarter
		);
	}

	/**
	 * Creates a date range corresponding to the week including the specified date.
	 * @param date The date.
	 * @returns The date range corresponding to the week including the specified date.
	 */
	static week(date: Date): DateRange {
		const delta = -((date.getDay() + 6) % 7);
		const sunday = new Date(date.getTime() + ((delta + 6) * TimeSpan.MillisecondsPerDay));
		sunday.setHours(23, 59, 59, 999);
		return new this(atMidnight(new Date(date.getTime() + (delta * TimeSpan.MillisecondsPerDay))), sunday, DateRangeType.Week);
	}

	/**
	 * Creates a date range corresponding to the year including the specified date.
	 * @param date The date.
	 * @returns The date range corresponding to the year including the specified date.
	 */
	static year(date: Date): DateRange {
		return new this(new Date(date.getFullYear(), 0, 1), new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999), DateRangeType.Year);
	}

	/**
	 * Returns a value indicating whether this date range is equal to the specified date range.
	 * @param other The other date range to compare.
	 * @returns `true` if this date range is equal to the specified date range, otherwise `false`.
	 */
	equals(other: DateRange): boolean {
		return this.start.getTime() == other.start.getTime() && this.end.getTime() == other.end.getTime();
	}

	/**
	 * The label corresponding to this date range.
	 * @param culture The current culture.
	 * @returns The label corresponding to this date range.
	 */
	getLabel(culture: Intl.Locale|string = navigator.language): string {
		const {start, end, type} = this;
		switch (type) {
			case DateRangeType.Day: return start.toLocaleString(culture, {dateStyle: "medium"});
			case DateRangeType.Week: return `S${getWeekOfYear(start)} ${start.getFullYear()}`;
			case DateRangeType.Month: return start.toLocaleString(culture, {month: "long", year: "numeric"});
			case DateRangeType.Quarter: return `T${getQuarter(start)} ${start.getFullYear()}`;
			case DateRangeType.Year: return start.getFullYear().toString();
			default: return end.toLocaleString(culture, {dateStyle: "medium"});
		}
	}
}
