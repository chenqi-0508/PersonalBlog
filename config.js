var fs = require('fs');
var GlobalConfig = {};
var data = fs.readFileSync('./server.conf');

var arr = data.toString().split('\r\n');
for (var i = 0; i < arr.length; i++){
    GlobalConfig[arr[i].split(':')[0]] = arr[i].split(':')[1];
}

module.exports = GlobalConfig;