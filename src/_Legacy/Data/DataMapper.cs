namespace Belin.Base.Data;

using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Globalization;
using System.Reflection;

/// <summary>
/// Maps data records to entity objects.
/// </summary>
public class DataMapper {

	/// <summary>
	/// The property maps, keyed by type.
	/// </summary>
	private static readonly Dictionary<Type, Dictionary<string, PropertyInfo>> propertyMaps = [];

	/// <summary>
	/// Converts the specified data reader into an array of objects of the specified type.
	/// </summary>
	/// <typeparam name="T">The type of objects to return.</typeparam>
	/// <param name="reader">The data reader to be converted.</param>
	/// <returns>The array of objects corresponding to the specified data reader.</returns>
	public IEnumerable<T> ConvertReader<T>(IDataReader reader) {
		while (reader.Read()) yield return ConvertRecord<T>(reader);
		reader.Close();
	}

	/// <summary>
	/// Converts the specified data record to the specified type.
	/// </summary>
	/// <typeparam name="T">The type of object to return.</typeparam>
	/// <param name="record">The data record to be converted.</param>
	/// <returns>The object corresponding to the specified data record.</returns>
	public T ConvertRecord<T>(IDataRecord record) {
		var properties = new OrderedDictionary<string, object?>();
		for (var index = 0; index < record.FieldCount; index++) {
			var key = record.GetName(index);
			properties[key] = record.IsDBNull(index) ? null : record.GetValue(index);
		}

		return CreateInstance<T>(properties);
	}

	/// <summary>
	/// Creates a new entity of the specified type using that type's parameterless constructor.
	/// </summary>
	/// <typeparam name="T">The entity type.</typeparam>
	/// <param name="properties">The properties to be set on the newly created object.</param>
	/// <returns>The newly created object.</returns>
	public T CreateInstance<T>(IDictionary<string, object?> properties) {
		var culture = CultureInfo.InvariantCulture;
		var instance = Activator.CreateInstance<T>();
		var propertyMap = GetPropertyMap<T>();

		foreach (var key in properties.Keys.Where(propertyMap.ContainsKey)) {
			var propertyInfo = propertyMap[key];
			propertyInfo.SetValue(instance, Convert.ChangeType(properties[key], propertyInfo.PropertyType, culture));
		}

		return instance;
	}

	/// <summary>
	/// Gets the property map associated with the specified entity type.
	/// </summary>
	/// <typeparam name="T">The entity type.</typeparam>
	/// <returns>The property map associated with the specified entity type.</returns>
	public IDictionary<string, PropertyInfo> GetPropertyMap<T>() {
		var type = typeof(T);
		if (propertyMaps.TryGetValue(type, out var value)) return value;

		var propertyInfos = type
			.GetProperties(BindingFlags.Instance | BindingFlags.Public)
			.Where(propertyInfo => propertyInfo.CanWrite && !propertyInfo.IsDefined(typeof(NotMappedAttribute)));

		var propertyMap = new Dictionary<string, PropertyInfo>();
		foreach (var propertyInfo in propertyInfos) {
			var column = propertyInfo.GetCustomAttribute<ColumnAttribute>();
			propertyMap[column?.Name ?? propertyInfo.Name] = propertyInfo;
		}

		return propertyMaps[type] = propertyMap;
	}
}
