var express = require('express');
var GlobalConfig = require('./config');
var loader = require('./loader');
var app = new express();
app.use(express.static(GlobalConfig["page_path"]));
app.listen(GlobalConfig["port"], function() {
   console.log('服务器已启动');
});

app.post("/insertEveryDay", loader.get("/insertEveryDay"));
app.post("/editBlog", loader.get("/editBlog"));

app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));
app.get("/queryBlogCount", loader.get("/queryBlogCount"));
app.get("/queryBlogByBid", loader.get("/queryBlogByBid"));
app.post("/addComments", loader.get("/addComments"));
app.get("/queryRandomCode", loader.get("/queryRandomCode"));