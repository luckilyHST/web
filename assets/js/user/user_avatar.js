$(function(){
    var layer = layui.layer
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

        //
        $('#btnChooseImage').on('click',function(){
            $('#file').click()

        })

        //为文件框绑定 change 事件
        $('#file').on('change',function(e){
            var fileList = e.target.files
            if(fileList.length === 0){
                return layer.msg('上传失败')
            }
            var file = fileList[0]

          var fileURL =  URL.createObjectURL(file)
            console.log(fileURL)

            $image.cropper('destroy').attr('src',fileURL).cropper(options)

        })

        $('#btnUpload').on('click',function(){
            var img = $image.cropper('getCroppedCanvas',{width: 100,height: 100}).toDataURL('image/png')

            $.ajax({
                method: 'POST',
                url: '/my/update/avatar',
                data:{
                    avatar: img
                },
                success: function(res){
                    if(res.status !== 0){
                        return layer.msg('上传图片失败')
                    }
                    layer.msg('更新头像成功')
                    window.parent.getUserInfo()
                }
            })
        })

})