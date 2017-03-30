require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
        "moduleHtml":'js/common',
        'tab':'js/widget/tab'
    }

})

require(['jquery','moduleHtml','tab'],function($,template,tab){
     tab.tab($('.Tab'));
     var id = template.catchParameter(window.location.href,'#');
     $('.Tab_ver_area .Tab').eq(id).click();
});