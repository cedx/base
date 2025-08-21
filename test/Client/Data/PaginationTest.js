import {Pagination} from "@cedx/base/Data/Pagination.js";
import {assert} from "chai";

/**
 * Tests the features of the {@link Pagination} class.
 */
describe("Pagination", () => {
	describe("currentPageIndex", () => {
		it("should always be greater than or equal to zero", () =>
			assert.equal(new Pagination({currentPageIndex: -1}).currentPageIndex, 0));
	});

	describe("hasNextPage", () => {
		it("should return `false` if there is no next page", () =>
			assert.isFalse(new Pagination().hasNextPage));

		it("should return `true` if a next page exists", () =>
			assert.isTrue(new Pagination({currentPageIndex: 2, totalItemCount: 123}).hasNextPage));
	});

	describe("hasPreviousPage", () => {
		it("should return `false` if there is no previous page", () =>
			assert.isFalse(new Pagination().hasPreviousPage));

		it("should return `true` if a previous page exists", () =>
			assert.isTrue(new Pagination({currentPageIndex: 5}).hasPreviousPage));
	});

	describe("itemsPerPage", () => {
		it("should always be between 1 and 1000", () => {
			assert.equal(new Pagination({itemsPerPage: -1}).itemsPerPage, 1);
			assert.equal(new Pagination({itemsPerPage: 9999}).itemsPerPage, 1000);
		});
	});

	describe("lastPageIndex", () => {
		it("should return the total count divided by the page size rounded up", () => {
			assert.equal(new Pagination({totalItemCount: 0}).lastPageIndex, 0);
			assert.equal(new Pagination({itemsPerPage: 1, totalItemCount: 123}).lastPageIndex, 122);
			assert.equal(new Pagination({itemsPerPage: 10, totalItemCount: 25}).lastPageIndex, 2);
		});
	});

	describe("offset", () => {
		it("should return the page size multiplied by the page index", () => {
			assert.equal(new Pagination().offset, 0);
			assert.equal(new Pagination({currentPageIndex: 4}).offset, 100);
			assert.equal(new Pagination({currentPageIndex: 122, itemsPerPage: 5}).offset, 610);
		});
	});

	describe("searchParams", () => {
		it("should include a `page` parameter", () => {
			assert.equal(new Pagination().searchParams.get("page"), "1");
			assert.equal(new Pagination({currentPageIndex: -5}).searchParams.get("page"), "1");
			assert.equal(new Pagination({currentPageIndex: 122}).searchParams.get("page"), "123");
		});

		it("should include a `perPage` parameter", () => {
			assert.equal(new Pagination().searchParams.get("perPage"), "25");
			assert.equal(new Pagination({itemsPerPage: 66}).searchParams.get("perPage"), "66");
			assert.equal(new Pagination({itemsPerPage: 123456}).searchParams.get("perPage"), "1000");
		});
	});

	describe("totalItemCount", () => {
		it("should always be greater than or equal to zero", () => {
			assert.equal(new Pagination({totalItemCount: -1}).totalItemCount, 0);
			assert.equal(new Pagination({totalItemCount: 123}).totalItemCount, 123);
		});
	});

	describe("fromResponse()", () => {
		it("should create an instance initialized from the response headers", () => {
			const pagination = Pagination.fromResponse(new Response(null, {headers: {
				"X-Pagination-Current-Page": "123",
				"X-Pagination-Per-Page": "33",
				"X-Pagination-Total-Count": "666"
			}}));

			assert.equal(pagination.currentPageIndex, 122);
			assert.equal(pagination.itemsPerPage, 33);
			assert.equal(pagination.totalItemCount, 666);
		});
	});
});
