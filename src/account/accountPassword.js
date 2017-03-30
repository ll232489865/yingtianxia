require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "moduleHtml":'../js/common',
        "accountCommon":'accountCommon',
        "adminTemp":'../output/admin/template',
        "vaildate" : "../js/widget/vaildate",
        "md5" : "../js/libs/md5",
    }
    ,
    shim: {
         'md5':{
            exports: 'md5'
         }
　　　　}
})
define(['jquery','moduleHtml','accountCommon','adminTemp','md5','vaildate'],function($,template,accountCommon,adminTemp,md5){
   template.ajaxObj('sign/session',{},function(data){
        if(data.resultCode==0){
            template.htmlModule({},$('#accountpassword')[0],adminTemp);
            $('#getvali').click(function(){
                template.ajaxObj(
                    'sms/sendtext',
                    {
                        type:"post",
                        headers:{'token':JSON.parse(localStorage.getItem('session'))},
                        data:{opType:2,mobile:18218021822}
                    },
                    function(data1){
                        if(data1.resultCode =="60002"){
                            window.location.href = template.routPath().path+'login.html';
                            return ; 
                        }
                        console.log(data1)
                })
            })
            $("#myform").checkForm({},function(flag){
                template.ajaxObj(
                    'pwd/reset',
                    {
                        type:"post",
                        headers:{'token':JSON.parse(localStorage.getItem('session'))},
                        data:{
                            'mobile':$('#mobile').val(),
                            'password':md5($('#newpasswprd').val()),
                            'repassword':md5($('#repasswprd').val()),
                            'smsCode':$('#valiCode').val()
                        }
                    },
                    function(data1){
                        alert('修改成功,点击确定回到登录界面');
                        localStorage.removeItem('session');
                        window.location.href="../login.html";
                })
            });
        }else{
            console.log(data.resultCode)
        }
        
    })
})