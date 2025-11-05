MSSQL setup (.env keys)

Create a `.env` file in the project root with:

```
PORT=4000

MSSQL_USER=sa
MSSQL_PASSWORD=yourStrong(!)Password
MSSQL_SERVER=localhost
MSSQL_DATABASE=bookmydoctor
MSSQL_PORT=1433
MSSQL_ENCRYPT=false
MSSQL_TRUST_SERVER_CERTIFICATE=true
```

Notes:
- For Azure SQL, set `MSSQL_ENCRYPT=true` and `MSSQL_TRUST_SERVER_CERTIFICATE=false`.
- On local SQL Server Developer Edition, `trustServerCertificate=true` is common.





