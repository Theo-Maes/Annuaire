import express from 'express';
import cors from 'cors';
import connection from '../../../lib/db';

const app = express();

app.use (express.json());
app.use(cors());

app.get('/api/site', (req, res) => {
	connection.query('SELECT * FROM site s INNER JOIN type t ON s.NUM_TYPE = t.NUM_TYPE', (err, rows) => {
		if (err) throw err;
		res.json(rows);
	});
});

export default app;