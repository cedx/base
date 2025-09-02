namespace Belin.Base.UI.Components;

using Microsoft.AspNetCore.Components;

/// <summary>
/// Provides extension methods for markup strings.
/// </summary>
public static class MarkupStringExtensions {

	/// <summary>
	/// Converts the specified markup string to a render fragment.
	/// </summary>
	/// <param name="markupString">The markup string.</param>
	/// <returns>The render fragment corresponding to the specified markup string.</returns>
	public static RenderFragment ToRenderFragment(this MarkupString markupString) =>
		builder => builder.AddMarkupContent(0, markupString.Value);
}
