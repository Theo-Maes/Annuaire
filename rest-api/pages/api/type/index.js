import express from 'express';
import cors from 'cors';
import connection from '../../../lib/db';

const app = express();

app.use (express.json());
app.use(cors());

app.get('/api/type', (req, res) => {
	connection.query('SELECT * FROM type', (err, rows) => {
		if (err) throw err;
		res.json(rows);
	});
});

export default app;