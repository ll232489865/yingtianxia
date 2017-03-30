require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
        "moduleHtml":'js/common',
        "vaildate" : "js/widget/vaildate",
        "tab" : "js/widget/tab",
        "vaildate" : "js/widget/vaildate"
    }
})

define(['jquery','moduleHtml','vaildate','tab','vaildate'],function($,template,vaildate,tab){
    tab.tab($('.Tab'));
    var activeStage = template.getQueryStringArgs().parmObj.activestage;
    template.ajaxObj('activity/detail',{
        data:{
            id:template.getQueryStringArgs().parmObj.id
        }
    },function(data){
        //得到活动详情数据，并且把时间给转一下
        var datailArray = $.extend(data.result,{insrtTmstmp:new Date(data.result.insrtTmstmp).Format("yyyy-MM-dd")});
        // template.htmlModule({},$('#createorder')[0]);
        
        //得到活动期数的数据以及相关数据
        template.ajaxObj('activity/period/list',{
            data:{
                activeId:template.getQueryStringArgs().parmObj.id
            }
        },function(data){
            var dataArray = data.result;

            //最终希望得到的一个整体的json数据是 {a:1,b:2,c:3,other[obj,obj,obj]}，所以有了下面的转换
            var otherArray = []
            $.each( dataArray, function(i, n){
               if(i==(activeStage-1)){
                 otherArray.push($.extend(dataArray[i],{startDt:new Date(dataArray[i].startDt).Format('yyyy-MM-dd')}));
                 return false;
               } 
            });
            var other = $.extend(data.result[0],{startDt:new Date(data.result[0].startDt).Format('yyyy-MM-dd')});
            $.extend(datailArray,{'other':otherArray});
            console.log(datailArray);
            //支付订单
            $("#myform").checkForm({},function(){
                template.ajaxObj('sign/session',{},function(data){
                    if(data.resultCode==0){
                        template.ajaxObj('enroll',{
                            type:'post',
                            headers:{
                                'token':JSON.parse(localStorage.getItem('session'))
                            }
                            ,
                            data:{
                                actvPeriodId:datailArray.other[0].id,
                                contactMobile:$('#orderMobile').val().trim(),
                                contactPeople:$('#orderName').val().trim(),
                                description:$('#orderTips').val().trim(),
                                unitPrice:$('#need_topay').text().trim(),
                                nums:$('#computerText1').val().trim(),
                                payType:1,
                                webReturnUrl:'https://www.baidu.com/'
                            }
                        },function(data){
                                if(data.resultCode==60002){
                                    alert(data.resultMsg)
                                    localStorage.removeItem('session');
                                    template.setModule(['header'],$.extend(template.routPath(),{'session':JSON.parse(localStorage.getItem('session'))}));
                                    return
                                }
                                $('#pay_success').html(data);
                            })
                        }else{
                            alert('回话过期了')
                        }
                    })
                    
                });
            template.htmlModule({list:datailArray},$('#createorder')[0]);
            $('.computerText').click(function(){
                var name= $(this).attr('name');
                var method= $(this).attr('data-computer');
                var inputBox = $('#'+name);
                var num = parseInt(inputBox.val().trim());
                var basePrice = datailArray.other[0].fee;
                if(method=='addition'){
                    inputBox.val(num+=1);
                }else{
                    if(inputBox.val().trim()==0){
                        return;
                    }
                    inputBox.val(num-=1);
                }
                $("#need_topay").text(parseInt(num)*basePrice)
            })
            
        })
    })
        
     
});