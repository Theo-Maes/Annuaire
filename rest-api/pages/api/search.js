import express, { query } from 'express';
import cors from 'cors';
import connection from '../../lib/db';

const app = express();

app.use (express.json());
app.use(cors());

app.get('/api/search', (req, res) => {
	console.log(req.query);

	let searchQuery = 'SELECT * FROM salarie sl INNER JOIN service sv ON sl.NUM_SERV = sv.NUM_SERV INNER JOIN site si ON sl.NUM_SITE = si.NUM_SITE WHERE sl.NOM LIKE "%'+req.query.nom+'%"';

	if(req.query.site != "none") {
		searchQuery += " AND sl.NUM_SITE = " + req.query.site;
	}

	if(req.query.service != "none") {
		searchQuery += " AND sv.SERVICE = '" + req.query.service+ "'";
	}

	connection.query(searchQuery, (err, rows) => {
		if (err) throw err;
		res.json(rows);
	});
});

export default app;