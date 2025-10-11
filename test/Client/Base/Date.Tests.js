/* eslint-disable max-lines-per-function */
import {atMidnight, daysInMonth, getEaster, getQuarter, getWeekOfYear, inLeapYear, isHoliday, isWorkingDay, toIsoWeek, toYmdHms} from "@cedx/base/Date.js";
import {assert} from "chai";

/**
 * Tests the features of the date functions.
 */
describe("Date", () => {
	describe("atMidnight()", () => {
		it("should return the specified date whose time has been set at midnight", () => {
			assert.equal(atMidnight(new Date(2000, 0, 1)).getTime(), new Date(2000, 0, 1).getTime());
			assert.equal(atMidnight(new Date(2001, 4, 3, 9, 28, 59)).getTime(), new Date(2001, 4, 3).getTime());
			assert.equal(atMidnight(new Date(2010, 8, 19, 13, 15, 9)).getTime(), new Date(2010, 8, 19).getTime());
			assert.equal(atMidnight(new Date(2020, 11, 31, 23, 59, 59)).getTime(), new Date(2020, 11, 31).getTime());
		});
	});

	describe("daysInMonth()", () => {
		it("should return the number of days in the month of the given date", () => {
			assert.equal(daysInMonth(new Date(2000, 0, 1)), 31);
			assert.equal(daysInMonth(new Date(2008, 1, 1, 12)), 29);
			assert.equal(daysInMonth(new Date(2009, 1, 1, 12)), 28);
			assert.equal(daysInMonth(new Date(2009, 3, 1, 20, 30, 15)), 30);
			assert.equal(daysInMonth(new Date(2024, 11, 31, 23, 59, 59)), 31);
		});
	});

	describe("getEaster()", () => {
		it("should return the easter date for the given year", () => {
			assert.equal(getEaster(new Date(1901, 0, 1, 1, 23, 45)).getTime(), new Date(1901, 3, 7).getTime());
			assert.equal(getEaster(new Date(1942, 0, 1, 3, 6, 9)).getTime(), new Date(1942, 3, 5).getTime());
			assert.equal(getEaster(new Date(1986, 0, 1, 6, 12, 24)).getTime(), new Date(1986, 2, 30).getTime());
			assert.equal(getEaster(new Date(2021, 0, 1, 13, 26, 52)).getTime(), new Date(2021, 3, 4).getTime());
			assert.equal(getEaster(new Date(2046, 0, 1, 18, 18, 18)).getTime(), new Date(2046, 2, 25).getTime());
		});
	});

	describe("getQuarter()", () => {
		it("should return the quarter number for the given date", () => {
			assert.equal(getQuarter(new Date(2015, 11, 31)), 4);
			assert.equal(getQuarter(new Date(2017, 6, 14)), 3);
			assert.equal(getQuarter(new Date(2020, 4, 3)), 2);
			assert.equal(getQuarter(new Date(2023, 0, 1)), 1);
			assert.equal(getQuarter(new Date(2024, 1, 29)), 1);
		});
	});

	describe("getWeekOfYear()", () => {
		it("should return the week number for the given date", () => {
			assert.equal(getWeekOfYear(new Date(2015, 11, 31)), 53);
			assert.equal(getWeekOfYear(new Date(2017, 6, 14)), 28);
			assert.equal(getWeekOfYear(new Date(2020, 4, 3)), 18);
			assert.equal(getWeekOfYear(new Date(2023, 0, 1)), 52);
			assert.equal(getWeekOfYear(new Date(2024, 1, 29)), 9);
		});
	});

	describe("inLeapYear()", () => {
		it("should return `false` if the specified date is not in a leap year", () => {
			assert.isFalse(inLeapYear(new Date(1900, 8, 19, 13, 15, 9)));
			assert.isFalse(inLeapYear(new Date(2022, 3, 18, 9, 14, 35)));
			assert.isFalse(inLeapYear(new Date(2200, 7, 15, 23, 37, 12)));
		});

		it("should return `true` if the specified date is in a leap year", () => {
			assert.isTrue(inLeapYear(new Date(1600, 4, 3, 9, 28, 56)));
			assert.isTrue(inLeapYear(new Date(2000, 0, 1)));
			assert.isTrue(inLeapYear(new Date(2144, 7, 15, 17, 8, 59)));
		});
	});

	describe("isHoliday()", () => {
		it("should return `false` if the specified date is not a holiday", () => {
			assert.isFalse(isHoliday(new Date(2021, 4, 3, 9, 28, 56)));
			assert.isFalse(isHoliday(new Date(2021, 8, 19, 13, 15, 9)));
			assert.isFalse(isHoliday(new Date(2021, 11, 31, 23, 59, 59)));
		});

		it("should return `true` if the specified date is a holiday", () => {
			assert.isTrue(isHoliday(new Date(2021, 0, 1)));
			assert.isTrue(isHoliday(new Date(2022, 3, 18, 9, 14, 35)));
			assert.isTrue(isHoliday(new Date(2023, 7, 15, 17, 8, 59)));
		});
	});

	describe("isWorkingDay()", () => {
		it("should return `false` if the specified date is not a working day", () => {
			assert.isFalse(isWorkingDay(new Date(2022, 6, 10)));
			assert.isFalse(isWorkingDay(new Date(2022, 11, 17, 23, 59, 59)));
		});

		it("should return `true` if the specified date is a working day", () => {
			assert.isTrue(isWorkingDay(new Date(2022, 1, 15, 13, 18, 44)));
			assert.isTrue(isWorkingDay(new Date(2022, 4, 3, 9, 28, 56)));
		});
	});

	describe("toIsoWeek()", () => {
		it("should return the ISO 8601 week for the given date", () => {
			assert.equal(toIsoWeek(new Date(2015, 11, 31)), "2015-W53");
			assert.equal(toIsoWeek(new Date(2017, 6, 14)), "2017-W28");
			assert.equal(toIsoWeek(new Date(2020, 4, 3)), "2020-W18");
			assert.equal(toIsoWeek(new Date(2023, 0, 1)), "2023-W52");
			assert.equal(toIsoWeek(new Date(2024, 1, 29)), "2024-W09");
		});
	});

	describe("toYmdHms()", () => {
		it("should format the given date as 'YYYY-MM-DD HH:MM:SS'", () => {
			assert.equal(toYmdHms(new Date(2024, 2, 1, 3, 9, 18)), "2024-03-01 03:09:18");
			assert.equal(toYmdHms(new Date(2024, 2, 1, 12, 58, 1), {separator: "T"}), "2024-03-01T12:58:01");
		});

		it("should format the given date as 'YYYY-MM-DD'", () =>
			assert.equal(toYmdHms(new Date(2024, 2, 1, 12, 58, 18), {excludeTime: true}), "2024-03-01"));

		it("should format the given date as 'HH:MM:SS'", () =>
			assert.equal(toYmdHms(new Date(2024, 2, 1, 12, 58, 18), {excludeDate: true}), "12:58:18"));
	});
});
