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
    var id = template.catchParameter(window.location.href,"#");
    template.ajaxObj('sign/session',{},function(data){
        if(data.resultCode==0){
            template.ajaxObj(
                'account/member/detail',
                {
                    data:{
                        id: id
                    },
                    headers:{
                        'token':JSON.parse(localStorage.getItem('session'))
                    }
                },
                function(data1){
                    if(data1.resultCode =="60002"){
                            window.location.href = template.routPath().path+'login.html';
                            return ; 
                        }
                  template.htmlModule({list:$.extend(data1.result,{passportInvalidTm:new Date(data1.result.passportInvalidTm).Format('yyyy-MM-dd')})},$('#accountaddcmaper')[0],adminTemp);
                  downlist.selectChosen($('.Downlist'));
                   $("#myform").checkForm({},function(flag){
                           var sexnumb = $('input:radio').filter(function(i){
                                return ($(this).attr('name') == 'sex' && $(this)[0].checked)
                            })
                            var typenumb = $('input:radio').filter(function(i){
                                return ($(this).attr('name') == 'type' && $(this)[0].checked)
                            })
                            template.ajaxObj('account/member/update',{
                                type:'post'
                                ,
                                headers:{
                                        'token':JSON.parse(localStorage.getItem('session'))
                                    }
                                    ,
                                data:{
                                    id:id,
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
                                alert('修改成功');
                            })
                      
                    });
            })
        }else{
            console.log(data.resultCode);
        }
        
    });
    $()
    
})

