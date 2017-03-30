/*TMODJS:{"version":111,"md5":"3c1180480180f4e876e20c83e2b8c796"}*/
template('articlelists',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$escape=$utils.$escape,$out='';$out+='<div class="l ce_rect"> <div id="ce_slide" class="ce_slide"> ';
$each(list.carouselArray,function(value,i){
$out+=' ';
if(i==0){
$out+=' <a class="bn_img" href="campsite_detail.html?id=';
$out+=$escape(value.id);
$out+='" style="background-image: url(';
$out+=$escape(value.titlePicUrl);
$out+='); display:block" id="ce_adImage';
$out+=$escape(i);
$out+='"></a> ';
}else{
$out+=' <a class="bn_img" href="campsite_detail.html?id=';
$out+=$escape(value.id);
$out+='" style="background-image: url(';
$out+=$escape(value.titlePicUrl);
$out+='); display:none" id="ce_adImage';
$out+=$escape(i);
$out+='"></a> ';
}
$out+=' ';
});
$out+=' <div id="ce_position" class="ce_position"> ';
$each(list.carouselArray,function(value,i){
$out+=' ';
if(i==0){
$out+=' <a href="javascript:" class="bn_control active" data-rel="ce_adImage';
$out+=$escape(i);
$out+='"></a> ';
}else{
$out+=' <a href="javascript:" class="bn_control" data-rel="ce_adImage';
$out+=$escape(i);
$out+='"></a> ';
}
$out+=' ';
});
$out+=' </div> </div> </div> <div class="cell pl15"> <div class="fix" style="margin-right: -10px;" id="ce_imgarticle"> ';
$each(list.imgarticleArray,function(value,i){
$out+=' <div class="pct50 l"> <div class="p10 fix mr10 ce_few"> <a href="campsite_detail.html?id=';
$out+=$escape(value.id);
$out+='"> <img src="';
$out+=$escape(value.titlePicUrl);
$out+='" width="120" height="80" alt="" class="l mr10"> </a> <div class="ovh"> <div class="ell f14"> ';
$out+=$escape(value.title);
$out+=' </div> <div class="mt10 g9" style="height: 32px; overflow: hidden;"> ';
$out+=$escape(value.artclSum);
$out+=' </div> <div class="mt5"> <a href="campsite_detail.html?id=';
$out+=$escape(value.id);
$out+='" class="C_1">[详细]</a> </div> </div> </div> </div> ';
});
$out+=' </div> <ul class="mr10 mt10" id="ce_articlelist"> ';
$each(list.articleListArray,function(value,i){
$out+=' <li class="pct50 l"> <div class="Newsleter_box fix" class="pct50 l"> <div class="r ml10">';
$out+=$escape(value.insrtTmstmp);
$out+='</div> <div class="ovh ell tl"> <a href="campsite_detail.html?id=';
$out+=$escape(value.id);
$out+='"> ';
$out+=$escape(value.title);
$out+=' </a> </div> </div> </li> ';
});
$out+=' </ul> </div>';
return new String($out);
});