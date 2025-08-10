import {ServiceProvider} from "@cedx/base/DependencyInjection/ServiceProvider.js";
import {assert} from "chai";

/**
 * Tests the features of the {@link ServiceProvider} class.
 */
describe("ServiceProvider", () => {
	const token = ServiceProvider;

	describe("delete()", () => {
		const container = new ServiceProvider().set(token, {});

		it("should properly remove a registered service", () => {
			assert.isTrue(container.has(token));
			container.delete(token);
			assert.isFalse(container.has(token));
		});
	});

	describe("get()", () => {
		const container = new ServiceProvider;

		it("should properly get a registered service", () => {
			const object = {};
			assert.equal(container.set(token, object).get(token), object);
		});

		it("should automatically instantiate the class", () => assert.instanceOf(container.get(Array), Array));
		it("should throw an error if the service is unknown", () => assert.throws(() => container.get("UnknownToken")));
	});

	describe("has()", () => {
		const container = new ServiceProvider;
		it("should return `false` if the identification token is unkown", () => assert.isFalse(container.has(token)));
		it("should return `true` if the identification token is known", () => assert.isTrue(container.set(token, {}).has(token)));
	});

	describe("register()", () => {
		const container = new ServiceProvider;

		it("should properly associate a factory with an identification token", () => {
			const object = {};
			assert.isFalse(container.has(token));
			assert.equal(container.register(token, () => object).get(token), object);
		});
	});

	describe("set()", () => {
		const container = new ServiceProvider;

		it("should properly associate a service with an identification token", () => {
			const object = {};
			assert.isFalse(container.has(token));
			assert.equal(container.set(token, object).get(token), object);
		});
	});
});
