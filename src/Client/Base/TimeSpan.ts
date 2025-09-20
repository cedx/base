/**
 * Provides some common time intervals in milliseconds.
 */
export const TimeSpan = Object.freeze({

	/**
	 * The number of hours in 1 day.
	 */
	HoursPerDay: 24,

	/**
	 * The number of minutes in 1 day.
	 */
	MinutesPerDay: 24 * 60,

	/**
	 * The number of minutes in 1 hour.
	 */
	MinutesPerHour: 60,

	/**
	 * The number of seconds in 1 day.
	 */
	SecondsPerDay: 24 * 60 * 60,

	/**
	 * The number of seconds in 1 hour.
	 */
	SecondsPerHour: 60 * 60,

	/**
	 * The number of seconds in 1 minute.
	 */
	SecondsPerMinute: 60,

	/**
	 * The number of milliseconds in 1 day.
	 */
	MillisecondsPerDay: 24 * 60 * 60 * 1_000,

	/**
	 * The number of milliseconds in 1 hour.
	 */
	MillisecondsPerHour: 60 * 60 * 1_000,

	/**
	 * The number of milliseconds in 1 minute.
	 */
	MillisecondsPerMinute: 60 * 1_000,

	/**
	 * The number of milliseconds in 1 second.
	 */
	MillisecondsPerSecond: 1_000
});
