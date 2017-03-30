require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
        "moduleHtml":'js/common'
    }
})

define(['jquery','moduleHtml'],function($,template){
    template.ajaxObj('article/detail',{
        data:{
            id:template.getQueryStringArgs().parmObj.id
        }
    },function(data){
        resultData =  data.result;
        $('#Part_tt').text(resultData.title);
        $('#Part_time').text(new Date(resultData.insrtTmstmp).Format("yyyy-MM-dd hh:mm"));
        $('#Part_article').html(resultData.article);
    });
});