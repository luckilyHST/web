//每次调用 $.post()  $.get()  $.ajax()的时候
//会先调用 ajaxPrefilter 这个函数
//在这个函数中，可以拿到提交的 $.ajax()配置对象
$.ajaxPrefilter(function(options){
    //统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // console.log(options.url)

    //统一为有权限的接口，设置 headers 请求
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //代码优化 统一为Ajax请求 设置 complete 回调函数
     //再发起ajax请求后，不论成功还是失败，最终都会调用complete回调函数
    options.complete = function(res){
        
<<<<<<< HEAD
        console.log(res)
=======
        // console.log(res)
>>>>>>> user

        // 在 complete 回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            //1.清空 token
            localStorage.removeItem('token')
            //2.强制跳转到登录页面
            location.href='http://127.0.0.1:5500/%E5%89%8D%E7%AB%AF/%E5%9F%BA%E7%A1%80/%E9%98%B6%E6%AE%B5%E5%9B%9B%20%E5%89%8D%E5%90%8E%E7%AB%AF%E4%BA%A4%E4%BA%92/web/login.html'
        }
        
    }
})