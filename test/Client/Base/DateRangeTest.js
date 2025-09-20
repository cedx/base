import {DateRange, DateRangeType} from "@cedx/base/DateRange.js";
import {assert} from "chai";

/**
 * Tests the features of the {@link DateRange} class.
 */
describe("DateRange", () => {
	describe("end", () => {
		it("should return the last moment of the date range", () => {
			const date = new Date(1974, 4, 3, 8, 45, 12);
			assert.equal(new DateRange(date, new Date(2023, 10, 30, 17, 30, 47)).end.getTime(), new Date(2023, 10, 30, 17, 30, 47).getTime());
			assert.equal(DateRange.day(date).end.getTime(), new Date(1974, 4, 3, 23, 59, 59, 999).getTime());
			assert.equal(DateRange.week(date).end.getTime(), new Date(1974, 4, 5, 23, 59, 59, 999).getTime());
			assert.equal(DateRange.month(date).end.getTime(), new Date(1974, 4, 31, 23, 59, 59, 999).getTime());
			assert.equal(DateRange.quarter(date).end.getTime(), new Date(1974, 5, 30, 23, 59, 59, 999).getTime());
			assert.equal(DateRange.year(date).end.getTime(), new Date(1974, 11, 31, 23, 59, 59, 999).getTime());
		});
	});

	describe("start", () => {
		it("should return the first moment of the date range", () => {
			const date = new Date(1974, 4, 3, 8, 45, 12);
			assert.equal(new DateRange(date, new Date(2023, 10, 30, 17, 30, 47)).start.getTime(), date.getTime());
			assert.equal(DateRange.day(date).start.getTime(), new Date(1974, 4, 3).getTime());
			assert.equal(DateRange.week(date).start.getTime(), new Date(1974, 3, 29).getTime());
			assert.equal(DateRange.month(date).start.getTime(), new Date(1974, 4, 1).getTime());
			assert.equal(DateRange.quarter(date).start.getTime(), new Date(1974, 3, 1).getTime());
			assert.equal(DateRange.year(date).start.getTime(), new Date(1974, 0, 1).getTime());
		});
	});

	describe("type", () => {
		it("should return the type of a date range", () => {
			const date = new Date(1974, 4, 3, 8, 45, 12);
			assert.equal(new DateRange(date, new Date(2023, 10, 30, 17, 30, 47)).type, DateRangeType.Custom);
			assert.equal(DateRange.day(date).type, DateRangeType.Day);
			assert.equal(DateRange.week(date).type, DateRangeType.Week);
			assert.equal(DateRange.month(date).type, DateRangeType.Month);
			assert.equal(DateRange.quarter(date).type, DateRangeType.Quarter);
			assert.equal(DateRange.year(date).type, DateRangeType.Year);
		});
	});

	describe("equals()", () => {
		it("should return `true` if the two date ranges are equal", () => {
			const date = new Date(1974, 4, 3);
			assert.isTrue(new DateRange(date, new Date(2023, 10, 30, 12, 30, 15)).equals(new DateRange(date, new Date(2023, 10, 30, 12, 30, 15))));
			assert.isTrue(DateRange.day(date).equals(DateRange.day(date)));
			assert.isTrue(DateRange.week(date).equals(DateRange.week(new Date(1974, 3, 29))));
			assert.isTrue(DateRange.month(date).equals(DateRange.month(new Date(1974, 4, 1))));
			assert.isTrue(DateRange.quarter(date).equals(DateRange.quarter(new Date(1974, 3, 1))));
			assert.isTrue(DateRange.year(date).equals(DateRange.year(new Date(1974, 0, 1))));
		});

		it("should return `false` if the two date ranges are not equal", () => {
			const date = new Date(1974, 4, 3);
			assert.isFalse(new DateRange(date, new Date(2023, 10, 30, 12, 30, 15)).equals(new DateRange(date, new Date(2022, 9, 15, 12, 30, 15))));
			assert.isFalse(DateRange.day(date).equals(DateRange.day(new Date(1974, 4, 4))));
			assert.isFalse(DateRange.week(date).equals(DateRange.week(new Date(1974, 4, 8))));
			assert.isFalse(DateRange.month(date).equals(DateRange.month(new Date(1974, 5, 3))));
			assert.isFalse(DateRange.quarter(date).equals(DateRange.quarter(new Date(1974, 8, 3))));
			assert.isFalse(DateRange.year(date).equals(DateRange.year(new Date(1975, 4, 3))));
		});
	});

	describe("week()", () => {
		it("should return the week encompassing the specified date", () => {
			let range = DateRange.week(new Date(2015, 11, 31));
			assert.equal(range.start.getTime(), new Date(2015, 11, 28).getTime());
			assert.equal(range.end.getTime(), new Date(2016, 0, 3, 23, 59, 59, 999).getTime());

			range = DateRange.week(new Date(2017, 6, 14));
			assert.equal(range.start.getTime(), new Date(2017, 6, 10).getTime());
			assert.equal(range.end.getTime(), new Date(2017, 6, 16, 23, 59, 59, 999).getTime());

			range = DateRange.week(new Date(2020, 4, 3));
			assert.equal(range.start.getTime(), new Date(2020, 3, 27).getTime());
			assert.equal(range.end.getTime(), new Date(2020, 4, 3, 23, 59, 59, 999).getTime());

			range = DateRange.week(new Date(2023, 0, 1));
			assert.equal(range.start.getTime(), new Date(2022, 11, 26).getTime());
			assert.equal(range.end.getTime(), new Date(2023, 0, 1, 23, 59, 59, 999).getTime());

			range = DateRange.week(new Date(2024, 1, 29));
			assert.equal(range.start.getTime(), new Date(2024, 1, 26).getTime());
			assert.equal(range.end.getTime(), new Date(2024, 2, 3, 23, 59, 59, 999).getTime());
		});
	});
});
