var fs = require('fs');
var GlobalConfig = require('./config');
var ControllerSet = [];
var pathMap = new Map();

var webFile = fs.readdirSync(GlobalConfig["web_path"]);
for (var i = 0; i <webFile.length; i ++) {
    var temp = require(GlobalConfig["web_path"] + webFile[i]);
    for (var [k, v] of temp.path) {
        if (pathMap.get(k) == null){
            pathMap.set(k,  v);
        }else {
            throw new Error("url path异常，url：" + k);
        }
    }
    ControllerSet.push(temp);
}
// console.log(pathMap);
module.exports = pathMap;