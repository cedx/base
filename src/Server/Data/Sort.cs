namespace Belin.Base.Data;

using System.Text.Json.Serialization;

/// <summary>
/// Represents information relevant to the sorting of data items.
/// </summary>
/// <param name="properties">The list of properties to be sorted.</param>
public sealed class Sort(IEnumerable<KeyValuePair<string, SortOrder>>? properties = null): OrderedDictionary<string, SortOrder>(properties ?? []) {

	/// <summary>
	/// Creates a new sort from the specified property and order.
	/// </summary>
	/// <param name="property">The property name.</param>
	/// <param name="order">The sort order.</param>
	/// <returns>The sort corresponding to the property and order.</returns>
	public static Sort Of(string property, SortOrder order = SortOrder.Ascending) => new([
		new(property, order)
	]);

	/// <summary>
	/// Creates a new sort from the specified string.
	/// </summary>
	/// <param name="value">A string representing a sort.</param>
	/// <returns>The sort corresponding to the specified string.</returns>
	public static Sort Parse(string value) => new((value.Length > 0 ? value.Split(',') : []).Select(token => {
		var order = token.StartsWith('-') ? SortOrder.Descending : SortOrder.Ascending;
		return new KeyValuePair<string, SortOrder>(order == SortOrder.Ascending ? token : token[1..], order);
	}));

	/// <summary>
	/// Returns a string representation of this object.
	/// </summary>
	/// <returns>The string representation of this object.</returns>
	public override string ToString() =>
		string.Join(',', this.Select((property) => $"{(property.Value == SortOrder.Descending ? "-" : string.Empty)}{property.Key}"));
}

/// <summary>
/// Specifies the order of a sort property.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum SortOrder {

	/// <summary>
	/// The sort is ascending.
	/// </summary>
	Ascending,

	/// <summary>
	/// The sort is descending.
	/// </summary>
	Descending
}
