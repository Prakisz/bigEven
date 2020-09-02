$(function () {
    //点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //获取要操作的layui模块
    var form = layui.form
    //导入弹出层的模块
    var layer = layui.layer
    //添加表达的自定义校检规则
    form.verify({
        //自定义了一个叫做pwd的校检规则
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],
        //校检两次密码是否一致的规则
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            console.log(pwd);
            console.log(value   );
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        //阻止默认的提交行为
        e.preventDefault()
        //发起ajax请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',data,function(res){
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            //模拟人的点击行为
            $('#link_login').click()
        })
    })
    //登录界面的提交
    $('#form_login').submit(function (e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //将服务器返回的用户唯一标识 保存到本地存储
                localStorage.setItem('token',res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})