/*TMODJS:{"version":47,"md5":"ba333cd9776411fd52f49b538e833659"}*/
template('activeity',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$escape=$utils.$escape,$out='';$each(list,function(value,i){
$out+=' <li class="Srect_box"> <a href="detail.html?id=';
$out+=$escape(value.id);
$out+='"> <img src="';
$out+=$escape(value.picUrl);
$out+='" width="100%" height="167" alt=""> </a> <div class="pr10 pl10"> <div class="Srect_area_tt"> ';
$out+=$escape(value.addrName);
$out+=' </div> <div class=""> 5年航海夏令营和学校活动经验；充分贯彻4C营地教育理念。 </div> <div class="mt5 fix Srect_col"> <span class="l"> <img src="css/img/floor-clock.png" alt="" class="mr5"> ';
$out+=$escape(value.insrtTmstmp);
$out+=' ';
$out+=$escape(value.activityPeriodListResponses[0].days);
$out+='天 </span> <span class="r"> ';
$out+=$escape(value.activityPeriodListResponses[0].fee);
$out+='元 </span> </div> </div> </li> ';
});
$out+=' ';
return new String($out);
});