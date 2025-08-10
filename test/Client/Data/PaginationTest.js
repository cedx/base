import {Pagination} from "@cedx/base/Data/Pagination.js";
import {assert} from "chai";

/**
 * Tests the features of the {@link Pagination} class.
 */
describe("Pagination", () => {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const {equal} = assert;

	describe("lastPageIndex", () => {
		it("should return the total count divided by the page size rounded up", () => {
			equal(new Pagination({totalItemCount: 0}).lastPageIndex, 0);
			equal(new Pagination({itemsPerPage: 1, totalItemCount: 123}).lastPageIndex, 123);
			equal(new Pagination({itemsPerPage: 10, totalItemCount: 25}).lastPageIndex, 3);
		});
	});

	describe("offset", () => {
		it("should return the page size multiplied by the page index minus one", () => {
			equal(new Pagination({currentPageIndex: 1}).offset, 0);
			equal(new Pagination({currentPageIndex: 5, itemsPerPage: 25}).offset, 100);
			equal(new Pagination({currentPageIndex: 123, itemsPerPage: 5}).offset, 610);
		});
	});

	describe("searchParams", () => {
		it("should include a `page` parameter", () => {
			equal(new Pagination().searchParams.get("page"), "1");
			equal(new Pagination({currentPageIndex: -5}).searchParams.get("page"), "1");
			equal(new Pagination({currentPageIndex: 123}).searchParams.get("page"), "123");
		});

		it("should include a `perPage` parameter", () => {
			equal(new Pagination().searchParams.get("perPage"), "25");
			equal(new Pagination({itemsPerPage: 66}).searchParams.get("perPage"), "66");
			equal(new Pagination({itemsPerPage: 123456}).searchParams.get("perPage"), "1000");
		});
	});

	describe("fromResponse()", () => {
		it("should create an instance initialized from the response headers", () => {
			const pagination = Pagination.fromResponse(new Response(null, {headers: {
				"X-Pagination-Current-Page": "123",
				"X-Pagination-Per-Page": "33",
				"X-Pagination-Total-Count": "666"
			}}));

			equal(pagination.currentPageIndex, 123);
			equal(pagination.itemsPerPage, 33);
			equal(pagination.totalItemCount, 666);
		});
	});
});
