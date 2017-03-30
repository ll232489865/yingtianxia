/*TMODJS:{"version":14,"md5":"a8189b90103dbfb20b38504754bc2c01"}*/
template('campsitelist',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$escape=$utils.$escape,$out='';$each(list,function(value,i){
$out+=' <li style="border: 1px solid #ddd;" class="fix mb20"> <div class="l"> <a href="campsite_detail.html?id=';
$out+=$escape(value.id);
$out+='"> <img src="';
$out+=$escape(value.titlePicUrl);
$out+='" width="240" height="150" alt=""> </a> </div> <div class="ovh"> <div class="p20"> <a href="javascript:" class="f16 C_2 tdn"> ';
$out+=$escape(value.title);
$out+=' </a> <div class="mt10"> ';
$out+=$escape(value.insrtTmstmp);
$out+=' </div> <div class="mt10 f14"> ';
$out+=$escape(value.artclSum);
$out+=' </div> <div class="mt10"> <a href="campsite_detail.html?id=';
$out+=$escape(value.id);
$out+='" class="Btn_blue Btn_30">查看详情</a> </div> </div> </div> </li> ';
});
return new String($out);
});