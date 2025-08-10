namespace Belin.Base.Data;

/// <summary>
/// Tests the features of the <see cref="Pagination"/> class.
/// </summary>
[TestClass]
public sealed class PaginationTest {

	[TestMethod]
	public void CurrentPageIndex() {
		AreEqual(1, new Pagination { CurrentPageIndex = -1 }.CurrentPageIndex);
		AreEqual(1, new Pagination { CurrentPageIndex = 0 }.CurrentPageIndex);
		AreEqual(123, new Pagination { CurrentPageIndex = 123 }.CurrentPageIndex);
	}

	[TestMethod]
	public void HasNextPage() {
		IsFalse(new Pagination().HasNextPage);
		IsTrue(new Pagination { CurrentPageIndex = 2, TotalItemCount = 123 }.HasNextPage);
	}

	[TestMethod]
	public void HasPreviousPage() {
		IsFalse(new Pagination().HasPreviousPage);
		IsTrue(new Pagination { CurrentPageIndex = 5 }.HasPreviousPage);
	}

	[TestMethod]
	public void ItemsPerPage() {
		AreEqual(1, new Pagination { ItemsPerPage = -1 }.ItemsPerPage);
		AreEqual(1, new Pagination { ItemsPerPage = 0 }.ItemsPerPage);
		AreEqual(1000, new Pagination { ItemsPerPage = 9999 }.ItemsPerPage);
	}

	[TestMethod]
	public void LastPageIndex() {
		AreEqual(0, new Pagination { TotalItemCount = 0 }.LastPageIndex);
		AreEqual(123, new Pagination { ItemsPerPage = 1, TotalItemCount = 123 }.LastPageIndex);
		AreEqual(3, new Pagination { ItemsPerPage = 10, TotalItemCount = 25 }.LastPageIndex);
	}

	[TestMethod]
	public void Offset() {
		AreEqual(0, new Pagination { CurrentPageIndex = 1 }.Offset);
		AreEqual(100, new Pagination { CurrentPageIndex = 5, ItemsPerPage = 25 }.Offset);
		AreEqual(610, new Pagination { CurrentPageIndex = 123, ItemsPerPage = 5 }.Offset);
	}

	[TestMethod]
	public void TotalItemCount() {
		AreEqual(0, new Pagination { TotalItemCount = -1 }.TotalItemCount);
		AreEqual(0, new Pagination { TotalItemCount = 0 }.TotalItemCount);
		AreEqual(123, new Pagination { TotalItemCount = 123 }.TotalItemCount);
	}
}
