$(function(){
    $('#goReg').on('click',function(){
        $('.reg_box').show();
        $('.login_box').hide();
    })
    $('#goLogin').on('click',function(){
        $('.reg_box').hide();
        $('.login_box').show();
    })

    //自定义校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        //定义一个确认密码的校验规则
        repad: function(value){
            //1.已经拿到了repassword 的值
            //2.还需拿到password的值，在进行判断如果不一致的话，就直接return'两次输入的密码不一致'
            var pwd = $('.reg_box [name=password]').val()
            if(pwd !== value){
                return '两次输入的密码不一致！'
            }
        }   
    })

    //监听注册表单的提交事件
    $('.reg_box').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            data: {
                username : $('.reg_box [name=username]').val(),
                password: $('.reg_box [name=password]').val(),
            },
            success: function(res){
               if(res.status !== 0){
                  return layer.msg(res.message)
               }
               $('#goLogin').click();
            }
        })
    })

    //监听登录表单的提交事件
    $('.login_box').submit(function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            data: {
                username : $('.login_box [name=username]').val(),
                password: $('.login_box [name=password]').val(),
            },
            success:function(res){
                if(res.status !== 0){
                    return console.log(res.message)
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href = 'http://127.0.0.1:5500/%E5%89%8D%E7%AB%AF/%E5%9F%BA%E7%A1%80/%E9%98%B6%E6%AE%B5%E5%9B%9B%20%E5%89%8D%E5%90%8E%E7%AB%AF%E4%BA%A4%E4%BA%92/web/index.html'
            }
        })
    })
})
