require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "moduleHtml":'../js/common',
        "accountCommon":'accountCommon',
        "adminTemp":'../output/admin/template',
    }
})
define(['jquery','moduleHtml','accountCommon','adminTemp'],function($,template,accountCommon,adminTemp){
   template.ajaxObj('sign/session',{},function(data){
        if(data.resultCode==0){
            template.ajaxObj(
                'order/list',
                {
                    headers:{
                        'token':JSON.parse(localStorage.getItem('session'))
                    }
                },
                function(data1){
                    var totalArray = data1.result.data;
                    console.log(data1);
                    totalArray.forEach(function(value, i, array){
                        $.extend(totalArray[i],{
                            orderTm: new Date(totalArray[i].orderTm).Format('yyyy-MM-dd hh:mm:ss'),
                            startDt: new Date(totalArray[i].startDt).Format('yyyy-MM-dd'),
                        })
                    })
                    template.htmlModule({list:$.extend(totalArray,{totle:true})},$('#accountorder')[0],adminTemp);

                    $("#accountorder").delegate('.Label_30','click',function(){
                        var callee = arguments.callee;
                        var i = $(this).attr('data-id');
                        var index = $(this).index();
                        template.ajaxObj('sign/session',{},function(data){
                            if(data.resultCode==0){
                                template.ajaxObj(
                                    'order/list',
                                    {
                                        headers:{
                                            'token':JSON.parse(localStorage.getItem('session'))
                                        }
                                        ,
                                        data:{
                                            status:i==0?"":i
                                        }
                                    }
                                    ,
                                    function(data1){
                                        var totalArray = data1.result.data;
                                        totalArray.forEach(function(value, i, array){
                                            $.extend(totalArray[i],{
                                                orderTm: new Date(totalArray[i].orderTm).Format('yyyy-MM-dd hh:mm:ss'),
                                                startDt: new Date(totalArray[i].startDt).Format('yyyy-MM-dd'),
                                            })
                                        })
                                        template.htmlModule({list:$.extend(totalArray,{totle:true})},$('#accountorder')[0],adminTemp);
                                        $("#accountorder .Label_30").eq(index).addClass('Label_blue').removeClass('Label_white').siblings().addClass('Label_white').removeClass('Label_blue');
                                    })
                            }else{
                                if(data.resultCode ==60002){
                                    window.location.href = template.routPath()+'login.html';
                                }
                            }
                        })
                    })
                    $("#accountorder").delegate('.Btn_white','click',function(){
                        var self = $(this);
                        var id = $(this).attr('data-id');
                        template.ajaxObj('sign/session',{},function(data){
                            if(data.resultCode==0){
                                template.ajaxObj('order/cancelOrder',{
                                    type:'post',
                                    headers:{
                                        'token':JSON.parse(localStorage.getItem('session'))
                                    }
                                    ,
                                    data:{
                                        tn:id
                                    }
                                },function(){
                                    alert('您的订单已经取消');
                                    self.closest('.mt20').remove();

                                })
                            }else{
                                if(data.resultCode ==60002){
                                    window.location.href = template.routPath()+'login.html';
                                }
                            }
                        })
                    })
                    
            })
        }else{
            if(data.resultCode ==60002){
                window.location.href = template.routPath()+'login.html';
            }
        }
        
    })
})