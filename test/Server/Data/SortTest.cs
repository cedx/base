namespace Belin.Base.Data;

/// <summary>
/// Tests the features of the <see cref="Sort"/> class.
/// </summary>
[TestClass]
public sealed class SortTest {

	[TestMethod]
	public void Parse() {
		IsEmpty(Sort.Parse(string.Empty));

		var expected = new List<KeyValuePair<string, SortOrder>> { new("foo", SortOrder.Ascending), new("bar", SortOrder.Descending) };
		CollectionAssert.AreEqual(expected, Sort.Parse("foo,-bar"));
	}
}
