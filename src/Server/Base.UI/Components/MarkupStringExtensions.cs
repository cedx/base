namespace Belin.Base.UI.Components;

using Microsoft.AspNetCore.Components;

/// <summary>
/// Provides extension members for markup strings.
/// </summary>
public static class MarkupStringExtensions {
	extension(MarkupString markupString) {

		/// <summary>
		/// Converts this markup string to a render fragment.
		/// </summary>
		/// <returns>The render fragment corresponding to this markup string.</returns>
		public RenderFragment ToRenderFragment() => builder => builder.AddMarkupContent(0, markupString.Value);
	}
}
