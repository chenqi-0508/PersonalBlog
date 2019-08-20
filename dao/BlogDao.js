var dbutil = require('./DBUtil');
var connection = null;

function insertBlog(title, tags, content, ctime, utime, views, success) {
    connection = dbutil.createConnection();
    connection.connect();
    var sql = "insert into blog (title, tags, content, ctime, utime, views) values (?, ?, ?, ?, ?, ?)";
    var parame = [title, tags, content, ctime, utime, views];
    connection.query(sql,  parame, function(error, result) {
        if (error == null){
            success(result);
        } else{
            throw new Error("insertBlog error: " + error);
        }
    });
    connection.end();
}

function queryBlogByPage(page, pageSize, success){
    connection = dbutil.createConnection();
    connection.connect();
    var sql = "select * from blog order by id desc limit ?, ?";
    var parames = [page * pageSize, parseInt(pageSize)];
    connection.query(sql, parames, function(error, result){
        if (error == null){
            success(result);
        } else{
            throw new Error("queryBlogByPage error: " + error);
        }
    });
    connection.end();
}

function queryBlogCount(success) {
    connection = dbutil.createConnection();
    connection.connect();
    var sql = "select count(*) as totle from blog";
    var parames = [];
    connection.query(sql, parames, function(error, result){
        if (error == null){
            success(result);
        } else{
            throw new Error("queryBlogPage error: " + error);
        }
    });
    connection.end();
}

function queryBlogByBid(bid, success){
    connection = dbutil.createConnection();
    connection.connect();
    var sql = "select * from blog where id = ?";
    var parames = [bid];
    connection.query(sql, parames, function(error, result){
        if (error == null){
            success(result);
        } else{
            throw new Error("queryBlogByBid error: " + error);
        }
    });
    connection.end();
}

function addViews(bid, success) {
    connection = dbutil.createConnection();
    connection.connect();
    var sql = "update blog set views = views + 1 where id = ?;";
    var parames = [bid];
    connection.query(sql, parames, function(error, result){
        if (error == null){
            success(result);
        } else{
            throw new Error("addViews error: " + error);
        }
    });
    connection.end();
}

function addComments(parames, success) {
    connection = dbutil.createConnection();
    connection.connect();
    var sql = "insert into comments (blog_id, parent, user_name, e_mail, comments,  ctime, utime) values (?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, parames, function(error, result){
        if (error == null){
            success(result);
        } else{
            throw new Error("addComments error: " + error);
        }
    });
    connection.end();
}

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogByBid = queryBlogByBid;
module.exports.addViews = addViews;
module.exports.addComments = addComments;
