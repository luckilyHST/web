$(function(){
    //自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
       pass:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],
      newPwd: function(value){
          if($('[name=oldPwd]').val() === value){
              return '新旧的密码不能相同'
          }
      },
       rePwd: function(value){
           if($('.layui-form-item [name=newPwd]').val() !== value){
               return '两次输入的密码不一致'
           }
       }
    })

    //
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新密码失败')
                }
                layer.msg('更新密码成功')
                $('.layui-form')[0].reset();
            }
        })
        // console.log($(this).serialize());
    })
})