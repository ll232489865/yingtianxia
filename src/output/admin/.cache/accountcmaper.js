/*TMODJS:{"version":50,"md5":"1c978f1f862480dd26382bb024aaa8be"}*/
template('accountcmaper',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,list=$data.list,$each=$utils.$each,value=$data.value,index=$data.index,$escape=$utils.$escape,$out='';if(list.length ==0){
$out+=' <div class="mt30 tc mb30" id="nothing"> 您好，目前您还没有任何营员的信息 <a href="account_addcamper.html" class="C_3"> 请添加营员信息 </a> </div> ';
}else{
$out+=' <div class="mb20" id="anything"> <a href="account_addcamper.html" class="Label_30 Label_blue"> 新增营员信息 </a> <table cellpadding="0" cellspacing="0" class="Tb_1 mb30 mt10"> <thead> <tr> <th>姓名</th> <th>性别</th> <th>身份</th> <th>操作</th> </tr> ';
$each(list,function(value,index){
$out+=' <tr> <td>';
$out+=$escape(value.name);
$out+='</td> <td> ';
if(value.gndr ==1){
$out+=' 男 ';
}else{
$out+=' 女 ';
}
$out+=' </td> <td> ';
if(value.type ==1){
$out+=' 学生 ';
}else{
$out+=' 家长 ';
}
$out+=' </td> <td> <a href="account_editcamper.html#';
$out+=$escape(value.id);
$out+='" class="C_3 eddit">编辑</a> | <a href="javascript:" class="C_3 delete" data-id="';
$out+=$escape(value.id);
$out+='">删除</a> </td> </tr> ';
});
$out+=' </thead> </table> </div> ';
}
$out+=' ';
return new String($out);
});