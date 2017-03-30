require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
        "moduleHtml":'js/common',
        "downlist":'js/widget/downlist',
        "fixedFloat":'js/widget/fixedFloat',
        "tab":'js/widget/tab',
    }
    ,
    shim: {
         'moduleHtml':{
            exports: 'template'
         }
　　　　}
})

define(['jquery','moduleHtml','downlist','fixedFloat','tab'],function($,template,downlist,fixedFloat,tab){
    var urlId = template.catchParameter(window.location.href,'=')
    template.ajaxObj('activity/detail',{
        data:{
            id:urlId
        }
    },function(data){
        //得到活动详情数据，并且把时间给转一下
        var datailArray = $.extend(data.result,{insrtTmstmp:new Date(data.result.insrtTmstmp).Format("yyyy-MM-dd")});
        //得到活动期数的数据以及相关数据
        template.ajaxObj('activity/period/list?activeId='+urlId,{},function(data){
            var dataArray = data.result;

            //最终希望得到的一个整体的json数据是 {a:1,b:2,c:3,other[obj,obj,obj]}，所以有了下面的转换
            var otherArray = []
            $.each( dataArray, function(i, n){
               otherArray.push($.extend(dataArray[i],{startDt:new Date(dataArray[i].startDt).Format('yyyy-MM-dd')}))
            });
            var other = $.extend(data.result[0],{startDt:new Date(data.result[0].startDt).Format('yyyy-MM-dd')});
            $.extend(datailArray,{'other':otherArray});

            template.htmlModule({list:datailArray},$('#detail')[0]);

            $('#activity_introduction').html(datailArray.intr)
            $('#apply').html(datailArray.enrollDesc)
            $('#Schedule').html(datailArray.schedule)
            $('#feature').html(datailArray.feature)

            //预订
            $('#create_order').click(function(){
                var stageInit = $('#Downlistdown2 .Downlist_link').filter('.Downlist_link_on').index();
                var activestage = stageInit== -1 ? 1 : stageInit+1;
                window.location.href= 'create_order.html?id='+urlId+'&activestage='+ activestage;
            })

            //下拉框插件
            downlist.selectChosen($('.Downlist'),function(that){
                $('#price').text(that.attr('data-price'))
            });
            //浮动固定
            fixedFloat.fixedFloat($('.Tab_hor_area'));

            //下拉框点击
            tab.tab($('.Tab'),function(thisPanel,tab){
                $('body').animate({scrollTop:thisPanel.offset().top - tab.outerHeight()},500);
            });
             //加入收藏
            $('#store').click(function(){
                template.ajaxObj('sign/session',{},function(data){
                    if(data.resultCode==0){
                        alert(JSON.parse(localStorage.getItem('session')));
                        template.ajaxObj('activity/fav/add',{
                            type:'post'
                            ,
                            headers:{
                                    'token':JSON.parse(localStorage.getItem('session'))
                                }
                                    ,
                            data:{
                                id:urlId
                            }
                        },function(data){
                            console.log(data);
                            alert('收藏成功');
                            
                        })
                    }else{
                        alert('您还没有登录，先登录把')
                    }
                    
                })
                
            })
        })
        
    });
});



