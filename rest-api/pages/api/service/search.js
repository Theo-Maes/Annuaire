import express, { query } from 'express';
import cors from 'cors';
import connection from '../../../lib/db';

const app = express();

app.use (express.json());
app.use(cors());

app.get('/api/service/search', (req, res) => {

    let searchQuery = 'SELECT * FROM service WHERE NUM_SITE = ';

    if(req.query.site == "none") {
       return res.json(JSON.parse(JSON.stringify([])));
    }

	connection.query(searchQuery + req.query.site, (err, rows) => {
		if (err) throw err;
		res.json(rows);
	});
});

export default app;