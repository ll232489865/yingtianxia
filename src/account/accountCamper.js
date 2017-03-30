require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "moduleHtml":'../js/common',
        "accountCommon":'./accountCommon',
        "adminTemp":'../output/admin/template',
        "vaildate" : "../js/widget/vaildate"
    }
})
define(['jquery','moduleHtml','accountCommon','adminTemp','vaildate'],function($,template,accountCommon,adminTemp,vaildate){
    var userArray = null;
    var hash;
    
    template.ajaxObj('sign/session',{},function(data){
        if(data.resultCode==0){
            template.ajaxObj(
                'account/member/list',
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
                  template.htmlModule({list:data1.result.data},$('#accountcmaper')[0],adminTemp);
                  $('.delete').click(function(){
                       var that = $(this);
                      var id = that.attr('data-id');
                      template.ajaxObj('account/member/delete',{
                          type:'post',
                          data:{id},
                          headers:{
                                'token':JSON.parse(localStorage.getItem('session'))
                            }
                      },function(){
                         that.parents('tr').remove();
                         if($('table tr').length==1){
                             template.ajaxObj(
                                'account/member/list',
                                {
                                    headers:{
                                        'token':JSON.parse(localStorage.getItem('session'))
                                    }
                                },
                                function(data1){ 
                                template.htmlModule({list:data1.result.data},$('#accountcmaper')[0],adminTemp);
                            })
                         }
                      })
                  })
            })
        }
        
    })
})

