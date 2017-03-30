/*TMODJS:{"version":119,"md5":"cb0b83bba77e6a4db9977e317b58e64b"}*/
template('filterlist',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$escape=$utils.$escape,$out='';$out+=' <div class="fix mt20" style="list-style: none;"> <div class="Lfilter_tt l"> &emsp;&emsp;&emsp;目的地 : </div> <div class="ovh" id="filteradd"> </div> </div> <div class="fix mt10" style="list-style: none;" id="filtername"> <div class="Lfilter_tt l"> 项目主题 : </div> <div class="ovh" id="Lfilter_address"> <a href="javascript:" class="Lfilter_item Lfilter_item_off">不限</a> ';
$each(list,function(value,i){
$out+=' <a href="javascript:" class="Lfilter_item">';
$out+=$escape(value.name);
$out+='</a> ';
});
$out+=' </div> </div> <div class="fix mt10" style="list-style: none"> <div class="Lfilter_tt l"> 搜索项目 : </div> <div class="ovh"> <input type="text" class="Ist_26 Ist_m" placeholder="请输入关键字"> <span class="Btn_26 Btn_green" id="filterSch">搜索</span> </div> </div>';
return new String($out);
});