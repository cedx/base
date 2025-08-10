import {Pagination} from "@cedx/base/Data/Pagination.js";
import {assert} from "chai";

/**
 * Tests the features of the {@link Pagination} class.
 */
describe("Pagination", () => {
	describe("lastPageIndex", () => {
		it("should return the total count divided by the page size rounded up", () => {
			assert.equal(new Pagination({totalItemCount: 0}).lastPageIndex, 0);
			assert.equal(new Pagination({itemsPerPage: 1, totalItemCount: 123}).lastPageIndex, 123);
			assert.equal(new Pagination({itemsPerPage: 10, totalItemCount: 25}).lastPageIndex, 3);
		});
	});

	describe("offset", () => {
		it("should return the page size multiplied by the page index minus one", () => {
			assert.equal(new Pagination({currentPageIndex: 1}).offset, 0);
			assert.equal(new Pagination({currentPageIndex: 5, itemsPerPage: 25}).offset, 100);
			assert.equal(new Pagination({currentPageIndex: 123, itemsPerPage: 5}).offset, 610);
		});
	});

	describe("searchParams", () => {
		it("should include a `page` parameter", () => {
			assert.equal(new Pagination().searchParams.get("page"), "1");
			assert.equal(new Pagination({currentPageIndex: -5}).searchParams.get("page"), "1");
			assert.equal(new Pagination({currentPageIndex: 123}).searchParams.get("page"), "123");
		});

		it("should include a `perPage` parameter", () => {
			assert.equal(new Pagination().searchParams.get("perPage"), "25");
			assert.equal(new Pagination({itemsPerPage: 66}).searchParams.get("perPage"), "66");
			assert.equal(new Pagination({itemsPerPage: 123456}).searchParams.get("perPage"), "1000");
		});
	});

	describe("fromResponse()", () => {
		it("should create an instance initialized from the response headers", () => {
			const pagination = Pagination.fromResponse(new Response(null, {headers: {
				"X-Pagination-Current-Page": "123",
				"X-Pagination-Per-Page": "33",
				"X-Pagination-Total-Count": "666"
			}}));

			assert.equal(pagination.currentPageIndex, 123);
			assert.equal(pagination.itemsPerPage, 33);
			assert.equal(pagination.totalItemCount, 666);
		});
	});
});
