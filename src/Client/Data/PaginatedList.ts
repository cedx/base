import {Pagination} from "./Pagination.js";

/**
 * A list with information relevant to the pagination of its items.
 */
export class PaginatedList<T> extends Array<T> {

	/**
	 * The information relevant to the pagination of the list items.
	 */
	pagination: Pagination;

	/**
	 * Creates a new paginated list.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options: PaginatedListOptions<T> = {}) {
		super();
		for (const item of options.items ?? []) this.push(item);
		this.pagination = options.pagination ?? new Pagination;
	}

	/**
	 * Creates an empty paginated list.
	 * @param itemsPerPage The number of items per page.
	 * @returns An empty paginated list with the specified number of items per page.
	 */
	static empty<T>(itemsPerPage: number): PaginatedList<T> {
		return new this({pagination: new Pagination({itemsPerPage})});
	}
}

/**
 * Defines the options of a {@link PaginatedList} instance.
 */
export type PaginatedListOptions<T> = Partial<{

	/**
	 * The list items.
	 */
	items: T[];

	/**
	 * The information relevant to the pagination of the list items.
	 */
	pagination: Pagination;
}>;
