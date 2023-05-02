import express from 'express';
import cors from 'cors';
import connection from '../../../lib/db';

const app = express();

app.use (express.json());
app.use(cors());

app.get('/api/service', (req, res) => {
	connection.query('SELECT * FROM service sv INNER JOIN site si ON sv.NUM_SITE = si.NUM_SITE INNER JOIN type t ON si.NUM_TYPE = t.NUM_TYPE WHERE sv.ETAT = "A"', (err, rows) => {
		if (err) throw err;
		res.json(rows);
	});
});

export default app;