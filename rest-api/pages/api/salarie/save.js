import express from 'express';
import cors from 'cors';
import connection from '../../../lib/db';

const app = express();

app.use(cors());

app.post('/api/salarie/save', (req, res) => {
    console.log("test");
    console.log(req.body);
    const data = req.body;

	const updateQuery = 'UPDATE salarie SET NOM = ?, PRENOM = ?, TELEPHONE_FIXE = ?, TELEPHONE_PORTABLE = ?, EMAIL = ?, NUM_SERV = ?, NUM_SITE = ? WHERE NUM_SAL = ?';
	const insertQuery = 'INSERT INTO salarie (NOM, PRENOM, TELEPHONE_FIXE, TELEPHONE_PORTABLE, EMAIL, NUM_SERV, NUM_SITE) VALUES (?,?,?,?,?,?,?)';
	// const deleteQuery = 'DELETE FROM services WHERE id NOT IN (?);';
	const deleteQuery = 'UPDATE service SET ETAT = "X" WHERE NUM_SERV NOT IN (?)';

	const ids = [];

	data.forEach((row) => {
		if(row.NUM_SERV != null) {
			ids.push(row.NUM_SERV);
		}
	});

	if(! ids.length > 0) {
		ids.push(0);
	}

	// connection.query(deleteQuery, [ids], (err, rows) => {
	// 	if (err) throw err;
	// });

	data.forEach((row) => {
		if(row.NUM_SAL != null) {
			connection.query(updateQuery, [row.NOM, row.PRENOM, row.TELEPHONE_FIXE, row.TELEPHONE_PORTABLE, row.EMAIL, row.NUM_SERV, row.NUM_SITE, row.NUM_SAL], (err, rows, fields) => {
				if (err) throw err;
			});
		} else {
			connection.query(insertQuery, [row.NOM, row.PRENOM, row.TELEPHONE_FIXE, row.TELEPHONE_PORTABLE, row.EMAIL, row.NUM_SERV, row.NUM_SITE], (err, results) => {
				if (err) throw err;
			});
		}
	});
	res.send('Data saved');
});

export default app;