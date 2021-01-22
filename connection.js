let mysql = require('mysql');

// make connection to db
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejsrestapi'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Mysql connect!')
});

module.exports = connection;