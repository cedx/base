namespace Belin.Base.Data;

/// <summary>
/// Provides extension members for database connections.
/// </summary>
public static class ConnectionExtensions {
	extension(IDbConnection connection) {

		public void Execute(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void ExecuteAsync(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void ExecuteReader(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void ExecuteReaderAsync(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void ExecuteScalar(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void ExecuteScalarAsync(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void Query(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void QueryAsync(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void QueryFirst(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void QueryFirstAsync(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void QueryFirstOrDefault(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void QueryFirstOrDefaultAsync(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void QuerySingle(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void QuerySingleAsync(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void QuerySingleOrDefault(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}

		public void QuerySingleOrDefaultAsync(string sql, IDictionary<string, object?>? parameters = null) {
			parameters ??= new Dictionary<string, object?>();
		}
	}
}
