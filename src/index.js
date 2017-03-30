require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
        "powerSwitch":'js/libs/jquery-powerSwitch',
        "moduleHtml":'js/common'
    }
    ,
    shim: {
         'powerSwitch':{
            deps: ['jquery'],
            exports: 'powerSwitch'
         }
         ,
         'moduleHtml':{
            exports: 'template'
         }
　　　　}
})
define(['jquery','powerSwitch','moduleHtml'],function($,powerSwitch,template){
    $(function(){
        //轮播接口
        template.ajaxObj('scrollPicture/list',{},function(data){
            var dataArray = data.result.data;
            $.each( dataArray, function(i, n){
                $('#bn_position').before('<a class="bn_img" href="'+ dataArray[i].linkUrl +'" style="background-image: url('+dataArray[i].scrollPicUrl+'); display: '+ (i==0? 'block':'none') +';" id="adImage'+i+'"></a>');
                $('#bn_position').append('<a href="javascript:" class="bn_control '+(i==0? 'active' :'')+'" data-rel="adImage'+i+'"></a>')
            });
            $("#bn_position").find("a").powerSwitch({
                eventType: "hover",
                classAdd: "active",
                animation: "fade",
                autoTime: 5000,
                container: $("#bn_slide"),
                onSwitch: function(image) {
                    if (!image.attr("src")) {
                        image.attr("src", image.attr("data-src"));
                    }
                }
            }).eq(0).trigger("mouseover");
        });
        //活动接口
        template.ajaxObj('activity/list',{},function(data){
            var activityArray = data.result.data;
            //国内营，国外营
            var type1Array = [] ,type2Array = [];
            $.each( activityArray, function(i, n){
                var linkurl = 'detail.html?id='+activityArray[i].id;
                var addData = {
                    insrtTmstmp:new Date(activityArray[i].insrtTmstmp).Format('yyyy-MM-dd')
                }
                activityArray[i].type==0? type1Array.push($.extend(activityArray[i],addData)) : type2Array.push($.extend(activityArray[i],addData))
            });
            //活动展示， 没中活动都是显示7个， 第一个特别显示，后面的6个刷列表，所以这里把后面的列表需要的原料准备好
            type1ArrayList = type1Array.slice(1,8);
            type2ArrayList = type2Array.slice(1,8); 
            //刷模板
            template.htmlModule({list:type2ArrayList},$('#activeity2')[0]);
            template.htmlModule({list:type1ArrayList},$('#activeity')[0]);


            $('#campsite .sp_img').attr('src',type2Array[0].picUrl);
            $('#campsite .sp_a').attr('href','detail.html?id='+type2Array[0].id);
            $('#campsite .sp_date').text(type2Array[0].insrtTmstmp);
            $('#campsite .sp_days').text(type2Array[0].activityPeriodListResponses[0].days+'天');
            $('#campsite .sp_cost').text(type2Array[0].activityPeriodListResponses[0].fee+'元');

            $('#international .sp_img').attr('src',type1Array[0].picUrl);
            $('#international .sp_a').attr('href','detail.html?id='+type1Array[0].linkUrl);
            $('#international .sp_date').text(type1Array[0].insrtTmstmp);
            $('#international .sp_days').text(type1Array[0].activityPeriodListResponses[0].days+'天');
            $('#international .sp_cost').text(type1Array[0].activityPeriodListResponses[0].fee+'元');
            
        });

        //文章接口
        template.ajaxObj('article/list',{},function(data){
            //总数据
            var totalArray = data.result.data;

            $.each( totalArray, function(i, n){
                var addData = {
                    insrtTmstmp:new Date(totalArray[i].insrtTmstmp).Format('yyyy-MM-dd')
                }
                $.extend(totalArray[i],addData);
            });
            

            //轮播数据
            var carouselArray = totalArray.slice(0,3);
            //带图片的新闻
            var imgarticleArray = totalArray.slice(4,6);
            //文字数据
            var articleListArray = totalArray.slice(6);
            //新闻轮播
            // console.log(articleListArray.length)
            var articlelistsArray = {
                    carouselArray:carouselArray,
                    imgarticleArray:imgarticleArray,
                    articleListArray:articleListArray
            };
            console.log(articlelistsArray);
            template.htmlModule({list:articlelistsArray},$('#articlelists')[0]);    
            $("#ce_position").find("a").powerSwitch({
                eventType: "hover",
                classAdd: "active",
                animation: "fade",
                autoTime: 5000,
                container: $("#bn_slide"),
                onSwitch: function(image) {
                    if (!image.attr("src")) {
                        image.attr("src", image.attr("data-src"));
                    }
                }
            }).eq(0).trigger("mouseover");

                        
        });
    })
});
