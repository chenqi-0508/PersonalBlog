var mysql = require('./DBUtil');

function insertEveryDay(parames, callback) {
    var connection = mysql.createConnection();
    var insertSql = "insert into every_day (content, ctime) values (?, ?)";
    connection.connect();
    connection.query(insertSql, parames, function(error, result) {
        if (error == null){
            callback(result);
        } else{
            throw new Error("insertEveryDay error");
        }
    });
    connection.end();
}

module.exports.insertEveryDay = insertEveryDay;

