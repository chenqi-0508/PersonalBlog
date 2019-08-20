var blogDetail = new Vue({
    el: "#blogDetail",
    data: {
        title: "",
        content: "",
        ctime: 0,
        tags: "",
        views: 0
    },
    methods: {

    },
    computed: {

    },
    created: function(){
        var bid = location.search.indexOf("?") == 0 ? location.search.split("?")[1].split("=")[1] : "";
        if (bid === ""){
            return;
        }
        var blog_id = document.getElementById("blog_id");
        blog_id.value = bid;
        axios({
            method: "get",
            url: "/queryBlogByBid?bid=" + bid
        }).then(function(resp){
            var result = resp.data.data;
            console.log(result);
            if (resp.data.state === "success"){
                blogDetail.title = result[0].title;
                blogDetail.content = result[0].content;
                blogDetail.ctime = result[0].ctime;
                blogDetail.tags = result[0].tags;
                blogDetail.views = result[0].views;
            }
        })
    }
});
var sendComments = new Vue({
    el: "#send-comments",
    data: {
        vText: "",
        vcode: ""
    },
    methods: {
        subBtn: function(){
            var valid = document.getElementById("valid");
            if (valid.value != this.vText){
                console.log(valid.value,this.vText)
                alert("验证码错误！");
                return;
            }
            var blog_id = document.getElementById("blog_id");
            var comments_id = document.getElementById("comments_id");
            var user_name = document.getElementById("user_name");
            var e_mail = document.getElementById("e_mail");
            var comments = document.getElementById("comments");
            if (user_name.value === "" || user_name.value == null){
                alert("请输入昵称！");
                return;
            }
            if (comments.value === "" || comments.value == null){
                alert("请输入评论内容！");
                return;
            }
            var parames = {
                blog_id: blog_id.value,
                comments_id: comments_id.value,
                user_name: user_name.value,
                e_mail: e_mail.value,
                comments: comments.value
            };
            axios({
                method: "post",
                url: "/addComments",
                data: parames
            }).then(function(resp){
                console.log(resp);
                if (resp.data.state === "success"){
                    alert(resp.data.msg);
                }
            })
        },
        queryRandomCode: function(){
            axios({
                url: '/queryRandomCode',
                method: 'get'
            }).then(function(resp){
                sendComments.vText = resp.data.data.text;
                sendComments.vcode = resp.data.data.data;
            });
        }
    },
    computed: {

    },
    created(){
        this.queryRandomCode();
    }
});