namespace Belin.Base;

/// <summary>
/// Tests the features of the <see cref="DateRange"/> structure.
/// </summary>
[TestClass]
public sealed class DateRangeTest {

	[TestMethod]
	public void End() {
		// It should return the last moment of the date range.
		var date = new DateTime(1974, 5, 3, 8, 45, 12);
		AreEqual(new DateTime(2023, 11, 30, 17, 30, 47), new DateRange(date, new DateTime(2023, 11, 30, 17, 30, 47)).End);
		AreEqual(new DateTime(1974, 5, 3, 23, 59, 59, 999), DateRange.Day(date).End);
		AreEqual(new DateTime(1974, 5, 5, 23, 59, 59, 999), DateRange.Week(date).End);
		AreEqual(new DateTime(1974, 5, 31, 23, 59, 59, 999), DateRange.Month(date).End);
		AreEqual(new DateTime(1974, 6, 30, 23, 59, 59, 999), DateRange.Quarter(date).End);
		AreEqual(new DateTime(1974, 12, 31, 23, 59, 59, 999), DateRange.Year(date).End);
	}

	[TestMethod]
	public void Start() {
		// It should return the first moment of the date range.
		var date = new DateTime(1974, 5, 3, 8, 45, 12);
		AreEqual(date, new DateRange(date, new DateTime(2023, 11, 30, 17, 30, 47)).Start);
		AreEqual(new DateTime(1974, 5, 3), DateRange.Day(date).Start);
		AreEqual(new DateTime(1974, 4, 29), DateRange.Week(date).Start);
		AreEqual(new DateTime(1974, 5, 1), DateRange.Month(date).Start);
		AreEqual(new DateTime(1974, 4, 1), DateRange.Quarter(date).Start);
		AreEqual(new DateTime(1974, 1, 1), DateRange.Year(date).Start);
	}

	[TestMethod]
	public void Type() {
		// It should return the type of a date range.
		var date = new DateTime(1974, 5, 3, 8, 45, 12);
		AreEqual(DateRangeType.Custom, new DateRange(date, new DateTime(2023, 11, 30, 17, 30, 47)).Type);
		AreEqual(DateRangeType.Day, DateRange.Day(date).Type);
		AreEqual(DateRangeType.Week, DateRange.Week(date).Type);
		AreEqual(DateRangeType.Month, DateRange.Month(date).Type);
		AreEqual(DateRangeType.Quarter, DateRange.Quarter(date).Type);
		AreEqual(DateRangeType.Year, DateRange.Year(date).Type);
	}

	[TestMethod]
	public void Equals() {
		// It should return `true` if the two date ranges are equal.
		var date = new DateTime(1974, 5, 3);
		IsTrue(new DateRange(date, new DateTime(2023, 11, 30, 12, 30, 15)).Equals(new DateRange(date, new DateTime(2023, 11, 30, 12, 30, 15))));
		IsTrue(DateRange.Day(date).Equals(DateRange.Day(date)));
		IsTrue(DateRange.Week(date).Equals(DateRange.Week(new DateTime(1974, 4, 29))));
		IsTrue(DateRange.Month(date).Equals(DateRange.Month(new DateTime(1974, 5, 1))));
		IsTrue(DateRange.Quarter(date).Equals(DateRange.Quarter(new DateTime(1974, 4, 1))));
		IsTrue(DateRange.Year(date).Equals(DateRange.Year(new DateTime(1974, 1, 1))));

		// It should return `false` if the two date ranges are not equal.
		date = new DateTime(1974, 5, 3);
		IsFalse(new DateRange(date, new DateTime(2023, 11, 30, 12, 30, 15)).Equals(new DateRange(date, new DateTime(2022, 9, 15, 12, 30, 15))));
		IsFalse(DateRange.Day(date).Equals(DateRange.Day(new DateTime(1974, 5, 4))));
		IsFalse(DateRange.Week(date).Equals(DateRange.Week(new DateTime(1974, 5, 8))));
		IsFalse(DateRange.Month(date).Equals(DateRange.Month(new DateTime(1974, 6, 3))));
		IsFalse(DateRange.Quarter(date).Equals(DateRange.Quarter(new DateTime(1974, 9, 3))));
		IsFalse(DateRange.Year(date).Equals(DateRange.Year(new DateTime(1975, 5, 3))));
	}

	[TestMethod]
	public void Week() {
		// It should return the week encompassing the specified date.
		var range = DateRange.Week(new DateTime(2015, 12, 31));
		AreEqual(new DateTime(2015, 12, 28), range.Start);
		AreEqual(new DateTime(2016, 1, 3, 23, 59, 59, 999), range.End);

		range = DateRange.Week(new DateTime(2017, 7, 14));
		AreEqual(new DateTime(2017, 7, 10), range.Start);
		AreEqual(new DateTime(2017, 7, 16, 23, 59, 59, 999), range.End);

		range = DateRange.Week(new DateTime(2020, 5, 3));
		AreEqual(new DateTime(2020, 4, 27), range.Start);
		AreEqual(new DateTime(2020, 5, 3, 23, 59, 59, 999), range.End);

		range = DateRange.Week(new DateTime(2023, 1, 1));
		AreEqual(new DateTime(2022, 12, 26), range.Start);
		AreEqual(new DateTime(2023, 1, 1, 23, 59, 59, 999), range.End);

		range = DateRange.Week(new DateTime(2024, 2, 29));
		AreEqual(new DateTime(2024, 2, 26), range.Start);
		AreEqual(new DateTime(2024, 3, 3, 23, 59, 59, 999), range.End);
	}
}
