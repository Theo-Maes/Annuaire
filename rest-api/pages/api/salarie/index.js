import express from 'express';
import cors from 'cors';
import connection from '../../../lib/db';

const app = express();

app.use (express.json());
app.use(cors());

app.get('/api/salarie', (req, res) => {
	connection.query('SELECT * FROM salarie sl INNER JOIN service sv ON sl.NUM_SERV = sv.NUM_SERV INNER JOIN site si ON sl.NUM_SITE = si.NUM_SITE INNER JOIN type t ON si.NUM_TYPE = t.NUM_TYPE', (err, rows) => {
		if (err) throw err;
		res.json(rows);
	});
});

export default app;