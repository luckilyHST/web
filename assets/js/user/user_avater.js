$(function(){
    var layer = layui.layer


    //渲染用户头像
    function Info(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success:function(res){
                if(res.status !== 0){
                    layer.msg('打开页面失败')
                }
                console.log(res)
                $('#image').attr('src',res.data.user_pic)
                // console.log(res.data.user_pic)
            }
        })
    }
    Info()


    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
    }
  
    // 1.3 创建裁剪区域
    $image.cropper(options)

    //为上传按钮绑定点击事件
    $('#btnChooseImage').on('click',function(){
        $('#file').click()
    })

    //为文件选择框绑定 chnage 事件
    $('#file').on('change',function(e){
        var fileList = e.target.files
        if(fileList.length === 0){
            return layer.msg('请选择照片')
        }
        // console.log(fileList)
        //拿到用户选择的文件
        var file = e.target.files[0]
        //将其转换成路径
       var imgURL = URL.createObjectURL(file);
       console.log(imgURL)
        //重新创建裁剪区域
        $image
        .cropper('destroy') //销毁旧的裁剪区域
        .attr('src',imgURL)   //重新设置图片路径
        .cropper(options)   //重新初始化裁剪区域
    })

    //确认修改并上传用户头像
    $('#btnUpload').on('click',function(){
        //1、拿到用户裁剪之后的头像
        var dataURL = $image
        .cropper('getCroppedCanvas',{
            //创建一个 Canvas 画布
            width:350,
            height: 350,
        }).toDataURL('image/png') // Canvas 画布里的内容转换为 base64 格式的字符串

        //2.发起ajax请求，将头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('更新用户头像失败')
                }
                layer.msg('更新用户头像成功')
                window.parent.getUserInfo()
            }
        })
    })
})