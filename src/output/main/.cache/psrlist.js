/*TMODJS:{"version":120,"md5":"e88c27e74bf3bc83cea1bf657b78360e"}*/
template('psrlist',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,list=$data.list,$each=$utils.$each,value=$data.value,i=$data.i,$escape=$utils.$escape,v=$data.v,index=$data.index,$out='';if(list.length==0){
$out+=' <div style="margin-top:50px; text-align: center"> <span class="C_1"> 没有找到符合条件的活动 </span> </div> ';
}else{
$out+=' ';
$each(list,function(value,i){
$out+=' <div class="psr_box mt20 p20"> <h3 class="f16"> ';
$out+=$escape(value.name);
$out+=' </h3> <div class="fix mt10"> <div class="l mr20"> <a href="';
$out+=$escape(value.linkUrl);
$out+='"> <img src="';
$out+=$escape(value.picUrl);
$out+='" width="310" alt=""> </a> </div> <div class="cell"> <div class="fix"> <div class="l pct50 lh22"> <div>项目地点:';
$out+=$escape(value.addrName);
$out+='</div> <div>报名截止日期:';
$out+=$escape(value.insrtTmstmp);
$out+='</div> <div>是否亲自：学生单飞</div> </div> <div class="l pct50 lh22"> <div>适合年龄:12-18岁</div> <div> 出发日期: <span class="rel"> <span class="Downlist Downlist_36 w200" data-rel="Downlistdown';
$out+=$escape(value.id);
$out+='"> <span class="Downlist_w"> 第1期,出发时间:';
$out+=$escape(value.activityPeriodListResponses[0].startDt);
$out+=' </span> <span class="Trigon"> </span> </span> <div id="Downlistdown';
$out+=$escape(value.id);
$out+='" class="DownlistWarp"> ';
$each(value.activityPeriodListResponses,function(v,index){
$out+=' <div class="Downlist_link" data-price="';
$out+=$escape(v.fee);
$out+='" data-rel="price_';
$out+=$escape(i);
$out+='" >第';
$out+=$escape(index+1);
$out+='期,出发时间:';
$out+=$escape(v.startDt);
$out+='</div> ';
});
$out+=' </div> </span> </div> </div> </div> <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mt20 psr_tb"> <tr> <td width="40%" valign="middle"> <h4 class="f16"> 项目特色 </h4> <ul class="mt10 lh24"> <li>';
$out+=$escape(value.feature);
$out+='</li> </ul> </td> <td align="center" valign="middle"> <img src="css/img/theme-icon.png" alt=""> <div class="C_1 f20 b"> ￥<span id="price_';
$out+=$escape(i);
$out+='">';
$out+=$escape(value.activityPeriodListResponses[0].fee);
$out+='</span>元 </div> </td> <td width="30%" align="center" valign="middle"> <a href="';
$out+=$escape(value.linkUrl);
$out+='" class="Btn_blue Btn_30">查看详情</a> </td> </tr> </table> </div> </div> </div> ';
});
$out+=' ';
}
$out+=' ';
return new String($out);
});