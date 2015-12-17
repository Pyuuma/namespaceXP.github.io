define("media/report.js",["biz_common/utils/monitor.js"],function(e){
"use strict";
function o(e,o){
c.pv[e]&&(o=o||1,c.pv[e].count+=o,console.log("addpv:"+e+" count:"+c.pv[e].count));
}
function t(e){
c.uv[e]&&(c.uv[e].count=1);
}
function n(e,n){
o(e,n),t(e);
}
function i(e){
var o=c.id[e]||c.id[0];
for(var t in c.pv){
var n=c.pv[t];
n.count>0&&r.setSum(o,n.key,n.count);
}
for(var t in c.uv){
var n=c.uv[t];
n.count>0&&r.setSum(o,n.key,n.count);
}
r.send();
}
var r=e("biz_common/utils/monitor.js"),c={
id:["28146","28305"],
keyConf:["more","fontsize","blockquote","horizontal","removeformat","link","unlink","mpvideo","qqvideo","wxvideo","insertimage","insertvote","insertmusic","insertaudio","insertcard","bold","italic","underline","forecolor","backcolor","justifyleft","justifycenter","justifyright","rowspacingtop","rowspacingbottom","lineheight","insertorderedlist","insertunorderedlist","imagefloatnone","imagefloatleft","imagefloatright","imagefloatcenter","usecache","cacelcache","showlink","hidelink","remoteimgsuc","remoteimgerr","fullscreen","paste","formatmatch"],
pv:{},
uv:{}
};
return function(){
for(var e=0,o=c.keyConf.length;o>e;e++){
var t=2*e,n=2*e+1,i=c.keyConf[e];
c.pv[i]={
key:t,
count:0
},c.uv[i]={
key:n,
count:0
};
}
}(),{
addPv:o,
addUv:t,
addPvUv:n,
send:i
};
});define("media/media_static_data.js",[],function(e,a){
"use strict";
a.article_type=[{
name:"财经",
value:"财经"
},{
name:"时政评论",
value:"时政评论"
},{
name:"金融理财",
value:"金融理财"
},{
name:"互联网",
value:"互联网"
},{
name:"手机数码",
value:"手机数码"
},{
name:"影视娱乐",
value:"影视娱乐"
},{
name:"星座占卜",
value:"星座占卜"
},{
name:"文学",
value:"文学"
},{
name:"旅游旅行",
value:"旅游旅行"
},{
name:"摄影",
value:"摄影"
},{
name:"历史",
value:"历史"
},{
name:"文化",
value:"文化"
},{
name:"宗教",
value:"宗教"
},{
name:"体育",
value:"体育"
},{
name:"健身健美",
value:"健身健美"
},{
name:"教育培训",
value:"教育培训"
},{
name:"美食烹饪",
value:"美食烹饪"
},{
name:"餐饮服务",
value:"餐饮服务"
},{
name:"两性情感",
value:"两性情感"
},{
name:"医疗卫生",
value:"医疗卫生"
},{
name:"健康科普",
value:"健康科普"
},{
name:"汽车",
value:"汽车"
},{
name:"工业制造",
value:"工业制造"
},{
name:"军事",
value:"军事"
},{
name:"美容护肤",
value:"美容护肤"
},{
name:"服装时尚",
value:"服装时尚"
},{
name:"母婴育儿",
value:"母婴育儿"
},{
name:"书画",
value:"书画"
},{
name:"手工工艺",
value:"手工工艺"
},{
name:"漫画",
value:"漫画"
},{
name:"其他",
value:"其他"
}],a.URL_PLATFORM_MAP={
"www.guokr.com":"果壳",
"www.zhihu.com":"知乎",
"blog.sina.com.cn":"新浪博客",
"www.huxiu.com":"虎嗅网",
"www.dreamore.com":"追梦网",
"cn.engadget.com":"瘾科技",
"www.cnbeta.com":"cnBeta",
"www.199it.com":"199IT",
"www.36kr.com":"36氪",
"www.tmtpost.com":"钛媒体",
"www.iheima.com":"i黑马",
"www.cyzone.cn":"创业邦",
"www.ikanchai.com":"砍柴网",
"www.iresearch.cn":"艾瑞网",
"xianguo.com":"鲜果网",
"www.myzaker.com":"ZAKER",
"jandan.net":"煎蛋网",
"pianke.me":"片刻网",
"www.techweb.com.cn":" TechWeb",
"www.leiphone.com":"雷锋网",
"www.douban.com":"豆瓣",
"www.mop.com":"猫扑",
"www.tianya.cn":"天涯",
"jingyan.baidu.com":"百度经验",
"baike.baidu.com":"百度百科",
"wenku.baidu.com":"百度文库",
"tieba.baidu.com":"百度贴吧",
"zhidao.baidu.com":"百度知道",
"news.sina.com.cn":" 新浪新闻",
"news.qq.com":"腾讯新闻",
"news.ifeng.com":"凤凰资讯",
"news.163.com":"网易新闻",
"www.xinhuanet.com":"新华社",
"www.people.com.cn":"人民网",
"www.huanqiu.com":"环球时报",
"www.gov.cn":"中国政府网",
"www.china.com":"中华网",
"www.takungpao.com":"大公网",
"www.81.cn":"中国军网",
"www.zaobao.com":"联合早报",
"d.weibo.com":"新浪微博",
"weibo.com":"新浪微博",
"www.baidu.com":"百度",
"www.sina.com.cn":"新浪",
"www.163.com":"网易",
"news.sohu.com":"搜狐新闻",
"www.sohu.com":"搜狐",
"www.ifeng.com":"凤凰网",
"qzone.qq.com":"QQ空间"
};
});define("media/article_list.js",["common/qq/Class.js","common/wx/time.js","biz_web/lib/store.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/popover.js","media/media_cgi.js","media/article.js","media/draft.js","media/report.js","tpl/media/appmsg_edit/article_list_item.html.js"],function(e){
"use strict";
function t(e){
var t=e&&e.multi_item;
return t&&t.length?($.each(t,function(e,t){
$.each(t,function(e,i){
i.html&&(t[e]=i.html(!1));
});
}),t):null;
}
function i(e,t,i){
(t||1)>p&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:e,
level:i||"error",
content:"[file=media/appmsg_edit]"
});
}
function n(e){
for(var t in e)if(e.hasOwnProperty(t)&&e[t])return!1;
return!0;
}
var r=e("common/qq/Class.js"),s=(e("common/wx/time.js"),e("biz_web/lib/store.js")),a=e("common/wx/Tips.js"),c=e("common/wx/dialog.js"),o=e("common/wx/popover.js"),l=e("media/media_cgi.js"),d=e("media/article.js"),u=e("media/draft.js"),f=e("media/report.js"),m=e("tpl/media/appmsg_edit/article_list_item.html.js"),p=Math.random(),h=function(e,t,i,n){
if(e===t)return 0!==e||1/e===1/t;
if(null==e||null==t)return e===t;
var r=Object.prototype.toString.call(e);
if(r!==Object.prototype.toString.call(t))return!1;
switch(r){
case"[object RegExp]":
case"[object String]":
return""+e==""+t;

case"[object Number]":
return+e!==+e?+t!==+t:0===+e?1/+e===1/t:+e===+t;

case"[object Date]":
case"[object Boolean]":
return+e===+t;
}
var s="[object Array]"===r;
if(!s&&("object"!=typeof e||"object"!=typeof t))return!1;
i=i||[],n=n||[];
for(var a=i.length;a--;)if(i[a]===e)return n[a]===t;
if(i.push(e),n.push(t),s){
if(a=e.length,a!==t.length)return!1;
for(;a--;)if(!h(e[a],t[a],i,n))return!1;
}else for(var c in e)if(e.hasOwnProperty(c)&&(!t.hasOwnProperty(c)||!h(e[c],t[c],i,n)))return!1;
return i.pop(),n.pop(),!0;
},g=r.declare({
init:function(e){
var i=this;
$.extend(!0,i,e),i.opt=e,i.$list=$(e.appmsg_selector),i.gid=0,i.draft=new u(e.app_id),
i.list=i.draft.get()||t(e.appmsg_data),i.lastData=i.list,i.list?$.each(i.list,function(e,t){
i.add(t);
}):i.add(),i.select(0,0,1),i._bindEvent(),i.hasConfirmed=!1;
},
_bindEvent:function(){
var e=this;
$("#js_add_appmsg").on("click",function(){
var t=e.add();
t&&e.select(t.index());
}),e.$list.on("click",".js_appmsg_item",function(){
var t=$(this).closest(".js_appmsg_item").index();
t!=e.$current.index()&&e.select(t);
}),e.$list.on("click",".js_del",function(){
var t=$(this).closest(".js_appmsg_item").index();
e.remove(t);
}),e.$list.on("click",".js_up",function(){
var t=$(this).closest(".js_appmsg_item"),i=t.prev();
0==i.index()&&(i.find(".first_appmsg_item").hide().siblings().show(),t.find(".first_appmsg_item").show().siblings().hide()),
t.insertBefore(i),e.$list.children().find(".js_down").show(),e.$list.children().last().find(".js_down").hide();
}),e.$list.on("click",".js_down",function(){
var t=$(this).closest(".js_appmsg_item"),i=t.next();
0==t.index()&&i.length&&(t.find(".first_appmsg_item").hide().siblings().show(),i.find(".first_appmsg_item").show().siblings().hide()),
i.insertBefore(t),e.$list.children().find(".js_down").show(),e.$list.children().last().find(".js_down").hide();
}),$(e.editor_selector).on("click",".js_removeCover",function(){
$(this).parent().hide().find("input").val("").parent().find("img").remove(),e.$current&&e.$current.removeClass("has_thumb");
}),$("#js_draft_cancel").on("click",function(){
return e.draft.clear(),e.draft.isDropped=!0,f.addPvUv("cacelcache"),window.location.reload(),
!1;
}),setInterval(function(){
var t=e.getData();
e.draft.save(t);
},12e4),window.onbeforeunload=function(){
var t=!0,i=e.getData();
if(!e.lastData||!h(i,e.lastData)){
for(var n=i.length;n-->0;)if(i[n]){
t=!1;
break;
}
return t||e.draft.isDropped?void e.draft.clear():(e.draft.save(i),"已自动保存"+s.get(e.draft.timeKey)+"时的内容。");
}
},e.ueditor.addListener("focus",function(){
e.firstFocus&&(e.firstFocus=!1,e.ueditor.fireEvent("firstfocus"));
});
},
_checkRemoteImage:function(e,t,i){
var n=this,r=n.ueditor.getDocument(),s=$(r).find(".js_catchingremoteimage"),a=s.length;
return 0==a?void i():void s.on("catchremotesuccess",function(e,r){
$(this).off("catchremotesuccess").off("catchremoteerror");
var s=r.source,c=r.type,o=n.$current.index(),l="img"==c?$(this).attr("src"):$(this).css("background-image").replace(/^(url\()|(\))$/g,"");
l=l.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
var d=new RegExp("img"==c?'<img[^>]*?\\s+data-src="%s"[^>]*\\/?>'.sprintf(s):'<\\w([^>]*?)\\s+style="[^"]*?;?\\s*(background|background-image)\\s*\\:[^;]*?url\\([\'"]?%s[\'"]?\\)[^"]*?"([^>]*?)>'.sprintf(s)),u=t["content"+o].match(d);
u=u&&u[0]||"",u=u.replace(s,l).replace("js_catchingremoteimage",""),t["content"+o]=t["content"+o].replace(d,u),
0==--a&&i();
}).on("catchremoteerror",function(){
s.off("catchremotesuccess").off("catchremoteerror"),e.btn(!0);
});
},
add:function(e){
var t=this,i=t.$list.children().length;
if(i>=t.maxNum)return void a.err("你最多只可以加入%s条图文消息".sprintf(t.maxNum));
i==t.maxNum-1&&t.$list.parent().siblings("a").hide(),e=$.extend({
id:t.gid++,
title:"",
author:"",
file_id:"",
digest:"",
content:"",
source_url:"",
isFirst:0==t.$list.children().length
},e),e.file_id&&(e.cover=wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(e.file_id)));
var n=$.parseHTML(wx.T(m,e))[0],r=$(n).appendTo(t.$list),s=new d({
dom:t.opt.editor_selector,
data:e,
item:r,
ueditor:t.ueditor,
freeUEditor:t.freeUEditor
});
return r.data("article",s),$(".js_scrollbar").scrollbar.updateScrollbars(!0),t.$list.children().find(".js_down").show(),
t.$list.children().last().find(".js_down").hide(),r;
},
remove:function(e){
var t=this,i=t.$list.children().eq(e),r=i.data("article").flush();
n(r.data)?t.drop(e):(i.find(".appmsg_edit_mask").css("display","block"),new o({
dom:i.find(".js_del"),
content:"确定删除此文章？",
buttons:[{
text:"确定",
click:function(){
t.drop(e),this.remove();
},
type:"primary"
},{
text:"取消",
click:function(){
i.find(".appmsg_edit_mask").css("display",""),this.remove();
}
}]
}));
},
drop:function(e){
var t=this;
t.select(Math.max(0,e-1)),t.$list.children().eq(e).remove(),t.$list.parent().siblings("a").show(),
t.$list.children().find(".js_down").show(),t.$list.children().last().find(".js_down").hide(),
$(".js_scrollbar").scrollbar.updateScrollbars(!0);
},
select:function(e,t,i){
var n=this,r="number"!=typeof e?e:n.$list.find(".js_appmsg_item").eq(e);
r.addClass("current");
var s=null;
r.siblings().removeClass("current"),n.$current&&(s=n.$current.data("article"),s&&s.flush()),
s=r.data("article"),s&&(!t&&s.hideErrorTips(),s.render(),n.$current=r,n.firstFocus=""==s.data.content),
i||setTimeout(function(){
$(window).scrollTop(s.scrollTop);
},100);
},
getData:function(e){
var t=this,i=[],n=null,r=null,s=t.$current;
return s&&(r=s.data("article"),r&&r.flush()),t.$list.find(".js_appmsg_item").each(function(s){
return(r=$(this).data("article"))?(e&&t.select(s),(n=r.getData(e))?void i.push(n):(t.select(s,!0,!0),
!1)):void 0;
}),n?(e&&s&&t.select(s),i):!1;
},
getPostData:function(){
var e=this,t=e.getData(!0);
if(!t)return null;
var i={
AppMsgId:e.app_id,
count:t.length
};
return $.each(t,function(e,t){
var n={};
$.each(t,function(t,i){
n[t+e]=i;
}),$.extend(i,n);
}),i;
},
save:function(e,t){
var n=this,r=n.getData(),s=n.getPostData();
s&&(n.hasConfirmed&&(n.hasConfirmed=!1,s.confirm=1),e.btn(!1),i(30,.1,"error"),n._checkRemoteImage(e,s,function(){
i(31,.1,"error"),l.appmsg.save(!0,10,s,function(e){
n.draft.clear(),n.draft=new u(e.appMsgId),n.app_id=e.appMsgId,n.lastData=r,t(e,s);
},function(t,i){
switch(e.btn(!0),0!=t&&n.select(1*t),+i){
case 412:
a.err("图文中含非法外链");
break;

case 15801:
case 15802:
case 15803:
case 15804:
case 15805:
case 15806:
c.show({
type:"warn",
msg:"图文消息中含有诱导分享内容|为保证用户体验，微信公众平台禁止发布各种诱导分享行为。你所编辑的图文消息可能涉及诱导分享内容。<br/>                                你可以继续保存和发布该图文消息，若发布后被举报并核实确有诱导分享行为，公众平台将根据规定进行处理。<br/>                                <a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3' target='_blank'>诱导分享违规行为说明</a>",
buttons:[{
text:"继续保存",
click:function(){
this.remove(),n.hasConfirmed=!0,e.trigger("click");
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
}
});
}));
},
preview:function(){
var e=this,t=e.getPostData();
if(t){
for(var i=0,n=0;n<t.count;n++)if(t["copyright_type"+n]){
i=1;
break;
}
var r=null,o=null,d=[];
if(s.get(wx.data.uin+"previewAccounts"))try{
d=s.get(wx.data.uin+"previewAccounts").split("|");
}catch(u){
d=[];
}
var f=$(template.render("previewTpl",{
label:"请输入微信号，此图文消息将发送至该微信号预览。",
tips:1==i?"本文申请的原创声明还未经平台审核，故预览不会出现原创标识。":"",
accounts:d
})).popup({
title:"发送预览",
className:"simple label_block",
onOK:function(){
var i=this,n=i.get(),u=n.find(".frm_input"),f=u.val().trim();
if(t.preusername=f,0==f.length)return $(".jsAccountFail").text("请输入预览的账号").show(),
!0;
if(null!=r&&r.getCode().trim().length<=0)return a.err("请输入验证码"),r.focus(),!0;
var m=n.find(".btn_primary").btn(!1);
return t.imgcode=r&&r.getCode().trim(),e.hasConfirmed&&(e.hasConfirmed=!1,t.confirm=1),
l.appmsg.preview(!0,10,t,function(n){
e.app_id=n.appMsgId,i.hide(),setTimeout(function(){
m.btn(!0);
},500);
var r=[];
d.each(function(e){
e!=t.preusername&&r.push(e);
}),d=r,d.length<3?d.push(t.preusername):(d.shift(),d[2]=t.preusername),s.set(wx.data.uin+"previewAccounts",d.join("|"));
},function(t){
if(n.find(".jsAccountFail").text(t.word).show(),m.btn(!0),u.focus(),t){
if(!t||"-6"!=t.ret&&"-8"!=t.ret||(o=n.find(".js_verifycode"),r=o.html("").removeClass("dn").verifycode().data("verifycode"),
r.focus()),t&&t.antispam&&e.select(1*t.msg),"412"==t.ret)return void $(".jsAccountFail").text("图文中含非法外链").show();
switch(+t.ret){
case 412:
n.find(".jsAccountFail").text("图文中含非法外链").show();
break;

case 15801:
case 15802:
case 15803:
case 15804:
case 15805:
case 15806:
i.hide(),c.show({
type:"warn",
msg:"图文消息中含有诱导分享内容|为保证用户体验，微信公众平台禁止发布各种诱导分享行为。你所编辑的图文消息可能涉及诱导分享内容。<br/>                                你可以继续保存和发布该图文消息，若发布后被举报并核实确有诱导分享行为，公众平台将根据规定进行处理。<br/>                                <a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3' target='_blank'>诱导分享违规行为说明</a>",
buttons:[{
text:"继续发送",
click:function(){
this.remove(),e.hasConfirmed=!0,m.trigger("click");
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove(),i.show();
}
}]
});
}
}
}),!0;
}
});
f.find(".jsAccount").click(function(){
$(this).hasClass("selected")?($(this).removeClass("selected"),$(".jsAccountInput").val("")):($(this).addClass("selected"),
$(".jsAccountInput").val($(this).data("value")));
}),f.find(".jsAccountInput").keyup(function(e){
$(".jsAccountFail").hide(),$(".jsAccount").removeClass("selected");
var t="which"in e?e.which:e.keyCode;
13==t&&$(this).parents(".dialog").find("button:eq(0)").trigger("click");
}).placeholder(),f.find(".jsAccountDel").click(function(){
var e=$(this).data("index");
return d.length>e&&d.splice(e,1),$(this).parent().remove(),s.set(wx.data.uin+"previewAccounts",d.join("|")),
!1;
}),d.length>0&&f.find(".jsAccount").last().click();
}
}
});
return g;
});define("tpl/media/appmsg_edit/article.html.js",[],function(){
return'<!--\n<div class="page_msg mini">\n    <div class="inner">\n        <span class="msg_icon_wrp"><i class="icon_msg warn"></i></span>\n        <div class="msg_content">\n            <p>xxxxxxx</p>\n        </div>\n    </div>\n    <span class="msg_closed">关闭</span>\n</div>\n-->\n<div class="appmsg_editor">\n    <div class="appmsg_editor_inner">\n        <!-- BEGIN UEDITOR -->\n        <div id="js_ueditor" class="appmsg_edit_item content_edit">\n            <label for="" class="frm_label" style="display:none;">\n                <strong class="title">正文</strong>\n\n                <p class="tips l">\n                    <em id="js_auto_tips"></em>\n                    <a id="js_cancle" style="display:none;" href="javascript:void(0);"\n                       onclick="return false;">取消</a>\n                </p>\n            </label>\n<!--        <div class="frm_msg fail js_catch_tips" style="display:none;">有5张图片粘贴失败</div>\n            <div class="frm_msg fail js_content_error" style="display:none;">正文不能为空且长度不能超过20000字</div> -->\n            <div id="js_editor" class="edui_editor_wrp"></div>\n        </div>\n        <!-- END UEDITOR -->\n\n        <div class="appmsg_edit_function_area ">\n            <!-- BEGIN 原文链接 -->\n            <div class="js_url_area appmsg_edit_item origin_url_area">\n                <label for="" class="frm_label">\n                    <label class="frm_checkbox_label" for="js_url_checkbox">\n                        <input type="checkbox" class="frm_checkbox js_url_checkbox js_field" name="source_url_checked">\n                        <i class="icon_checkbox"></i>\n                        <span class="lbl_content">\n                            原文链接                        </span>\n                    </label>\n                </label>\n                <span class="frm_input_box" style="display:none;"><input type="text" class="js_url frm_input js_field" name="source_url"></span>\n\n                <div class="frm_msg fail js_url_error" style="display:none;">链接不合法</div>\n            </div>\n            <!-- END 原文链接 -->\n            <!--BEGIN 评论 -->\n            {if can_use_comment}\n            <div class="appmsg_edit_item ">\n                <label class="frm_checkbox_label comment_checkbox" for="">\n                    <input type="checkbox" class="frm_checkbox js_comment js_field" checked name="need_open_comment">\n                    <i class="icon_checkbox"></i>\n                    <span class="lbl_content">评论<span class="tips_global">勾选后读者将可以在文章底部评论</span></span>\n                </label>\n            </div>\n            {/if}\n            <!-- END 评论-->\n            {if has_invited_original}\n            <!--如果可以使用原创功能-->\n            <div id="js_original" class="appmsg_edit_item original_area ">\n                <!--BEGIN 未开通原创-->\n                {if can_use_copyright}\n                <div class="unorigin js_original_type">\n                    <div class="cont">\n                        <h4 class="subtitle">原创：未声明</h4>\n                        <p class="tips_global original_title_tips">原创声明是公众平台关于支持原创者的功能</p>\n                    </div>\n                    <div class="opt">\n                        <a href="javascript:;" onclick="return false;" class="btn btn_default js_original_apply">声明原创</a>\n                    </div>\n                </div>\n                {else}\n                <div class="unorigin js_original_type">\n                    <div class="cont">\n                        {if orginal_apply_stat == 0}\n                        <h4 class="subtitle">原创声明：未开通</h4>\n                        {else if orginal_apply_stat == 1}\n                        <h4 class="subtitle">原创声明：审核中</h4>\n                        {else if orginal_apply_stat == 2}\n                        <h4 class="subtitle">原创声明：申请失败</h4>\n                        {else if orginal_apply_stat == 3}\n                        <h4 class="subtitle">原创声明：申请成功</h4>\n                        {/if}\n                    </div>\n                    {if orginal_apply_stat == 0}\n                    <div class="opt">\n                        <div class="description">\n                            <p class="desc">原创声明是公众平台为维护原创作者权益推出的功能。</p>\n                            <p class="desc">1. 开通后，你可以选择文章是否允许被转载；</p>\n                            <p class="desc">2. 声明原创的文章被转载时，系统会自动注明文章出处。</p>\n                        </div>\n                        <a href="javascript:;" onclick="return false;" class="btn btn_default" id="js_original_func_open">开通</a>\n                    </div>\n                    {/if}\n                </div>\n                {/if}\n                <!--END 未开通原创-->\n                <!--BEGIN 开通原创-->\n                <div class="origined js_original_type" style="display:none;">\n                    <label class="frm_label" id="js_original_open">\n                        <span class="mini_tips icon_before l">\n                            原创：已声明                        </span>\n                        <a href="javascript:;" onclick="return false;" class="js_original_cancel r">撤销声明</a>\n                        <a href="javascript:;" onclick="return false;" class="js_original_apply r">编辑声明</a>\n                    </label>\n\n                    <div class="normal_flow js_original_content" style="display:none">\n                        <!--添加.js_original_content元素 .open类名，小箭头向上，不添加则向下-->\n                        <div id="js_original_detail" class="preview_hd">\n                            原创详情<i class="icon_arrow"></i>\n                        </div>\n                        <ul class="simple_preview_list tips_global">\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">原文链接</label>\n\n                                <div class="simple_preview_value js_url"></div>\n                            </li>\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">首发平台</label>\n\n                                <div class="simple_preview_value js_platform"></div>\n                            </li>\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">作者</label>\n\n                                <div class="simple_preview_value js_author"></div>\n                            </li>\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">文章类别</label>\n\n                                <div class="simple_preview_value js_classify"></div>\n                            </li>\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">授权转载</label>\n\n                                <div class="simple_preview_value js_frm"></div>\n                            </li>\n                        </ul>\n                        {if can_use_reward}\n                        <!--如果可以使用赞赏功能-->\n                        <div class="reward">\n                            <label class="frm_checkbox_label" for="reward">\n                                <input type="checkbox" name="can_reward" class="frm_checkbox js_reward js_field" value="1" checked>\n                                <i class="icon_checkbox"></i>\n                                <span class="lbl_content">\n                                    接受用户赞赏                                    <!--<span class="mini_tips weak_text">（申请原创声明后才可勾选）</span>-->\n                                </span>\n                            </label>\n\n                            <div class="appmsg_edit_item js_reward_div">\n                                <span class="frm_input_box reward_wording"><input type="text" name="reward_wording" class="frm_input  js_counter js_reward_wording js_field"\n                                    max-length="15" placeholder="赞赏引导语（选填）"></span>\n                            </div>\n                        </div>\n                        {/if}\n                        {if can_use_payforread}\n                        <!--如果可以使用付费阅读功能-->\n                        <div class="payread">\n                            <label class="frm_checkbox_label" for="js_pay">\n                                <input name="payforread_enabled" type="checkbox" id="js_pay" class="frm_checkbox js_field" value="1">\n                                <i class="icon_checkbox"></i>\n                                <span class="lbl_content">\n                                    付费阅读                                    <span class="mini_tips weak_text js_pay_tips">（只有“禁止转载”的原创文章才可以设置付费阅读）</span>\n                                </span>\n                                <p class="pay_seting js_pay_setting" style=\'display:none\'>\n                                    <label class="frm_fee">金额：<span class="js_fee"></span>元</label>\n                                    <a onclick="return false;" href="javascript:;" class="js_pay_edit">修改</a>\n                                </p>\n                            </label>\n                        </div>\n                        {/if}\n                        <input type="hidden" class="js_original_publish">\n                        <input type="hidden" class="js_reprint_frm">\n                    </div>\n                </div>\n                <!--END 开通原创-->\n            </div>\n            {/if}\n        </div>\n        \n        <div class="appmsg_edit_highlight_area">\n\n            <div class="appmsg_edit_title">发布样式编辑</div>\n            <!-- EBGIN 封面 -->\n            <div class="appmsg_edit_item gap_left">\n                <label for="" class="frm_label">\n                    <strong class="title">封面</strong>\n\n                    <p class="js_cover_tip tips gap_left"></p>\n                </label>\n                <div class="upload_wrap">\n                    <div class="upload_box">\n                        <div class="upload_area">\n                            <a id="js_appmsg_upload_cover" href="javascript:void(0);" onclick="return false;"\n                               class="btn btn_upload">\n                                本地上传                            </a>\n                        </div>\n                    </div>\n                    &nbsp;&nbsp;<a id="js_imagedialog" href="javascript:void(0);" onclick="return false;"\n                                   class="btn btn_upload">从图片库选择</a>\n\n                    <p class="js_cover upload_preview">\n                        <a class="js_removeCover" href="javascript:void(0);" onclick="return false;">删除</a>\n                        <input type="hidden" class="js_field" name="file_id">\n                    </p>\n                </div>\n\n                <p class="frm_tips">\n                    <label for="" class="frm_checkbox_label">\n                        <i class="icon_checkbox"></i>\n                        <input type="checkbox" class="frm_checkbox js_show_cover_pic js_field" name="show_cover_pic" checked>\n                        封面图片显示在正文中                    </label>\n                </p>\n\n                <div class="frm_msg fail js_cover_error" style="display:none;">必须插入一张图片</div>\n            </div>\n            <!-- END 封面 -->\n            <!-- BEGIN 摘要 -->\n            <div class="js_desc_area appmsg_edit_item gap_left align_counter appmsg_description">\n                <label for="" class="frm_label">\n                    <strong class="title">摘要</strong>\n\n                    <p class="tips l gap_left">选填，如果不填写会默认抓取正文前54个字</p>\n                </label>\n                <span class="frm_textarea_box with_counter counter_out">\n                    <textarea class="frm_textarea js_desc js_counter js_field" name="digest" max-length="120"></textarea>\n                    <em class="frm_input_append frm_counter">0/120</em>\n                </span>\n\n                <div class="frm_msg fail js_desc_error" style="display:none;"></div>\n            </div>\n            <!-- END 摘要 -->\n        </div>\n    </div>\n</div>\n';
});define("common/wx/mpEditor/editor.js",["widget/ueditor_new/themes/default/ueditor.css","widget/ueditor_new/themes/default/css/ueditor.css","widget/tooltip.css","common/wx/mpEditor/contextmenu.js","tpl/tooltip.html.js","media/report.js"],function(t){
"use strict";
function e(t){
this.__o={
plugins:[],
onReady:function(){}
},this.__ueditor_config={
contextMenu:i,
UEDITOR_HOME_URL:r.URL,
isShow:!0,
initialContent:"",
autoClearinitialContent:!1,
iframeCssUrl:wx.EditorRes["themes/iframe"],
textarea:"editorValue",
focus:!1,
initialFrameWidth:"auto",
initialFrameHeight:0,
minFrameWidth:800,
minFrameHeight:400,
autoClearEmptyNode:!0,
fullscreen:!1,
readonly:!1,
zIndex:999,
imagePopup:!0,
enterTag:"p",
pageBreakTag:"_baidu_page_break_tag_",
customDomain:!0,
lang:r.LANG,
theme:"default",
allHtmlEnabled:!1,
scaleEnabled:!1,
wordCount:!1,
elementPathEnabled:!1,
autoHeightEnabled:!1,
sourceEditor:"textarea",
imageUrl:"/cgi-bin/uploadimg2cdn?t=ajax-editor-upload-img&lang="+r.LANG+"&token="+r.TOKEN,
imagePath:"",
compressSide:1,
catchRemoteImageEnable:!0,
catcherUrl:"/cgi-bin/uploadimg2cdn?lang="+r.LANG+"&token="+r.TOKEN,
catchFieldName:"imgurl",
separater:"",
toolbars:[["more","|","fontsize","|","blockquote","horizontal","|","removeformat"],["bold","italic","underline","forecolor","backcolor","|","justifyleft","justifycenter","justifyright","|","rowspacingtop","rowspacingbottom","lineheight","|","insertorderedlist","insertunorderedlist","|","imagenone","imageleft","imageright","imagecenter"]],
labelMap:{
anchor:"",
undo:""
},
topOffset:0
},this.__init(t);
}
t("widget/ueditor_new/themes/default/ueditor.css"),t("widget/ueditor_new/themes/default/css/ueditor.css"),
t("widget/tooltip.css");
var i=t("common/wx/mpEditor/contextmenu.js"),n=t("tpl/tooltip.html.js"),o=t("media/report.js"),r={
LANG:window.wx.data.lang,
TOKEN:window.wx.data.t,
URL:/^dev/.test(location.host)?"/mpres/htmledition/style/widget/ueditor_new/":"//res.wx.qq.com/mpres/htmledition/style/widget/ueditor_new/"
};
return e.prototype={
__init:function(t){
this.__g={},this.__extend(t),this.__registerPlugins(),this.__createEditor(),this.__initPulginEvent(),
this.__initReport(),this.__customEventHandle();
},
__initReport:function(){
var t=this;
this.addListener("funcPvUvReport",function(e,i,n){
t.funcPvUvReport(i,n);
});
},
__extend:function(t){
var e=this.__ueditor_config,i=this.__o;
for(var n in t)i.hasOwnProperty(n)?i[n]=t[n]:e.hasOwnProperty(n)&&(e[n]=t[n]);
"auto"!=e.initialFrameHeight&&(e.initialFrameHeight=Math.max(e.initialFrameHeight,e.minFrameHeight)),
"auto"!=e.initialFrameWidth&&(e.initialFrameWidth=Math.max(e.initialFrameWidth,e.minFrameWidth));
},
__registerPlugins:function(){
for(var t=this,e=this.__o.plugins,i=0,n=e.length;n>i;i++){
var o=e[i];
!function(e){
var i=e.getName();
UE.plugins[i]=function(){
this.commands[i]={
execCommand:e.getExecCommand()
},"function"==typeof e.getQueryCommandState&&(this.commands[i].queryCommandState=e.getQueryCommandState()),
"function"==typeof e.getQueryCommandValue&&(this.commands[i].queryCommandValue=e.getQueryCommandValue());
},t.__setPluginMenu(e),t.__pluginPerformance(e);
}(o);
}
},
__setPluginMenu:function(t){
var e=this.__ueditor_config.contextMenu;
"function"==typeof t.getContextMenu&&e.push("-",t.getContextMenu());
},
__pluginPerformance:function(t){
var e=0;
switch("function"==typeof t.getType&&(e=t.getType()||0),e){
case 0:
this.__ceateDefaultBtn(t);
break;

case 1:
this.__createToolBarBtn(t);
}
},
__ceateDefaultBtn:function(t){
var e=this;
if("function"==typeof t.getContainer){
var i=$(t.getContainer()),n=t.getName();
i&&i.click(function(){
e.execCommand(n);
});
}
},
__createEditor:function(){
var t=this,e=this.__o,i=this.__ueditor_config;
this.ueditor=new UE.ui.Editor(i),this.ueditor.ready(function(){
t.__initToolbarTips(),t.__initIframeSelect(),"function"==typeof e.onReady&&e.onReady.call(t,t.ueditor);
});
},
__initIframeSelect:function(){
document.domain="qq.com";
var t=this.ueditor;
window.__editorIframeSelect=function(e){
for(var i=t.document.getElementsByTagName("iframe"),n=0,o=i.length;o>n;n++){
var r=i[n];
r.contentWindow===e&&t.selection.getRange().selectNode(r).select();
}
};
},
__initToolbarTips:function(){
var t=this.__g;
t.toolbarsTips=$(template.compile(n)({
content:""
})),t.toolbarsTips.hide(),$("body").append(t.toolbarsTips),$(this.ueditor.container).find("[id*=_toolbarboxouter]").on("mouseover",function(e){
var i=$(e.target||e.srcElement),n=i.parents("div[data-tooltip]");
if(1==n.length){
var o=n.data("tooltip");
if(o){
t.toolbarsTips.find(".tooltip_inner").html(o);
var r=n.offset();
t.toolbarsTips.css({
top:r.top-5-t.toolbarsTips.height(),
left:r.left+n.width()/2-t.toolbarsTips.width()/2
}).show();
}
}
}).on("mouseout",function(e){
0==$(e.toElement).parents("div[data-tooltip]").length&&t.toolbarsTips.hide();
});
},
__initPulginEvent:function(){
for(var t=this,e=this.__o.plugins,i=0,n=e.length;n>i;i++){
var o=e[i];
o.editor=this,"function"==typeof o.addListener&&o.addListener(t);
}
},
__createToolBarBtn:function(t){
var e="";
"function"==typeof t.getTitle&&(e=t.getTitle()||"");
var i=t.getName(),n=this.getUi();
n[i]=function(t){
return function(i){
var o=new n.Button({
className:"edui-for-"+t,
title:e,
onclick:function(){
i.execCommand(t);
},
theme:i.options.theme,
showText:!1
});
return n.buttons[t]=o,i.addListener("selectionchange",function(e,n,r){
var a=i.queryCommandState(t);
-1==a?(o.setDisabled(!0),o.setChecked(!1)):r||(o.setDisabled(!1),o.setChecked(a));
}),o;
};
}(i);
},
__customEventHandle:function(){
var t=this;
t.addListener("focus keyup aftersetcontent",function(){
t.getDom("contentplaceholder").style.display="none";
}),t.addListener("blur",function(){
""==t.ueditor.getContent().trim()&&(t.getDom("contentplaceholder").style.display="block");
});
},
ready:function(t){
if("function"==typeof t){
{
var e=this;
this.__o;
}
this.ueditor.ready(function(){
t.call(e,e.ueditor),""==e.ueditor.getContent().trim()&&(e.getDom("contentplaceholder").style.display="block");
});
}
},
addListener:function(t,e){
this.ueditor.addListener(t,e);
},
setContent:function(t,e){
for(var i=this.__o.plugins,n=0,o=i.length;o>n;n++){
var r=i[n];
"function"==typeof r.beforeSetContent&&(t=r.beforeSetContent(t));
}
t=t.replace(/background\-image:\s*url\(https\:\/\/mp\.weixin\.qq\.com\/cgi\-bin\/appmsg(.*?)\)/g,""),
this.ueditor.setContent(t,e);
for(var n=0,o=i.length;o>n;n++){
var r=i[n];
"function"==typeof r.afterSetContent&&(t=r.afterSetContent());
}
},
getEditorData:function(t){
for(var e=this.__o.plugins,i=0,n=e.length;n>i;i++){
var o=e[i];
"function"==typeof o.beforeGetContent&&o.beforeGetContent();
}
t=t||{},t.content=this.ueditor.getContent();
for(var i=0,n=e.length;n>i;i++){
var o=e[i];
"function"==typeof o.getPluginData&&(t=o.getPluginData(t));
}
return t.content=t.content.replace(/(<\w+[^>]*)\sid=\"([^\">]*)\"([^>]*>)/g,"$1$3"),
t;
},
queryCommandValue:function(t){
return this.ueditor.queryCommandValue(t);
},
getSelection:function(){
return this.ueditor.selection;
},
getSelectionRange:function(){
return this.getSelection().getRange();
},
getSelectionStart:function(){
return this.getSelection().getStart();
},
render:function(t){
this.ueditor.render(t);
},
getUeditor:function(){
return this.ueditor;
},
getWindow:function(){
return this.ueditor.window;
},
getDocument:function(){
return this.getWindow().document;
},
execCommand:function(){
var t=this.ueditor;
t.execCommand.apply(t,arguments);
},
fireEvent:function(){
var t=this.ueditor;
t.fireEvent.apply(t,arguments);
},
funcPvUvReport:function(t,e){
o.addPvUv(t,e);
},
getUtils:function(){
return UE.utils;
},
getDomUtils:function(){
return UE.dom.domUtils;
},
getBrowser:function(){
return UE.browser;
},
getUi:function(){
return UE.ui;
},
getDom:function(t){
return this.ueditor.ui.getDom(t);
},
enableToolbar:function(){
this.ueditor.ui.getDom("toolbar_mask").style.display="none";
},
disableToolbar:function(){
this.ueditor.ui.getDom("toolbar_mask").style.display="block";
},
checkPlugins:function(){
var t=this.__o.plugins,e=!0;
return $.each(t,function(t,i){
return"function"==typeof i.check?e=i.check():!0;
}),e;
},
isHighlight:function(){
return this.ueditor.highlight;
}
},e;
});define("common/wx/mpEditor/plugin/video.js",["common/wx/mpEditor/editor_all_min.js","common/wx/Tips.js","common/wx/media/videoDialog.js"],function(e){
"use strict";
function i(e,i,t,r,o,n,a){
return o?"<iframe "+(a?"class='"+a+"'":"")+' style="position:relative; z-index:1;" height='+t+" width="+i+' frameborder=0 src="'+e+'" allowfullscreen></iframe><br/>':(n?"<p "+("none"!=r?"center"==r?' style="text-align:center;" ':' style="float:"'+r:"")+">":"")+'<img align="'+r+'" width="'+i+'" height="'+t+'" _url="'+e+'" class="edui-faked-video" src="'+me.options.UEDITOR_HOME_URL+'themes/default/images/spacer.gif" style="background:url('+me.options.UEDITOR_HOME_URL+'themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;" />'+(n?"</p>":"");
}
e("common/wx/mpEditor/editor_all_min.js");
var t=e("common/wx/Tips.js"),r=e("common/wx/media/videoDialog.js"),o=wx.cgiData,n=function(e){
this.domid=e.container;
var i=(this.container=$(e.container).show(),this);
i.report_vid_type=[];
};
return n.prototype={
getName:function(){
return"insertvideo";
},
getExecCommand:function(){
var e=this;
return function(){
var i=e.editor,n=this;
if(i){
var a=i.getDocument();
$(a).find("iframe.video_iframe").length<3?new r({
can_use_shortvideo:!!(wx&&wx.acl&&wx.acl.msg_acl&&wx.acl.msg_acl.can_use_shortvideo),
can_use_txvideo:wx.cgiData.can_use_txvideo,
scene:"ueditor",
onOK:function(t,r){
if(e.report_vid_type.push(15==t||21==t?"1":"0"),21==t){
var a="//mp.weixin.qq.com/mp/getcdnvideourl?__biz=%s&cdn_videoid=%s&thumb=%s".sprintf(o.biz_uin,encodeURIComponent(r.video_cdn_id),encodeURIComponent(r.video_thumb_cdn_url)),s=a+"&shortvideo_sn="+o.shortvideo_sn,d='<iframe data-shortvideofileid="%s" class="video_iframe" style="height:240px;width:320px !important;" frameborder=0 scrolling="no" src="%s" data-src="%s" allowfullscreen></iframe><br/>'.sprintf(r.file_id,s,a);
i.execCommand("inserthtml",d,!0),i.funcPvUvReport("wxvideo");
}else 15==t?(r.height=375,r.width=500,r.vid=r.content,r.url="https://v.qq.com/iframe/preview.html?vid="+r.vid+"&width=500&height=375&auto=0",
e.doCommand(n,"insertvideo",r),i.funcPvUvReport("mpvideo")):(e.doCommand(n,"insertvideo",r),
i.funcPvUvReport("qqvideo"));
return!0;
}
}):t.err("最多添加3个小视频、腾讯视频或微视频");
}
};
},
doCommand:function(e,t,r){
console.log("insert video");
var o=e;
r=UE.utils.isArray(r)?r:[r];
for(var n,a=[],s=0,d=r.length;d>s;s++)n=r[s],a.push(i(n.url,n.width||420,n.height||280,n.align||"none",!0,!0,"video_iframe"));
o.execCommand("inserthtml",a.join(""),!0);
var c=document.createElement("div");
c.className="js_vid",c.setAttribute("name",n.vid),document.getElementsByTagName("body")[0].appendChild(c);
},
check:function(){
var e=$(this.editor.getDocument()).find("iframe"),i=0;
return $.each(e,function(e,t){
$(t).hasClass("video_iframe")&&i++;
}),i>3?(t.err("最多添加3个小视频、腾讯视频或微视频"),!1):!0;
},
getContainer:function(){
return this.domid;
},
getQueryCommandState:function(){
return function(){
var e=this,i=e.selection.getRange().getClosedNode(),t=i&&"edui-faked-video"==i.className;
return t?1:0;
};
},
getPluginData:function(e){
e.content=e.content.replace(/<iframe([^>]*?)(\s)+src=\"https:\/\/v\.qq\.com\/iframe/g,'<iframe$1 data-src="https://v.qq.com/iframe'),
e.content=e.content.replace(/<iframe([^>]*?)(\s)+src=\"http:\/\/z\.weishi\.com\/weixin\/player\.html/g,'<iframe$1 data-src="http://z.weishi.com/weixin/player.html'),
e.content=e.content.replace(/<iframe (data-shortvideofileid[^>]*?)\ssrc=\"([^\"]+)\"([^>]*)>/g,"<iframe $1$3>"),
e.content=e.content.replace(/<iframe ([^>]*)\ssrc=\"([^\"]+)\"([^>]*data-shortvideofileid[^>]*)>/g,"<iframe $1$3>");
for(var i=/src\=(\'|\")https\:\/\/v\.qq\.com\/iframe\/preview\.html\?(.*?)vid\=([^&]+)/g,t=[],r="",o=null;null!=(o=i.exec(e.content));)o[3]&&-1==r.indexOf(o[3]+",")&&(t.push(o[3]),
r+=o[3]+",");
e.video_id=t.join(",");
for(var n=/<iframe data-shortvideofileid="(\d+)"[^>]+><\/iframe>/g,a=[],s=null;s=n.exec(e.content);)a.push(s[1]);
return e.shortvideofileid=a.join("|"),this.report_vid_type.length&&(e.vid_type=this.report_vid_type.join(",")),
e;
},
beforeSetContent:function(e){
return e=e.replace(/<iframe (data-shortvideofileid[^>]*?data\-src=\")([^\"]+)(\")([^>]*)>/g,'<iframe $1$2$3 src="%s" $4>'.sprintf("%s&shortvideo_sn=%s".sprintf("$2",wx.cgiData.shortvideo_sn))),
e=e.replace(/<iframe ([^>]*data\-src=\")([^\"]+)(\")([^>]*data-shortvideofileid[^>]*)>/g,'<iframe $1$2$3 src="%s" $4>'.sprintf("%s&shortvideo_sn=%s".sprintf("$2",wx.cgiData.shortvideo_sn))),
e=e.replace(/<iframe([^>]*?)data\-src=\"https:\/\/v\.qq\.com\/iframe/g,'<iframe$1src="https://v.qq.com/iframe'),
e=e.replace(/<iframe([^>]*?)data\-src=\"http:\/\/z\.weishi\.com\/weixin\/player\.html/g,'<iframe$1src="http://z.weishi.com/weixin/player.html');
}
},n;
});define("common/wx/mpEditor/plugin/img.js",["common/wx/mpEditor/editor_all_min.js","common/wx/media/imageDialog.js"],function(t){
"use strict";
t("common/wx/mpEditor/editor_all_min.js");
var e=t("common/wx/media/imageDialog.js"),i=function(t){
this.domid=t.container;
this.container=$(t.container).show();
};
return i.prototype={
getName:function(){
return"insertimage";
},
getExecCommand:function(){
var t=this;
return function(){
var i=this,a=t.editor;
a&&e({
maxSelect:100,
doselected:!0,
completeUploadMinSelectNum:1,
onOK:function(e){
t.doCommand(i,"insertimage",e.map(function(t){
return t.src=t._src=t.url,t;
}));
var r=0,o=0;
$.each(e,function(t,e){
"upload"==e.source?r++:o++;
}),r>0&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:39,
val:r,
level:"trace",
content:"[file=media/appmsg_edit]"
}),o>0&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:40,
val:o,
level:"trace",
content:"[file=media/appmsg_edit]"
});
var s=e.length;
s>0&&a.funcPvUvReport("insertimage",s),this.destroy(),document.body.style.overflow=document.documentElement.style.overflow="auto";
},
onHide:function(){
this.destroy(),document.body.style.overflow=document.documentElement.style.overflow="auto";
}
});
};
},
doCommand:function(t,e,i){
if(i){
console.log("insert image");
var a="300,640";
if(i=UE.utils.isArray(i)?i:[i],i.length){
var r=t,o=UE.dom.domUtils,s=r.selection.getRange(),c=s.getClosedNode();
if(c&&UE.dom.domUtils.hasClass(c,"js_catchremoteimageerror")&&(UE.dom.domUtils.removeClasses(c,"js_catchremoteimageerror"),
r.fireEvent("keyup",{})),c&&/img/i.test(c.tagName)&&"edui-faked-video"!=c.className&&!c.getAttribute("word_img")){
var m=i.shift(),n=m.format||"",l=m.floatStyle;
delete m.floatStyle,n&&(m["data-type"]=n,"gif"==n&&(m.src+="/mmbizgif")),m.src&&/\/mmbizgif$/.test(m.src)?(m.src=m.src.replace(/\/mmbizgif$/,""),
m.data_ue_src&&/\/mmbizgif$/.test(m.data_ue_src)&&(m.data_ue_src=m.data_ue_src.replace(/\/mmbizgif$/,"")),
o.removeAttributes(c,"data-s")):m["data-s"]=a,o.setAttributes(c,m),r.execCommand("imagefloat",l),
i.length>0&&(s.setStartAfter(c).setCursor(!1,!0),r.execCommand("insertimage",i));
}else{
var d,g=[],f="";
if(d=i[0],1==i.length){
var n=d.format||"";
"gif"==n&&(d.src+="/mmbizgif");
var h=' data-s="'+a+'" ';
d.src&&/\/mmbizgif$/.test(d.src)&&(d.src=d.src.replace(/\/mmbizgif$/,""),h=" "),
h+=n?' data-type="'+n+'" ':"",f="<img "+h+' src="'+d.src+'" '+(d._src?' _src="'+d._src+'" ':"")+(d.width?'width="'+d.width+'" ':"")+(d.height?' height="'+d.height+'" ':"")+("left"==d.floatStyle||"right"==d.floatStyle?' style="float:'+d.floatStyle+';"':"")+(d.title&&""!=d.title?' title="'+d.title+'"':"")+(d.border&&"0"!=d.border?' border="'+d.border+'"':"")+(d.alt&&""!=d.alt?' alt="'+d.alt+'"':"")+(d.hspace&&"0"!=d.hspace?' hspace = "'+d.hspace+'"':"")+(d.vspace&&"0"!=d.vspace?' vspace = "'+d.vspace+'"':"")+"/>",
"center"==d.floatStyle&&(f='<p style="text-align: center">'+f+"</p>"),g.push(f);
}else for(var p=0;d=i[p++];){
"gif"==d.format&&(d.src+="/mmbizgif");
var h=' data-s="'+a+'" ';
d.src&&/\/mmbizgif$/.test(d.src)&&(d.src=d.src.replace(/\/mmbizgif$/,""),h=" "),
h+=d.format?' data-type="'+d.format+'" ':"",f="<p "+("center"==d.floatStyle?'style="text-align: center" ':"")+"><img "+h+' src="'+d.src+'" '+(d.width?'width="'+d.width+'" ':"")+(d._src?' _src="'+d._src+'" ':"")+(d.height?' height="'+d.height+'" ':"")+' style="'+(d.floatStyle&&"center"!=d.floatStyle?"float:"+d.floatStyle+";":"")+(d.border||"")+'" '+(d.title?' title="'+d.title+'"':"")+" /></p>",
g.push(f);
}
r.execCommand("insertHtml",g.join("")+"<br/>");
}
}
}
},
getContainer:function(){
return this.domid;
},
getPluginData:function(t){
return t.content=t.content.replace(/<img(.*?)\s+src="/g,'<img$1 data-src="').replace(/&nbsp;/g," ").replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/"),
t;
},
beforeGetContent:function(){
var t=this,e=$(t.editor.getDocument()),i=e.find("body").width(),a=e.find("img");
a.each(function(){
var t=$(this),e=t.width(),a=t.height();
t.attr("data-ratio",a/e),t.attr("data-w",i==e?"":e);
});
},
beforeSetContent:function(t){
return t=t.replace(/<img(.*?)\s+data\-src="/g,'<img$1 src="').replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qlogo.cn/")||"";
}
},i;
});define("common/wx/mpEditor/plugin/audio.js",["common/wx/popup.js","biz_web/ui/checkbox.js","tpl/media/plugin/audio.html.js","tpl/media/plugin/audioItem.html.js","common/wx/Cgi.js","common/wx/media/audio.js","common/wx/pagebar.js","biz_common/moment.js","common/wx/Tips.js"],function(i){
"use strict";
function e(i){
this.__o={
container:""
},this.editor=null,this.__g={
maxNum:1
},this.__init(i),$(i.container).show();
}
i("common/wx/popup.js"),i("biz_web/ui/checkbox.js");
var t=i("tpl/media/plugin/audio.html.js"),o=i("tpl/media/plugin/audioItem.html.js"),n=i("common/wx/Cgi.js"),a=i("common/wx/media/audio.js"),u=i("common/wx/pagebar.js"),d=i("biz_common/moment.js"),_=i("common/wx/Tips.js");
return e.prototype={
getName:function(){
return"insertaudio";
},
getExecCommand:function(){
var i=this,e=this.__g;
return function(){
i.__getAudioNum()>=e.maxNum?_.err("每篇图文消息只能添加一个语音"):i.__openAudioPopup();
};
},
getContainer:function(){
return this.__o.container;
},
addListener:function(i){
var e=this,t=this.__g;
i.addListener("beforepaste",function(i,o,n){
var a=$($.parseHTML(n.toHtml())).find("iframe.js_editor_audio").length;
if(0!=a)return e.__getAudioNum()+a>t.maxNum?(_.err("每篇图文消息只能添加一个语音"),o.html="",!0):void 0;
});
},
beforeSetContent:function(i){
return i=i.replace(/<mpvoice([^>]*?)js_editor_audio([^>]*?)><\/mpvoice>/g,"<iframe $1js_editor_audio$2></iframe>");
},
getPluginData:function(i){
return i.content=i.content.replace(/<iframe([^>]*?)js_editor_audio([^>]*?)><\/iframe>/g,"<mpvoice $1js_editor_audio$2></mpvoice>"),
i;
},
check:function(){
return this.__getAudioNum()>this.__g.maxNum?(_.err("每篇图文消息只能添加一个语音"),!1):!0;
},
__init:function(i){
var e=this.__o;
for(var t in i)e.hasOwnProperty(t)&&(e[t]=i[t]);
},
__getAudioNum:function(){
var i=this.editor.getUeditor();
return $(i.body).find("iframe.js_editor_audio").length;
},
__openAudioPopup:function(){
this.__initPopup(),this.__bindPopupEvent();
},
__initPopup:function(){
var i=this,e=this.__g;
e.pageBar=null,e.audioList=[],e.pop=$(t).popup({
className:"align_edge audio_dialog",
width:"960",
title:"请选择语音",
buttons:[{
text:"确定",
click:function(){
var t=e.pop.find(".jsPluginAudioRadio[checked=checked]").data("index");
i.__getAudioHtml(t),e.pop=null,this.remove();
},
type:"primary"
},{
text:"取消",
click:function(){
e.pop=null,this.remove();
}
}],
onHide:function(){
e.pop=null,this.remove();
}
}),this.__send(0,10);
},
__send:function(i,e,t){
var _=this,r=this.__g;
n.get({
url:"/cgi-bin/filepage",
dataType:"json",
data:{
type:3,
begin:i,
count:e
},
mask:!1
},function(i){
if(r.pop)if(0==i.base_resp.ret){
var e=i.page_info.file_item;
r.audioList=[],e.each(function(i){
1==i.trans_state&&r.audioList.push({
name:i.name,
title:i.title||i.name,
update_time:d.unix(i.update_time).format("YYYY-MM-DD"),
play_length:i.play_length,
file_id:i.file_id,
voice_encode_fileid:i.voice_encode_fileid,
disabled:t&&i.play_length>6e4,
format_play_length:d.unix(i.play_length/1e3).format("mm:ss")
});
});
var m=wx.T(o,{
list:r.audioList
});
r.pop.find(".jsPluginAudioList").html(m),r.pop.find(".jsPluginAudioRadio").checkbox(),
t&&$(".jsAudioTips").show(),r.pop.find(".jsPluginAudioPlay").each(function(i,e){
var t=r.audioList[i];
return t.selector="#"+$(e).attr("id"),t.source="file",new a($.extend({},t,{
qqmusictpl:!0
}));
}),r.pageBar||(r.pageBar=new u({
container:".jsPluginAudioPage",
totalItemsNum:i.page_info.file_cnt.voice_cnt,
callback:function(i){
_.__send(10*(i.currentPage-1),10,t);
}
}));
}else n.show(i);
});
},
__bindPopupEvent:function(){
$(".jsPluginAudioNew").click(function(){
window.open(wx.url("/cgi-bin/operate_voice?oper=voice_get&t=media/audio_add"),"_blank");
});
},
__insertAudio:function(i){
var e=this.editor;
e.execCommand("inserthtml",i,!0),e.funcPvUvReport("insertaudio");
},
__getAudioHtml:function(i){
var e=this.__g.audioList[i];
if(e){
e={
name:encodeURIComponent(e.title),
play_length:encodeURIComponent(e.play_length),
file_id:encodeURIComponent(e.file_id),
voice_encode_fileid:e.voice_encode_fileid,
duration:e.format_play_length
},e.src="/cgi-bin/readtemplate?t=tmpl/audio_tmpl&name={name}&play_length={duration}".format(e);
var t='<p><iframe class="res_iframe js_editor_audio audio_iframe" src="{src}" name="{name}" play_length="{play_length}" voice_encode_fileid="{voice_encode_fileid}"></iframe></p>';
t=t.format(e),this.__insertAudio(t);
}
}
},e;
});define("common/wx/mpEditor/plugin/unlink.js",[],function(){
"use strict";
function t(){
this.editor=null,this.__g={
name:"unlink",
title:"取消超链接"
};
}
return t.prototype={
getName:function(){
return this.__g.name;
},
getExecCommand:function(){
var t=this;
return function(){
if(t.editor){
var e=t.editor;
e.fireEvent("funcPvUvReport","unlink");
var n,i=e.getSelectionRange(),r=e.getDomUtils();
(!i.collapsed||r.findParentByTagName(i.startContainer,"a",!0))&&(n=i.createBookmark(),
e.fireEvent("link_optimize",i),i.removeInlineStyle("a").moveToBookmark(n).select());
}
};
},
getType:function(){
return 1;
},
getTitle:function(){
return this.__g.title;
},
getQueryCommandState:function(){
var t=this;
return function(){
var e=t.editor;
return e&&!e.isHighlight()&&e.queryCommandValue("link")?0:-1;
};
},
getContextMenu:function(){
var t=this.__g,e={
label:t.title,
cmdName:t.name
};
return e;
}
},t;
});define("common/wx/mpEditor/plugin/link.js",["common/wx/popup.js","biz_common/jquery.validate.js","common/wx/Cgi.js","tpl/mpEditor/plugin/link_dialog.html.js","tpl/mpEditor/plugin/link_appmsg.html.js","biz_common/moment.js","common/wx/Tips.js","common/wx/pagebar.js"],function(e){
"use strict";
function t(){
this.editor=null,this.__g={
_perPage:5
};
}
e("common/wx/popup.js"),e("biz_common/jquery.validate.js");
var n=e("common/wx/Cgi.js"),i=e("tpl/mpEditor/plugin/link_dialog.html.js"),a=e("tpl/mpEditor/plugin/link_appmsg.html.js"),r=e("biz_common/moment.js"),o=e("common/wx/Tips.js"),l=e("common/wx/pagebar.js");
return t.prototype={
getName:function(){
return"link";
},
getExecCommand:function(){
var e=this;
return function(){
e.editor&&e.__openDialog();
};
},
addListener:function(e){
var t=this;
e.addListener("link_optimize",function(e,n){
t.__optimize(n);
}),e.addListener("selectionchange",function(t,n){
if(n){
var i,a=e.queryCommandValue("link"),r="";
if(a&&(i=a.getAttribute("_href")||a.getAttribute("href",2))){
var o=i;
i.length>30&&(o=i.substring(0,20)+"..."),r='<nobr>链接: <a target="_blank" href="'+i+'" title="'+i+'" >'+o+'</a> <span class="edui-clickable" onclick="$$._execCommand(\'link\');">修改</span> <span class="edui-clickable" onclick="$$._execCommand(\'unlink\');">清除</span></nobr>';
}
e.fireEvent("handle_common_popup",a,r);
}
});
},
getType:function(){
return 1;
},
getTitle:function(){
return"超链接";
},
getQueryCommandState:function(){
var e=this;
return function(){
var t=e.editor;
if(!t)return 0;
var n=t.getSelectionRange().getClosedNode(),i=n&&"edui-faked-video"==n.className;
return i?-1:0;
};
},
getQueryCommandValue:function(){
var e=this;
return function(){
var t=e.editor;
if(t){
var n,i=t.getSelectionRange(),a=t.getDomUtils();
if(!i.collapsed){
i.shrinkBoundary();
var r=3!=i.startContainer.nodeType&&i.startContainer.childNodes[i.startOffset]?i.startContainer.childNodes[i.startOffset]:i.startContainer,o=3==i.endContainer.nodeType||0==i.endOffset?i.endContainer:i.endContainer.childNodes[i.endOffset-1],l=i.getCommonAncestor();
if(n=a.findParentByTagName(l,"a",!0),!n&&1==l.nodeType)for(var s,d,c,u=l.getElementsByTagName("a"),p=0;c=u[p++];)if(s=a.getPosition(c,r),
d=a.getPosition(c,o),(s&a.POSITION_FOLLOWING||s&a.POSITION_CONTAINS)&&(d&a.POSITION_PRECEDING||d&a.POSITION_CONTAINS)){
n=c;
break;
}
return n;
}
return n=i.startContainer,n=1==n.nodeType?n:n.parentNode,n&&(n=a.findParentByTagName(n,"a",!0))&&!a.isInNodeEndBoundary(i,n)?n:void 0;
}
};
},
__openDialog:function(){
this.__DialogInit(),this.__initDialogData(),this.__DialogEvent(),this.__queryAppmsgLink(0,this.__g._perPage,"",!0);
},
__DialogEvent:function(){
var e=this,t=this.__g,n=t._linkDialog,i=t._perPage;
t.form=n.find("#linkForm").validate({
rules:{
title:{
required:!0
},
href:{
required:!0,
url:!0
}
},
messages:{
title:{
required:"文章标题不能为空"
},
href:{
required:"链接地址不能为空",
url:"链接地址不合法(必须以http://或https://开头)"
}
}
}),n.find("#keyInput").keydown(function(e){
var t="which"in e?e.which:e.keyCode;
13==t&&n.find("#searchBt").trigger("click");
}),n.find("#searchCloseBt").click(function(){
n.find("#keyInput").val(""),e.__queryAppmsgLink(0,i,"",!0);
}),n.find("#searchBt").click(function(){
e.__queryAppmsgLink(0,i,n.find("#keyInput").val().trim(),!0);
}),n.find("#linkArrow").click(function(){
$(this).find(".arrow").hasClass("down")?($(this).find(".arrow").setClass("arrow up"),
n.find("#linkChoose").show(),n.popup("resetPosition")):($(this).find(".arrow").setClass("arrow down"),
n.find("#linkChoose").hide(),n.popup("resetPosition"));
});
},
__initDialogData:function(){
var e=this.__g,t=e._linkDialog,n=this.editor,i=n.getDomUtils(),a=n.getSelectionRange(),r=a.collapsed?n.queryCommandValue("link"):n.getSelectionStart();
r?(i.findParentByTagName(r,"a",!0)&&(r=i.findParentByTagName(r,"a",!0)),t.find("#txtTitle").val(r.text||"你已选中了添加链接的文本内容").attr("disabled",!0).parent().addClass("disabled"),
t.find("#txtHref").val(r.href||"http://"),e.canWriteBack=!1):e.canWriteBack=!0,e._linkDialog.popup("show");
},
__DialogInit:function(){
var e=this,t=this.__g;
t.canWriteBack=!1,t.form=null;
var n=wx.T(i,{
flag:wx.cgiData.can_use_hyperlink
});
t._linkDialog=$(n).popup({
title:"新增或编辑超链接",
className:"link_dialog",
width:"726",
autoShow:!1,
buttons:[{
text:"确定",
type:"primary",
click:function(){
var n=t._linkDialog;
if(t.form.form()){
var i={
href:n.find("#txtHref").val().replace(/^\s+|\s+$/g,""),
target:"_blank",
data_ue_src:n.find("#txtHref").val().replace(/^\s+|\s+$/g,"")
};
t.canWriteBack&&(i.textValue=n.find("#txtTitle").val().replace(/^\s+|\s+$/g,"")),
e.__insertLink(i),t._linkDialog=null,this.remove();
}
}
},{
text:"取消",
click:function(){
t._linkDialog=null,this.remove();
}
}],
close:function(){
t._linkDialog=null,this.remove();
}
});
},
__queryAppmsgLink:function(e,t,i,a){
var r=this,s=this.__g,d=s._linkDialog,c=s._perPage;
d&&n.post({
url:"/cgi-bin/appmsg",
data:{
action:"list_ex",
begin:e,
count:c,
query:i,
type:9
}
},function(e){
"0"==e.base_resp.ret?(r.__renderAppmsgList(e.app_msg_list),a&&new l({
container:"#pageBar",
perPage:c,
totalItemsNum:e.app_msg_cnt,
isSimple:!0,
callback:function(e){
r.__queryAppmsgLink((e.currentPage-1)*c,c,d.find("#keyInput").val().trim(),!1);
}
})):o.err();
});
},
__renderAppmsgList:function(e){
var t=this.__g,n=[],i=t._linkDialog;
i&&(e.each(function(e){
n.push({
title:e.title,
time:r.unix(e.update_time).format("YYYY-MM-DD"),
href:e.link.replace("#rd","&scene=21#wechat_redirect"),
aid:e.aid
});
}),n.length>0?(i.find("#linkList").html(wx.T(a,{
data:n
})),i.popup("resetPosition"),i.find("input[type=radio]").checkbox({
onChanged:function(e){
var n=$(e);
1==t.canWriteBack&&i.find("#txtTitle").val(n.data("title")),i.find("#txtHref").val(n.data("href")),
t.form.form();
}
})):i.find("#linkList").html('<li class="empty_tips">暂无数据</li>'));
},
__insertLink:function(e){
var t,n=this.editor,i=n.getUtils();
n.fireEvent("funcPvUvReport","link"),e._href&&(e._href=i.unhtml(e._href,/[<">]/g)),
e.href&&(e.href=i.unhtml(e.href,/[<">]/g)),e.textValue&&(e.textValue=i.unhtml(e.textValue,/[<">]/g)),
this.__doLink(t=n.getSelectionRange(),e),t.collapse().select(!0);
},
__optimize:function(e){
var t=this.editor.getDomUtils(),n=e.startContainer,i=e.endContainer;
(n=t.findParentByTagName(n,"a",!0))&&e.setStartBefore(n),(i=t.findParentByTagName(i,"a",!0))&&e.setEndAfter(i);
},
__doLink:function(e,t){
var n=this.editor,i=e.cloneRange(),a=n.getBrowser(),r=n.getDomUtils(),o=n.queryCommandValue("link"),l=n.getUtils();
this.__optimize(e=e.adjustmentBoundary());
var s=e.startContainer;
if(1==s.nodeType&&o&&(s=s.childNodes[e.startOffset],s&&1==s.nodeType&&"A"==s.tagName&&/^(?:https?|ftp|file)\s*:\s*\/\//.test(s[a.ie?"innerText":"textContent"])&&(s[a.ie?"innerText":"textContent"]=l.html(t.textValue||t.href))),
(!i.collapsed||o)&&(e.removeInlineStyle("a"),i=e.cloneRange()),i.collapsed){
var d=e.document.createElement("a"),c="";
t.textValue?(c=l.html(t.textValue),delete t.textValue):c=l.html(t.href),r.setAttributes(d,t),
s=r.findParentByTagName(i.startContainer,"a",!0),s&&r.isInNodeEndBoundary(i,s)&&e.setStartAfter(s).collapse(!0),
d[a.ie?"innerText":"textContent"]=c,e.insertNode(d).selectNode(d);
}else e.applyInlineStyle("a",t);
}
},t;
});define("common/wx/mpEditor/plugin/card.js",["common/wx/mpEditor/editor_all_min.js","common/wx/Tips.js","cardticket/send_card.js","common/wx/Cgi.js","cardticket/parse_data.js"],function(t){
"use strict";
t("common/wx/mpEditor/editor_all_min.js");
var e=t("common/wx/Tips.js"),r=t("cardticket/send_card.js"),a=t("common/wx/Cgi.js"),i=wx.cgiData,n=t("cardticket/parse_data.js"),c=function(t){
this.domid=t.container,this.biz_uin=t.biz_uin||"";
var e=(this.container=$(t.container).show(),this);
e.report_vid_type=[],e._init();
};
return c.prototype={
getName:function(){
return"insertcard";
},
getExecCommand:function(){
var t=this;
return function(){
var e=t.editor,r=this;
if(e){
{
e.getDocument();
}
t._openCardSelect(r);
}
};
},
_init:function(){
var t=this;
i.cardid&&a.get({
url:"/merchant/electroniccardmgr?action=get&card_id=%s".sprintf(i.cardid)
},function(e){
e.base_resp&&0==e.base_resp.ret&&(t.card_data=$.parseJSON(e.card_detail),t.card_data=n.parse_cardticket(t.card_data),
t._initCard());
});
},
_initCard:function(){
if(this.hasSetContent&&this.card_data){
var t=this.editor.getUeditor().getContent(),e=/<iframe scrolling=\"no\" frameborder=\"0\" class=\"res_iframe card_iframe js_editor_card\".*?><\/iframe>/gi;
e.test(t)?(t=t.replace(e,this._getCardIframe(this.card_data,i.cardnum)),this.editor.getUeditor().setContent(t)):this._insertCard(this.editor,this.card_data,i.cardnum);
}
},
_checkCard:function(t){
var r=$(this.editor.getDocument()).find("iframe"),a=0,i=5;
return $.each(r,function(t,e){
$(e).hasClass("js_editor_card")&&a++;
}),a>i||t&&a>=i?(e.err("正文只能包含%s个卡券".sprintf(i)),!1):!0;
},
_getCardIframe:function(t,e){
return['<iframe class="res_iframe card_iframe js_editor_card" scrolling="no" frameborder="0" ','data-cardid="%s" data-num="%s" '.sprintf(t.id,e),'src="/cgi-bin/readtemplate?t=cardticket/card_preview_tmpl&logo_url=%s&brand_name=%s&title=%s&color=%s&lang=zh_CN"'.sprintf(encodeURIComponent(t.logo_url),encodeURIComponent(t.brand_name),encodeURIComponent(t.title),encodeURIComponent(t.color)),' data-src="http://mp.weixin.qq.com/bizmall/appmsgcard?action=show&biz=%s&cardid=%s&wechat_card_js=1#wechat_redirect" '.sprintf(this.biz_uin,t.id),"></iframe>"].join("");
},
_insertCard:function(t,e,r){
var a=this._getCardIframe(e,r);
t.execCommand("inserthtml",a,!0),this.editor.fireEvent("funcPvUvReport","insertcard");
},
_openCardSelect:function(t){
if(this._checkCard(!0)){
var e=this,a=new r({
multi:!1,
param:{
need_member_card:1
},
selectComplete:function(r,a){
e._insertCard(t,r,a);
},
source:"嵌入图文消息素材"
});
a.show();
}
},
_getIframeData:function(t){
var e=t.key,r=t.content,a=(t.ifrmName,new RegExp("<iframe[^>]*?"+t.ifrmName+"[^>]*?data-"+e+"=('|\")(.*?)('|\").*?>","g"));
return a.test(r)?RegExp.$2:null;
},
check:function(){
return this._checkCard();
},
getQueryCommandState:function(){
return function(){
var t=this,e=t.selection.getRange().getClosedNode(),r=e&&"edui-faked-video"==e.className;
return r?1:0;
};
},
getContainer:function(){
return this.domid;
},
getPluginData:function(t){
var e=this,r=e._getIframeData({
content:t.content,
key:"cardid",
ifrmName:"js_editor_card"
});
if(r){
var a=e._getIframeData({
content:t.content,
key:"num",
ifrmName:"js_editor_card"
});
t.cardid=r,t.cardquantity=a,t.cardlimit=0==a?0:1;
}
return t;
},
afterSetContent:function(){
this.hasSetContent=!0,this._initCard();
}
},c;
});define("common/wx/mpEditor/plugin/vote.js",["biz_web/widget/date_range.css","page/vote/dialog_vote_table.css","widget/date_select.css","common/wx/mpEditor/editor_all_min.js","common/wx/Tips.js","common/wx/pagebar.js","common/wx/Cgi.js","vote/new.js","tpl/vote/vote_table.html.js"],function(require,exports,module){
"use strict";
function iframeUrlSwitcher(e){
for(var t=e.content,o=e.returnValue||"content",a=e.wrapper||"add",n=t.split(/<\/?iframe/),i="",r=" TMP_NAME=",s=[],c=[],l=[],d=0;d<n.length;d++){
if(-1!==n[d].indexOf("js_editor_vote_card")||-1!==n[d].indexOf("js_editor_card")){
n[d]=n[d].replace(" src=",r).replace(" data-display-src="," src=").replace(r," data-display-src="),
n[d]=n[d].replace(" style=",r).replace(" data-display-style="," style=").replace(r," data-display-style=");
var u=n[d].match(/data-voteid=\"([^\"]*)/);
u&&u[1]&&s.push(u[1]);
var p=n[d].match(/isMlt=(\d)/);
p&&p[1]&&c.push(p[1]),n[d]=n[d].replace(/token=(\d+)&/gi,"token="+wx.getUrl("token")+"&");
var v=n[d].match(/data-supervoteid=\"([^\"]*)/);
v&&v[1]&&l.push(v[1]);
}
i+=n[d],d<n.length-1&&(i+=(d%2?"</":"<")+"iframe");
}
switch(i="add"===a?i.replace(/(<iframe[\s\S]*js_editor_vote_card[\s\S]*<\/iframe>)/gi,function(e){
return['<span class="vote_area">',e,'<span class="vote_box skin_help po_left"></span>','<span class="vote_box skin_help po_right"></span>',"</span>"].join("");
}):i.replace('<span class="vote_area">',"").replace('<span class="vote_box skin_help po_left"></span><span class="vote_box skin_help po_right"></span></span>',""),
o){
case"voteid":
return s;

case"isMlt":
return c;

case"supervoteid":
return l;

case"content":
default:
return i;
}
}
function setVoteIframeHeight(e){
var t=e.getDocument();
$(t).find("iframe").each(function(){
var t=this;
$(t).hasClass("js_editor_vote_card")&&$(t).on("load",function(){
$(t.contentWindow.document).on("finished",function(){
var o=$(this).height();
t.contentDocument&&t.contentDocument.body.offsetHeight?o=t.contentDocument.body.offsetHeight:t.Document&&t.Document.body&&t.Document.body.scrollHeight?o=t.Document.body.scrollHeight:t.document&&t.document.body&&t.document.body.scrollHeight&&(o=t.document.body.scrollHeight),
$(t).height(o).off("finished"),e.fireEvent("contentchange");
}),$(t).off("load");
});
});
}
require("biz_web/widget/date_range.css"),require("page/vote/dialog_vote_table.css"),
require("widget/date_select.css"),require("common/wx/mpEditor/editor_all_min.js");
var Tips=require("common/wx/Tips.js"),Pagebar=require("common/wx/pagebar.js"),Cgi=require("common/wx/Cgi.js");
template.helper("datestring",function(e){
function t(e,t){
for(var o=0,a=t-(e+"").length;a>o;o++)e="0"+e;
return e+"";
}
var o=new Date(e),a=["日","一","二","三","四","五","六"],n="yyyy年mm月dd日".replace(/yyyy|YYYY/,o.getFullYear()).replace(/yy|YY/,t(o.getFullYear()%100,2)).replace(/mm|MM/,t(o.getMonth()+1,2)).replace(/m|M/g,o.getMonth()+1).replace(/dd|DD/,t(o.getDate(),2)).replace(/d|D/g,o.getDate()).replace(/hh|HH/,t(o.getHours(),2)).replace(/h|H/g,o.getHours()).replace(/ii|II/,t(o.getMinutes(),2)).replace(/i|I/g,o.getMinutes()).replace(/ss|SS/,t(o.getSeconds(),2)).replace(/s|S/g,o.getSeconds()).replace(/w/g,o.getDay()).replace(/W/g,a[o.getDay()]);
return n;
});
var Vote=function(e){
this.domid=e.container;
this.container=$(e.container).show();
};
return Vote.prototype={
getName:function(){
return"insertvote";
},
getExecCommand:function(){
var e=this;
return function(){
var t=this,o=e.editor;
o&&e.openVotePopup(t);
};
},
doCommand:function(e,t,o){
o&&console.log("insert vote");
},
getContainer:function(){
return this.domid;
},
getPluginData:function(e){
e.content=iframeUrlSwitcher({
content:e.content,
wrapper:"add"
});
var t=iframeUrlSwitcher({
content:e.content,
returnValue:"voteid"
})[0],o=iframeUrlSwitcher({
content:e.content,
returnValue:"isMlt"
})[0],a=iframeUrlSwitcher({
content:e.content,
returnValue:"supervoteid"
});
return t&&"undefined"!=typeof o&&(e.voteid=t,e.voteismlt=o||store.get("appmsg_vote_"+t)),
a&&(e.supervoteid=a[0]),e;
},
beforeSetContent:function(e){
var e=iframeUrlSwitcher({
content:e,
wrapper:"remove"
});
return e;
},
afterSetContent:function(){
setVoteIframeHeight(this.editor);
},
insertVoteIframe:function(e,t){
var o=this.editor;
e.execCommand("inserthtml",t.join(""),!0),o.fireEvent("funcPvUvReport","insertvote");
},
_setIframeHeight:function(){
var e=this;
setTimeout(function(){
var t=e.editor.getDocument().getElementsByTagName("iframe");
if(t&&t.length>0)for(var o=0;o<t.length;o++)if($(t[o]).hasClass("js_editor_vote_card")){
var a=t[o],n=$(a).height();
a.contentDocument&&a.contentDocument.body.offsetHeight?n=a.contentDocument.body.offsetHeight:a.Document&&a.Document.body&&a.Document.body.scrollHeight?n=a.Document.body.scrollHeight:a.document&&a.document.body&&a.document.body.scrollHeight&&(n=a.document.body.scrollHeight),
a.style.height=n+"px";
}
},5e3);
},
_checkIframe:function(e){
var t=$(this.editor.getDocument()).find("iframe"),o=0;
return $.each(t,function(e,t){
$(t).hasClass("js_editor_vote_card")&&o++;
}),o>1||e&&o>=1?(Tips.err("正文只能包含%s个投票".sprintf(1)),!1):!0;
},
check:function(){
return this._checkIframe();
},
openVotePopup:function(ueditor){
function renderList(begin){
$.ajax({
url:wx.url("/cgi-bin/newoperatevote?action=list&vote_status=1&f=json&count=6&begin="+begin),
type:"get",
dataType:"json",
success:function(data){
if(data.data){
for(var voteData=eval("("+data.data+")"),iframeH=0,i=0;i<voteData.super_vote_info.length;i++)voteData.super_vote_info[i].height=150*voteData.super_vote_info[i].vote_id_list.vote_id.length;
$(".js_vote_list").html(compile_html({
loading:!1,
data:voteData,
iframeH:iframeH,
biz:data.bizuin,
token:wx.data.param
})),$(".js_select").checkbox({
multi:!1
});
var total_count=voteData.total_count,count=6,showpage=begin/count+1,pagebar=new Pagebar({
container:".js_pager",
perPage:count,
first:!1,
last:!1,
isSimple:!0,
initShowPage:showpage,
totalItemsNum:total_count,
callback:function(e){
var t=e.currentPage;
if(t!=showpage)return t--,renderList(t*count),!1;
}
});
}else $(".js_vote_list").html(compile_html({
loading:!1,
data:{
super_vote_info:[]
}
}));
},
error:function(){}
});
}
var that=this;
if(!that._checkIframe(!0))return null;
document.body.style.overflow=document.documentElement.style.overflow="hidden";
var pop=$("<div class='' id='js_vote_menu'> <div class='title_tab'> <ul class='tab_navs title_tab' data-index='0'> <li data-index='0' class='tab_nav first selected'><a href='#none' id='js_new_vote'>新投票</a></li> <li data-index='1' class='tab_nav'><a href='#none' id='js_vote_list'>已有投票</a></li> </ul> </div> <div class='new_vote js_new_vote'>'+_vote_pop_html+'</div> <div class='vote_list js_vote_list' style='display:none'></div> </div>").popup({
title:"发起投票",
className:"vote_edit tc_dialog dialog_normal_form",
buttons:[{
text:"确定",
click:function(){},
type:"primary"
}],
close:function(){
this.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto";
}
}),vote=require("vote/new.js");
vote.initPage(),vote.eventBind();
var _vote_list_tpl=require("tpl/vote/vote_table.html.js"),compile_html=template.compile(_vote_list_tpl);
$(".js_vote_list").html(compile_html({
loading:!0
})),$("#js_new_vote").click(function(){
$(".js_new_vote").show(),$("#js_new_vote").parent().addClass("selected"),$(".js_vote_list").hide(),
$("#js_vote_list").parent().removeClass("selected");
}),$("#js_vote_list").click(function(){
$(".js_new_vote").hide(),$("#js_new_vote").parent().removeClass("selected"),$(".js_vote_list").show(),
$("#js_vote_list").parent().addClass("selected");
}),renderList(0),$(".vote_edit button").click(function(){
var iframeH=0,saveBtn=pop.find(":button").last();
saveBtn.removeClass("btn_loading");
var supervoteid=0,biz=0;
if("none"==$(".js_vote_list").css("display")){
var data=vote.getFullData();
if(data){
var tempData=eval("("+data+")"),optionL=0;
iframeH+=70*tempData.vote_subject.length;
for(var i=0;i<tempData.vote_subject.length;i++)optionL+=tempData.vote_subject[i].options.length;
iframeH+=30*optionL,saveBtn.btn(!1),Cgi.post({
url:wx.url("/cgi-bin/newoperatevote?action=create"),
dataType:"json",
data:{
action:"create",
json:data
},
mask:!1
},function(e){
0==e.base_resp.ret?(Tips.suc("操作成功"),supervoteid=e.super_vote_id,biz=e.bizuin,that.insertVoteIframe(ueditor,['<iframe scrolling="no" frameborder="0" class="vote_iframe js_editor_vote_card" style="height:0px;" ','src="',wx.url("/cgi-bin/readtemplate?t=vote/vote-new_tmpl&__biz="+biz+"&supervoteid=%s".sprintf(supervoteid)),'"','data-src="',"/mp/newappmsgvote?action=show&__biz=",biz,"&supervoteid=%s#wechat_redirect".sprintf(supervoteid),'"','data-supervoteid="%s"'.sprintf(supervoteid)," allowfullscreen >","</iframe>"]),
setVoteIframeHeight(that.editor),pop.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto",
$(".mask").hide()):(Tips.err(e.base_resp.err_msg),saveBtn.btn(!0));
});
}
}else saveBtn.btn(!1),1==$(".js_select:checked").length?(supervoteid=$(".js_select:checked").val(),
biz=$(".js_select:checked").data("biz"),iframeH=$(".js_select:checked").data("height"),
that.insertVoteIframe(ueditor,['<iframe scrolling="no" frameborder="0" class="vote_iframe js_editor_vote_card" style="height:0px;" ','src="',wx.url("/cgi-bin/readtemplate?t=vote/vote-new_tmpl&__biz="+biz+"&supervoteid=%s".sprintf(supervoteid)),'"','data-src="',"/mp/newappmsgvote?action=show&__biz=",biz,"&supervoteid=%s#wechat_redirect".sprintf(supervoteid),'"','data-supervoteid="%s"'.sprintf(supervoteid)," allowfullscreen >","</iframe>"]),
setVoteIframeHeight(that.editor),pop.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto",
saveBtn.btn(!0),$(".mask").hide()):(Tips.err("请选择投票"),saveBtn.btn(!0));
});
}
},Vote;
});define("common/wx/mpEditor/plugin/music.js",["common/wx/popup.js","tpl/mpEditor/plugin/music.html.js","tpl/media/dialog/audiomsg_layout.html.js","common/wx/media/audio.js","common/wx/pagebar.js","common/wx/Tips.js"],function(i){
"use strict";
function e(i){
this.__o={
container:""
},this.editor=null,this.__g={},this.__init(i),$(i.container).show();
}
i("common/wx/popup.js");
var n=i("tpl/mpEditor/plugin/music.html.js"),t=i("tpl/media/dialog/audiomsg_layout.html.js"),o=i("common/wx/media/audio.js"),c=i("common/wx/pagebar.js"),r=i("common/wx/Tips.js");
return e.prototype={
getName:function(){
return"insertmusic";
},
getExecCommand:function(){
var i=this;
return function(){
console.log("insert music "),i.__openMusicPopup();
};
},
getContainer:function(){
return this.__o.container;
},
addListener:function(){},
beforeSetContent:function(i){
return i=i.replace(/<qqmusic([^>]*?)js_editor_qqmusic([^>]*?)><\/qqmusic>/g,"<iframe $1js_editor_qqmusic$2></iframe>");
},
getPluginData:function(i){
for(var e=i.content,n=/<iframe\s(?:[\s\S]*?)musicid\=[\'\"]([\d]*?)[\'\"](?:[\s\S]*?)>/g,t=[],o="",c=null;null!=(c=n.exec(e));)c[1]&&-1==o.indexOf(c[1]+",")&&(t.push(c[1]),
o+=c[1]+",");
return i.music_id=t.join(","),i.content=i.content.replace(/<iframe([^>]*?)js_editor_qqmusic([^>]*?)><\/iframe>/g,"<qqmusic $1js_editor_qqmusic$2></qqmusic>"),
i;
},
__init:function(i){
var e=this.__o;
for(var n in i)e.hasOwnProperty(n)&&(e[n]=i[n]);
},
__openMusicPopup:function(){
this.__initPop(),this.__initPopEvt();
},
__initPop:function(){
var i=this,e=this.__g,t=e._oSelectdSong={};
e._oAudioPop=$(n).popup({
title:"添加音乐",
className:"align_edge qqmusic_dialog",
width:"960",
buttons:[{
text:"确定",
type:"primary",
click:function(){
if(console.log("selected music "+t.mid),console.log(wx.url("/cgi-bin/registertopic?id="+t.musicid+"&type=1&src=1")),
"undefined"!=typeof t.musicid){
var n=this,o=n.get().find(".js_btn_p").eq(0);
if(o.hasClass("btn_loading"))return;
o.btn(0),$.ajax({
url:wx.url("/cgi-bin/registertopic?id="+t.musicid+"&type=1&src=1"),
type:"post",
dataType:"json",
success:function(c){
e._oAudioPop&&(console.log("success"),console.log(c),o.btn(1),c&&"0"==c.base_resp.ret&&"undefined"!=typeof c.topic_id?(t.commentid=c.topic_id,
i.__insertMusic(i.__getMusicIframe()),console.log(t),e._oAudioPop=null,n.remove()):r.err("系统繁忙，请稍后再试"));
}
});
}else r.err("请选择要插入的音乐");
}
},{
text:"取消",
click:function(){
t=i.__g._oSelectdSong={},e._oAudioPop=null,this.remove();
}
}],
close:function(){
t=i.__g._oSelectdSong={},e._oAudioPop=null,this.remove();
}
});
},
__insertMusic:function(i){
console.log("insertQQMusic");
var e=this.editor;
e.execCommand("inserthtml",i,!0),e.funcPvUvReport("insertmusic"),this.__g._oSelectdSong={};
},
__getMusicIframe:function(){
var i=this.__g._oSelectdSong,e=i.musicid,n=i.mid,t=i.url,o=i.songname,c=i.albumurl,r=i.singername,s=i.play_length,a=i.commentid,u="/cgi-bin/readtemplate?t=tmpl/qqmusic_tmpl&singer="+encodeURIComponent(r)+"&music_name="+encodeURIComponent(o);
return['<iframe class="res_iframe qqmusic_iframe js_editor_qqmusic" scrolling="no" frameborder="0"',' musicid="'+e+'"',' mid="'+n+'"',' albumurl="'+c+'"',' audiourl="'+t+'"',' music_name="'+o+'"',' commentid="'+a+'"',' singer="'+r+'" ',' play_length="'+s+'" ',' src="'+u,'"></iframe>'].join("");
},
__initPopEvt:function(){
this.__initSearch();
},
__initSearch:function(){
var i=this,e=this.__g._oAudioPop;
e.find("#searchDiv").show(),e.find("#keyInput").keydown(function(i){
var n="which"in i?i.which:i.keyCode;
13==n&&e.find("#searchBt").trigger("click");
}),e.find("#searchCloseBt").click(function(){
e.find("#keyInput").val("");
}),e.find("#searchBt").click(function(){
var n=e.find("#keyInput").val();
n.length>0?i.__QQMusicSearch({
keyword:encodeURIComponent(n),
perpage:10,
currentpage:1
}):r.err("请输入搜索条件");
}),e.find("#reload").click(function(){
e.find("#searchCloseBt").trigger("click");
});
},
__QQMusicSearch:function(i){
var e=this;
window.MusicJsonCallback=function(i){
var n=e.__g._oAudioPop;
n&&(i=e.__formatJsonData(i),n.find("#dialog_audio_container").html(wx.T(t,i)),e.__initMusicfile(),
e.__initPageBar({
totalnum:i.totalnum,
perpage:i.perpage,
currentpage:i.curpage
}));
};
var n=document.head||document.getElementsByTagName("head")[0]||document.documentElement,o=document.createElement("script"),c=["https://auth-external.music.qq.com/open/fcgi-bin/fcg_weixin_music_search.fcg?remoteplace=txt.weixin.officialaccount&w=",i.keyword,"&platform=weixin&jsonCallback=MusicJsonCallback&perpage=",i.perpage,"&curpage=",i.currentpage].join("");
console.log("src="+c),o.type="text/javascript",o.src=c,n.appendChild(o);
},
__formatJsonData:function(i){
var e=this,n=$.extend({},i);
return n&&n.list&&$.each(n.list,function(i,n){
var t=n.f.split("|"),o=t[7]||0,c=t[12]||0,r=t[0],s=t[t.length-1],a=t[t.length-3],u="/"+s.charAt(s.length-2)+"/"+s.charAt(s.length-1)+"/"+s+".jpg";
$.extend(n,{
songtime:e.__formatTime(o),
songsize:e.__formatSize(c),
songid:r,
mid:a,
albumurl:u,
play_length:1e3*o
});
}),console.log("formatJsonData"),console.log(n),n;
},
__formatTime:function(i){
var e="";
if(60>i)e="00:"+(10>i?"0":"")+i;else{
var n=Math.floor(i/60),t=i-60*n;
e=(10>n?"0":"")+n+":"+(10>t?"0":"")+t;
}
return e;
},
__formatSize:function(i){
var e="";
return e=i>1048576?parseInt(i/1048576)+"M":"1M";
},
__initMusicfile:function(){
var i=this.__g,e=i._oSelectdSong,n=i._oAudioPop;
n.find(".qqmusic_audioplay").each(function(){
var i=$(this),e=i.attr("audioid"),n=i.attr("audiourl"),t={
selector:"#url_"+e,
qqmusicurl:n,
id:e,
qqmusictpl:!0
};
console.log("initMusicfile"),console.log(t);
new o(t);
}),n.find(".frm_radio").checkbox({
multi:!1,
onChanged:function(i){
console.log(i),e.musicid=i.val(),e.songname=n.find("#songname_"+e.musicid).html(),
e.singername=n.find("#singername_"+e.musicid).html(),e.url=n.find("#url_"+e.musicid).attr("audiourl"),
e.mid=n.find("#url_"+e.musicid).attr("mid"),e.albumurl=n.find("#url_"+e.musicid).attr("albumurl"),
e.play_length=n.find("#url_"+e.musicid).attr("play_length");
}
});
},
__initPageBar:function(i){
{
var e=this,n=this.__g,t=n._oAudioPop,o=t.find("#keyInput").val(),r=i&&i.currentpage,s=i&&i.perpage,a=i&&i.totalnum;
new c({
container:"#js_pagebar",
perPage:s,
initShowPage:r,
totalItemsNum:a,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
var n=i.currentPage;
n!=r&&(r=n,e.__QQMusicSearch({
keyword:o,
perpage:s,
currentpage:r
}));
}
});
}
}
},e;
});