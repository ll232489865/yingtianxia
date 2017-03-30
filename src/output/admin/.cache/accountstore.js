/*TMODJS:{"version":64,"md5":"74d42fffbc665002b49c1919841df191"}*/
template('accountstore',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,list=$data.list,$each=$utils.$each,value=$data.value,index=$data.index,$escape=$utils.$escape,$out='';if(list.length==0){
$out+=' <div class="mt30 tc mb30"> 您好，目前您还没有任何收藏的活动 <a href="../index.html" class="C_3"> 添加看看 </a> </div> ';
}else{
$out+=' ';
$each(list,function(value,index){
$out+=' <div>';
$out+=$escape(value);
$out+='</div> <div class="fix"> <div class="l"> <a href="../';
$out+=$escape(value.linkUrl);
$out+='"> <img src="';
$out+=$escape(value.picUrl);
$out+='" height="150" alt=""> </a> </div> <div class="r"> <a href="../';
$out+=$escape(value.linkUrl);
$out+='" class="Btn_blue Btn_30"> 查看详情 </a> <span class="Btn_white Btn_30 delete" data-id="';
$out+=$escape(value.id);
$out+='"> 移除 </span> </div> <div class="cell pl20"> <div class="f14 b">';
$out+=$escape(value.actvName);
$out+='</div> <div>位 置：<span class="C_1">';
$out+=$escape(value.addr);
$out+=' </span></div> <div>报名截止日期：';
$out+=$escape(value.favTm);
$out+='</div> </div> </div> <div class="Line_solid mt20 mb20"></div> ';
});
$out+=' ';
}
return new String($out);
});