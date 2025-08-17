namespace Belin.Base.UI;

/// <summary>
/// Enumerates modifier flags for keyboard accelerators.
/// </summary>
[Flags]
public enum KeyboardModifiers {

	/// <summary>
	/// Indicates no modifier.
	/// </summary>
	None = 0,

	/// <summary>
	/// Indicates the <c>Control</c> modifier.
	/// </summary>
	Ctrl = 1,

	/// <summary>
	/// Indicates the <c>Shift</c> modifier.
	/// </summary>
	Shift = 2,

	/// <summary>
	/// Indicates the <c>Alt</c> modifier (<c>Option</c> key on macOS, <c>Menu</c> key on Windows).
	/// </summary>
	Alt = 4,

	/// <summary>
	/// Indicates the <c>Meta</c> modifier (<c>Command</c> key on macOS, <c>Windows</c> key on Windows).
	/// </summary>
	Meta = 8
}
