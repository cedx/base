/**
 * Represents information relevant to the pagination of data items.
 */
export class Pagination {

	/**
	 * The one-based current page number.
	 */
	#currentPageIndex!: number;

	/**
	 * The number of items per page.
	 */
	#itemsPerPage!: number;

	/**
	 * The total number of items.
	 */
	#totalItemCount!: number;

	/**
	 * Creates a new pagination.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options: PaginationOptions = {}) {
		this.currentPageIndex = options.currentPageIndex ?? 1;
		this.itemsPerPage = options.itemsPerPage ?? 25;
		this.totalItemCount = options.totalItemCount ?? 0;
	}

	/**
	 * The one-based current page number.
	 */
	get currentPageIndex(): number {
		return this.#currentPageIndex;
	}
	set currentPageIndex(value: number) {
		this.#currentPageIndex = Math.max(1, value);
	}

	/**
	 * Value indicating whether a next page exists.
	 */
	get hasNextPage(): boolean {
		return this.#currentPageIndex < this.lastPageIndex;
	}

	/**
	 * Value indicating whether a previous page exists.
	 */
	get hasPreviousPage(): boolean {
		return this.#currentPageIndex > 1;
	}

	/**
	 * The number of items per page.
	 */
	get itemsPerPage(): number {
		return this.#itemsPerPage;
	}
	set itemsPerPage(value: number) {
		this.#itemsPerPage = Math.max(1, Math.min(1000, value));
	}

	/**
	 * The one-based last page number.
	 * The value will be zero if the total item count is zero.
	 */
	get lastPageIndex(): number {
		return Math.ceil(this.#totalItemCount / this.#itemsPerPage);
	}

	/**
	 * The data limit.
	 */
	get limit(): number {
		return this.#itemsPerPage;
	}

	/**
	 * The data offset.
	 */
	get offset(): number {
		return (this.#currentPageIndex - 1) * this.#itemsPerPage;
	}

	/**
	 * The search parameters corresponding to this object.
	 */
	get searchParams(): URLSearchParams {
		return new URLSearchParams({page: this.#currentPageIndex.toString(), perPage: this.#itemsPerPage.toString()});
	}

	/**
	 * The total number of items.
	 */
	get totalItemCount(): number {
		return this.#totalItemCount;
	}
	set totalItemCount(value: number) {
		this.#totalItemCount = Math.max(0, value);
	}

	/**
	 * Creates a new pagination from the HTTP headers of the specified response.
	 * @param response A server response.
	 * @returns The pagination corresponding to the HTTP headers of the specified response.
	 */
	static fromResponse(response: Response): Pagination {
		return new this({
			currentPageIndex: Number(response.headers.get("X-Pagination-Current-Page") ?? "1"),
			itemsPerPage: Number(response.headers.get("X-Pagination-Per-Page") ?? "25"),
			totalItemCount: Number(response.headers.get("X-Pagination-Total-Count") ?? "0")
		});
	}
}

/**
 * Defines the options of a {@link Pagination} instance.
 */
export type PaginationOptions = Partial<{

	/**
	 * The one-based current page number.
	 */
	currentPageIndex: number;

	/**
	 * The number of items per page.
	 */
	itemsPerPage: number;

	/**
	 * The total number of items.
	 */
	totalItemCount: number;
}>;
