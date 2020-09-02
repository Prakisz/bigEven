//ajaxPrefilter 在发送之前执行
//options: 请求参数对象
$.ajaxPrefilter(function (options){
    console.log(options);
    //在发起真正的ajax请求之前，同意拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})