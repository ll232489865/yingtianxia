require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "moduleHtml":'../js/common',
        "accountCommon":'./accountCommon',
        "downlist":'../js/widget/downlist',
        "adminTemp":'../output/admin/template',
        "vaildate" : "../js/widget/vaildate"
    }
})
define(['jquery','moduleHtml','accountCommon','adminTemp','vaildate','downlist'],function($,template,accountCommon,adminTemp,vaildate,downlist){
    var userArray = null;
    var hash;
    // console.log('2019-11-23'.match(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g))
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
                  if(data.resultCode =="60002"){
                            window.location.href = template.routPath().path+'login.html';
                            return ; 
                        }
                  template.htmlModule({list:data1.result.data},$('#accountaddcmaper')[0],adminTemp);
                  downlist.selectChosen($('.Downlist'));
                  function valTime($obj){
                    if($obj.val().match(/(^$)|(^(20\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$)/g)){
                               
                            $obj.siblings('span').css('color','#666'); 
                            return true;
                        }else{
                            
                            $obj.siblings('span').css('color','red');
                            return false
                        }
                  }
                   $("#myform").checkForm({},function(flag){
                        var sexnumb = $('input:radio').filter(function(i){
                                return ($(this).attr('name') == 'sex' && $(this).is(':checked'))
                            })

                            var typenumb = $('input:radio').filter(function(i){
                                return ($(this).attr('name') == 'type' && $(this).is(':checked'))
                            })
                            template.ajaxObj('account/member/add',{
                                type:'post'
                                ,
                                headers:{
                                        'token':JSON.parse(localStorage.getItem('session'))
                                    }
                                    ,
                                data:{
                                    name:$('#addcam_name').val(),
                                    gndr:sexnumb.attr('data-num'),
                                    type:typenumb.attr('data-num'),
                                    idcard:$('#addcam_sfz').val(),
                                    passportNation:$('#Downlistdown1 .Downlist_link_on').index()+1,
                                    passportNo:$('#addcam_hznb').val(),
                                    passportInvalidTm:$('#addcam_time').val(),
                                    cmmnt:$('#addcam_tips').val()
                                }
                            },function(data){
                                console.log($('#addcam_time').val());
                                alert('添加成功');
                            })
                      
                    });
            })
        }
        
    });
    $()
    
})

