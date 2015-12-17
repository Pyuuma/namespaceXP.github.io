define("cardticket/common_template_helper.js",["common/wx/upload.js","biz_common/moment.js","cardticket/add/msg_operate_type_html.js","common/wx/Cgi.js"],function(e){
"use strict";
function t(e){
return e.replace(/\\n|\n/g,"<br/>");
}
function r(e){
var t="YYYY-MM-DD HH:mm:ss",r=p(e,t);
return r?r.format("YYYY-MM-DD"):"";
}
function n(e){
return 1==e||3==e||2==e;
}
var a=e("common/wx/upload.js"),p=e("biz_common/moment.js"),u={
10:"会员卡",
21:"门票",
22:"电影票",
4:"代金券",
1:"团购券",
2:"折扣券",
3:"礼品券",
0:"优惠券"
},o={
1:"审核中",
2:"未通过",
3:"待投放",
4:"已删除",
5:"待投放",
6:"已投放",
8:"已过期",
7:"违规下架"
},m={
MONDAY:"1",
TUESDAY:"2",
WEDNESDAY:"3",
THURSDAY:"4",
FRIDAY:"5",
SATURDAY:"6",
SUNDAY:"7"
};
template.helper("$has_day",function(e,t){
if(!e)return"";
for(var r=0;r<e.length;r++){
var n=m[e[r].type];
if(n||(n=8),n==t)return"checked";
}
return"";
});
var i={
1:"周一",
2:"周二",
3:"周三",
4:"周四",
5:"周五",
6:"周六",
7:"周日",
8:"节假日"
};
template.helper("convert_time_limit",function(e){
for(var t=[],r=0;r<e.length;r++){
var n=m[e[r].type];
n||(n=8),t.push(i[n]);
}
return t.join("&nbsp;&nbsp;");
});
var _={
1:"免费WIFI",
2:"可带宠物",
4:"免费停车",
8:"可外卖"
};
template.helper("convert_business_service",function(e){
if(!e)return"无";
var t=[];
for(var r in _){
var n=parseInt(r);
(e&n)>0&&t.push(_[r]);
}
return t.join("&nbsp;&nbsp;");
});
var p=e("biz_common/moment.js");
template.helper("convert_state",function(e){
return o[e]||e;
}),template.helper("convert_type",function(e){
return u[e]||e;
}),template.helper("card_type_map",function(e){
return e;
}),template.helper("unixFormat",function(e,t){
return t&&(t=t.replace(","," ")),p.unix(e).format(t);
}),template.helper("validtime",function(e,t){
if(1==e.time_type){
var r=p.unix(e.begin_time).format(t)+"至"+p.unix(e.end_time).format(t);
return e.end_time<p().unix()&&(r+="(已过期)"),r;
}
return 2==e.time_type?(e.from_day=0==e.from_day?"当":e.from_day,"领取后{from_day}天生效{fixed_term}天有效".format(e)):"";
}),template.helper("addtoken",function(e){
return wx.url(e);
}),template.helper("nl2br",function(e){
return t(e.html(!0));
});
var l={
1:"50万以下",
2:"50-100万",
3:"100-500万",
4:"500-1000万",
5:"1000万以上"
};
template.helper("convert_business_volume_type",function(e){
return l[e]||e;
});
var c={
0:"未审核",
2:"审核中",
3:"生效",
4:"审核失败"
};
template.helper("convert_store_state",function(e){
return c[e]||e;
}),template.helper("$preview",function(e){
if(!e)return"无";
var t;
return 0===e.indexOf("temp_")?(e=e.replace(/^temp_/,""),t=a.tmpFileUrl(e)):t=a.multimediaFileUrl(e),
"<a href='%s' target='_blank'><img src='%s' /></a>".sprintf(t,t);
}),template.helper("$upload_preview",function(e){
if(!e)return"";
var t;
return 0===e.indexOf("temp_")?(e=e.replace(/^temp_/,""),t=a.tmpFileUrl(e)):t=a.multimediaFileUrl(e),
"<img src='%s' style='width:260px;' />".sprintf(t);
}),template.helper("$preview_stuffs",function(e){
for(var t=[],r=e.stuffs,n=0;n<r.length;n++){
var a=r[n]+"_preview_tpl";
$("#"+a).length&&t.push(template.render(a,e));
}
return t.join("");
});
var s={
2:"女",
1:"男"
};
template.helper("convert_gender",function(e){
return s[e]||"未知";
}),template.helper("percentage",function(e,t,r,n){
var r=e/t*100;
return n&&r>n&&(r=n),r.toFixed(2);
});
var f={
"":"全部",
0:"API渠道",
1:"嵌入图文消息",
2:"直接群发卡券",
3:"下载二维码"
};
template.helper("convert_channel",function(e){
return f[e]||e;
}),template.helper("convert_provide_time",r),template.helper("http2https",function(e){
return e?(e+"").http2https():"";
}),template.helper("https2http",function(e){
return e?(e+"").https2http():"";
}),template.helper("codepad",function(e){
var t=new RegExp("([^s]{4})(?=([^s])+$)","ig");
return e.replace(t,"$1-");
}),template.helper("yuan",function(e){
if(!e)return"--";
var e=e/100;
return e.toFixed(2);
}),template.helper("is_paycard",function(){
return window.wx_is_paycard;
});
var h={
0:"等待接收",
1:"已接收",
3:"过期退回",
2:"已拒绝"
},v={
0:"等待接收",
2:"已拒绝",
1:"已接收",
3:"过期退回"
};
template.helper("convert_intercard_status",function(e){
return h[e]||e;
}),template.helper("convert_intercard_rec_status",function(e){
return v[e]||e;
});
var d={
0:"无",
1:"图文消息",
2:"卡券货架",
3:"小店货架",
4:"网页链接",
5:"卡券"
};
template.helper("convert_msg_operate_type",function(e){
return d[e]||"无";
});
{
var x=e("cardticket/add/msg_operate_type_html.js");
e("common/wx/Cgi.js");
}
template.helper("msg_operate_content",function(e){
return 5===e._type?"":e._notexist?"无":template.compile(x[e._type])({
msg_operation:e
})||"";
});
var y={
CHECKING:"审核中",
APPROVED:"已通过",
REJECTED:"未通过",
EXPIRED:"已过期"
};
template.helper("convert_sub_merchant_status",function(e){
return y[e]||e;
}),template.helper("$is_can_use_help_make_and_send",function(){
return 1==window.wx_is_can_use_help_make_and_send;
}),template.helper("wx_url",function(e){
return wx.url(e);
});
var g={
".*?_4":"激活"
};
template.helper("convert_use_source",function(e,t){
var r=e+"_"+t;
return 4==t?"激活":1==t?"微信买单":3==e?"手机核销":1==e?"网页核销":2==e?"API核销":g[r]||"";
}),template.helper("convert_fee_coin",function(e,t){
return 0==t?"--":n(e)?'<span class="number_add">+%s</span>'.sprintf(t/100):'<span class="number_degress">-%s</span>'.sprintf(t/100);
});
var w={
1:"平台赠送",
2:"充值",
3:"退还券点",
4:"支出",
5:"平台扣减"
};
template.helper("convert_fee_order_type",function(e){
return w[e]||e;
});
var b={
2:{
1:"等待确认",
2:"充值成功",
3:"充值成功",
8:"充值成功"
},
3:"已退券点",
4:{
1:"等待确认",
3:"库存发放中",
4:"库存已发放",
7:"库存添加失败, 已返还券点",
6:"库存已发放",
5:"库存已发放"
}
};
return template.helper("convert_fee_order_status",function(e,t){
var r=b[t];
return r?"string"==typeof r?r:r[e]||e:e;
}),{
type_map:u,
status_map:o,
store_status:c,
gender_map:s,
source_map:f,
convert_provide_time:r,
nl2br:t,
sub_merchant_status_map:y,
fix_money:function(e){
var t=/(\.\d{2}).+$/,r=e;
return r=parseFloat((r+"").replace(t,"$1"));
},
parse_assistsend_quota:function(e,t){
for(var r=0,n=0,a=0;a<e.length;a++){
var p=e[a];
p.quota_name==(t||"merchant_auth_create_card")&&(r=p.value),p.quota_name==(t?t+"_max_sku":"merchant_auth_create_card_max_sku")&&(n=p.value);
}
return{
max_card:r,
max_sku:n
};
}
};
});define("cardticket/store_cgi.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/tooltipsManager.js","common/wx/dialog.js"],function(t){
"use strict";
var e=t("common/wx/Cgi.js"),s=t("common/wx/Tips.js"),o=t("common/wx/tooltips.js"),n=t("common/wx/tooltipsManager.js"),c=(t("common/wx/dialog.js"),
{
deleteStore:function(t){
e.post({
url:"/merchant/entityshop?action=delete",
data:{
id:t.store_id
},
btn:t.btn
},function(o){
0==o.base_resp.ret?(s.suc("删除门店成功"),t.success&&t.success()):e.show(o);
});
},
deleteWithConfirm:function(t){
if(3==t.state||4==t.state){
var e=new o({
container:t.container,
content:"删除将影响在用此门店的相关业务。<br />你确定要删除吗？",
type:"click",
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
if(t.success){
var e=t.success;
t.success=function(){
e&&e(),n.removeAll();
};
}
c.deleteStore(t);
}
},{
text:"取消",
type:"btn_default",
click:function(){
n.removeAll();
}
}]
});
e.show(),n.removeAll(),n.add(e);
}
},
listStore:function(t){
var s=$.extend({},{
action:"list",
begin:0,
count:9999999,
keyword:t.keyword,
task_id:t.task_id,
audit_state:t.audit_state||3
},t.getDataExtra);
e.get({
url:"/merchant/entityshop",
data:s
},function(s){
if(0==s.base_resp.ret){
var o=$.parseJSON(s.data),n=o.store_location;
t.success&&t.success({
shop_list:n,
total_num:s.total_count
});
}else e.show(s);
});
},
canSendCard:function(t){
t.success&&t.success(!0);
}
});
return c;
});define("tpl/biz_web/ui/dateRange.html.js",[],function(){
return'<div class="ta_date" id="div_{title_id}">\n	<span class="date_title" id="{title_id}"></span>\n	<a class="opt_sel" id="{inputTrigger}" href="#">\n		<i class="i_orderd"></i>\n	</a>\n</div>\n';
});define("biz_web/lib/spin.js", [], function(e, t, n) {
try {
var r = +(new Date), i = function() {
function e(e, t) {
var n = ~~((e[a] - 1) / 2);
for (var r = 1; r <= n; r++) t(e[r * 2 - 1], e[r * 2]);
}
function t(t) {
var n = document.createElement(t || "div");
return e(arguments, function(e, t) {
n[e] = t;
}), n;
}
function n(e, t, r) {
return r && !r[x] && n(e, r), e.insertBefore(t, r || null), e;
}
function r(e, t) {
var n = [ p, t, ~~(e * 100) ].join("-"), r = "{" + p + ":" + e + "}", i;
if (!H[n]) {
for (i = 0; i < P[a]; i++) try {
j.insertRule("@" + (P[i] && "-" + P[i].toLowerCase() + "-" || "") + "keyframes " + n + "{0%{" + p + ":1}" + t + "%" + r + "to" + r + "}", j.cssRules[a]);
} catch (s) {}
H[n] = 1;
}
return n;
}
function i(e, t) {
var n = e[m], r, i;
if (n[t] !== undefined) return t;
t = t.charAt(0).toUpperCase() + t.slice(1);
for (i = 0; i < P[a]; i++) {
r = P[i] + t;
if (n[r] !== undefined) return r;
}
}
function s(t) {
return e(arguments, function(e, n) {
t[m][i(t, e) || e] = n;
}), t;
}
function o(t) {
return e(arguments, function(e, n) {
t[e] === undefined && (t[e] = n);
}), t;
}
var u = "width", a = "length", f = "radius", l = "lines", c = "trail", h = "color", p = "opacity", d = "speed", v = "shadow", m = "style", g = "height", y = "left", b = "top", w = "px", E = "childNodes", S = "firstChild", x = "parentNode", T = "position", N = "relative", C = "absolute", k = "animation", L = "transform", A = "Origin", O = "Timeout", M = "coord", _ = "#000", D = m + "Sheets", P = "webkit0Moz0ms0O".split(0), H = {}, B;
n(document.getElementsByTagName("head")[0], t(m));
var j = document[D][document[D][a] - 1], F = function(e) {
this.opts = o(e || {}, l, 12, c, 100, a, 7, u, 5, f, 10, h, _, p, .25, d, 1);
}, I = F.prototype = {
spin: function(e) {
var t = this, r = t.el = t[l](t.opts);
e && n(e, s(r, y, ~~(e.offsetWidth / 2) + w, b, ~~(e.offsetHeight / 2) + w), e[S]);
if (!B) {
var i = t.opts, o = 0, u = 20 / i[d], a = (1 - i[p]) / (u * i[c] / 100), f = u / i[l];
(function h() {
o++;
for (var e = i[l]; e; e--) {
var n = Math.max(1 - (o + e * f) % u * a, i[p]);
t[p](r, i[l] - e, n, i);
}
t[O] = t.el && window["set" + O](h, 50);
})();
}
return t;
},
stop: function() {
var e = this, t = e.el;
return window["clear" + O](e[O]), t && t[x] && t[x].removeChild(t), e.el = undefined, e;
}
};
I[l] = function(e) {
function i(n, r) {
return s(t(), T, C, u, e[a] + e[u] + w, g, e[u] + w, "background", n, "boxShadow", r, L + A, y, L, "rotate(" + ~~(360 / e[l] * E) + "deg) translate(" + e[f] + w + ",0)", "borderRadius", "100em");
}
var o = s(t(), T, N), m = r(e[p], e[c]), E = 0, S;
for (; E < e[l]; E++) S = s(t(), T, C, b, 1 + ~(e[u] / 2) + w, L, "translate3d(0,0,0)", k, m + " " + 1 / e[d] + "s linear infinite " + (1 / e[l] / e[d] * E - 1 / e[d]) + "s"), e[v] && n(S, s(i(_, "0 0 4px " + _), b, 2 + w)), n(o, n(S, i(e[h], "0 0 1px rgba(0,0,0,.1)")));
return o;
}, I[p] = function(e, t, n) {
e[E][t][m][p] = n;
};
var q = "behavior", R = "url(#default#VML)", U = "group0roundrect0fill0stroke".split(0);
return function() {
var e = s(t(U[0]), q, R), r;
if (!i(e, L) && e.adj) {
for (r = 0; r < U[a]; r++) j.addRule(U[r], q + ":" + R);
I[l] = function() {
function e() {
return s(t(U[0], M + "size", c + " " + c, M + A, -o + " " + -o), u, c, g, c);
}
function r(r, a, c) {
n(d, n(s(e(), "rotation", 360 / i[l] * r + "deg", y, ~~a), n(s(t(U[1], "arcsize", 1), u, o, g, i[u], y, i[f], b, -i[u] / 2, "filter", c), t(U[2], h, i[h], p, i[p]), t(U[3], p, 0))));
}
var i = this.opts, o = i[a] + i[u], c = 2 * o, d = e(), m = ~(i[a] + i[f] + i[u]) + w, E;
if (i[v]) for (E = 1; E <= i[l]; E++) r(E, -2, "progid:DXImage" + L + ".Microsoft.Blur(pixel" + f + "=2,make" + v + "=1," + v + p + "=.3)");
for (E = 1; E <= i[l]; E++) r(E);
return n(s(t(), "margin", m + " 0 0 " + m, T, N), d);
}, I[p] = function(e, t, n, r) {
r = r[v] && r[l] || 0, e[S][E][t + r][S][S][p] = n;
};
} else B = i(e, k);
}(), F;
}();
$.fn.spin = function(e, t) {
return this.each(function() {
var n = $(this), r = n.data();
r.spinner && (r.spinner.stop(), delete r.spinner), e !== !1 && (e = $.extend({
color: t || n.css("color")
}, $.fn.spin.presets[e] || e), r.spinner = (new i(e)).spin(this));
});
}, $.fn.spin.presets = {
tiny: {
lines: 8,
length: 2,
width: 2,
radius: 3
},
small: {
lines: 8,
length: 4,
width: 3,
radius: 5
},
large: {
lines: 10,
length: 8,
width: 4,
radius: 8
}
};
} catch (s) {
wx.jslog({
src: "biz_web/lib/spin.js"
}, s);
}
});define("tpl/popover.html.js",[],function(){
return'<div class="popover {className}">\n    <div class="popover_inner">\n        <div class="popover_content jsPopOverContent">{=content}</div>\n		<!--#0001#-->\n        {if close}<a href="javascript:;" class="popover_close icon16_common close_flat jsPopoverClose">关闭</a>{/if}\n        <!--%0001%-->\n\n        <div class="popover_bar">{each buttons as bt index}<a href="javascript:;" class="btn btn_{bt.type} jsPopoverBt">{bt.text}</a>{if index < buttons.length-1}&nbsp;{/if}{/each}</div>\n    </div>\n    <i class="popover_arrow popover_arrow_out"></i>\n    <i class="popover_arrow popover_arrow_in"></i> \n</div>\n';
});define("common/wx/mpEditor/zh_CN.js",["common/wx/mpEditor/editor_all_min.js"],function(e){
"use strict";
e("common/wx/mpEditor/editor_all_min.js"),UE.I18N.zh_CN={
labelMap:{
anchor:"锚点",
undo:"撤销",
redo:"重做",
bold:"加粗",
indent:"首行缩进",
snapscreen:"截图",
italic:"斜体",
underline:"下划线",
strikethrough:"删除线",
subscript:"下标",
fontborder:"字符边框",
superscript:"上标",
formatmatch:"格式刷",
source:"源代码",
blockquote:"引用",
pasteplain:"纯文本粘贴模式",
selectall:"全选",
print:"打印",
preview:"预览",
horizontal:"分隔线",
removeformat:"清除格式",
time:"时间",
date:"日期",
insertrow:"前插入行",
insertcol:"前插入列",
mergeright:"右合并单元格",
mergedown:"下合并单元格",
deleterow:"删除行",
deletecol:"删除列",
splittorows:"拆分成行",
splittocols:"拆分成列",
splittocells:"完全拆分单元格",
mergecells:"合并多个单元格",
deletetable:"删除表格",
cleardoc:"清空文档",
insertparagraphbeforetable:"表格前插入行",
insertcode:"代码语言",
fontfamily:"字体",
fontsize:"字号 10~50px",
paragraph:"段落格式",
edittable:"表格属性",
edittd:"单元格属性",
emotion:"表情",
spechars:"特殊字符",
searchreplace:"查询替换",
map:"Baidu地图",
gmap:"Google地图",
insertvideo:"视频",
help:"帮助",
justifyleft:"居左对齐",
justifyright:"居右对齐",
justifycenter:"居中对齐",
justifyjustify:"两端对齐",
forecolor:"字体颜色",
backcolor:"背景色",
insertorderedlist:"有序列表",
insertunorderedlist:"无序列表",
fullscreen:"全屏",
directionalityltr:"从左向右输入",
directionalityrtl:"从右向左输入",
rowspacingtop:"段前距",
rowspacingbottom:"段后距",
highlightcode:"插入代码",
pagebreak:"分页",
insertframe:"插入Iframe",
imagenone:"默认",
imageleft:"左浮动",
imageright:"右浮动",
attachment:"附件",
imagecenter:"居中",
wordimage:"图片转存",
lineheight:"行间距",
edittip:"编辑提示",
customstyle:"自定义标题",
autotypeset:"自动排版",
webapp:"百度应用",
touppercase:"字母大写",
tolowercase:"字母小写",
background:"背景",
template:"模板",
scrawl:"涂鸦",
music:"音乐",
inserttable:"插入表格"
},
insertorderedlist:{
num:"1,2,3...",
num1:"1),2),3)...",
num2:"(1),(2),(3)...",
cn:"一,二,三....",
cn1:"一),二),三)....",
cn2:"(一),(二),(三)....",
decimal:"1,2,3...",
"lower-alpha":"a,b,c...",
"lower-roman":"i,ii,iii...",
"upper-alpha":"A,B,C...",
"upper-roman":"I,II,III..."
},
insertunorderedlist:{
circle:"○ 大圆圈",
disc:"● 小黑点",
square:"■ 小方块 ",
dash:"— 破折号",
dot:" 。 小圆圈"
},
paragraph:{
p:"段落",
h1:"标题 1",
h2:"标题 2",
h3:"标题 3",
h4:"标题 4",
h5:"标题 5",
h6:"标题 6"
},
fontfamily:{
songti:"宋体",
kaiti:"楷体",
heiti:"黑体",
lishu:"隶书",
yahei:"微软雅黑",
andaleMono:"andale mono",
arial:"arial",
arialBlack:"arial black",
comicSansMs:"comic sans ms",
impact:"impact",
timesNewRoman:"times new roman"
},
insertcode:{
as3:"ActionScript3",
bash:"Bash/Shell",
cpp:"C/C++",
css:"Css",
cf:"CodeFunction",
"c#":"C#",
delphi:"Delphi",
diff:"Diff",
erlang:"Erlang",
groovy:"Groovy",
html:"Html",
java:"Java",
jfx:"JavaFx",
js:"Javascript",
pl:"Perl",
php:"Php",
plain:"Plain Text",
ps:"PowerShell",
python:"Python",
ruby:"Ruby",
scala:"Scala",
sql:"Sql",
vb:"Vb",
xml:"Xml"
},
customstyle:{
tc:"标题居中",
tl:"标题居左",
im:"强调",
hi:"明显强调"
},
elementPathTip:"元素路径",
wordCountTip:"字数统计",
wordCountMsg:"当前已输入{#count}个字符, 您还可以输入{#leave}个字符。 ",
wordOverFlowMsg:'<span style="color:red;">字数超出最大允许值，服务器可能拒绝保存！</span>',
ok:"确认",
cancel:"取消",
closeDialog:"关闭对话框",
tableDrag:"表格拖动必须引入uiUtils.js文件！",
autofloatMsg:"工具栏浮动依赖编辑器UI，您首先需要引入UI文件!",
snapScreen_plugin:{
browserMsg:"仅支持IE浏览器！",
callBackErrorMsg:"服务器返回数据有误，请检查配置项之后重试。",
uploadErrorMsg:"截图上传失败，请检查服务器端环境! "
},
confirmClear:"确定清空当前文档么？",
contextMenu:{
"delete":"删除",
selectall:"全选",
deletecode:"删除代码",
cleardoc:"清空文档",
confirmclear:"确定清空当前文档么？",
unlink:"删除超链接",
paragraph:"段落格式",
edittable:"表格属性",
aligntd:"单元格对齐方式",
aligntable:"表格对齐方式",
tableleft:"左浮动",
tablecenter:"居中显示",
tableright:"右浮动",
edittd:"单元格属性",
justifyleft:"左对齐",
justifyright:"右对齐",
justifycenter:"居中对齐",
justifyjustify:"两端对齐",
table:"表格",
inserttable:"插入表格",
deletetable:"删除表格",
insertparagraphbefore:"前插入段落",
insertparagraphafter:"后插入段落",
deleterow:"删除当前行",
deletecol:"删除当前列",
insertrow:"前插入行",
insertcol:"左插入列",
insertrownext:"后插入行",
insertcolnext:"右插入列",
insertcaption:"插入表格名称",
deletecaption:"删除表格名称",
inserttitle:"插入表格标题行",
deletetitle:"删除表格标题行",
averageDiseRow:"平均分布各行",
averageDisCol:"平均分布各列",
mergeright:"向右合并",
mergeleft:"向左合并",
mergedown:"向下合并",
mergecells:"合并单元格",
splittocells:"完全拆分单元格",
splittocols:"拆分成列",
splittorows:"拆分成行",
tablesort:"表格排序",
reversecurrent:"逆序当前",
orderbyasc:"按ASCII字符升序",
reversebyasc:"按ASCII字符降序",
orderbynum:"按数值大小升序",
reversebynum:"按数值大小降序",
borderbk:"边框底纹",
setcolor:"表格隔行变色",
unsetcolor:"取消表格隔行变色",
setbackground:"选区背景隔行",
unsetbackground:"取消选区背景",
redandblue:"红蓝相间",
threecolorgradient:"三色渐变",
copy:"复制(Ctrl + c)",
copymsg:"请使用 'Ctrl + c'执行复制操作",
paste:"粘贴(Ctrl + v)",
pastemsg:"请使用 'Ctrl + v'执行粘贴操作",
highlightcode:"插入代码"
},
anthorMsg:"链接",
clearColor:"清空颜色",
standardColor:"标准颜色",
themeColor:"主题颜色",
basicColor:"基本色",
recentlyColor:"最近使用颜色",
property:"属性",
"default":"默认",
modify:"修改",
justifyleft:"左对齐",
justifyright:"右对齐",
justifycenter:"居中",
justify:"默认",
clear:"清除",
anchorMsg:"锚点",
"delete":"删除",
clickToUpload:"点击上传",
unset:"尚未设置语言文件",
t_row:"行",
t_col:"列",
pasteOpt:"粘贴选项",
pasteSourceFormat:"保留源格式",
tagFormat:"只保留标签",
pasteTextFormat:"只保留文本",
autoTypeSet:{
mergeLine:"合并空行",
delLine:"清除空行",
removeFormat:"清除格式",
indent:"首行缩进",
alignment:"对齐方式",
imageFloat:"图片浮动",
removeFontsize:"清除字号",
removeFontFamily:"清除字体",
removeHtml:"清除冗余HTML代码",
pasteFilter:"粘贴过滤",
run:"执行"
},
background:{
"static":{
lang_background_normal:"背景设置",
lang_background_local:"本地图片",
lang_background_set:"选项",
lang_background_none:"无",
lang_background_color:"颜色设置",
lang_background_netimg:"网络图片",
lang_background_align:"对齐方式",
lang_background_position:"精确定位",
repeatType:{
options:["居中","横向重复","纵向重复","平铺","自定义"]
}
},
noUploadImage:"当前未上传过任何图片！",
toggleSelect:"单击可切换选中状态\n原图尺寸: "
},
insertimage:{
"static":{
lang_tab_remote:"远程图片",
lang_tab_local:"本地上传",
lang_tab_imgManager:"在线管理",
lang_tab_imgSearch:"图片搜索",
lang_input_url:"地 址：",
lang_input_width:"宽 度：",
lang_input_height:"高 度：",
lang_input_border:"边 框：",
lang_input_vhspace:"边 距：",
lang_input_title:"描 述：",
lang_input_remoteAlign:"对 齐：",
lang_imgLoading:"　图片加载中……",
lock:{
title:"锁定宽高比例"
},
imgType:{
title:"图片类型",
options:["新闻","壁纸","表情","头像"]
},
imgSearchTxt:{
value:"请输入搜索关键词"
},
imgSearchBtn:{
value:"百度一下"
},
imgSearchReset:{
value:"清空搜索"
},
upload:{
style:"background: url(upload.png);"
},
duiqi:{
style:"background: url(imglabel.png) -12px 2px no-repeat;"
},
lang_savePath:"选择保存目录"
},
netError:"网络链接错误，请检查配置后重试！",
noUploadImage:"当前未上传过任何图片！",
imageLoading:"图片加载中，请稍后……",
tryAgain:" :( ，抱歉，没有找到图片！请重试一次！",
toggleSelect:"单击可切换选中状态\n原图尺寸: ",
searchInitInfo:"请输入搜索关键词",
numError:"请输入正确的长度或者宽度值！例如：123，400",
fileType:"图片",
imageUrlError:"不允许的图片格式或者图片域！",
imageLoadError:"图片加载失败！请检查链接地址或网络状态！",
flashError:"Flash插件初始化失败，请更新您的FlashPlayer版本之后重试！",
floatDefault:"默认",
floatLeft:"左浮动",
floatRight:"右浮动",
floatCenter:"居中",
flashI18n:{}
},
webapp:{
tip1:"本功能由百度APP提供，如看到此页面，请各位站长首先申请百度APPKey!",
tip2:"申请完成之后请至ueditor.config.js中配置获得的appkey! ",
applyFor:"点此申请",
anthorApi:"百度API"
},
template:{
"static":{
lang_template_bkcolor:"背景颜色",
lang_template_clear:"保留原有内容",
lang_template_select:"选择模板"
},
blank:"空白文档",
blog:"博客文章",
resume:"个人简历",
richText:"图文混排",
sciPapers:"科技论文"
},
scrawl:{
"static":{
lang_input_previousStep:"上一步",
lang_input_nextsStep:"下一步",
lang_input_clear:"清空",
lang_input_addPic:"添加背景",
lang_input_ScalePic:"缩放背景",
lang_input_removePic:"删除背景",
J_imgTxt:{
title:"添加背景图片"
}
},
noScarwl:"尚未作画，白纸一张~",
scrawlUpLoading:"涂鸦上传中,别急哦~",
continueBtn:"继续",
imageError:"糟糕，图片读取失败了！",
backgroundUploading:"背景图片上传中,别急哦~"
},
music:{
"static":{
lang_input_tips:"输入歌手/歌曲/专辑，搜索您感兴趣的音乐！",
J_searchBtn:{
value:"搜索歌曲"
}
},
emptyTxt:"未搜索到相关音乐结果，请换一个关键词试试。",
chapter:"歌曲",
singer:"歌手",
special:"专辑",
listenTest:"试听"
},
anchor:{
"static":{
lang_input_anchorName:"锚点名字："
}
},
attachment:{
"static":{
lang_input_fileStatus:" 当前未上传文件",
startUpload:{
style:"background:url(upload.png) no-repeat;"
}
},
browseFiles:"文件浏览…",
uploadSuccess:"上传成功!",
delSuccessFile:"从成功队列中移除",
delFailSaveFile:"移除保存失败文件",
statusPrompt:" 个文件已上传！ ",
flashVersionError:"当前Flash版本过低，请更新FlashPlayer后重试！",
flashLoadingError:"Flash加载失败!请检查路径或网络状态",
fileUploadReady:"等待上传……",
delUploadQueue:"从上传队列中移除",
limitPrompt1:"单次不能选择超过",
limitPrompt2:"个文件！请重新选择！",
delFailFile:"移除失败文件",
fileSizeLimit:"文件大小超出限制！",
emptyFile:"空文件无法上传！",
fileTypeError:"文件类型错误！",
unknownError:"未知错误！",
fileUploading:"上传中，请等待……",
cancelUpload:"取消上传",
netError:"网络错误",
failUpload:"上传失败!",
serverIOError:"服务器IO错误！",
noAuthority:"无权限！",
fileNumLimit:"上传个数限制",
failCheck:"验证失败，本次上传被跳过！",
fileCanceling:"取消中，请等待……",
stopUploading:"上传已停止……"
},
highlightcode:{
"static":{
lang_input_selectLang:"选择语言"
},
importCode:"请输入代码"
},
emotion:{
"static":{
lang_input_choice:"精选",
lang_input_Tuzki:"兔斯基",
lang_input_BOBO:"BOBO",
lang_input_lvdouwa:"绿豆蛙",
lang_input_babyCat:"baby猫",
lang_input_bubble:"泡泡",
lang_input_youa:"有啊"
}
},
gmap:{
"static":{
lang_input_address:"地址",
lang_input_search:"搜索",
address:{
value:"北京"
}
},
searchError:"无法定位到该地址!"
},
help:{
"static":{
lang_input_about:"关于UEditor",
lang_input_shortcuts:"快捷键",
lang_input_version:"版本:1.2.6",
lang_input_introduction:"UEditor是由百度web前端研发部开发的所见即所得富文本web编辑器，具有轻量，可定制，注重用户体验等特点。开源基于BSD协议，允许自由使用和修改代码。",
lang_Txt_shortcuts:"快捷键",
lang_Txt_func:"功能",
lang_Txt_bold:"给选中字设置为加粗",
lang_Txt_copy:"复制选中内容",
lang_Txt_cut:"剪切选中内容",
lang_Txt_Paste:"粘贴",
lang_Txt_undo:"重新执行上次操作",
lang_Txt_redo:"撤销上一次操作",
lang_Txt_italic:"给选中字设置为斜体",
lang_Txt_underline:"给选中字加下划线",
lang_Txt_selectAll:"全部选中",
lang_Txt_visualEnter:"软回车",
lang_Txt_fullscreen:"全屏"
}
},
insertframe:{
"static":{
lang_input_address:"地址：",
lang_input_width:"宽度：",
lang_input_height:"高度：",
lang_input_isScroll:"允许滚动条：",
lang_input_frameborder:"显示框架边框：",
lang_input_alignMode:"对齐方式：",
align:{
title:"对齐方式",
options:["默认","左对齐","右对齐","居中"]
}
},
enterAddress:"请输入地址!"
},
map:{
"static":{
lang_city:"城市",
lang_address:"地址",
city:{
value:"北京"
},
lang_search:"搜索"
},
cityMsg:"请选择城市",
errorMsg:"抱歉，找不到该位置！"
},
searchreplace:{
"static":{
lang_tab_search:"查找",
lang_tab_replace:"替换",
lang_search1:"查找",
lang_search2:"查找",
lang_replace:"替换",
lang_searchReg:"支持正则表达式，添加前后斜杠标示为正则表达式，例如“/表达式/”",
lang_searchReg1:"支持正则表达式，添加前后斜杠标示为正则表达式，例如“/表达式/”",
lang_case_sensitive1:"区分大小写",
lang_case_sensitive2:"区分大小写",
nextFindBtn:{
value:"下一个"
},
preFindBtn:{
value:"上一个"
},
nextReplaceBtn:{
value:"下一个"
},
preReplaceBtn:{
value:"上一个"
},
repalceBtn:{
value:"替换"
},
repalceAllBtn:{
value:"全部替换"
}
},
getEnd:"已经搜索到文章末尾！",
getStart:"已经搜索到文章头部",
countMsg:"总共替换了{#count}处！"
},
snapscreen:{
"static":{
lang_showMsg:"截图功能需要首先安装UEditor截图插件！ ",
lang_download:"点此下载",
lang_step1:"第一步，下载UEditor截图插件并运行安装。",
lang_step2:"第二不，插件安装完成后即可使用，如不生效，请重启浏览器后再试！"
}
},
insertvideo:{
"static":{
lang_tab_insertV:"插入视频",
lang_video_url:"视频网址",
lang_video_size:"视频尺寸",
lang_videoW:"宽度",
lang_videoH:"高度",
lang_alignment:"对齐方式",
videoSearchTxt:{
value:"请输入搜索关键字！"
},
videoType:{
options:["全部","热门","娱乐","搞笑","体育","科技","综艺"]
},
videoSearchBtn:{
value:"百度一下"
},
videoSearchReset:{
value:"清空结果"
}
},
numError:"请输入正确的数值，如123,400",
floatLeft:"左浮动",
floatRight:"右浮动",
"default":"默认",
block:"独占一行",
urlError:"输入的视频地址有误，请检查后再试！",
loading:" &nbsp;视频加载中，请等待……",
clickToSelect:"点击选中",
goToSource:"访问源视频",
noVideo:" &nbsp; &nbsp;抱歉，找不到对应的视频，请重试！"
},
spechars:{
"static":{},
tsfh:"特殊字符",
lmsz:"罗马字符",
szfh:"数学字符",
rwfh:"日文字符",
xlzm:"希腊字母",
ewzm:"俄文字符",
pyzm:"拼音字母",
zyzf:"注音及其他"
},
edittable:{
"static":{
lang_tableStyle:"表格样式",
lang_insertCaption:"添加表格标题行",
lang_insertTitle:"添加表格名称行",
lang_orderbycontent:"使表格内容可排序",
lang_tableSize:"自动调整表格尺寸",
lang_autoSizeContent:"按表格文字自适应",
lang_autoSizePage:"按页面宽度自适应",
lang_example:"示例",
lang_borderStyle:"表格边框",
lang_color:"颜色:"
},
captionName:"表格名称",
titleName:"标题",
cellsName:"内容"
},
edittip:{
"static":{
lang_delRow:"删除整行",
lang_delCol:"删除整列"
}
},
edittd:{
"static":{
lang_tdBkColor:"背景颜色:"
}
},
formula:{
"static":{}
},
wordimage:{
"static":{
lang_resave:"转存步骤",
uploadBtn:{
src:"upload.png",
alt:"上传"
},
clipboard:{
style:"background: url(copy.png) -153px -1px no-repeat;"
},
lang_step:"1、点击顶部复制按钮，将地址复制到剪贴板；2、点击添加照片按钮，在弹出的对话框中使用Ctrl+V粘贴地址；3、点击打开后选择图片上传流程。"
},
fileType:"图片",
flashError:"FLASH初始化失败，请检查FLASH插件是否正确安装！",
netError:"网络连接错误，请重试！",
copySuccess:"图片地址已经复制！",
flashI18n:{}
}
};
});define("tpl/media/videocard.html.js",[],function(){
return'<div id="wxVideoBox{id}" class="richvideo Js_videomsg">\n    <div class="richvideo_content" style="z-index: 0">\n        <h4 class="title">{title}</h4>\n        <div class="video_info">\n            <em class="time">{time}</em>\n            <em class="res">{from}</em>\n        </div>\n        <div class="video_extra_info" data-seq="{seq}">\n            <img class="video_thumb" src="{if !cover}{if !!multi_item}{each multi_item as value}{value.cover}{/each}{/if}{else}{cover}{/if}" alt="">\n            {if is_new_video && status != 4}\n            <span class="video_length">{duration}</span>\n            {/if}\n            {if status == 0}\n            <div class="status_mask">\n            <span class="status_msg">\n                审核中\n            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 1}\n            <div class="status_mask">\n            <span class="status_msg">\n                资料不完整\n            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 2}\n            <div class="status_mask">\n            <span class="status_msg mini_tips icon_after">\n                审核不通过\n                <i class="icon_mini_tips ask_white js_fail_reason" data-seq="{seq}"></i>\n            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 3 && is_new_video} \n            <div class="play_mask">\n                <i class="icon_video_play"> </i>\n                <span class="vm_box"></span>\n            </div>\n\n            {else if status == 4}\n            <div class="status_mask">\n            <span class="status_msg">\n                转码中\n            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 5}\n            <div class="status_mask">\n            <span class="status_msg">\n                转码失败<i class="icon_mini_tips ask_white js_fail_code" data-seq="{seq}"></i>\n\n            </span>\n            <span class="vm_box"></span>\n            </div>\n\n            {/if}\n        </div>\n        <div class="video_desc" data-digest="{digest}">{digest}</div>\n    </div>\n\n    {if for_operation}\n    <div class="richvideo_opr">\n        <ul class="grid_line" >\n            {if is_new_video}\n            <li class="richvideo_opr_item grid_item size1of2">\n            <a class="js_tooltip" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&lang=zh_CN&token={token}&type=15&appmsgid={app_id}" data-seq="{seq}" data-tooltip="编辑">\n                    <i class="icon18_common edit_gray">编辑</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of2 no_extra">\n            <a class="js_del js_tooltip" href="javascript:void(0);" data-id="{app_id}" data-tooltip="删除">\n                    <i class="icon18_common del_gray">删除</i>\n                </a>\n            </li>\n            {else if is_new_video==0 && video_url!=""} <!-- 微信视频 -->\n            <li class="richvideo_opr_item grid_item size1of3">\n            <a class="js_tooltip" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&lang=zh_CN&token={token}&type=15&appmsgid={app_id}" data-seq="{seq}" data-tooltip="编辑">\n                    <i class="icon18_common edit_gray">编辑</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of3">\n                <a {if for_transfer}href="javascript:;" class="js_tooltip js_download"{else}href="{video_download_url}" class="js_tooltip"{/if} data-tooltip="下载">\n                    <i class="icon18_common download_gray">下载</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of3 no_extra">\n            <a class="js_del js_tooltip" href="javascript:void(0);" data-id="{app_id}" data-tooltip="删除">\n                    <i class="icon18_common del_gray">删除</i>\n                </a>\n            </li>\n            {else } <!-- 微视视频 -->\n            <li class="richvideo_opr_item grid_item size1of2">\n            <a class="js_tooltip" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&lang=zh_CN&token={token}&type=15&appmsgid={app_id}" data-seq="{seq}" data-tooltip="编辑">\n                    <i class="icon18_common edit_gray">编辑</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of2 no_extra">\n            <a class="js_del js_tooltip" href="javascript:void(0);" data-id="{app_id}" data-tooltip="删除">\n                    <i class="icon18_common del_gray">删除</i>\n                </a>\n            </li>\n\n\n            {/if}\n        </ul>\n    </div>\n    {/if}\n    {if for_selection}\n    <div class="richvideo_mask"></div>\n    <i class="icon_card_selected">已选择</i>\n    {/if}\n</div>\n\n\n';
});define("tpl/media/dialog/videomsg_layout.html.js",[],function(){
return'<div class="dialog_media_container">\n    <div class="sub_title_bar in_dialog">\n        <div class="title_tab js_videotab"></div>\n        <div class="search_bar dn">\n            <span class="frm_input_box search with_del append">\n                <a class="del_btn" href="javascript:"><i class="icon_search_del"></i>&nbsp;</a>\n                <a id="msgSearchBtn" href="javascript:" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n                <input id="msgSearchInput" type="text" placeholder="关键字" value="" class="frm_input">\n            </span>\n        </div>\n        <div class="richvideo_create js_video_create ">\n            <a class="btn btn_primary btn_add" target="_blank" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&type=15&lang=zh_CN&token={token}">\n                <i class="icon14_common add_white"></i>新建视频            </a>\n        </div>\n    </div>\n    <div class="js_video_status js_video_content dn">\n        <div class="richvideo_list media_dialog" id="js_videomsg_list">\n            <div class="richvideo_col"><div class="inner"></div></div>&nbsp;\n            <div class="richvideo_col"><div class="inner"></div></div>\n        </div>\n    </div>\n    <div class="js_video_status js_video_tencent dn">\n        <div class="video">\n            <div class="frm_control_group">\n                <label for="" class="frm_label">视频网址</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box"><input type="text" class="frm_input js_video_txurl"></span>\n                    <p class="frm_tips">支持腾讯视频</p>\n                </div>\n            </div>\n			<div class="video_preview js_video_preview"></div>\n		</div>\n    </div>\n    <div class="js_video_status js_video_loading">\n        <i class="icon_loading_small white">loading...</i>\n    </div>\n    <div class="js_video_status js_video_none dn">\n        <div class="no_media_wrp">\n            <p class="empty_tips js_empty_tips"></p>\n            <!--\n            <div class="richvideo_create js_video_create">\n                <a class="" target="_blank" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&type=15&lang=zh_CN&token={token}">\n                    <i class="icon_richvideo_small"></i><strong>新建视频消息</strong>\n                </a>\n            </div>\n            -->\n        </div>\n        <span class="vm_box"></span>\n    </div>\n    \n    <div class="pagination_wrp pageNavigator js_pagebar"></div>\n</div>\n\n';
});define("common/wx/media/video.js",["widget/media/richvideo.css","widget/media.css","biz_web/lib/video.js","common/wx/Cgi.js","common/wx/time.js","common/qq/Class.js","biz_web/lib/swfobject.js","tpl/media/video.html.js","tpl/media/simple_videomsg.html.js","tpl/media/wxvideo.html.js","tpl/media/videomsg.html.js"],function(e){
"use strict";
e("widget/media/richvideo.css"),e("widget/media.css");
var i,t=e("biz_web/lib/video.js"),o=e("common/wx/Cgi.js"),d=e("common/wx/time.js"),s=e("common/qq/Class.js"),n=e("biz_web/lib/swfobject.js"),a=e("tpl/media/video.html.js"),r=wx.T,l=wx.data.t,m=document,c=!!n.ua.pv[0],f=m.createElement("video"),u=navigator.userAgent.toLowerCase(),v=/msie/.test(u),p=/firefox/.test(u);
t.options.flash.swf=wx.path.video;
var h={
id:"",
source:"",
type:"",
file_id:""
},w=5e3,g=function(e){
if(e.video_url){
{
var i="tmp"+(1e5*Math.random()|0);
$('<video id="%s"></video>'.sprintf(i)).appendTo("body");
}
t("#"+i).ready(function(){
$("#"+i).hide();
var t=this;
this.on("error",function(){
t.dispose(),e.dom.find(".loading_tips").show(),e.video_url="",setTimeout(function(){
g(e);
},w);
}),this.on("loadedmetadata",function(){
t.dispose(),$(e.selector).children().remove(),e.for_transfer=!1,e.digest=e.digest?e.digest.html(!1):"",
new _(e);
});
var o=e.video_url;
t.src(f.canPlayType?o:[{
type:"video/x-flv",
src:o+"&trans=1"
}]),t.play();
});
}else o.get({
url:wx.url("/cgi-bin/appmsg?action=get_video_url&videoid=%s".sprintf(e.video_id)),
error:function(){
setTimeout(function(){
g(e);
},w);
}
},function(i){
e.video_url=i.video_url||"",e.video_download_url=i.video_download_url||"",setTimeout(function(){
g(e);
},w);
});
},_=s.declare({
init:function(t){
var o=this;
$(t.selector).data("opt",t),t=$.extend(!0,{},h,t),o.id=t.id,o.source=t.source,o.file_id=t.file_id,
o.type=t.type,o.video_url=t.video_url,o.tpl=t.tpl,o.ff_must_flash=t.ff_must_flash,
t.src=o.getVideoURL(),t.token=l||wx.data.t,t.time=t.create_time?d.timeFormat(t.create_time):"",
t.digest=t.digest?t.digest.replace(/<br.*>/g,"\n").html():"",t.for_network="string"==typeof t.video_url?!t.video_url:!t.content,
i=e(t.sent?"tpl/media/simple_videomsg.html.js":21==+t.type||9==+t.type||11==+t.type?"tpl/media/wxvideo.html.js":"tpl/media/videomsg.html.js");
var s=$("videomsg"==t.tpl?r(i,t):r(a,t));
o.dom=t.dom=$(t.selector).append(s),"videomsg"==t.tpl&&t.for_transfer&&g(t,o.dom),
o.dom.find(".video_desc").length&&o.dom.find(".video_desc").html(o.dom.find(".video_desc").attr("data-digest").replace(/\n/g,"<br>")),
o.dom.find(".wxVideoScreenshot").on("click",function(){
o.dom.find(".mediaContent").css({
height:"auto"
}),o.play(t.play);
}),o.dom.find(".wxNetworkVideo").on("click",function(){
window.open($(this).attr("data-contenturl"));
}),o.dom.find(".video_switch").click(function(){
o.dom.find(".mediaContent").css({
height:"104px"
}),o.pause(t.pause);
});
},
getVideoURL:function(){
var e=this.source,i=this.id,t=(this.msg_id||"",this.file_id);
return e&&(e="&source="+e),this.video_url||"/cgi-bin/getvideodata?msgid={msgid}&fileid={fileid}&token={token}{source}".format({
msgid:i,
fileid:t,
source:e,
token:wx.data.t
});
},
canPlayType:function(){
this.type;
return!f.canPlayType&&!c;
},
play:function(e){
var i=this;
if(i.canPlayType())return void alert("您当前浏览器无法播放视频，请安装Flash插件/更换Chrome浏览器");
var o=this.id,d=this.player;
if(d)return $("#wxVideoBox"+o).addClass("wxVideoPlaying").find(".wxVideoPlayContent").show(),
d.play(),e&&e(this);
var s=i.getVideoURL();
$("#wxVideoBox"+o).addClass("wxVideoPlaying").find(".wxVideoPlayContent").show();
var n="videomsg"==i.tpl?{
width:"100%",
height:"100%"
}:{};
t("#wxVideo"+o,n).ready(function(){
d=this;
var t=0;
return d.on("fullscreenchange",function(){
t?($("#wxVideoPlayer"+o).css({
overflow:"hidden",
zoom:"1"
}),$("#wxVideoBox"+o).css({
"z-index":"0"
})):($("#wxVideoPlayer"+o).css({
overflow:"visible",
zoom:"normal"
}),$("#wxVideoBox"+o).css({
"z-index":"1"
})),t=~t;
}),d.on("ended",function(){
this.currentTime(0);
}),d.src(v||!f.canPlayType||i.ff_must_flash&&p?[{
type:"video/x-flv",
src:s+"&trans=1"
}]:s),d.play(),i.player=d,e&&e(this);
});
},
pause:function(e){
var i=this.player;
i&&i.pause(),$("#wxVideoBox"+this.id).removeClass("wxVideoPlaying").find(".wxVideoPlayContent").hide(),
e&&e(this);
}
});
return _;
});define("common/wx/top.js",["tpl/top.html.js"],function(t,e,a){
"use strict";
function i(t,e,a){
return this.dom=$(t),this.dom.addClass("title_tab"),e&&"string"==typeof e&&(e=[{
name:"",
url:"javascript:;",
className:"selected"
}]),$.each(e,function(t,e){
e.url=e.url&&[e.url,wx.data.param].join("")||"javascript:;";
}),this.dom.html(template.compile(n)({
data:e
})),a&&a.render&&"function"==typeof a.render?$.each(this.dom.find("li"),function(t,i){
a.render.apply($(i),[e[t],a&&a.data]);
}):this.dom.html(template.compile(n)({
data:e
})),this.dom.on("click",".top_item",function(){
$(this).addClass("selected").siblings().removeClass("selected");
}),this;
}
var n=t("tpl/top.html.js"),s=wx.acl;
i.prototype.selected=function(t){
this.dom.find(".js_top").removeClass("selected"),"number"==typeof t?this.dom.find(".js_top:eq("+t+")").addClass("selected"):this.dom.find(".js_top[data-id="+t+"]").addClass("selected");
},i.DATA={
setting:[{
id:"info",
name:"帐号详情",
url:"/cgi-bin/settingpage?t=setting/index&action=index"
},{
id:"function",
name:"功能设置",
url:"/cgi-bin/settingpage?t=setting/function&action=function"
}],
mass:[{
id:"send",
name:"新建群发消息",
url:"/cgi-bin/masssendpage?t=mass/send"
},{
id:"jurisdiction",
name:"授权申请",
acl:s&&s.msg_acl&&s.msg_acl.can_use_reprintapply_list,
url:"/cgi-bin/copyrightlib?action=reprint_article&begin=0&count=10&auth_status=0&lang=zh_CN"
},{
id:"list",
name:"已发送",
url:"/cgi-bin/masssendpage?t=mass/list&action=history&begin=0&count=10"
}],
message:[{
id:"total",
name:"全部消息",
url:"/cgi-bin/message?t=message/list&count=20&day=7"
},{
id:"star",
name:"已收藏的消息",
url:"/cgi-bin/message?t=message/list&count=20&action=star"
},{
id:"search",
name:"搜索结果"
}],
media:[{
id:"media11",
name:"商品消息",
acl:s&&s.msg_acl&&s.msg_acl.can_commodity_app_msg,
url:"/cgi-bin/appmsg?begin=0&count=10&t=media/appmsg_list&type=11&action=list"
},{
id:"media10",
name:"图文消息",
acl:s&&s.msg_acl&&s.msg_acl.can_app_msg,
url:"/cgi-bin/appmsg?begin=0&count=10&t=media/appmsg_list2&type=10&action=list_card"
},{
id:"media2",
name:"图片库",
acl:s&&s.msg_acl&&s.msg_acl.can_image_msg,
url:"/cgi-bin/filepage?type=2&begin=0&count=12&t=media/img_list"
},{
id:"media3",
name:"语音",
acl:s&&s.msg_acl&&s.msg_acl.can_voice_msg,
url:"/cgi-bin/filepage?type=3&begin=0&count=21&t=media/list"
},{
id:"media15",
name:"视频",
acl:s&&s.msg_acl&&s.msg_acl.can_video_msg,
url:"/cgi-bin/appmsg?begin=0&count=9&t=media/appmsg_list&type=15&action=list"
}],
business:[{
id:"overview",
name:"数据概览",
url:"/merchant/business?t=business/overview&action=overview"
},{
id:"order",
name:"订单流水",
url:"/merchant/business?t=business/order&action=order"
},{
id:"info",
name:"商户信息",
url:"/merchant/business?t=business/info&action=info"
},{
id:"test",
name:"支付测试",
url:"/merchant/business?t=business/whitelist&action=whitelist"
},{
id:"rights",
name:"维权仲裁",
url:"/merchant/shop_rights?t=business/rights_list&action=batchgetpayfeedback"
},{
id:"course",
name:"使用教程",
url:"/merchant/business?t=business/course&action=course"
}],
user:[{
id:"useradmin",
name:"已关注",
url:"/cgi-bin/contactmanage?t=user/index&pagesize=10&pageidx=0&type=0&groupid=0"
}],
statistics:{
user:[{
id:"summary",
name:"用户增长",
url:"/misc/pluginloginpage?action=stat_user_summary&pluginid=luopan&t=statistics/index"
},{
id:"attr",
name:"用户属性",
url:"/misc/pluginloginpage?action=stat_user_attr&pluginid=luopan&t=statistics/index"
}],
article:[{
id:"detail",
name:"图文群发",
url:"/misc/pluginloginpage?action=stat_article_detail&pluginid=luopan&t=statistics/index"
},{
id:"analyse",
name:"图文统计",
url:"/misc/pluginloginpage?action=stat_article_analyse&pluginid=luopan&t=statistics/index"
}],
message:[{
id:"message",
name:"消息分析",
url:"/misc/pluginloginpage?action=stat_message&pluginid=luopan&t=statistics/index"
},{
id:"key",
name:"消息关键词",
url:"/misc/pluginloginpage?action=ctr_keyword&pluginid=luopan&t=statistics/index"
}],
"interface":[{
id:"interface",
name:"接口分析",
url:"/misc/pluginloginpage?action=stat_interface&pluginid=luopan&t=statistics/index"
}]
},
notification:[{
id:"notification",
name:"通知中心",
url:"/cgi-bin/frame?t=notification/index_frame"
}],
templateMessage:[{
id:"my_template",
name:"我的模板",
url:"/advanced/tmplmsg?action=list&t=tmplmsg/list"
},{
id:"template_message",
name:"模板库",
url:"/advanced/tmplmsg?action=tmpl_store&t=tmplmsg/store"
}],
assistant:[{
id:"mphelper",
name:"公众号助手",
url:"/misc/assistant?t=setting/mphelper&action=mphelper"
},{
id:"warning",
name:"接口告警",
url:"/misc/assistant?t=setting/warning&action=warning"
}],
shop:[{
id:"shopoverview",
name:"小店概况",
url:"/merchant/merchantstat?t=shop/overview&action=getoverview"
},{
id:"addGoods",
name:"添加商品",
url:"/merchant/goods?type=11&t=shop/precreate",
target:"_blank"
},{
id:"goodsManagement",
name:"商品管理",
url:"/merchant/goodsgroup?t=shop/category&type=1"
},{
id:"shelfManagement",
name:"货架管理",
url:"/merchant/shelf?status=0&action=get_shelflist&t=shop/myshelf&offset=0&count=5"
},{
id:"orderManagement",
name:"订单管理",
url:"/merchant/productorder?action=getlist&t=shop/order_list&last_days=30&count=10&offset=0"
},{
id:"deliverylist",
name:"运费模板管理",
url:"/merchant/delivery?action=getlist&t=shop/delivery_list"
},{
id:"images",
name:"图片库",
url:"/merchant/goodsimage?action=getimage&t=shop/shop_img&count=20&offset=0"
}],
adClient:[{
id:"adclientreport",
name:"报表统计",
url:"/merchant/ad_client_report?t=ad_system/client_report&action=list"
},{
id:"adclientmanage",
name:"广告管理",
url:"/merchant/advert?t=ad_system/promotion_list&action=get_advert_count"
},{
id:"materialmanage",
name:"推广页管理",
url:"/merchant/ad_material?t=material/list&action=get_material_list"
},{
id:"adclientpay",
name:"财务管理",
url:"/cgi-bin/frame?nav=10026&t=ad_system/host_frame"
},{
id:"adservice",
name:"广告服务商",
acl:s&&s.ad_system&&s.ad_system.can_use_sp,
url:"/cgi-bin/frame?nav=10026&t=ad_system/client_service_frame"
}],
adHost:[{
id:"adhostreport",
name:"报表统计",
url:"/merchant/ad_host_report?t=ad_system/host_report"
},{
id:"adhostmanage",
name:"流量管理",
url:"/merchant/ad_host_manage?t=ad_system/host_manage"
},{
id:"adhostpay",
name:"财务管理",
url:"/merchant/ad_host_pay?action=ad_host_pay&t=ad_system/host_pay"
}],
advanced:[{
id:"dev",
name:"配置项",
url:"/advanced/advanced?action=dev&t=advanced/dev"
},{
id:"group-alert",
name:"接口报警",
url:"/advanced/advanced?action=alarm&t=advanced/alarm"
}],
cardticket:[{
id:"cardmgr",
name:"卡券管理",
url:"/merchant/electroniccardmgr?action=batch&t=cardticket/batch_card"
},{
id:"permission",
name:"卡券核销",
url:"/merchant/carduse?action=listchecker&t=cardticket/permission"
},{
id:"carduse",
name:"核销记录",
url:"/merchant/carduserecord?action=listrecord&t=cardticket/carduse_record"
},{
id:"cardreport",
name:"数据报表",
url:"/merchant/ecardreport?action=overviewpage&t=cardticket/overviewpage"
}],
infringement:[{
id:"infringement",
name:"我要投诉",
url:"/acct/infringement?action=getmanual&t=infringement/manual&type=1"
},{
id:"antiinfringement",
name:"我要申诉",
url:"/acct/infringement?action=getmanual&t=infringement/manual&type=2"
},{
id:"list",
name:"提交记录",
url:"/acct/infringement?action=getlist&t=infringement/ingringement_list&type=1&begin=0&count=10"
}],
scan:[{
id:"overview",
name:"数据概况",
url:"/merchant/scandataoverview?action=keydata"
},{
id:"product_list",
name:"商品管理",
url:"/merchant/scanproductlist?action=list&page=1&status=1"
},{
id:"barcode_list",
name:"资质管理",
url:"/merchant/scanqualification?action=getbusinesscategorylist&offset=0&limit=16"
}],
rumor:[{
id:"list",
name:"谣言池",
url:"/misc/rumor?action=rumorlist&t=rumor/list"
},{
id:"result",
name:"辟谣结果",
url:"/misc/rumor?action=summarylist&t=rumor/result"
}],
reward:[{
id:"list",
name:"数据概况",
url:"/merchant/rewardstat?action=getoverview&t=reward/overview"
},{
id:"invite",
name:"邀请",
url:"/merchant/invitation?action=info&t=reward/invitation"
},{
id:"setting",
name:"赞赏设置",
url:"/merchant/reward?action=rewardsetting"
}],
discuss:[{
id:"list_latest",
name:"评论列表",
url:"/misc/appmsgcomment?action=list_latest_comment&begin=0&count=10&mp_version=7"
},{
id:"index",
name:"文章管理",
url:"/misc/appmsgcomment?action=list_app_msg&begin=0&count=10"
}],
search:[{
id:"search",
name:"搜索",
url:"/advanced/componentsearch?action=search"
},{
id:"authorized",
name:"已添加",
url:"/advanced/componentsearch?action=authorized_list&begin=0&limit=10"
}]
},s&&s.ad_system&&s.ad_system.can_use_new_ad&&(i.DATA.adClient[0].url="/cgi-bin/frame?nav=10026&t=ad_system/client_report_frame",
i.DATA.adClient[1].url="/cgi-bin/frame?nav=10026&t=ad_system/promotion_list_frame"),
s&&s.merchant_acl&&s.merchant_acl.can_use_account_manage&&i.DATA.adClient.push({
id:"adclientaccountmanage",
name:"账户管理",
acl:s&&s.ad_system&&s.ad_system.can_use_account_manage,
url:"/cgi-bin/frame?nav=10026&t=ad_system/account_frame"
}),s&&s.merchant_acl&&s.merchant_acl.can_use_pay_tmpl&&i.DATA.templateMessage.push({
id:"template_pay_list",
name:"支付模板消息",
url:"/advanced/tmplmsg?action=pay_list&t=tmplmsg/payment"
}),i.RENDER={
setting:function(t,e){
"meeting"==t.id&&15!=e.role&&this.remove();
},
message:function(t,e){
"search"!=t.id||e&&"search"==e.action||this.remove();
},
assistant:function(t,e){
"warning"!=t.id||e&&0!=e.have_service_package||this.remove();
},
reward:function(t,e){
"invite"!=t.id||e&&0!=e.invite_authority||this.remove();
}
},a.exports=i;
});define("cardticket/add/member_info_flag.js",[],function(){
"use strict";
function n(n,f){
for(var i=0;i<n.length;i++)if(n[i]===f)return i;
return-1;
}
var f=[1,4096,2,4,8,0,32,64,128,256,512,1024,2048];
return{
sys_info:["手机号","姓名","性别","所在地区","生日","身份证号","邮箱","详细地址","学历","职业","行业","收入","爱好"],
info_flag:f,
flag2info:function(n){
for(var f=[],i=0;i<this.info_flag.length;i++){
var r=this.info_flag[i];
r&n&&f.push(this.sys_info[i]);
}
return f;
},
info2flag:function(f){
for(var i=0,r=0;r<f.length;r++){
var t=n(this.sys_info,f[r]);
t>=0&&(i|=this.info_flag[t]);
}
return i;
}
};
});define("tpl/cardticket/send_card.html.js",[],function(){
return'<div>\n	<div class="wrp_processor js_step_container"></div>\n	<div class="first_step js_step_content js_step1">\n	    <!--选择投放方式弹窗-->\n		<div class="js_card_list"></div>\n		<!--选择投放方式弹窗 end-->\n	</div>\n	<div class="second_step js_step_content js_step2">\n	</div>\n</div>';
});define("cardticket/send_card_table.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/Step.js","common/wx/pagebar.js","cardticket/parse_data.js","cardticket/store_cgi.js","cardticket/common_template_helper.js","tpl/cardticket/card_table.html.js","tpl/cardticket/card_preview.html.js","page/cardticket/dialog_choose_card.css","biz_web/ui/checkbox.js","cardticket/card_quantity.js"],function(t){
"use strict";
function e(t){
{
var e;
t.opt;
}
e=t.$container,e.find(".js_card_list").html(v({
loading:!0
}));
}
function a(t,a){
var c=a.opt,n=$.extend(!0,{
action:"batch",
begin:t.begin,
count:t.count
},c.param);
b=!0,e(a),d.get({
url:c.url||"/merchant/electroniccardmgr",
data:n,
complete:function(){
b=!1;
}
},function(t){
if(0==t.base_resp.ret){
var e=t.card_dispatching_list;
t="string"==typeof t.batch_card?$.parseJSON(t.batch_card):t.batch_card,c.data=t.card_list;
var n=p.parse_cardlist(c.data);
if(m=n.card_cache,c.data=n.card_list,c.cache_data=m,e)try{
var r=$.parseJSON(e);
if(r){
r=r.card_dispatching_list;
for(var o=0;o<r.length;o++){
var s=r[o],l=m[s.card_id];
l&&(l.cansend=!s.is_dispatching);
}
}
}catch(u){}
c.pageInfo.total_count=t.total_num,i(c.pageInfo,a);
}else d.show(t);
});
}
function i(t,e,a){
var i,s=e.opt;
if(s.payflag=s.param.flag,i=e.$container,a){
var d=i.find(".js_select");
return d.each(function(e){
e>=t.begin&&e<t.begin+t.count?$(this).closest("tr").show():$(this).closest("tr").hide();
}),e.pagebar=null,o(s.pageInfo,e),void(e.opt.getDataComplete&&e.opt.getDataComplete.call(e,a));
}
i.find(".js_card_list").html(v(s));
var l=s.defaultValues,d=i.find(".js_select");
l.length&&d.each(function(){
for(var t=$(this),e=0;e<l.length;e++)if(l[e]==t.attr("data-id")){
t.prop("checked",!0);
break;
}
}),e.select_card_checkbox=d.checkbox({
onChanged:function(){
if(s.multi){
var t=0;
d.each(function(){
$(this).prop("checked")&&t++;
}),$(".js_selectcount",i).text(t);
}
}
}),e.pagebar=null,o(s.pageInfo,e),c(e),n(e),r(e);
var p,u=[];
1==s.sns_card_type?p=d.filter(".js_select_disabled_1"):2==s.sns_card_type&&(p=d.filter(".js_select_disabled_2")),
p&&(p.each(function(){
u.push($(this).val());
}),e.select_card_checkbox.disable(u)),e.opt.getDataComplete&&e.opt.getDataComplete.call(e,a);
}
function c(t){
function e(e){
var i=$.trim(n.val());
(!e||e&&wx.isHotkey(e,"enter"))&&(r.param.keyword=i,a(r.pageInfo,t));
}
var i=t.$container,c=$(".js_search",i),n=$(".js_keyword",i),r=t.opt;
c.click(function(){
e();
}),n.keyup(function(t){
e(t);
}),n.val(r.param.keyword);
}
function n(t){
var e=t.$container,a=e.find(".js_card_preview");
a.on("click",function(t){
var e=$(this).data("cid"),a=m[e];
if(a){
var i=($(this),$(this).offset());
$(".js_pop_card_preview").remove();
var c=$(h({
card:a
})).appendTo(document.body).hide();
c.css({
position:"fixed",
left:i.left-c.outerWidth()-10,
top:"50%",
"margin-top":-1*c.outerHeight()/2,
"z-index":"10000"
}).show();
var n=c.offset();
return c.find(".js_arrow").css({
top:i.top-n.top
}),$(document).one("click",function(){
c.remove();
}),t.stopPropagation(),!1;
}
});
}
function r(t){
var e=t.$container,a=e.find(".js_modify_quantity");
a.each(function(){
var e=$(this),a=1*e.attr("data-new")||0;
new j({
container:e,
mode:"fixed",
cache_card:t.opt.cache_data,
setquantity:a?!0:!1,
quantityChange:function(t,a){
var i=m[t];
i&&(i.quantity=this.opt.setquantity?i.quantity+a:a,e.attr("data-new",1),i.isnew=!0,
this.opt.setquantity=!0,$("#js_ct_tr_"+t).find(".js_sendcard_quantity").text(i.quantity));
}
});
});
}
function o(t,e){
var c=t.total_count,n=e.$container;
if(t.count&&c>t.count){
var r=t.begin/t.count;
e.pagebar=new l({
container:$(".js_pager",n),
first:!1,
last:!1,
midRange:5,
initShowPage:r+1,
perPage:t.count,
totalItemsNum:c,
callback:function(c){
if(b)return!1;
var n=c.currentPage;
return n!=r+1&&(t.begin=(n-1)*t.count,e.opt.hasdata&&e.opt.data?i(t,e,!0):a(t,e)),
e.opt.pageChanged&&e.opt.pageChanged.call(e),!0;
}
});
}
}
var s=t("common/wx/Tips.js"),d=t("common/wx/Cgi.js"),l=(t("common/wx/Step.js"),t("common/wx/pagebar.js")),p=t("cardticket/parse_data.js"),u=t("cardticket/store_cgi.js"),_=(t("cardticket/common_template_helper.js"),
{
multi:!1,
pageInfo:{
begin:0,
count:5,
total_count:0
},
param:{
keyword:"",
status:"3|6",
flag:2
},
neednew:!0,
noexpire:!0,
editquantity:!0,
onHide:$.noop,
selectComplete:$.noop,
data:null,
hasdata:!1,
maxcount:10,
sns_card_type:1,
defaultValues:[],
url:"",
removeOnHide:!0,
source:"",
has_sendout:!1
}),f=t("tpl/cardticket/card_table.html.js"),h=template.compile(t("tpl/cardticket/card_preview.html.js")),m={};
t("page/cardticket/dialog_choose_card.css"),t("biz_web/ui/checkbox.js");
var g=function(t){
this.opt=$.extend(!0,{},_,t),this.init();
},v=template.compile(f),b=!1,j=t("cardticket/card_quantity.js");
return g.prototype={
_html:f,
init:function(){
var t=this.opt;
if(this.$container=$(t.container),t.hasdata&&t.data){
t.pageInfo.total_count=t.data.length,m={};
for(var e=0;e<t.data.length;e++){
var c=t.data[e];
m[c.id]=c;
}
i(t.pageInfo,this);
}else a(t.pageInfo,this);
},
show:function(){
this.$container.show();
},
select:function(){
if(!b){
var t=this,e=this.opt,a=t.select_card_checkbox.values()[0],i=this.$container,c=m[a];
if(!a||!c)return void s.err("请选择卡券");
if(e.multi)for(var n=t.select_card_checkbox.values(),r=0;r<n.length;r++){
var o=m[n[r]];
if(e.neednew&&(!o.isnew||0==o.quantity))return void s.err("卡券库存不能为0，请先设置库存再投放");
}else if(e.neednew&&(!c.isnew||0==c.quantity)){
s.err("请先设置库存再投放卡券");
var d=i.find("input[data-id="+a+"]");
return void $(d.closest("tr").find(".js_modify_quantity")[0]).click();
}
if(!e.multi&&e.noexpire&&c.is_expire)return void s.err(c.is_sns_card?"卡券已过期":"卡券已过期，无法投放，请到卡券详情去延长有效期再投放");
if(e.multi&&e.noexpire)for(var n=t.select_card_checkbox.values(),r=0;r<n.length;r++){
var o=m[n[r]];
if(o.is_expire)return void s.err("不能选择已过期的卡券，请先到卡券详情去延长有效期");
}
var n=t.select_card_checkbox.values();
return n.length>e.maxcount?void s.err("最多只能选择%s个卡券".sprintf(e.maxcount)):2!=e.sns_card_type||c.is_sns_card?1==e.sns_card_type&&c.is_sns_card?void s.err("朋友的券只能进行社交投放, 请重新选择"):void u.canSendCard({
card_id:a,
success:function(a){
if(a===!1)s.err("没有“审核通过”的门店。确认有至少一个“审核通过”的门店后可进行投放。");else if(a===!0){
var i=t.select_card_checkbox.values(),c=e.multi?i:i,n=[];
if(e.multi)for(var r=0;r<c.length;r++)m[c[r]].cardid=m[c[r]].id,n.push(m[c[r]]);else n=m[c],
n.cardid=m[c].id;
e.selectComplete&&e.selectComplete(n,0);
}
}
}):void s.err("朋友的券才能进行社交投放, 请重新选择");
}
},
isLoading:function(){
return b;
},
hide:function(){
this.$container.hide();
},
destroy:function(){
this.$container.remove();
}
},g;
});define("biz_web/lib/json.js", [], function(require, exports, module) {
try {
var report_time_begin = +(new Date);
return typeof JSON != "object" && (JSON = {}), function() {
"use strict";
function f(e) {
return e < 10 ? "0" + e : e;
}
function quote(e) {
return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
var t = meta[e];
return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
}) + '"' : '"' + e + '"';
}
function str(e, t) {
var n, r, i, s, o = gap, u, a = t[e];
a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
switch (typeof a) {
case "string":
return quote(a);
case "number":
return isFinite(a) ? String(a) : "null";
case "boolean":
case "null":
return String(a);
case "object":
if (!a) return "null";
gap += indent, u = [];
if (Object.prototype.toString.apply(a) === "[object Array]") {
s = a.length;
for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i;
}
if (rep && typeof rep == "object") {
s = rep.length;
for (n = 0; n < s; n += 1) typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
} else for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i;
}
}
typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function(e) {
return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
return this.valueOf();
});
var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
"\b": "\\b",
"	": "\\t",
"\n": "\\n",
"\f": "\\f",
"\r": "\\r",
'"': '\\"',
"\\": "\\\\"
}, rep;
JSON.stringify2 = function(e, t, n) {
var r;
gap = "", indent = "";
if (typeof n == "number") for (r = 0; r < n; r += 1) indent += " "; else typeof n == "string" && (indent = n);
rep = t;
if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
"": e
});
throw new Error("JSON.stringify");
}, typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
function walk(e, t) {
var n, r, i = e[t];
if (i && typeof i == "object") for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
return reviver.call(e, t, i);
}
var j;
text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
}));
if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
"": j
}, "") : j;
throw new SyntaxError("JSON.parse");
});
}(), JSON;
} catch (e) {
wx.jslog({
src: "biz_web/lib/json.js"
}, e);
}
});