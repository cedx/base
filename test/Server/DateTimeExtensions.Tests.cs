namespace Belin.Base;

using System.Globalization;

/// <summary>
/// Tests the features of the <see cref="DateTimeExtensions"/> class.
/// </summary>
[TestClass]
public sealed class DateTimeExtensionsTests {

	[TestMethod]
	public void GetQuarter() {
		// It should return the quarter number for the given date.
		AreEqual(4, new DateTime(2015, 12, 31).Quarter);
		AreEqual(3, new DateTime(2017, 7, 14).Quarter);
		AreEqual(2, new DateTime(2020, 5, 3).Quarter);
		AreEqual(1, new DateTime(2023, 1, 1).Quarter);
		AreEqual(1, new DateTime(2024, 2, 29).Quarter);
	}

	[TestMethod]
	public void GetWeekOfYear() {
		var culture = CultureInfo.CreateSpecificCulture("fr-FR");

		// It should return the quarter number for the given date.
		AreEqual(53, new DateTime(2015, 12, 31).GetWeekOfYear(culture));
		AreEqual(28, new DateTime(2017, 7, 14).GetWeekOfYear(culture));
		AreEqual(18, new DateTime(2020, 5, 3).GetWeekOfYear(culture));
		AreEqual(52, new DateTime(2023, 1, 1).GetWeekOfYear(culture));
		AreEqual(9, new DateTime(2024, 2, 29).GetWeekOfYear(culture));
	}
}
