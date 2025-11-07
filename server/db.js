import sql from 'mssql';

let connectionPool;

export async function getConnectionPool() {
	if (connectionPool) {
		return connectionPool;
	}

	const {
		MSSQL_USER,
		MSSQL_PASSWORD,
		MSSQL_SERVER,
		MSSQL_DATABASE,
		MSSQL_PORT,
		MSSQL_ENCRYPT,
		MSSQL_TRUST_SERVER_CERTIFICATE,
	} = process.env;

	const config = {
		user: MSSQL_USER,
		password: MSSQL_PASSWORD,
		server: MSSQL_SERVER,
		database: MSSQL_DATABASE,
		port: MSSQL_PORT ? parseInt(MSSQL_PORT, 10) : 1433,
		options: {
			encrypt: MSSQL_ENCRYPT === 'true',
			trustServerCertificate: MSSQL_TRUST_SERVER_CERTIFICATE === 'true',
		},
		pool: {
			max: 10,
			min: 0,
			idleTimeoutMillis: 30000,
		},
	};

	connectionPool = await sql.connect(config);
	return connectionPool;
}

export async function query(sqlText, params = []) {
	const pool = await getConnectionPool();
	const request = pool.request();
	params.forEach(({ name, type, value }) => {
		if (type) {
			request.input(name, type, value);
		} else {
			request.input(name, value);
		}
	});
	const result = await request.query(sqlText);
	return result;
}

export { sql };








