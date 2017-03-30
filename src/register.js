require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
        "moduleHtml":'js/common',
        "vaildate" : "js/widget/vaildate",
        "md5" : "js/libs/md5",
        "tab":'js/widget/tab',
    }
    ,
    shim: {
         'moduleHtml':{
            exports: 'template'
         }
         ,'md5':{
            exports: 'md5'
         }
　　　　}
})
define(['jquery','moduleHtml','vaildate','md5'],function($,template,vaildate,md5){
    $('#getvali').click(function(){
        template.ajaxObj(
                'sms/sendtext',
                {type:'post',data:{mobile:'18218021822',opType:1}},
                function(data){
                    
                    
                })
    })
    $("#myform").checkForm({},function(flag){
        if($('#ready').prop('checked')){
            template.ajaxObj(
                'register',
                {
                    type:'post',             
                    data:{
                        mobile:$("#mobile").val(),
                        password:md5($('#pasw').val()),
                        repassword:md5($('#pasw').val()),
                        smsCode:$('#valiCode').val() 
                    }
                }
            ,function(data){ 
                $("#res_success").css('display','block');
                var countDown = function(times){
                    if(!times||isNaN(parseInt(times))){
                        window.location.href="login.html";
                        // window.location=document.referrer;
                        return;
                    }
                    var args = arguments;
                    var self = this;
                    $('#res_success h2').text('你已经注册成功，'+times+'秒之后会跳转到登录页面');
                    setTimeout(function(){args.callee.call(self,--times)},1000);
                    
                }
                countDown(5);
            }
        );
        }else{
            alert('需要同意用户协议');
        } 
    });
    
    
});
