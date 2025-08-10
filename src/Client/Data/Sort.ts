/**
 * Specifies the order of a sort property.
 */
export const SortOrder = Object.freeze({

	/**
	 * The sort is ascending.
	 */
	Ascending: "ASC",

	/**
	 * The sort is descending.
	 */
	Descending: "DESC"
});

/**
 * Specifies the order of a sort property.
 */
export type SortOrder = typeof SortOrder[keyof typeof SortOrder];

/**
 * Holds the name of a property and the order to sort by.
 */
export type SortProperty = [string, SortOrder];

/**
 * Represents information relevant to the sorting of data items.
 */
export class Sort implements Iterable<SortProperty> {

	/**
	 * The list of sort properties.
	 */
	#properties: SortProperty[];

	/**
	 * Creates new sort.
	 * @param properties The list of properties to be sorted.
	 */
	constructor(properties: SortProperty[] = []) {
		this.#properties = properties;
	}

	/**
	 * The number of properties in this sort.
	 */
	get count(): number {
		return this.#properties.length;
	}

	/**
	 * Creates a new sort from the specified property and order.
	 * @param property The property name.
	 * @param order The sort order.
	 * @returns The sort corresponding to the property and order.
	 */
	static of(property: string, order: SortOrder = SortOrder.Ascending): Sort {
		return new this([[property, order]]);
	}

	/**
	 * Creates a new sort from the specified string.
	 * @param value A string representing a sort.
	 * @returns The sort corresponding to the specified string.
	 */
	static parse(value: string): Sort {
		return new this((value ? value.split(",") : []).map(item => {
			const order = item.startsWith("-") ? SortOrder.Descending : SortOrder.Ascending;
			return [order == SortOrder.Ascending ? item : item.slice(1), order];
		}));
	}

	/**
	 * Returns a new iterator that allows iterating the entries of this sort.
	 * @returns An iterator over the sort properties.
	 */
	[Symbol.iterator](): ArrayIterator<SortProperty> {
		return this.#properties[Symbol.iterator]();
	}

	/**
	 * Appends the specified property to this sort.
	 * @param property The property name.
	 * @param order The sort order.
	 * @returns This instance.
	 */
	append(property: string, order: SortOrder): this {
		this.delete(property);
		this.#properties.push([property, order]);
		return this;
	}

	/**
	 * Gets the sort property at the specified index.
	 * @param index The position in this sort.
	 * @returns The sort property at the specified index, or `null` if it doesn't exist.
	 */
	at(index: number): SortProperty|null {
		return this.#properties.at(index) ?? null;
	}

	/**
	 * Compares the specified objects, according to the current sort properties.
	 * @param x The first object to compare.
	 * @param y The second object to compare.
	 * @returns A value indicating the relationship between the two objects.
	 */
	compare(x: object, y: object): number {
		for (const [property, order] of this.#properties) {
			const xAttr = Reflect.get(x, property); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
			const yAttr = Reflect.get(y, property); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
			const value = xAttr > yAttr ? 1 : (xAttr < yAttr ? -1 : 0);
			if (value) return order == SortOrder.Ascending ? value : -value;
		}

		return 0;
	}

	/**
	 * Removes the specified property from this sort.
	 * @param property The property name.
	 */
	delete(property: string): void {
		this.#properties = this.#properties.filter(([key]) => key != property);
	}

	/**
	 * Gets the order associated with the specified property.
	 * @param property The property name.
	 * @returns The order associated with the specified property, or `null` if the property doesn't exist.
	 */
	get(property: string): SortOrder|null {
		for (const [key, order] of this.#properties) if (key == property) return order;
		return null;
	}

	/**
	 * Gets the icon corresponding to the specified property.
	 * @param property The property name.
	 * @returns The icon corresponding to the specified property.
	 */
	getIcon(property: string): string {
		switch (this.get(property)) {
			case SortOrder.Ascending: return "arrow_upward";
			case SortOrder.Descending: return "arrow_downward";
			default: return "swap_vert";
		}
	}

	/**
	 * Returns a value indicating whether the specified property exists in this sort.
	 * @param property The property name.
	 * @returns `true` if the specified property exists in this sort, otherwise `false`.
	 */
	has(property: string): boolean {
		return this.#properties.some(([key]) => key == property);
	}

	/**
	 * Gets the index of the specified property in the underlying list.
	 * @param property The property name.
	 * @returns The index of the specified property, or `-1` if the property is not found.
	 */
	indexOf(property: string): number {
		for (const [index, [key]] of this.#properties.entries()) if (key == property) return index;
		return -1;
	}

	/**
	 * Prepends the specified property to this sort.
	 * @param property The property name.
	 * @param order The sort order.
	 * @returns This instance.
	 */
	prepend(property: string, order: SortOrder): this {
		this.delete(property);
		this.#properties.unshift([property, order]);
		return this;
	}

	/**
	 * Returns a value indicating whether the current sort satisfies the specified conditions.
	 * @param conditions The conditions to satisfy.
	 * @returns `true` if the current sort satisfies the specified conditions, otherwise `false`.
	 */
	satisfies(conditions: Partial<{min: number, max: number, properties: string[]}> = {}): boolean {
		const min = conditions.min ?? -1;
		if (min >= 0) return this.count >= min;

		const max = conditions.max ?? -1;
		if (max >= 0) return this.count <= max;

		const properties = conditions.properties ?? [];
		return properties.length ? this.#properties.every(([key]) => properties.includes(key)) : true;
	}

	/**
	 * Sets the order of the specified property.
	 * @param property The property name.
	 * @param order The sort order.
	 * @returns This instance.
	 */
	set(property: string, order: SortOrder): this {
		for (const [index, [key]] of this.#properties.entries()) if (key == property) {
			this.#properties[index] = [key, order];
			return this;
		}

		return this.append(property, order);
	}

	/**
	 * Returns a JSON representation of this object.
	 * @returns The JSON representation of this object.
	 */
	toJSON(): string {
		return this.toString();
	}

	/**
	 * Converts this sort to an SQL clause.
	 * @param escape A function used to escape the SQL identifiers.
	 * @returns The SQL clause corresponding to this object.
	 */
	toSql(escape: (identifier: string) => string = id => id): string {
		return this.#properties.map(([property, order]) => `${escape(property)} ${order}`).join(", ");
	}

	/**
	 * Returns a string representation of this object.
	 * @returns The string representation of this object.
	 */
	toString(): string {
		return this.#properties.map(([property, order]) => `${order == SortOrder.Descending ? "-" : ""}${property}`).join();
	}
}
