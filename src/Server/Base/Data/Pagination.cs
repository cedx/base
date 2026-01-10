namespace Belin.Base.Data;

/// <summary>
/// Represents information relevant to the pagination of data items.
/// </summary>
public sealed class Pagination {

	/// <summary>
	/// The current page index.
	/// </summary>
	public int CurrentPageIndex { get; set => field = Math.Max(0, value); }

	/// <summary>
	/// Value indicating whether a next page exists.
	/// </summary>
	public bool HasNextPage => CurrentPageIndex < LastPageIndex;

	/// <summary>
	/// Value indicating whether a previous page exists.
	/// </summary>
	public bool HasPreviousPage => CurrentPageIndex > 0;

	/// <summary>
	/// The number of items per page.
	/// </summary>
	public int ItemsPerPage { get; set => field = Math.Max(1, Math.Min(1000, value)); } = 25;

	/// <summary>
	/// The last page index.
	/// </summary>
	public int LastPageIndex => TotalItemCount > 0 ? (int) Math.Ceiling(TotalItemCount / (double) ItemsPerPage) - 1 : 0;

	/// <summary>
	/// The data limit.
	/// </summary>
	public int Limit => ItemsPerPage;

	/// <summary>
	/// The data offset.
	/// </summary>
	public int Offset => CurrentPageIndex * ItemsPerPage;

	/// <summary>
	/// The total number of items.
	/// </summary>
	public int TotalItemCount { get; set => field = Math.Max(0, value); }
}
