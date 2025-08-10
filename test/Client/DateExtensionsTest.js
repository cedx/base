/* eslint-disable max-lines-per-function */
import * as DateExtensions from "@cedx/base/DateExtensions.js";
import {assert} from "chai";

/**
 * Tests the features of the date extensions.
 */
describe("DateExtensions", () => {
	describe("atMidnight()", () => {
		it("should return the specified date whose time has been set at midnight", () => {
			assert.equal(DateExtensions.atMidnight(new Date("2000-01-01 00:00:00")).getTime(), new Date("2000-01-01 00:00:00").getTime());
			assert.equal(DateExtensions.atMidnight(new Date("2001-05-03 09:28:56")).getTime(), new Date("2001-05-03 00:00:00").getTime());
			assert.equal(DateExtensions.atMidnight(new Date("2010-09-19 13:15:09")).getTime(), new Date("2010-09-19 00:00:00").getTime());
			assert.equal(DateExtensions.atMidnight(new Date("2020-12-31 23:59:59")).getTime(), new Date("2020-12-31 00:00:00").getTime());
		});
	});

	describe("daysInMonth()", () => {
		it("should return the number of days in the month of the given date", () => {
			assert.equal(DateExtensions.daysInMonth(new Date("2000-01-01 00:00:00")), 31);
			assert.equal(DateExtensions.daysInMonth(new Date("2008-02-01 12:00:00")), 29);
			assert.equal(DateExtensions.daysInMonth(new Date("2009-02-01 12:00:00")), 28);
			assert.equal(DateExtensions.daysInMonth(new Date("2009-04-01 20:30:15")), 30);
			assert.equal(DateExtensions.daysInMonth(new Date("2024-12-31 23:59:59")), 31);
		});
	});

	describe("getEaster()", () => {
		it("should return the easter date for the given year", () => {
			assert.equal(DateExtensions.getEaster(1901).getTime(), new Date("1901-04-07 00:00:00").getTime());
			assert.equal(DateExtensions.getEaster(1942).getTime(), new Date("1942-04-05 00:00:00").getTime());
			assert.equal(DateExtensions.getEaster(1986).getTime(), new Date("1986-03-30 00:00:00").getTime());
			assert.equal(DateExtensions.getEaster(2021).getTime(), new Date("2021-04-04 00:00:00").getTime());
			assert.equal(DateExtensions.getEaster(2046).getTime(), new Date("2046-03-25 00:00:00").getTime());
		});
	});

	describe("getQuarter()", () => {
		it("should return the quarter number for the given date", () => {
			assert.equal(DateExtensions.getQuarter(new Date("2015-12-31 00:00:00")), 4);
			assert.equal(DateExtensions.getQuarter(new Date("2017-07-14 00:00:00")), 3);
			assert.equal(DateExtensions.getQuarter(new Date("2020-05-03 00:00:00")), 2);
			assert.equal(DateExtensions.getQuarter(new Date("2023-01-01 00:00:00")), 1);
			assert.equal(DateExtensions.getQuarter(new Date("2024-02-29 00:00:00")), 1);
		});
	});

	describe("getWeekOfYear()", () => {
		it("should return the week number for the given date", () => {
			assert.equal(DateExtensions.getWeekOfYear(new Date("2015-12-31 00:00:00")), 53);
			assert.equal(DateExtensions.getWeekOfYear(new Date("2017-07-14 00:00:00")), 28);
			assert.equal(DateExtensions.getWeekOfYear(new Date("2020-05-03 00:00:00")), 18);
			assert.equal(DateExtensions.getWeekOfYear(new Date("2023-01-01 00:00:00")), 52);
			assert.equal(DateExtensions.getWeekOfYear(new Date("2024-02-29 00:00:00")), 9);
		});
	});

	describe("inLeapYear()", () => {
		it("should return `false` if the specified date is not in a leap year", () => {
			assert.isFalse(DateExtensions.inLeapYear(new Date("1900-09-19 13:15:09")));
			assert.isFalse(DateExtensions.inLeapYear(new Date("2022-04-18 09:14:35")));
			assert.isFalse(DateExtensions.inLeapYear(new Date("2200-08-15 23:37:12")));
		});

		it("should return `true` if the specified date is in a leap year", () => {
			assert.isTrue(DateExtensions.inLeapYear(new Date("1600-05-03 09:28:56")));
			assert.isTrue(DateExtensions.inLeapYear(new Date("2000-01-01 00:00:00")));
			assert.isTrue(DateExtensions.inLeapYear(new Date("2144-08-15 17:08:59")));
		});
	});

	describe("isHoliday()", () => {
		it("should return `false` if the specified date is not a holiday", () => {
			assert.isFalse(DateExtensions.isHoliday(new Date("2021-05-03 09:28:56")));
			assert.isFalse(DateExtensions.isHoliday(new Date("2021-09-19 13:15:09")));
			assert.isFalse(DateExtensions.isHoliday(new Date("2021-12-31 23:59:59")));
		});

		it("should return `true` if the specified date is a holiday", () => {
			assert.isTrue(DateExtensions.isHoliday(new Date("2021-01-01 00:00:00")));
			assert.isTrue(DateExtensions.isHoliday(new Date("2022-04-18 09:14:35")));
			assert.isTrue(DateExtensions.isHoliday(new Date("2023-08-15 17:08:59")));
		});
	});

	describe("isWorkingDay()", () => {
		it("should return `false` if the specified date is not a working day", () => {
			assert.isFalse(DateExtensions.isWorkingDay(new Date("2022-07-10 00:00:00")));
			assert.isFalse(DateExtensions.isWorkingDay(new Date("2022-12-17 23:59:59")));
		});

		it("should return `true` if the specified date is a working day", () => {
			assert.isTrue(DateExtensions.isWorkingDay(new Date("2022-02-25 13:18:44")));
			assert.isTrue(DateExtensions.isWorkingDay(new Date("2022-05-03 09:28:56")));
		});
	});

	describe("toIsoWeek()", () => {
		it("should return the ISO 8601 week for the given date", () => {
			assert.equal(DateExtensions.toIsoWeek(new Date("2015-12-31 00:00:00")), "2015-W53");
			assert.equal(DateExtensions.toIsoWeek(new Date("2017-07-14 00:00:00")), "2017-W28");
			assert.equal(DateExtensions.toIsoWeek(new Date("2020-05-03 00:00:00")), "2020-W18");
			assert.equal(DateExtensions.toIsoWeek(new Date("2023-01-01 00:00:00")), "2023-W52");
			assert.equal(DateExtensions.toIsoWeek(new Date("2024-02-29 00:00:00")), "2024-W09");
		});
	});

	describe("toYmdHms()", () => {
		it("should format the given date as 'YYYY-MM-DD HH:MM:SS'", () => {
			assert.equal(DateExtensions.toYmdHms(new Date("2024-03-01 03:09:18")), "2024-03-01 03:09:18");
			assert.equal(DateExtensions.toYmdHms(new Date("2024-03-01 12:58:01"), {separator: "T"}), "2024-03-01T12:58:01");
		});

		it("should format the given date as 'YYYY-MM-DD'", () =>
			assert.equal(DateExtensions.toYmdHms(new Date("2024-03-01 12:58:18"), {excludeTime: true}), "2024-03-01"));

		it("should format the given date as 'HH:MM:SS'", () =>
			assert.equal(DateExtensions.toYmdHms(new Date("2024-03-01 12:58:18"), {excludeDate: true}), "12:58:18"));
	});
});
