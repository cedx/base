/**
 * Provides service objects.
 */
export class ServiceProvider {

	/**
	 * The registered factories.
	 */
	readonly #factories = new Map<ServiceKey, () => any>;

	/**
	 * The registered services.
	 */
	readonly #services = new Map<ServiceKey, any>;

	/**
	 * Registers a service instance with this provider.
	 * @param key The service key.
	 * @param service The service instance.
	 * @returns This instance.
	 */
	add(key: ServiceKey, service: unknown): this {
		this.#services.set(key, service);
		return this;
	}

	/**
	 * Removes all services from this provider.
	 */
	clear(): void {
		this.#factories.clear();
		this.#services.clear();
	}

	/**
	 * Determines whether this provider contains a specific service.
	 * @param key The service key.
	 * @returns `true` if the service is found in this provider, otherwise `false`.
	 */
	contains(key: ServiceKey): boolean {
		return this.#factories.has(key) || this.#services.has(key);
	}

	/**
	 * Removes the service registered with the specified key.
	 * @param key The service key.
	 */
	remove(key: ServiceKey): void {
		this.#factories.delete(key);
		this.#services.delete(key);
	}

	/**
	 * Gets the service registered with the specified key.
	 * @param key The service key.
	 * @returns The instance of the service registered with the specified key.
	 * @throws `Error` if there is no factory registered with the specified key.
	 */
	get<T>(key: ServiceKey): T { // eslint-disable-line @typescript-eslint/no-unnecessary-type-parameters
		if (!this.#services.has(key))
			if (this.#factories.has(key)) this.add(key, this.#factories.get(key)!.call(this));
			else if (typeof key == "function") this.add(key, Reflect.construct(key, []));
			else throw new Error("There is no factory registered with the specified key.");

		return this.#services.get(key) as T;
	}

	/**
	 * Registers a service factory with this provider.
	 * @param key The service key.
	 * @param factory The service factory.
	 * @returns This instance.
	 */
	register(key: ServiceKey, factory: () => unknown): this {
		this.#factories.set(key, factory);
		return this;
	}
}

/**
 * A token identifying a service.
 */
export type ServiceKey = string|symbol|(new(...args: any[]) => any);
