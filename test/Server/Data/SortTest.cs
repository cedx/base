namespace Belin.Base.Data;

/// <summary>
/// Tests the features of the <see cref="Sort"/> class.
/// </summary>
[TestClass]
public sealed class SortTest {

	[TestMethod]
	public void Parse() {
		// It should return an empty sort for an empty string.
		IsEmpty(Sort.Parse(string.Empty));

		// It should return an ascending order for a property without prefix.
		// It should return a descending order for a property with a "-" prefix.
		var expected = new KeyValuePair<string, SortOrder>[] { new("foo", SortOrder.Ascending), new("bar", SortOrder.Descending) };
		CollectionAssert.AreEqual(expected, Sort.Parse("foo,-bar").ToArray());
	}
}
