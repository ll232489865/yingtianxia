require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
    }
})
define(['jquery'],function($){
    function selectChosen($obj,callback){
    var that,$warp,data;
    $obj.click(function(event){
        // $('.ChoiceWarp').hide();
        that = $(this);
        data = that.attr('data-rel');
        var w = that.outerWidth();
        var h = that.outerHeight()
        $warp = $('.DownlistWarp').filter(function(index){
            return $(this).attr('id') == data;
        });
        event.stopPropagation();
        
        $(this).addClass('Choice_open');
        $warp.show().css({
            'left':$(this).position().left,
            'top':$(this).position().top+h-1,
            'width':w-2
        });
    });
    $('.DownlistWarp').delegate('.Downlist_link','click',function(event){
        $(this).parent('.DownlistWarp').hide();
        $(this).addClass('Downlist_link_on').siblings().removeClass('Downlist_link_on');
        that.removeClass('Choice_open').find('.Downlist_w').text($(event.target).text()).attr('data-id',$(this).attr('id'));
        // console.log(!!callback);
        callback && callback($(this));
    });
    $(document).click(function(){
        $('.ChoiceWarp').hide();
    })} 
    return {
        selectChosen:selectChosen
    }
})







