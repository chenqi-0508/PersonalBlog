var dbutil = require('./DBUtil');
var timeUtil = require('../util/TimeUtil');

var connection = null;

function queryTag(tag, success) {
    connection = dbutil.createConnection();
    connection.connect();
    var sql = "select * from tags where tag = ?";
    var parames = [tag];
    connection.query(sql, parames, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error("queryTag error: " + error);
        }
    });
    connection.end();
}

function insertTag(tag, ctime, utime, success) {
    connection = dbutil.createConnection();
    connection.connect();
    var sql = "insert into tags (tag, ctime, utime) values (?, ?, ?)";
    var parames = [tag, ctime, utime];
    connection.query(sql, parames, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error("insertTag error: " + error);
        }
    });
    connection.end();
}

function insertTagBlogMapping(tagId, blogId, ctime, utime, success){
    connection = dbutil.createConnection();
    connection.connect();
    var sql = "insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) values (?, ?, ?, ?)";
    var parames = [tagId, blogId, ctime, utime];
    connection.query(sql, parames, function(error, result){
        if (error == null) {
            success(result);
        } else {
            throw new Error("insertTagBlogMapping error: " + error);
        }
    });
    connection.end();
}

module.exports.queryTag = queryTag;
module.exports.insertTag = insertTag;
module.exports.insertTagBlogMapping = insertTagBlogMapping;