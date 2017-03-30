/*TMODJS:{"version":65,"md5":"0ede1fbba015e3f5b044dde6034ce95f"}*/
template('accountinfo',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,avatarUrl=$data.avatarUrl,$escape=$utils.$escape,nicknm=$data.nicknm,name=$data.name,mobile=$data.mobile,email=$data.email,liveAddr=$data.liveAddr,$out='';$out+='<div class="fix fa mb20" id="container"> <div class="l pct30 tr"> <span class="Ist_tt"> 头像 : </span> </div> <div class="cell"> <a href="javascript:" class="dib" id="pickfiles"> ';
if(avatarUrl){
$out+=' <img src="';
$out+=$escape(avatarUrl);
$out+='" alt="" class="vt" width="80" height="80"> ';
}else{
$out+=' <img src="../css/img/avter.png" alt="" class="vt" width="80" height="80"> ';
}
$out+=' </a> </div> </div> <form id="myform" method="post" data-rel="myform1"> <div class="fix fa mb20"> <div class="l pct30 tr"> <span class="Ist_tt"> 昵称 : </span> </div> <div class="cell"> <input type="text" class="Ist_30 Ist_l" id="accountInfo_nik" value="';
$out+=$escape(nicknm);
$out+='" check="required"> <span class="C_1">*</span> </div> </div> <div class="fix fa mb20"> <div class="l pct30 tr"> <span class="Ist_tt"> 姓名 : </span> </div> <div class="cell"> <input type="text" class="Ist_30 Ist_l" id="accountInfo_name" value="';
$out+=$escape(name);
$out+='" check="required"> <span class="C_1">*</span> </div> </div> <div class="fix fa mb20"> <div class="l pct30 tr"> <span class="Ist_tt"> 电话 : </span> </div> <div class="cell"> <input type="text" class="Ist_30 Ist_l" value="';
$out+=$escape(mobile);
$out+='" readonly=\'readonly\'> </div> </div> <div class="fix fa mb20"> <div class="l pct30 tr"> <span class="Ist_tt"> E-mail : </span> </div> <div class="cell"> <input type="text" class="Ist_30 Ist_l" id="accountInfo_email" value="';
$out+=$escape(email);
$out+='"> <a href="account_bindinfo.html" class="C_2">更换邮箱或更换邮箱</a > </div> </div> <div class="fix fa mb20"> <div class="l pct30 tr"> <span class="Ist_tt"> 地址 : </span> </div> <div class="cell"> <textarea class="Textarea" name="" cols="42" rows="5" id="accountInfo_add" check="required"> ';
$out+=$escape(liveAddr);
$out+=' </textarea> <span class="C_1">*</span> </div> </div> <div class="fix fa mb20"> <div class="l pct30 tr"> <span class="Ist_tt"> &nbsp; </span> </div> <div class="cell" > <span class="Btn_green Btn_40" id="myform1">&emsp;&emsp;保存修改&emsp;&emsp;</span> </div> </div> </form>';
return new String($out);
});