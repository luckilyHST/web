$(function(){
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res){
            if(res.status !== 0){
                layui.layer.msg(res.message)
            }
            console.log(res)
            getUserInfo(res.data)
        }
    })

    //渲染用户头像
    function getUserInfo(user){
        var name = user.nickname || user.username
        $('#greet').html('欢迎&nbsp;&nbsp;' + name)
        if(user.user_pic === null){
            $('.layui-nav-img').hide();
            var text = name[0].toUpperCase();
            $('.useravatr').html(text).show
        }else{
            $('.layui-nav-img').attr('src',user.user_pic).show();
            $('.useravatr').html(text).show()
        }
    }

    //点击退出后台
    var layer = layui.layer
    $('#btnLogOut').on('click',function(){
        layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='http://127.0.0.1:5500/login.html'
            layer.close(index);
          })
    })
})