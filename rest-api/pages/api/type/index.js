import connection from '../../../lib/db';

export default async function handler(req, res) {
    connection.query('SELECT * FROM type', (err, rows) => {
		if (err) throw err;
		res.json(rows);
	});
};