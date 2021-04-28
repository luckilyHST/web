
  function getUserInfo(){
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res){
            if(res.status !== 0){
                layui.layer.msg(res.message)
            }
            // console.log(res)
            UserInfo(res.data)
        }
    })
  }
  getUserInfo()
    //渲染用户头像
    function UserInfo(user){
        var name = user.nickname || user.username
        $('#greet').html('欢迎&nbsp;&nbsp;' + name)
        if(user.user_pic === null){
            $('.layui-nav-img').hide();
            var text = name[0].toUpperCase();
            $('.useravatr').html(text).show
        }else{
            $('.layui-nav-img').attr('src',user.user_pic).show();
            $('.useravatr').html(text).hide()
        }
    }

    //点击退出后台
    var layer = layui.layer
    $('#btnLogOut').on('click',function(){
        layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='http://127.0.0.1:5501/%E5%89%8D%E7%AB%AF/%E5%9F%BA%E7%A1%80/%E9%98%B6%E6%AE%B5%E5%9B%9B%20%E5%89%8D%E5%90%8E%E7%AB%AF%E4%BA%A4%E4%BA%92/web/login.html'
            layer.close(index);
          })
    })
