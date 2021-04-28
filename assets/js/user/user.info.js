$(function(){
    // 定义一个表单验证规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value){
            if(value.length > 6){
                return '昵称的长度不能超过6个字符'
            }
        }
    })

    UserInfo()
    //获取用户的基本信息
    function UserInfo(){
        $.ajax({
            method: 'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !== 0){
                    layer.msg('获取用户信息失败')
                }
                // console.log(res)
                //调用 form.val() 快速为表单赋值
                form.val('formText', res.data)
            }
        })
    }

    //重置表单的数据
    $('#resetBtn').on('click',function(e){
        //阻止表单的默认 重置 行为
        e.preventDefault();
        UserInfo();
    })
    //监听表单的提交行为
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改用户信息成功')
                window.parent.getUserInfo()
                console.log(window.parent)
            }
        })
    })
})