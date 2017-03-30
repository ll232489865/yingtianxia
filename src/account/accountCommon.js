require.config({
    paths : {
        "moduleHtml":'../js/common',
        "jquery" : "../js/libs/jquery.min",
        "powerSwitch":'../js/libs/jquery-powerSwitch',
    }
    ,
    shim: {
        'moduleHtml':{
            exports: 'template'
         }
         ,
         'powerSwitch':{
            deps: ['jquery'],
            exports: '$'
         }
　　　　}
})

define(['moduleHtml','jquery','powerSwitch'],function(template,$,powerSwitch){
    //获取页面的路径前缀
    path= template.routPath();

    //设置本地信息，信息是关于左边菜单UI状态 默认是first=0 second=null path=接口获取
    if(!localStorage.getItem("accountBarInfo"))
    {
        template.localStorageObj('accountBarInfo',$.extend(template.defaultRoutOps,{path:path.path}))
        template.htmlModule(template.defaultRoutOps);
    }else{
        template.htmlModule($.extend(JSON.parse(localStorage.getItem('accountBarInfo')),{path:path.path}));
    }

    //从本地存储里面得到了菜单UI状态参数
    var accountBarInfo = JSON.parse(localStorage.getItem('accountBarInfo'));
    //改变菜单的狂态，分别是 一级菜单谁展示， 二级菜单是否展开，若二级菜单展开，那么展开后谁是显示状态
    var finddd = $('#accountbar .Tab_ver').eq(1);
    if(accountBarInfo.second == undefined){
        $('#accountbar .Tab_ver_area').children().removeClass('Tab_ver_on').eq(accountBarInfo.first+1).addClass('Tab_ver_on');
        finddd.find('dd').display = 'none';
    }else{
        finddd.find('dl').css('display','block');
        finddd.find('.Tab_ver_second').removeClass('Tab_ver_second_on').eq(accountBarInfo.second).addClass('Tab_ver_second_on');
    }
    //点击菜单按钮，改变本地存储信息
    $('.nav_control').click(function(event){
        event.stopPropagation();
        var second = $(this).data('second');
        var obj;
        if(!second){
            obj = {first: $(this).index()-1,second: null,path :path.path}
        }else{
            obj = {first: $(this).parents('.Tab_ver').index()-1,second: $(this).parent().index(),path :path.path}
        }
        //点击菜单 改变菜单状态
        var stringObj = JSON.stringify(obj);
        template.localStorageObj('accountBarInfo',obj)
        localStorage.setItem("accountBarInfo", stringObj);
    });
    //滑动插件
    $(".handTitle").powerSwitch({
        toggle:true,
        animation: "slide"
    });
});