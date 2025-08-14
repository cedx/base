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

		// It should return an ascending order for a property without prefix, a descending order for a property with a "-" prefix.
		var expected = new KeyValuePair<string, SortOrder>[] { new("foo", SortOrder.Ascending), new("bar", SortOrder.Descending) };
		CollectionAssert.AreEqual(expected, Sort.Parse("foo,-bar").ToArray());
	}

	[TestMethod("ToString")]
	public void TestToString() {
		// It should return an empty string for an empty sort.
		IsEmpty(new Sort().ToString());

		// It should return the property for an ascending order.
		AreEqual("foo", Sort.Of("foo").ToString());

		// It should return the property with a "-" prefix for a descending order.
		AreEqual("foo,-bar", Sort.Parse("foo,-bar").ToString());
	}
}
