require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "qiniu" : "../js/libs/qiniu.min",
        "plupload" : "../js/libs/plupload.full.min",
        "moduleHtml":'../js/common',
        "accountCommon":'./accountCommon',
        "adminTemp":'../output/admin/template',
        "vaildate" : "../js/widget/vaildate"
    }
})
define(['jquery','moduleHtml','accountCommon','adminTemp','vaildate','qiniu','plupload'],function($,template,accountCommon,adminTemp,vaildate){
    var userArray = null;
    var hash;
    
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
                    userArray = data1.result;
                    
                    template.htmlModule(data1.result,$('#acutInfo')[0],adminTemp);
                     $("#myform").checkForm({},function(flag){
                        template.ajaxObj(
                            'account/update',
                            {
                                type:"post",
                                headers:{'token':JSON.parse(localStorage.getItem('session'))},
                                data:{
                                    'name':$('#accountInfo_name').val(),
                                    'nicknm':$('#accountInfo_nik').val(),
                                    'liveAddr':$('#accountInfo_add').val(),
                                    'avatar':hash
                                }
                            },
                            function(data1){
                                alert('修改成功');
                        })
                    });
                    template.ajaxObj('qiniu/get_uptoken',{
                        headers:{
                            'token':JSON.parse(localStorage.getItem('session'))
                        }
                    },function(data){
                        var uploader = Qiniu.uploader({
                            runtimes: 'html5,html4',      
                            browse_button: 'pickfiles',     
                            uptoken:data.uptoken,
                            get_new_uptoken: true,             
                            domain: 'http://oaa4szy4p.bkt.clouddn.com',     
                            container: 'container',             
                            max_file_size: '100mb',             
                            multi_selection:false,
                            // flash_swf_url: 'path/of/plupload/Moxie.swf',  
                            max_retries: 3,                     
                            dragdrop: false,                         
                            chunk_size: '4mb',      
                            save_key:true,            
                            auto_start: true,      
                            mime_types:[{title : '图片文件', extensions : 'jpg, gif, png'}]
                            ,          
                            init: {
                                'FilesAdded': function(up, files) {
                                    plupload.each(files, function(file) {
                                    });
                                },
                                'BeforeUpload': function(up, file) {
                                },
                                'UploadProgress': function(up, file) {
                                    
                                },
                                'FileUploaded': function(up, file, info) {
                                    var domain = up.getOption('domain');
                                    var res = JSON.parse(info).result;
                                    var sourceLink = domain +"/"+ res.key; 
                                    hash = res.key;
                                    $('#pickfiles img')[0].src = sourceLink;
                                },
                                'Error': function(up, err, errTip) {
                                    
                                },
                                'UploadComplete': function() {
                                    
                                },
                                'Key': function(up, file) {
                                    var key = "";
                                    return key
                                }
                            }
                        });
                        setTimeout(function(){
                            document.querySelector("input[type=file]").onchange = function(event){
                                console.log(this.value  + '111');
                            }
                        },0)
                        
                    });

                   
            })
       
     }
        
    })
})

