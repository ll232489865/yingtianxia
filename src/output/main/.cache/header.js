/*TMODJS:{"version":55,"md5":"b4c403a2cc4bcc94051ce60c893ba2d9"}*/
template('header',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,session=$data.session,$escape=$utils.$escape,path=$data.path,$out='';$out+=' <div class="Top"> <div class="Constr"> <div class="fix"> <div class="l"> <span>您好，欢迎来到营天下</span> ';
if(!session){
$out+=' <a href="';
$out+=$escape(path);
$out+='login.html">[登录]</a> <a href="';
$out+=$escape(path);
$out+='register.html">[免费注册]</a> ';
}else{
$out+=' <a href="javacript:" id="signout">[注销]</a> ';
}
$out+=' </div> <span class="r g9 ml10"> ';
if(path=='../'){
$out+=' <img src="../css/img/head-tel.png" alt="" class="vm"> ';
}else{
$out+=' <img src="css/img/head-tel.png" alt="" class="vm"> ';
}
$out+=' </span> <span class="Top_active" id="Top_active" data-target="Top_warp"> <span>客服中心</span> <span class="Diamond"> <span class="Diamond_in"> ◆ </span> <span class="Diamond_out Diamond_t"> ◆ </span> </span> </span> &emsp;&emsp; ';
if(!!session){
$out+=' <span class="Top_active" id="Top_active2" data-target="Top_warp2"> <span>个人中心</span> <span class="Diamond"> <span class="Diamond_in"> ◆ </span> <span class="Diamond_out Diamond_t"> ◆ </span> </span> </span> ';
}
$out+=' </div> </div> </div>   <div class="Head"> <div class="Constr"> <div class="l mr20 rel zx2"> <a href="';
$out+=$escape(path);
$out+='index.html" class="g3 tdn dib"> <img src="';
$out+=$escape(path);
$out+='images/logo.png" height="62" alt="图片Alt" class="vm"> </a> </div> <div class="fix rel" id="search"> <span class="inline_box Sch_area r"> <span class="Sch_box vm inline_any"> <input class="Sch_ist Key" type="text" date-value="输入名称" id="search-text" name="search-text"> </span> <button class="inline_any Sch_btn">搜索</button> <span class="Dib_vm"></span> </span> </div> </div> </div>   <div class="Nav"> <div class="Constr fix"> <ul> <li class="Nav_item"> <a class="Nav_a Nav_off" href="';
$out+=$escape(path);
$out+='index.html" title="首页">首页</a> </li> <li class="Nav_item"> <a class="Nav_a" href="';
$out+=$escape(path);
$out+='list.html?type=0" onclick="window.location.reload()" title="最新公告">国内营</a> </li> <li class="Nav_item"> <a class="Nav_a" href="';
$out+=$escape(path);
$out+='list.html?type=1" onclick="window.location.reload()" title="用户中心">国际营</a> </li> <li class="Nav_item"> <a class="Nav_a" href="';
$out+=$escape(path);
$out+='campsite_list.html" title="合作推广">营地教育</a> </li> </ul> </div> </div> </div>  <div class="Top_warp" id="Top_warp" style="display: none"> <div class="tc p10"> <h2 class="nowrap">400-878-3633</h2> <div class="mt5 mb5">9:00-18:00</div> <div class="Btn_30 Btn_red Btn_db">联系我们</div> </div> </div> <div class="Top_warp" id="Top_warp2" style="display: none"> ';
if(path=='../'){
$out+=' <a href="account_main.html" class="Link_db">个人主页</a> <a href="account_myaccount.html" class="Link_db">账户信息</a> <a href="account_order.html" class="Link_db">我的订单</a> <a href="account_store.html" class="Link_db">我的收藏</a> ';
}else{
$out+=' <a href="./account/account_main.html" class="Link_db">个人主页</a> <a href="./account/account_myaccount.html" class="Link_db">账户信息</a> <a href="./account/account_order.html" class="Link_db">我的订单</a> <a href="./account/account_store.html" class="Link_db">我的收藏</a> ';
}
$out+=' </div> <div id="searchResult" style=" width: 418px; background: red; position: absolute; left: 720px; top: 99px; border: 1px solid #7DC03A; z-index: 100; background: #fff;"></div>';
return new String($out);
});