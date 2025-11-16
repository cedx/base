namespace Belin.Base.Data;

/// <summary>
/// Provides extension methods for database connections.
/// </summary>
public static class ConnectionExtensions {

	public static void Execute(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void ExecuteAsync(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void ExecuteReader(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void ExecuteReaderAsync(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void ExecuteScalar(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void ExecuteScalarAsync(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void Query(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void QueryAsync(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void QueryFirst(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void QueryFirstAsync(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void QueryFirstOrDefault(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void QueryFirstOrDefaultAsync(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void QuerySingle(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void QuerySingleAsync(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void QuerySingleOrDefault(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}

	public static void QuerySingleOrDefaultAsync(string sql, IDictionary<string, object?>? parameters = null) {
		parameters ??= new Dictionary<string, object?>();
	}
}
