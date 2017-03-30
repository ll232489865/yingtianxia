/*TMODJS:{"version":22,"md5":"f1d9458c36fef2f5a3a96c71a9308a47"}*/
template('accountmyaccount',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,mobile=$data.mobile,email=$data.email,$out='';$out+='<div class="fix fa mb20"> <div class="l pct30 tr"> <span class="Ist_tt"> 手机 : </span> </div> <div class="cell"> ';
$out+=$escape(mobile);
$out+=' </div> </div> <div class="fix fa mb20"> <div class="l pct30 tr"> <span class="Ist_tt"> E-mail : </span> </div> <div class="cell"> ';
if(!!email){
$out+=' [';
$out+=$escape(email);
$out+='] ';
}else{
$out+=' 没有绑定邮箱 ';
}
$out+=' <a href="javascript:" class="C_3">绑定或更改邮箱</a> </div> </div>';
return new String($out);
});