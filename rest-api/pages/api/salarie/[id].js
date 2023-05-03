import express from 'express';
import cors from 'cors';
import connection from '../../../lib/db';

const app = express();

app.use (express.json());
app.use(cors());

app.get('/api/salarie/:id', (req, res) => {
    connection.query('SELECT * FROM salarie sl INNER JOIN service sv ON sl.NUM_SERV = sv.NUM_SERV INNER JOIN site si ON sl.NUM_SITE = si.NUM_SITE WHERE sl.NUM_SAL = ' + req.params.id, (err, rows) => {
		if (err) throw err;
		res.json(rows);
	});
});

export default app;