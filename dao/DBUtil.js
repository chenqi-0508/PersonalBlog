var mysql = require('mysql');

function createConnection() {
    var connection = mysql.createConnection({
        database: 'myblog',
        host: '192.168.199.227',
        port: '3306',
        user: 'root',
        password: '123456'
    });
    return connection;
}
module.exports.createConnection = createConnection;