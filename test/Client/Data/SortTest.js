/* eslint-disable max-lines-per-function */
import {Sort, SortOrder} from "@cedx/base/Data/Sort.js";
import {assert} from "chai";

/**
 * Tests the features of the {@link Sort} class.
 */
describe("Sort", () => {
	describe("length", () => {
		const sort = new Sort;

		it("should increment when adding an entry", () => {
			assert.lengthOf(sort, 0);
			assert.lengthOf(sort.append("foo", SortOrder.Ascending), 1);
			assert.lengthOf(sort.append("bar", SortOrder.Descending), 2);
		});

		it("should decrement when removing an entry", () => {
			sort.delete("foo");
			assert.lengthOf(sort, 1);
		});
	});

	describe("[Symbol.iterator]()", () => {
		it("should end iteration immediately if the sort is empty", () => {
			const iterator = new Sort()[Symbol.iterator]();
			assert.isTrue(iterator.next().done);
		});

		it("should iterate over the entries if the sort is not empty", () => {
			const iterator = Sort.of("foo").prepend("bar", SortOrder.Descending)[Symbol.iterator]();
			let next = iterator.next();
			assert.isTrue(!next.done);
			assert.deepEqual(next.value, ["bar", SortOrder.Descending]);
			next = iterator.next();
			assert.isFalse(next.done);
			assert.deepEqual(next.value, ["foo", SortOrder.Ascending]);
			assert.isTrue(iterator.next().done);
		});
	});

	describe("append()", () => {
		const sort = Sort.of("foo");

		it("should append a new entry to the end", () => {
			sort.append("bar", SortOrder.Ascending);
			assert.deepEqual(Array.from(sort), [["foo", SortOrder.Ascending], ["bar", SortOrder.Ascending]]);
		});

		it("should move an existing entry to the end and update its value", () => {
			sort.append("foo", SortOrder.Descending);
			assert.deepEqual(Array.from(sort), [["bar", SortOrder.Ascending], ["foo", SortOrder.Descending]]);
		});
	});

	describe("at()", () => {
		const sort = Sort.of("foo");
		it("should return the entry at the specified index", () => assert.deepEqual(sort.at(0), ["foo", SortOrder.Ascending]));
		it("should return `null` for an unknown entry", () => assert.isNull(sort.at(1)));
	});

	describe("compare()", () => {
		const x = {index: 1, name: "abc", type: "object"};
		const y = {index: 2, name: "xyz", type: "object"};

		it("should return zero if the two objects are considered equal", () => {
			assert.equal(Sort.of("type").compare(x, y), 0);
			assert.equal(Sort.of("type", SortOrder.Descending).compare(x, y), 0);
		});

		it("should return a negative number if the first object is before the second", () => {
			assert.isBelow(Sort.of("index").compare(x, y), 0);
			assert.isBelow(Sort.of("name").compare(x, y), 0);
			assert.isBelow(new Sort([["type", SortOrder.Ascending], ["index", SortOrder.Ascending]]).compare(x, y), 0);
		});

		it("should return a positive number if the first object is after the second", () => {
			assert.isAbove(Sort.of("index", SortOrder.Descending).compare(x, y), 0);
			assert.isAbove(Sort.of("name", SortOrder.Descending).compare(x, y), 0);
			assert.isAbove(new Sort([["type", SortOrder.Descending], ["index", SortOrder.Descending]]).compare(x, y), 0);
		});
	});

	describe("delete()", () => {
		it("should properly remove entries", () => {
			const sort = new Sort([["foo", SortOrder.Ascending], ["bar", SortOrder.Descending]]);
			sort.delete("foo");
			assert.deepEqual(Array.from(sort), [["bar", SortOrder.Descending]]);
			sort.delete("bar");
			assert.isEmpty(Array.from(sort));
		});
	});

	describe("get()", () => {
		const sort = Sort.of("foo");
		it("should return the corresponding order for an existing entry", () => assert.equal(sort.get("foo"), SortOrder.Ascending));
		it("should return `null` for an unknown entry", () => assert.isNull(sort.get("bar")));
	});

	describe("getIcon()", () => {
		it("should return the icon corresponding to the sort order", () => {
			assert.equal(Sort.of("foo").getIcon("foo"), "arrow_upward");
			assert.equal(Sort.of("foo", SortOrder.Descending).getIcon("foo"), "arrow_downward");
			assert.equal(new Sort().getIcon("foo"), "swap_vert");
		});
	});

	describe("has()", () => {
		const sort = Sort.of("foo");
		it("should return `true` an existing entry", () => assert.isTrue(sort.has("foo")));
		it("should return `false` for an unknown entry", () => assert.isFalse(sort.has("bar")));
	});

	describe("indexOf()", () => {
		const sort = new Sort([["foo", SortOrder.Ascending], ["bar", SortOrder.Descending]]);

		it("should return the index of an existing entry", () => {
			assert.equal(sort.indexOf("foo"), 0);
			assert.equal(sort.indexOf("bar"), 1);
		});

		it("should return `-1` for an unknown entry", () => assert.equal(sort.indexOf("qux"), -1));
	});

	describe("parse()", () => {
		it("should return an empty sort for an empty string", () =>
			assert.isEmpty(Array.from(Sort.parse(""))));

		it("should return an ascending order for a property without prefix", () =>
			assert.deepEqual(Array.from(Sort.parse("foo")), [["foo", SortOrder.Ascending]]));

		it("should return a descending order for a property with a '-' prefix", () =>
			assert.deepEqual(Array.from(Sort.parse("foo,-bar")), [["foo", SortOrder.Ascending], ["bar", SortOrder.Descending]]));
	});

	describe("prepend()", () => {
		const sort = Sort.of("foo");

		it("should prepend a new entry to the start", () => {
			sort.prepend("bar", SortOrder.Ascending);
			assert.deepEqual(Array.from(sort), [["bar", SortOrder.Ascending], ["foo", SortOrder.Ascending]]);
		});

		it("should move an existing entry to the start and update its value", () => {
			sort.prepend("foo", SortOrder.Descending);
			assert.deepEqual(Array.from(sort), [["foo", SortOrder.Descending], ["bar", SortOrder.Ascending]]);
		});
	});

	describe("satisfies()", () => {
		const sort = new Sort([["foo", SortOrder.Ascending], ["bar", SortOrder.Descending]]);

		it("should return `true` if there is nothing to satisfy", () => {
			assert.isTrue(sort.satisfies());
			assert.isTrue(new Sort().satisfies({properties: ["foo"]}));
		});

		it("should return `true` if the conditions are satisfied", () =>
			assert.isTrue(sort.satisfies({properties: ["bar", "foo"], min: 1, max: 2})));

		it("should return `false` if the conditions are not satisfied", () => {
			assert.isFalse(sort.satisfies({properties: ["baz"]}));
			assert.isFalse(sort.satisfies({max: 1}));
		});
	});

	describe("set()", () => {
		const sort = new Sort;

		it("should append a new entry when setting an unknown property", () =>
			assert.deepEqual(Array.from(sort.set("foo", SortOrder.Ascending)), [["foo", SortOrder.Ascending]]));

		it("should keep the order of entries when setting a known property", () =>
			assert.deepEqual(Array.from(sort.set("bar", SortOrder.Ascending).set("foo", SortOrder.Descending)), [["foo", SortOrder.Descending], ["bar", SortOrder.Ascending]]));
	});

	describe("toString()", () => {
		it("should return an empty string for an empty sort", () =>
			assert.isEmpty(String(new Sort)));

		it("should return the property for an ascending order", () =>
			assert.equal(String(Sort.of("foo")), "foo"));

		it("should return the property with a '-' prefix for a descending order", () =>
			assert.equal(String(Sort.parse("foo,-bar")), "foo,-bar"));
	});
});
