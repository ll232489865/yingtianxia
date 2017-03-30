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
                    template.ajaxObj('activity/fav/list',{
                        headers:{
                            'token':JSON.parse(localStorage.getItem('session'))
                        }
                    },function(data1){
                        if(data1.resultCode =="60002"){
                            window.location.href = template.routPath().path+'login.html';
                            return ; 
                        }
                         console.log(data1);
                        var dataArray = data1.result.data
                        // console.log(dataArray);
                       $.each( dataArray, function(i, n){
                            var linkurl = 'detail.html?id='+dataArray[i].actvId;
                            $.extend(dataArray[i],{linkUrl:linkurl,favTm:new Date(dataArray[i].favTm).Format("yyyy-MM-dd")})
                        });
                        console.log(dataArray);
                       template.htmlModule({list:dataArray},$('#accountstore')[0],adminTemp);
                       
                       $('.delete').click(function(){
                       var that = $(this);
                            var id = that.attr('data-id');
                            template.ajaxObj('activity/fav/delete',{
                                type:'post',
                                data:{id:id},
                                headers:{
                                        'token':JSON.parse(localStorage.getItem('session'))
                                    }
                            },function(){
                                 that.closest('.fix').next().remove()
                                 that.closest('.fix').remove().next().remove();
                                if($('#accountstore .fix').length == 0){
                                    template.htmlModule({list:[]},$('#accountstore')[0],adminTemp)
                                }
                            })
                        })
                  })
            })
        }else{
            console.log(data.resultCode)
        }
        
    })
})