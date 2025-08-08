namespace Belin.Base.UI;

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

/// <summary>
/// Renders components in HTML format.
/// </summary>
/// <param name="serviceProvider">The service provider.</param>
public class ComponentRenderer(IServiceProvider serviceProvider) {

	/// <summary>
	/// Renders a component in HTML format.
	/// </summary>
	/// <typeparam name="T">The component type.</typeparam>
	/// <param name="model">The component model.</param>
	/// <returns>The HTML representation of the component.</returns>
	public async Task<string> ToHtml<T>(object? model = null) where T: IComponent =>
		await ToHtml<T>(new Dictionary<string, object?> { ["Model"] = model });

	/// <summary>
	/// Renders a component in HTML format.
	/// </summary>
	/// <typeparam name="T">The component type.</typeparam>
	/// <param name="parameters">The component parameters.</param>
	/// <returns>The HTML representation of the component.</returns>
	public async Task<string> ToHtml<T>(IDictionary<string, object?> parameters) where T: IComponent {
		using var scope = serviceProvider.CreateScope();
		await using var htmlRenderer = new HtmlRenderer(scope.ServiceProvider, serviceProvider.GetRequiredService<ILoggerFactory>());
		return await htmlRenderer.Dispatcher.InvokeAsync(async () =>
			(await htmlRenderer.RenderComponentAsync<T>(ParameterView.FromDictionary(parameters))).ToHtmlString()
		);
	}
}
