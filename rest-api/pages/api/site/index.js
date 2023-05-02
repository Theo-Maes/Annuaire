import connection from '../../../lib/db';

export default async function handler(req, res) {
    connection.query('SELECT * FROM site s INNER JOIN type t ON s.NUM_TYPE = t.NUM_TYPE WHERE ETAT = "A"', (err, rows) => {
		if (err) throw err;
		res.json(rows);
	});
};