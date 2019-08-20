var everyDay = new Vue({
    el: '#every-day',
    data: {
        content: 'It is very simple to be happy, but it is very difficult to be simple.\r\n快乐很简单，但要做到简单却很困难。———— 泰戈尔'
    },
    computed: {
        getContent: function () {
            return this.content;
        }
    },
    created: function () {
        //ajax
    }
});
var articleList = new Vue({
    el: '#article-list',
    data: {
        page: 1,
        pageSize: 5,
        totle: 20,
        pageNumList: [],
        articleList: []
    },
    methods: {},
    computed: {
        jumpPage() {
            return function (page) {
                this.page = page;
                this.pageNumList = this.setPage;
                this.getPage(this.page, this.pageSize);
            }
        },
        getPage() {
            return function (page, pageSize) {
                console.log("getPage:" + page, pageSize);
                axios({
                    method: 'get',
                    url: '/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize
                }).then(function (resp) {
                    var result = resp.data.data;
                    var list = [];
                    for (var i = 0 ; i < result.length ; i ++) {
                        var temp = {};
                        temp.title = result[i].title;
                        temp.content = result[i].content;
                        temp.date = result[i].ctime;
                        temp.views = result[i].views;
                        temp.tags = result[i].tags;
                        temp.id = result[i].id;
                        temp.link = "/blog_detail.html?bid=" + result[i].id;
                        list.push(temp);
                    }
                    articleList.articleList = list;
                    articleList.page = page;

                }).catch(function (error) {
                    console.log('请求错误:' + error);
                });
                axios({
                    url: '/queryBlogCount',
                    method: 'get',
                }).then(function (resp) {
                    articleList.totle = resp.data.data[0].totle;
                    articleList.pageNumList = articleList.setPage;
                });
            }
        },
        setPage() {
            var nowPage = this.page;
            var totle = this.totle;
            var pageSize = this.pageSize;
            var result = [];

            result.push({text: "<<", page: 1});
            if (nowPage > 1 && nowPage < 3) {
                result.push({text: "1", page: 1});
            }
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page: nowPage - 2});
                result.push({text: nowPage - 1, page: nowPage - 1});
            }
            result.push({text: nowPage, page: nowPage});
            if (nowPage + 1 <= parseInt((totle + pageSize - 1) / pageSize)) {
                result.push({text: nowPage + 1, page: nowPage + 1});
            }
            if (nowPage + 2 <= parseInt((totle + pageSize - 1) / pageSize)) {
                result.push({text: nowPage + 2, page: nowPage + 2});
            }
            result.push({text: ">>", page: parseInt((totle + pageSize - 1) / pageSize)});
            return result;
        }
    },
    created: function () {
        this.getPage(this.page, this.pageSize);
    }
});