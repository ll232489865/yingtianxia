require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
        "moduleHtml":'js/common',
        "vaildate" : "js/widget/vaildate",
        "tab":'js/widget/tab',
    }
    ,
    shim: {
         'moduleHtml':{
            exports: 'template'
         }
　　　　}
})

define(['jquery','moduleHtml','vaildate'],function($,template,vaildate){
    $("#myform").checkForm();
    var id = template.catchParameter(window.location.href,'#');
     $('.PayPro_line .PayPro_item').removeClass('PayPro_on').eq(id).addClass('PayPro_on');
});

