//获取用户信息
$(function(){
    var layer = layui.layer
var form = layui.form
function getUserInfo(){
    $.ajax({
        method:'GET',
        url: '/my/userinfo',
        success: function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            // Rendering(res.data)
            console.log(res)
            //快速为表单赋值
            form.val('formVal',res.data)
        }
    })
}
getUserInfo()

//自定义校验规则
//  form.verify({
//      pwd:[
//     /^[\S]{6,12}$/
//     ,'必须6到12位，且不能出现空格'
//      ]
//  })

//监听数据修改事件
$('.layui-form').on('submit',function(e){
    //阻止表单的默认提交行为
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success:function(res){
            if(res.status !== 0){
               return layer.msg(res.message)
            }
            layer.msg(res.message)
            window.parent.getUserInfo()
        }
    })
})
})



