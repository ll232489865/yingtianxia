require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
        "moduleHtml":'js/common',
        "downlist":'js/widget/downlist'
    }
    ,
    shim: {
         'moduleHtml':{
            exports: 'template'
         }
　　　　}
})

define(['jquery','moduleHtml','downlist'],function($,template,downlist){
    var urlStr = window.location.hash;
    var listId = urlStr.substring(urlStr.lastIndexOf('#')+1);
    
     
        
    //加载模板
    template.ajaxObj('activity/list',{
        data:template.getQueryStringArgs().parmObj
    },function(data){
        var activityArray = data.result.data;
        $.each( activityArray, function(i, n){
            var linkurl = 'detail.html?id='+activityArray[i].id;
            
            $.extend(activityArray[i],{
                linkUrl:linkurl,
                insrtTmstmp:new Date(activityArray[i].insrtTmstmp).Format("yyyy-MM-dd"),
            })

            $.each( activityArray[i].activityPeriodListResponses, function(j, n){
                // debugger;
                $.extend(activityArray[i].activityPeriodListResponses[j],{
                    
                    startDt:new Date(activityArray[i].activityPeriodListResponses[j].startDt).Format("yyyy-MM-dd")
                })
            });
            
        });

        template.htmlModule({list:activityArray},$('#psrlist')[0]);
        template.htmlModule({list:activityArray},$('#filterlist')[0]);
        //加载城市
        template.ajaxObj('/areas',{},function(data1){
            var addressArray = data1.result;
            var str = '<a href="javascript:"  class="Lfilter_item Lfilter_item_off">不限</a>';
            $.each( addressArray, function(i, n){
                str += '<a href="javascript:"  class="Lfilter_item" data-addrid="'+ addressArray[i].id+'">'+addressArray[i].name+'</a>';
            });
            $('#filteradd').html(str);
            $('.Lfilter_item').click(function(){
                    $(this).addClass('Lfilter_item_off').siblings().removeClass('Lfilter_item_off');
                    var addrAreaId= $('#filteradd .Lfilter_item').filter('.Lfilter_item_off').attr('data-addrid');
                    var name = $('#filtername .Lfilter_item').filter('.Lfilter_item_off').text().trim();
                    $(this).addClass('Lfilter_item_off').siblings().removeClass('Lfilter_item_off');
                    var dataList={
                        type:template.getQueryStringArgs().parmObj.type
                    };
                    
                    if(name!='不限'){
                        $.extend(dataList,{name:name})
                    }
                    if(addrAreaId!='不限'){
                        $.extend(dataList,{areaId:addrAreaId})
                    }

                    template.ajaxObj('activity/list',{
                        data:dataList
                    },function(data1){
                        var activityArray = data1.result.data;
                            $.each( activityArray, function(i, n){
                                var linkurl = 'detail.html?id='+activityArray[i].id;
                                
                                $.extend(activityArray[i],{
                                    linkUrl:linkurl
                                })

                                $.each( activityArray[i].activityPeriodListResponses, function(j, n){
                                    // debugger;
                                    $.extend(activityArray[i].activityPeriodListResponses[j],{
                                        
                                        startDt:new Date(activityArray[i].activityPeriodListResponses[j].startDt).Format("yyyy-MM-dd")
                                    })
                                });
                                
                            });
                        template.htmlModule({list:activityArray},$('#psrlist')[0]);
                        downlist.selectChosen($('.Downlist'),function(that){
                            var a = that.attr('data-rel');
                            $('#'+a).text(that.attr('data-price'));
                        });
                    })
                })
        })

       

        $('#filterSch').click(function(){
            var text =$(this).prev().val().trim() ;
            if(text==''||text==$(this).attr('placeholder')){
                alert('请输入合适的关键字');
            }else{
                var dataList={
                    type:template.getQueryStringArgs().parmObj.type,
                    name:text
                };
                template.ajaxObj('activity/list',{
                data:dataList
            },function(data1){
                    template.htmlModule({list:data1.result.data},$('#psrlist')[0]);
                    downlist.selectChosen($('.Downlist'),function(that){
                        var a = that.attr('data-rel');
                         $('#'+a).text(that.attr('data-price'));
                    });
                })
            }
        })
        downlist.selectChosen($('.Downlist'),function(that){
            var a = that.attr('data-rel');
            $('#'+a).text(that.attr('data-price'));
        });
    });
    
});



