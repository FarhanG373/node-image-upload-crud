const mySql = require('mysql');

const conn = mySql.createConnection({
    user: "root",
    host: "localhost",
    password: '',
    database: 'crud'
})
conn.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Conncetion is done');
    }
})

module.exports = conn;