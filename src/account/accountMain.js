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
                'account/detail',
                {
                    headers:{
                        'token':JSON.parse(localStorage.getItem('session'))
                    }
                },
                function(data1){
                    if(data1.resultCode =="60002"){
                        window.location.href = template.routPath().path+'login.html';
                        return ; 
                    }
                    template.htmlModule(data1.result,$('#accountmain')[0],adminTemp);
                    template.ajaxObj(
                        'account/statistic',
                        {
                            headers:{
                                'token':JSON.parse(localStorage.getItem('session'))
                            }
                        },
                        function(data1){
                            $('#pay').text(data1.result.waitingPayOrders);
                            $('#prepaid').text(data1.result.hasPayedOrders);
                            $('#logout').click(function(){
                                localStorage.removeItem('session');
                                window.location.href = '../login.html';
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