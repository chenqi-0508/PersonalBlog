var randomTags = new Vue({
    el: '#random-tags',
    data: {
        tagsList: [
            'sdas','dfsfsdfs','sfaefg','fgdfb','ffghfg','kjkhjk',
            'hkhjkh','hkhjk','khjkhjkgj','fgdfb','ffghfg','kjkhjk',
            'sdas','dfsfsdfs','sfaefg','fgdfb','ffghfg','kjkhjk'
        ]
    },
    computed: {
        randomColor: function() {
            return function() {
                var red = Math.random() * 255;
                var blue = Math.random() * 255;
                var green = Math.random() * 255;
                return 'rgb('+ red + ',' + green + ',' + blue + ')';
            }
        },
        randomSize: function() {
            return function () {
                var size = Math.random() * 20 + 12 + 'px';
                return size;
            }
        }
    }
});
var hot = new Vue({
    el: '#hot',
    data: {
        hotList:[
            '使用码云git的webhook实现生产环境代',
            'VirtualBox压缩vmdk、vagrant打包b',
            '查看你的AWS服务器已使用流量',
            'vscode+XDebug调试远程环境(虚拟机',
            'python+selenium自动登录qq空间并下载',
            '初烧盲狙一条铁三角e40',
            '抓取摩拜单车车辆位置数据'
        ]
    },
    computed: {

    }
});
var comment = new Vue({
    el: '#comment',
    data: {
        commentList: [
            {
                commentName: 'lujianxin.com',
                commentTime: '1周前',
                commentContent: '友链来访， 看看文章， 打个卡'
            },
            {
                commentName: '小刘',
                commentTime: '1个月前',
                commentContent: '你的博客网页，整洁有序，唯一不足之处'
            }
        ]
    }
});