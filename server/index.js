import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { query, sql } from './db.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
	try {
		const result = await query('SELECT 1 AS ok');
		res.json({ ok: true, db: result?.recordset?.[0]?.ok === 1 });
	} catch (err) {
		res.status(500).json({ ok: false, error: err.message });
	}
});

// Example: GET /api/sample
// Replace with your real queries and tables
app.get('/api/sample', async (req, res) => {
	try {
		const result = await query('SELECT TOP 5 name FROM sys.tables ORDER BY name');
		res.json({ tables: result.recordset });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});












