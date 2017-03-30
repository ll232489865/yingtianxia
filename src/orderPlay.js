require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
        "moduleHtml":'js/common',
        "tab" : "js/widget/tab"
    }
})
define(['jquery','moduleHtml','tab'],function($,template,tab){
    tab.tab($('.Tab'));
    var id = template.catchParameter(window.location.href,'#');
    $('.PayPro_line .PayPro_item').removeClass('PayPro_on').eq(id).addClass('PayPro_on');

});
