import express from 'express';
import cors from 'cors';
import connection from '../../../lib/db';

const app = express();

app.use(cors());

app.post('/api/service/save', (req, res) => {
    const data = req.body;

	const updateQuery = 'UPDATE service SET service = ?, NUM_SITE = ? WHERE NUM_SERV = ?';
	const insertQuery = 'INSERT INTO service (SERVICE,NUM_SITE) VALUES (?,?)';
	// const deleteQuery = 'DELETE FROM services WHERE id NOT IN (?);';
	const deleteQuery = 'UPDATE service SET ETAT = "X" WHERE NUM_SERV NOT IN (?)';
	const testQuery = 'SELECT * FROM salarie sl INNER JOIN service sv ON sl.NUM_SERV = sv.NUM_SERV WHERE sv.NUM_SERV NOT IN (?)';

	const ids = [];

	data.forEach((row) => {
		if(row.NUM_SERV != null) {
			ids.push(row.NUM_SERV);
		}
	});

	if(! ids.length > 0) {
		ids.push(0);
	}


	connection.query(testQuery, [ids], (err, rows) => {

		if (err) throw err;

		if (rows.length !== 0) {
			return res.status(409).send('erreur');
		} else {
			
			connection.query(deleteQuery, [ids], (err, rows) => {
				if (err) throw err;
			});

			data.forEach((row) => {
				if(row.NUM_SERV != null) {
					connection.query(updateQuery, [row.SERVICE, row.NUM_SITE, row.NUM_SERV], (err, rows, fields) => {
						if (err) throw err;
					});
				} else {
					connection.query(insertQuery, [row.SERVICE, row.NUM_SITE], (err, results) => {
						if (err) throw err;
					});
				}
			});
			res.send('Data saved');
		}
	});
});

export default app;