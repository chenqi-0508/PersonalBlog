var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/respUtil');
var url = require('url');
var BlogDao = require('../dao/BlogDao');
var TagDao = require('../dao/TagDao');
var captcha = require('svg-captcha');

var ControllerMap = new Map();

function queryBlogByPage(requset, response) {
    var parames = url.parse(requset.url, true).query;
    var page = parames["page"];
    var pageSize = parames["pageSize"];
    if (page && pageSize) {
        BlogDao.queryBlogByPage(page, pageSize, function (result) {
            for (var i = 0; i < result.length; i++) {
                result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");
                result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
                result[i].content = result[i].content.substring(0, 300);
            }
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功!", result));
            response.end();
        })
    }
}

ControllerMap.set("/queryBlogByPage", queryBlogByPage);

function editBlog(requset, response) {
    requset.on("data", function (data) {
        var parames = url.parse(requset.url, true).query;
        var tags = parames["tags"].replace(/ /g, "").replace("，", ",");
        var title = parames["title"];
        BlogDao.insertBlog(title, tags, data.toString(), timeUtil.getNow(), timeUtil.getNow(), 0, function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "提交成功！", null));
            response.end();
            var blogId = result.insertId;
            var tagsList = tags.split(",");
            for (var i = 0; i < tagsList.length; i++) {
                if (tagsList[i] == null || tagsList[i].length === 0) {
                    continue;
                }
                queryTag(tagsList[i], blogId);
            }
        })
    })
}

ControllerMap.set("/editBlog", editBlog);

function queryTag(tag, blogId) {
    TagDao.queryTag(tag, function (result) {
        if (result == null || result.length === 0) {
            TagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
                var tagId = result.insertId;
                insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow());
            });
        } else {
            var tagId = result[0].id;
            insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow());
        }
    })
}

function insertTagBlogMapping(tagId, blogId, ctime, utime) {
    TagDao.insertTagBlogMapping(tagId, blogId, ctime, utime, function () {
    });
}

function queryBlogCount(request, response) {
    BlogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功!", result));
        response.end();
    })
}

ControllerMap.set("/queryBlogCount", queryBlogCount);

function queryBlogByBid(request, response) {
    var parames = url.parse(request.url, true).query;
    var bid = parames.bid;
    BlogDao.queryBlogByBid(bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功!", result));
        response.end();
        BlogDao.addViews(parseInt(bid), function (result) {
        });
    })
}

ControllerMap.set("/queryBlogByBid", queryBlogByBid);

function addComments(request, response) {
    request.on("data", function (data) {
        var paramesObj = JSON.parse(data);
        var parames = [];
        for (var prop in paramesObj){
            parames.push(paramesObj[prop]);
        }
        parames.push(timeUtil.getNow());
        parames.push(timeUtil.getNow());
        BlogDao.addComments(parames, function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "评论成功!", null));
            response.end();
        })
    });
}
ControllerMap.set("/addComments", addComments);

function queryRandomCode(request, response){
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "查询成功！", img));
    response.end();
}
ControllerMap.set("/queryRandomCode", queryRandomCode);

module.exports.path = ControllerMap;