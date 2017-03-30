/*TMODJS:{"version":74,"md5":"20c273bcd98596f4362f1ef2faad1ac6"}*/
template('accountorder',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,list=$data.list,$each=$utils.$each,value=$data.value,index=$data.index,$escape=$utils.$escape,$out='';$out+=' <div class="p20" > <div> <span class="Label_30 Label_blue mr20" data-id="0"> 全部订单 </span> <span class="Label_30 Label_white mr20" data-id="1"> 待支付订金 </span> <span class="Label_30 Label_white mr20" data-id="3"> 完成订单 </span> <span class="Label_30 Label_white mr20" data-id="4"> 已取消 </span> </div> ';
if(list.length!=0){
$out+=' ';
$each(list,function(value,index){
$out+=' <div class="mt20"> <div>订单编号：<span class="ml5 mr10 C_3">';
$out+=$escape(value.tn);
$out+='</span> 订单创建时间 : ';
$out+=$escape(value.orderTm);
$out+='</div> <div class="fix mt10" style="border: 1px solid #ddd; padding: 20px;"> <div class="l"> <div class="f14 b"> ';
$out+=$escape(value.actvNm);
$out+=' </div> <div class="mt5"> 出发时间：';
$out+=$escape(value.periodNm);
$out+=' ';
$out+=$escape(value.startDt);
$out+=' 共 ';
$out+=$escape(value.days);
$out+='天 </div> <div class="mt5"> 订单金额：<span class="C_1">￥';
$out+=$escape(value.amt);
$out+='</span> 元 </div> </div> <div class="cell pl20"> <div class="tr"> <div class="mt5"></div> ';
if(value.status==1){
$out+=' <span class="Btn_white Btn_24" data-id="';
$out+=$escape(value.tn);
$out+='"> 取消订单 </span> ';
}
$out+=' ';
if(value.status==4){
$out+=' <span class="Btn_gray Btn_24" data-id="';
$out+=$escape(value.tn);
$out+='"> 订单已经取消 </span> ';
}
$out+=' ';
if(value.status==3){
$out+=' <span class="Btn_gray Btn_24" data-id="';
$out+=$escape(value.tn);
$out+='"> 订单已完成 </span> ';
}
$out+=' </div> </div> </div> </div> ';
});
$out+=' ';
}else{
$out+=' <div style="text-align: center; margin: 50px 0;" class="C_3"> 没有相关订单 </div> ';
}
$out+=' </div> ';
return new String($out);
});