import express from 'express';
import cors from 'cors';
import connection from '../../../lib/db';

const app = express();

app.use (express.json());
app.use(cors());

app.get('/api/service/search', (req, res) => {

	if(req.query.site == "none") {
		connection.query('SELECT * FROM service', (err, rows) => {
			if (err) throw err;
			return res.json(rows);
		});   
	} else {
		connection.query('SELECT * FROM service WHERE NUM_SITE = ' + req.query.site, (err, rows) => {
			if (err) throw err;
			return res.json(rows);
		});   
	}
});

export default app;