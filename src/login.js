require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
        "moduleHtml":'js/common',
        "md5" : "js/libs/md5",
    }
    ,
    shim: {
         'moduleHtml':{
            exports: 'template'
         }
　　　　}
})


require(['jquery','moduleHtml','md5'],function($,template,md5){
    $("#login_btn").click(function(){
        template.ajaxObj(
            '/sign/signin',
            {
                type:'post',
                data:{
                    account:$('#login_key').val(),
                    password:md5($('#login_password').val())
                }
            }
            ,
            function(data){
                if(data.resultCode == 0) {
                    localStorage.setItem("session",JSON.stringify(data.result.sessionID));
                    window.location.href= 'index.html'
                }else{
                    $('#login_error').text(data.resultMsg).css('visibility','visible');
                }
            }
        )
    })
});



