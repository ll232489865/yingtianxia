require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
    }
})
define(['jquery'],function($){
    $.fn.checkForm = function (options,callback) {
        var root = this; //将当前应用对象存入root
        var rootOther = $('#'+root.data('rel'));
        
        var isok = false; //控制表单提交的开关
 
        var pwd1; //密码存储
        var path = document.getElementsByTagName("html")[0].className.indexOf('Account') != '-1' ? path = '../' : path = './';
        var defaults = {
            //图片路径
            img_error: path+"css/img/error.png",
            img_success: path+"css/img/success1.png",
 
            //提示信息
            tips_success: '', //验证成功时的提示信息，默认为空
            tips_required: '不能为空',
            tips_email: '邮箱地址格式有误',
            tips_num: '请填写数字',
            tips_chinese: '请填写中文',
            tips_mobile: '手机号码格式有误',
            tips_idcard: '身份证号码格式有误',
            tips_pwdequal: '两次密码不一致',
            tips_checkout: '须同意协议才能完成注册',
            tips_time:'时间格式不对哦',
 
            //正则
            reg_email: /^\w+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i,  //验证邮箱
            reg_num: /^\d+$/,                                  //验证数字
            reg_chinese: /^[\u4E00-\u9FA5]+$/,                 //验证中文
            reg_mobile: /^1[3458]{1}[0-9]{9}$/,                //验证手机
            reg_idcard: /^\d{14}\d{3}?\w$/,                     //验证身份证
            // reg_time: /^(20\d\d)-(0[1-9]+1[012])-(0[1-9]+[12][0-9]+3[01])$/g
            reg_time:/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
        };
 
        //不为空则合并参数
        if(options)
            $.extend(defaults, options);
 
        //获取（文本框，密码框，多行文本框），当失去焦点时，对其进行数据验证
        $(":text,:password,textarea", root).each(function () {
            $(this).blur(function () {
                var _validate = $(this).attr("check"); //获取check属性的值
                if (_validate) {
                    var arr = _validate.split(' '); //用空格将其拆分成数组
                    for (var i = 0; i < arr.length; i++) {
                        //逐个进行验证，不通过跳出返回false,通过则继续
                        if (!check($(this), arr[i], $(this).val()))
                            return false;
                        else
                            continue;
                    }
                }
            })
        })
 
        //表单提交时执行验证,与上面的方法基本相同，只不过是在表单提交时触发
        function _onSubmit() {
            isok = true;
            $(":text,:password,textarea", root).each(function () {
                var _validate = $(this).attr("check");
                if (_validate) {
                    var arr = _validate.split(' ');
                    for (var i = 0; i < arr.length; i++) {
                        if (!check($(this), arr[i], $(this).val()))
                        {
                        
                            return isok = false;
                        }
                        else{
                            continue;
                        }
                            
                    }
                }
            });
            isok = isok && callback();
            //return isok
        }
 
        //判断当前对象是否为表单，如果是表单，则提交时要进行验证
        rootOther.click(function(event){
            event.stopPropagation();
            var flag = _onSubmit();
            if(flag){
                callback(flag);
            }
            
            // return isok;
        })
        // if (root.is("form")) {
        //     root.submit(function () {
        //         _onSubmit();
        //         return isok;
        //     })
        // }

 
 
        //验证方法
        var check = function (obj, _match, _val) {
　　　　　　　//根据验证情况，显示相应提示信息，返回相应的值
            switch (_match) {
                case 'required':
                    return _val ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_required, false);
                case 'email':
                    return chk(_val, defaults.reg_email) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_email, false);
                case 'num':
                    return chk(_val, defaults.reg_num) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_num, false);
                case 'chinese':
                    return chk(_val, defaults.reg_chinese) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_chinese, false);
                case 'mobile':
                    return chk(_val, defaults.reg_mobile) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_mobile, false);
                case 'idcard':
                    return chk(_val, defaults.reg_idcard) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_idcard, false);
                case 'time':
                    return chk(_val, defaults.reg_time) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_time, false);    
                case 'pwd1':
                    pwd1 = _val; //实时获取存储pwd1值
                    return true;
                case 'pwd2':
                    return pwdEqual(_val, pwd1) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_pwdequal, false);
                default:
                    return true;
            }
        }
 
 
        //判断两次密码是否一致(返回bool值)
        var pwdEqual = function(val1, val2) {
            return val1 == val2 ? true : false;
        }
 
 
        //正则匹配(返回bool值)
        var chk = function (str, reg) {
            return reg.test(str);
        }
 
        //显示信息
        var showMsg = function (obj, msg, mark) {
            $(obj).next("#errormsg").remove();//先清除
            var _html = "<span id='errormsg' style='font-size:13px;color:red;background:url(" + defaults.img_error + ") no-repeat 0 -1px;padding-left:20px;margin-left:5px;'>" + msg + "</span>";
            if (mark)
                _html = "<span id='errormsg' style='font-size:13px;color:red;background:url(" + defaults.img_success + ") no-repeat 0 -1px;padding-left:20px;margin-left:5px;'>" + msg + "</span>";

            $(obj).after(_html);//再添加
            return mark;
        }
    }
})
