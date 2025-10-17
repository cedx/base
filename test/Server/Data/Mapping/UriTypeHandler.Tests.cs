namespace Belin.Base.Data.Mapping;

using Microsoft.Data.Sqlite;

/// <summary>
/// Tests the features of the <see cref="UriTypeHandler"/> class.
/// </summary>
[TestClass]
public sealed class UriTypeHandlerTests {

	[TestMethod]
	public void Parse() {
		var typeHandler = new UriTypeHandler();

		// It should return `null` if the value is invalid.
		IsNull(typeHandler.Parse(123));
		IsNull(typeHandler.Parse(""));

		// It should return an URI if the value is valid.
		var value = typeHandler.Parse("https://cedric-belin.fr");
		IsNotNull(value);
		AreEqual("https://cedric-belin.fr/", value.ToString());
	}

	[TestMethod]
	public void SetValue() {
		var parameter = new SqliteParameter();
		var typeHandler = new UriTypeHandler();

		// It should set the parameter to `null` if the value is `null`.
		typeHandler.SetValue(parameter, null);
		IsNull(parameter.Value);

		// It should set the parameter to the string representation if the value is not `null`.
		typeHandler.SetValue(parameter, new Uri("https://cedric-belin.fr"));
		AreEqual("https://cedric-belin.fr/", parameter.Value);
	}
}
