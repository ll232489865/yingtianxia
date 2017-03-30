require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
        "moduleHtml":'js/common',
    }

})

define(['jquery','moduleHtml'],function($,template){
    template.ajaxObj('article/list',{},function(data){
        var articleArray = data.result.data;
        $.each( articleArray, function(i, n){
            $.extend(articleArray[i],{insrtTmstmp:new Date(articleArray[i].insrtTmstmp).Format("yyyy-MM-dd")})
        });
        console.log(articleArray);
        template.htmlModule({list:articleArray},$('#campsitelist')[0]);
    });
    
});