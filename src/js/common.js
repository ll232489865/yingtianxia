var path = document.getElementsByTagName("html")[0].className.indexOf('Account') != '-1' ? path = '../' : path = './';
Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
var apiPath = function(path){
    return "http://192.168.1.10:8288/pc/" + path
}
require.config({
    paths : {
        "jquery" : path+"js/libs/jquery.min",
        "tpl":path+'output/main/template',
        "float":path+'js/widget/float'
    }
    ,
    shim: {
        'tpl':{
            exports: 'tpl'
        }
　　}
})
define(['jquery','tpl','float'],function($,template,float){
    function setModule(nanmeArray,data,templateObj){
        //后期，模板分为了admin 和 main 两个大的JS文件， 所以在插入模块的时候要选择是这里面的哪个文件加载，默认是加载的main的template.js
        //如果想加载一个admin里面的template.js 模块，则需要传入这个js对象
        var newtemplate = templateObj || template;
        if(nanmeArray instanceof Array)
        {
            //初始化加载模板
            nanmeArray.forEach(function(value,index,array){
                var htmlModule = newtemplate(value, data);
                document.getElementById(value).innerHTML = htmlModule;
            })
        }else{
            //一个个动态加载模板
            var htmlModule = newtemplate(nanmeArray.getAttribute('data-module'), data);
            nanmeArray.innerHTML = htmlModule;
        }
        
    }
    
    function searchList(inputObj){
         //取得div层 
            var $search = inputObj;
            //取得输入框JQuery对象 
            var $searchInput = $search.find('#search-text');
            //关闭浏览器提供给输入框的自动完成 
            $searchInput.attr('autocomplete', 'off');
            //创建自动完成的下拉列表，用于显示服务器返回的数据,插入在搜索按钮的后面，等显示的时候再调整位置 
            var $autocomplete = $('#searchResult').hide();
            $(".Sch_btn").click(function(){
               var value = $('#search-text').val().trim();
               var parms = getQueryStringArgs().parmObj;
               
               if(GetPageurl().indexOf('list.html')!=-1 && GetPageurl().indexOf('_')==-1){
                  var dataList=getQueryStringArgs().parmObj
                  ajaxObj('activity/list',{
                        data:{
                            type:parms.type,
                            name:value
                        }
                    },function(data1){
                        htmlModule({list:data1.result.data},$('#psrlist')[0]);
                    })
               }else{
                   var dataType = $('#search-text').attr('data-type')?$('#search-text').attr('data-type'):1;
                   window.location.href = routPath().path + 'list.html?type='+dataType+'&name='+ value;
               }
               
            });
            //清空下拉列表的内容并且隐藏下拉列表区 
            var clear = function() {
                    $autocomplete.empty().hide();
                };
            //注册事件，当输入框失去焦点的时候清空下拉列表并隐藏 
            $searchInput.blur(function() {
                setTimeout(clear, 500);
            });
            //下拉列表中高亮的项目的索引，当显示下拉列表项的时候，移动鼠标或者键盘的上下键就会移动高亮的项目，想百度搜索那样 
            var selectedItem = null;
            //timeout的ID 
            var timeoutid = null;
            //设置下拉项的高亮背景 
            var setSelectedItem = function(item) {
                    //更新索引变量 
                    selectedItem = item;
                    //按上下键是循环显示的，小于0就置成最大的值，大于最大值就置成0 
                    if (selectedItem < 0) {
                        selectedItem = $autocomplete.find('li').length - 1;
                    } else if (selectedItem > $autocomplete.find('li').length - 1) {
                        selectedItem = 0;
                    }
                    //首先移除其他列表项的高亮背景，然后再高亮当前索引的背景 
                    $autocomplete.find('li').removeClass('highlight').eq(selectedItem).addClass('highlight');
                };
            var ajax_request = function() {
                //    console.log($.extend(getQueryStringArgs().parmObj,{pageSize:'7'}))
                   console.log($('#search-text').val().trim());
                    //ajax服务端通信 
                    $.ajax({
                        'url': 'http://192.168.1.10:8288/pc/activity/list',
                        //服务器的地址 
                        'data':{
                            type:getQueryStringArgs().parmObj.type,
                            name:$('#search-text').val().trim(),
                            pageSize:7
                        },
                        //参数 
                        'dataType': 'json',
                        //返回数据类型 
                        'type': 'get',
                        //请求类型 
                        'success': function(data) {
                            if (data.result.data.length) {
                                //遍历data，添加到自动完成区 
                                $.each(data.result.data, function(index, term) {
                                    //创建li标签,添加到下拉列表中 
                                    $('<li class="Link_db" data-type="'+ term.type +'"></li>').text(term.name).appendTo($autocomplete).addClass('clickable').hover(function() {
                                        //下拉列表每一项的事件，鼠标移进去的操作 
                                        $(this).siblings().removeClass('highlight');
                                        $(this).addClass('highlight');
                                        selectedItem = index;
                                    }, function() {
                                        //下拉列表每一项的事件，鼠标离开的操作 
                                        $(this).removeClass('highlight');
                                        //当鼠标离开时索引置-1，当作标记 
                                        selectedItem = -1;
                                    }).click(function() {
                                        //鼠标单击下拉列表的这一项的话，就将这一项的值添加到输入框中 
                                        $searchInput.val(term.name);
                                        $searchInput.attr('data-type',$(this).attr('data-type'));
                                        //清空并隐藏下拉列表 
                                        $autocomplete.empty().hide();
                                    });
                                }); //事件注册完毕 
                                //设置下拉列表的位置，然后显示下拉列表 
                                // var ypos = $searchInput.position().top;
                                var xpos = $searchInput[0].getBoundingClientRect().left-1;
                                $autocomplete.css({
                                    'left': xpos + "px",
                                });
                                setSelectedItem(0);
                                //显示下拉列表 
                                $autocomplete.show();
                            }
                        }
                    });
                };
            //对输入框进行事件注册 
            $searchInput.keyup(function(event) {
                //字母数字，退格，空格 
                if (event.keyCode > 40 || event.keyCode == 8 || event.keyCode == 32) {
                    //首先删除下拉列表中的信息 
                    $autocomplete.empty().hide();
                    clearTimeout(timeoutid);
                    timeoutid = setTimeout(ajax_request, 100);
                } else if (event.keyCode == 38) {
                    //上 
                    //selectedItem = -1 代表鼠标离开 
                    if (selectedItem == -1) {
                        setSelectedItem($autocomplete.find('li').length - 1);
                    } else {
                        //索引减1 
                        setSelectedItem(selectedItem - 1);
                    }
                    event.preventDefault();
                } else if (event.keyCode == 40) {
                    //下 
                    //selectedItem = -1 代表鼠标离开 
                    if (selectedItem == -1) {
                        setSelectedItem(0);
                    } else {
                        //索引加1 
                        setSelectedItem(selectedItem + 1);
                    }
                    event.preventDefault();
                }
            }).keypress(function(event) {
                //enter键 
                if (event.keyCode == 13) {
                    //列表为空或者鼠标离开导致当前没有索引值 
                    if ($autocomplete.find('li').length == 0 || selectedItem == -1) {
                        return;
                    }
                    $searchInput.val($autocomplete.find('li').eq(selectedItem).text());
                    $autocomplete.empty().hide();
                    event.preventDefault();
                }
            }).keydown(function(event) {
                //esc键 
                if (event.keyCode == 27) {
                    $autocomplete.empty().hide();
                    event.preventDefault();
                }
            });
    }
    function htmlModule(data,html,templateObj){
        //如果html存在，则表示是单独的插入一个固定的模块，否则则是整体的框架模块
        if(!html){
            //如果路径为不等于../ 表示是不在个人中心
            if(data.path != '../'){
                if(document.getElementsByTagName("html")[0].className.indexOf('Header2')!= '-1'){
                    setModule(['footer2','header2'],data);
                    return;
                }
                setModule(['footer','header'],$.extend(data,{'session':JSON.parse(localStorage.getItem('session'))}));
                searchList($('#search'));
                AccountStatus();
                
            }
            //否则就在个人中心，那么就需要加载accountbar
            else{
                setModule(['footer','header','accountbar'],$.extend(data,{'session':JSON.parse(localStorage.getItem('session'))}));
                searchList($('#search'));
                AccountStatus();
            }
            //不论在不在个人中心，都需要处理顶部的浮层，以及点击事件
            float.float($('#Top_active2'));
            float.float($('#Top_active'));
            $('#signout').click(function(){
                var flag =  document.getElementsByTagName("html")[0].className.indexOf('Account'); 
                localStorage.removeItem('session');
                setModule(['header'],$.extend(data,{'session':JSON.parse(localStorage.getItem('session'))}));
                setTimeout(function() {
                    $('#searchResult').hide();    
                });
            })
        }else{
            setModule(html,data,templateObj);
        }
        
    }
    //本地存储对象化
    function localStorageObj(name,obj){
        var stringObj = JSON.stringify(obj); 
        localStorage.setItem(name, stringObj);
    }
    //返回路径
    function routPath(p){
        return  {
            path : document.getElementsByTagName("html")[0].className.indexOf('Account') != '-1' ? path = '../' : path = './'
        }
    }
    //封装ajax
    function ajaxObj(url,parms,callback){
        var defaultCfg = {
            dataType:'json',//服务器返回json格式数据
            type:'get',//HTTP请求类型
            timeout:60000,//超时时间
            data:{},
            headers:{},
            success:function(data){
                callback(data);
            },
            error:function(xhr,type,errorThrown){
                console.log('错误');
            }
        }
        var cfg = $.extend(defaultCfg,parms);
        $.ajax(apiPath(url),cfg);
    }
    //默认的个人中心菜单状态,first表示第一层目录，second表示第二层
    var obj = {first: 0,second: null},path= routPath();

    //加载main/template.js 这个是框架模块
    htmlModule($.extend(path,{'session':JSON.parse(localStorage.getItem('session'))}));
    function catchParameter(str,character){
        return str.substring(str.lastIndexOf(character)+1);
    }

    //得到参数
    function getQueryStringArgs() {
        var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
            args = {},
            items = qs.length ? qs.split("&") : [],
            item = null,
            name = null,
            value = null,
            parmStr = '?',
            i = 0,
            len = items.length;
   
        for (i = 0; i < len; i++) {
            item = items[i].split("=");
            
            // decodeURIComponent解码
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            parmStr+=decodeURIComponent(item[0]) + '=' + decodeURIComponent(item[1]) + (i==len-1?"":'&')
            if (name.length) {
                args[name] = value;
            }
        }
        return {
            parmObj:args,
            parmStr:parmStr
        }
    } 
    //得到url文件名
    function GetPageurl() 
    { 
        var url=window.location.href;//获取完整URL地址 
        var tmp= new Array();//临时变量，用于保存分割字符串 
        tmp=url.split("/");//按照"/"分割 
        var cc = tmp[tmp.length-1];//获取最后一部分，即文件名和参数 
        tmp=cc.split("?");//把参数和文件名分割开 
        return tmp[0];//返回值 
    }

    //点击顶部account菜单，变换account状态栏
    function AccountStatus(first,second){
        var data;
        $('#Top_warp2').delegate(".Link_db","click",function(){
            $(this).index()==1?data = {first: $(this).index(),second: 0} : data = {first: $(this).index(),second: null}
            var stringObj = JSON.stringify(data);
            localStorageObj('accountBarInfo',data)
            localStorage.setItem("accountBarInfo", stringObj);
            data =null;
        }); 
    }
    
    return {
        htmlModule : htmlModule,
        routPath : routPath,
        localStorageObj : localStorageObj,
        ajaxObj:ajaxObj,
        catchParameter:catchParameter,
        defaultRoutOps:obj,
        getQueryStringArgs:getQueryStringArgs,
        GetPageurl:GetPageurl,
        setModule:setModule
    }
});