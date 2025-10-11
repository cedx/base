namespace Belin.Base;

using System.Globalization;

/// <summary>
/// Tests the features of the <see cref="StringExtensions"/> class.
/// </summary>
[TestClass]
public sealed class StringExtensionsTest {

	[TestMethod]
	public void Capitalize() {
		var culture = CultureInfo.CreateSpecificCulture("fr-FR");

		// It should convert in uppercase the first character of the specified string.
		AreEqual(string.Empty, string.Empty.Capitalize(culture));
		AreEqual("Foo bAr baZ", "foo bAr baZ".Capitalize(culture));
	}
}
