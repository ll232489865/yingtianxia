require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "moduleHtml":'../js/common',
        "accountCommon":'accountCommon',
        "adminTemp":'../output/admin/template',
        "vaildate" : "../js/widget/vaildate"
    }
})
define(['jquery','moduleHtml','accountCommon','adminTemp','vaildate'],function($,template,accountCommon,adminTemp){
   template.ajaxObj('sign/session',{},function(data){
        if(data.resultCode==0){
           $("#myform").checkForm({},function(flag){
                template.ajaxObj('mail/send',{
                        type:'post'
                        ,
                        headers:{
                                'token':JSON.parse(localStorage.getItem('session'))
                            }
                            ,
                        data:{
                            mailTo: $('#email').val()
                        }
                    },function(data){
                        $('#sendEmail').text($('#email').val());
                        $('#bindSuccess').show();
                    })
                
            });
        }else{
            if(data.resultCode ==60002){
                window.location.href = template.routPath()+'login.html';
            }
        }
        
    })
})