var EveryDayDao = require('../dao/EveryDayDao');
var respUtil = require('../util/respUtil');
var timeUtil = require('../util/TimeUtil');

var ControllerMap = new Map();

function insertEveryDay(request, response) {
    request.on("data", function(data) {
        var parames = [data.toString(), timeUtil.getNow()];
        EveryDayDao.insertEveryDay(parames,  function(result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '提交成功', null));
            response.end();
        });
    })
}
ControllerMap.set("/insertEveryDay", insertEveryDay);

function queryEveryDay(request, response) {
    request.on("data", function(data) {
        var parames = [data.toString(), 20190817];
        EveryDayDao.insertEveryDay(parames,  function(result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '提交成功', null));
            response.end();
        });
    })
}
ControllerMap.set("/queryEveryDay", queryEveryDay);

module.exports.path = ControllerMap;