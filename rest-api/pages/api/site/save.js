import connection from '../../../lib/db';

export default async function handler(req, res) {
    const data = req.body;

	const updateQuery = 'UPDATE site SET VILLE = ?, NUM_TYPE = ? WHERE NUM_SITE = ?';
	const insertQuery = 'INSERT INTO site (VILLE,NUM_TYPE) VALUES (?,?)';
	// const deleteQuery = 'DELETE FROM sites WHERE id NOT IN (?);';
	const deleteQuery = 'UPDATE site SET ETAT = "X" WHERE NUM_SITE NOT IN (?);';
	const testQuery = 'SELECT * FROM service sv INNER JOIN site si ON sv.NUM_SITE = si.NUM_SITE WHERE si.NUM_SITE NOT IN (?) AND sv.ETAT = "A"';

	const ids = [];
	data.forEach((row) => {
		if(row.NUM_SITE != null) {
			ids.push(row.NUM_SITE);
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
				if(row.NUM_SITE != null) {
					connection.query(updateQuery, [row.VILLE, row.NUM_TYPE, row.NUM_SITE], (err, rows, fields) => {
						if (err) throw err;
					});
				} else {
					connection.query(insertQuery, [row.VILLE, row.NUM_TYPE], (err, results) => {
						if (err) throw err;
					});
				}
			});
			return res.send('Data saved');

		}
	});
};