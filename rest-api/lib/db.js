const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'annuaire'
});

connection.connect((err) => {
	console.log('Connecté à la base de données MySQL');
});

export default connection;