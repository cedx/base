namespace Belin.Base.Data;

/// <summary>
/// Represents information relevant to the pagination of data items.
/// </summary>
public sealed class Pagination {

	/// <summary>
	/// The one-based current page number.
	/// </summary>
	public int CurrentPageIndex { get; set => field = Math.Max(1, value); } = 1;

	/// <summary>
	/// Value indicating whether a next page exists.
	/// </summary>
	public bool HasNextPage => CurrentPageIndex < LastPageIndex;

	/// <summary>
	/// Value indicating whether a previous page exists.
	/// </summary>
	public bool HasPreviousPage => CurrentPageIndex > 1;

	/// <summary>
	/// The number of items per page.
	/// </summary>
	public int ItemsPerPage { get; set => field = Math.Max(1, Math.Min(1000, value)); } = 25;

	/// <summary>
	/// The one-based last page number.
	/// The value will be zero if the total item count is zero.
	/// </summary>
	public int LastPageIndex => (int) Math.Ceiling(TotalItemCount / (double) ItemsPerPage);

	/// <summary>
	/// The data limit.
	/// </summary>
	public int Limit => ItemsPerPage;

	/// <summary>
	/// The data offset.
	/// </summary>
	public int Offset => (CurrentPageIndex - 1) * ItemsPerPage;

	/// <summary>
	/// The total number of items.
	/// </summary>
	public int TotalItemCount { get; set => field = Math.Max(0, value); } = 0;
}
