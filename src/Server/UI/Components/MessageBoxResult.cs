namespace Belin.Base.UI.Components;

/// <summary>
/// Specifies the return value of a message box.
/// </summary>
public enum MessageBoxResult {

	/// <summary>
	/// The message box does not return any value.
	/// </summary>
	None,

	/// <summary>
	/// The return value of the message box is "OK".
	/// </summary>
	OK,

	/// <summary>
	/// The return value of the message box is "Cancel".
	/// </summary>
	Cancel,

	/// <summary>
	/// The return value of the message box is "Yes".
	/// </summary>
	Yes,

	/// <summary>
	/// The return value of the message box is "No".
	/// </summary>
	No,

	/// <summary>
	/// The return value of the message box is "Abort".
	/// </summary>
	Abort,

	/// <summary>
	/// The return value of the message box is "Retry".
	/// </summary>
	Retry,

	/// <summary>
	/// The return value of the message box is "Ignore".
	/// </summary>
	Ignore
}
