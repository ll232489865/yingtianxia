/*TMODJS:{"version":36,"md5":"77cc2d2df148761e1d30b0f1a4df1eec"}*/
template('createorder',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,list=$data.list,$out='';$out+='<div class="l"> <a href="create_order.html?id';
$out+=$escape(list.id);
$out+='"> <img src="';
$out+=$escape(list.picUrl);
$out+='" width="200" alt=""> </a> </div> <div class="cell pl20"> <div class="order_detail fa"> <h2>';
$out+=$escape(list.name);
$out+=' </h2> <dl class="mt10 f14"> <span class="txt">出发日期 : </span> <span class="tit">';
$out+=$escape(list.other[0].name);
$out+=' ';
$out+=$escape(list.other[0].startDt);
$out+=' 共 ';
$out+=$escape(list.other[0].days);
$out+=' 天 </span> </dl> <dl> <span class="txt">&emsp;&emsp;单价 : </span> <span class="tit">￥';
$out+=$escape(list.other[0].fee);
$out+='</span> </dl> <dl> <span class="txt">数量</span> <span class="tit"> <input type="button" value="－" name="computerText1" data-computer="subtraction" class="computerText"> <input type="text" id="computerText1" value="1" readonly="readonly"> <input type="button" value="＋" name="computerText1" data-computer="addition" class="computerText"> <span class="orange tourists" data-val="1">1</span> 人 </span> </dl> <dl><span class="txt">合计</span>￥<span class="orange need_topay" id="need_topay" name="need_topay" data-val="7980">';
$out+=$escape(list.other[0].fee);
$out+='</span></dl> </div> </div>';
return new String($out);
});