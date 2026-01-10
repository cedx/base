namespace Belin.Base.UI;

using System.Text.Json.Serialization;

/// <summary>
/// Identifies the web storage area.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum StorageArea {

	/// <summary>
	/// Indicates the local storage.
	/// </summary>
	Local,

	/// <summary>
	/// Indicates the session storage.
	/// </summary>
	Session
}
