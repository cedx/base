namespace Belin.Base.Data;

/// <summary>
/// Tests the features of the <see cref="Pagination"/> class.
/// </summary>
[TestClass]
public sealed class PaginationTest {

	[TestMethod]
	public void CurrentPageIndex() {
		// It should always be greater than or equal to one.
		AreEqual(1, new Pagination { CurrentPageIndex = -1 }.CurrentPageIndex);
		AreEqual(1, new Pagination { CurrentPageIndex = 0 }.CurrentPageIndex);
		AreEqual(123, new Pagination { CurrentPageIndex = 123 }.CurrentPageIndex);
	}

	[TestMethod]
	public void HasNextPage() {
		// It should return `false` if there is no next page.
		IsFalse(new Pagination().HasNextPage);

		// It should return `true` if a next page exists.
		IsTrue(new Pagination { CurrentPageIndex = 2, TotalItemCount = 123 }.HasNextPage);
	}

	[TestMethod]
	public void HasPreviousPage() {
		// It should return `false` if there is no previous page.
		IsFalse(new Pagination().HasPreviousPage);

		// It should return `true` if a previous page exists.
		IsTrue(new Pagination { CurrentPageIndex = 5 }.HasPreviousPage);
	}

	[TestMethod]
	public void ItemsPerPage() {
		// It should always be between 1 and 1000.
		AreEqual(1, new Pagination { ItemsPerPage = -1 }.ItemsPerPage);
		AreEqual(1, new Pagination { ItemsPerPage = 0 }.ItemsPerPage);
		AreEqual(1000, new Pagination { ItemsPerPage = 9999 }.ItemsPerPage);
	}

	[TestMethod]
	public void LastPageIndex() {
		// It should return the total count divided by the page size rounded up.
		AreEqual(0, new Pagination { TotalItemCount = 0 }.LastPageIndex);
		AreEqual(123, new Pagination { ItemsPerPage = 1, TotalItemCount = 123 }.LastPageIndex);
		AreEqual(3, new Pagination { ItemsPerPage = 10, TotalItemCount = 25 }.LastPageIndex);
	}

	[TestMethod]
	public void Offset() {
		// It should return the page size multiplied by the page index minus one.
		AreEqual(0, new Pagination { CurrentPageIndex = 1 }.Offset);
		AreEqual(100, new Pagination { CurrentPageIndex = 5, ItemsPerPage = 25 }.Offset);
		AreEqual(610, new Pagination { CurrentPageIndex = 123, ItemsPerPage = 5 }.Offset);
	}

	[TestMethod]
	public void TotalItemCount() {
		// It should always be greater than or equal to zero.
		AreEqual(0, new Pagination { TotalItemCount = -1 }.TotalItemCount);
		AreEqual(0, new Pagination { TotalItemCount = 0 }.TotalItemCount);
		AreEqual(123, new Pagination { TotalItemCount = 123 }.TotalItemCount);
	}
}
