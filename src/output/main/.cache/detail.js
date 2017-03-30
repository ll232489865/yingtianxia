/*TMODJS:{"version":72,"md5":"9a10edf5f69deb9eb9614f6b7b292d92"}*/
template('detail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,list=$data.list,$each=$utils.$each,value=$data.value,index=$data.index,$out='';$out+='<div class="Panel_tt"> <a href="javascript:" class="r f12 tdn C-2"> 分享内容<span class="fs">&gt;</span> </a> <i class="Panel_icon"> </i> <span class="Vm_dib"> ';
$out+=$escape(list.name);
$out+=' </span> </div> <div class="Panel_body" > <div class="psr_box p20"> <div class="fix"> <div class="l mr20"> <img src="';
$out+=$escape(list.picUrl);
$out+='" height="270" alt=""> </div> <div class="cell"> <div class="fix"> <div class="l pct50 lh22"> <div>项目地点:';
$out+=$escape(list.addrName);
$out+='</div> <div>报名截止日期:';
$out+=$escape(list.insrtTmstmp);
$out+='</div> </div> <div class="l pct50 lh22"> <div>适合年龄:';
$out+=$escape(list.other[0].fitAgeFrom);
$out+='-';
$out+=$escape(list.other[0].fitAgeTo);
$out+='岁</div> <div> 出发日期: <span class="rel"> <span class="Downlist Downlist_36" data-rel="Downlistdown2" style="width: 180px;"> <span class="Downlist_w"> 第1期,出发时间:';
$out+=$escape(list.other[0].startDt);
$out+=' </span> <span class="Trigon"> </span> </span> <div id="Downlistdown2" class="DownlistWarp" style="left: -1px; top: 26px; width: 120px;"> ';
$each(list.other,function(value,index){
$out+=' <div class="Downlist_link" data-price="';
$out+=$escape(value.fee);
$out+='" >第';
$out+=$escape(index+1);
$out+='期,出发时间:';
$out+=$escape(value.startDt);
$out+='</div> ';
});
$out+=' </div> </span> </div> </div> </div> <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mt20 psr_tb"> <tr> <td width="40%" valign="middle"> <h4 class="f16"> 项目特色 </h4> <ul class="mt10 lh24"> <li>';
$out+=$escape(list.feature);
$out+='</li> </ul> </td> <td align="center" valign="middle" width="30%" > <img src="css/img/theme-icon.png" alt=""> <div class="C_1 f20 b" > ￥<span id="price">';
$out+=$escape(list.other[0].fee);
$out+='</span>元 </div> </td> <td width="30%" align="center" valign="middle"> <div class="mb10"> <span class="Btn_red Btn_30" id="store">加入收藏</span> </div> <span class="Btn_blue Btn_30 tdn" id="create_order">立即预订</span> </td> </tr> </table> </div> </div> </div> </div> ';
return new String($out);
});