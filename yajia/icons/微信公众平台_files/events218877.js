define("common/wx/tooltip.js", [ "tpl/tooltip.html.js", "widget/tooltip.css" ], function(e, t, n) {
try {
var r = +(new Date);
"use strict";
var i = e("tpl/tooltip.html.js");
e("widget/tooltip.css");
var s = {
dom: "",
content: "",
position: {
x: 0,
y: 0
}
}, o = function(e) {
this.options = e = $.extend(!0, {}, s, e), this.$dom = $(this.options.dom), this.init();
};
o.prototype = {
constructor: o,
init: function() {
var e = this;
e.pops = [], e.$dom.each(function() {
var t = $(this), n = t.data("tooltip"), r = $(template.compile(i)(n ? $.extend(!0, {}, e.options, {
content: n
}) : e.options));
e.pops.push(r), $("body").append(r), r.css("display", "none"), t.on("mouseenter", function() {
var n = t.offset();
r.css({
top: n.top - (e.options.position.y || 0) - r.height(),
left: n.left + t.width() / 2 - r.width() / 2 + (e.options.position.x || 0)
}), r.show();
}).on("mouseleave", function() {
r.hide();
}), t.data("tooltip_pop", r);
});
},
show: function() {
var e = this, t = 0, n = e.pops.length;
for (var t = 0; t < n; t++) e.pops[t].show();
},
hide: function() {
var e = this, t = 0, n = e.pops.length;
for (var t = 0; t < n; t++) e.pops[t].hide();
}
}, n.exports = o;
} catch (u) {
wx.jslog({
src: "common/wx/tooltip.js"
}, u);
}
});define("common/wx/upload.js",["widget/upload.css","biz_web/lib/webuploader.js","common/wx/dialog.js","common/wx/Tips.js","tpl/uploader.html.js"],function(e){
"use strict";
function i(e){
f.src="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=4&flag3=5&1="+e;
}
e("widget/upload.css");
var n=e("biz_web/lib/webuploader.js"),t=e("common/wx/dialog.js"),a=e("common/wx/Tips.js"),o=e("tpl/uploader.html.js"),r=wx.T,l=wx.path.webuploader,s=~location.hostname.search(/^mp/)?"https://mp.weixin.qq.com":"",c={
2:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif",
mimeTypes:"image/*"
},
fileSingleSizeLimit:5242880
},
3:{
accept:{
extensions:"mp3,wma,wav,amr",
mimeTypes:"audio/*"
},
fileSingleSizeLimit:5242880
},
4:{
accept:{
extensions:"rm,rmvb,wmv,avi,mpg,mpeg,mp4",
mimeTypes:"video/*"
},
fileSingleSizeLimit:20971520
},
5:{
accept:{
extensions:"pdf",
mimeTypes:"application/pdf"
},
fileSingleSizeLimit:10485760
},
6:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif,pdf",
mimeTypes:"image/*,application/pdf"
},
fileSingleSizeLimit:5242880
},
7:{
accept:{
extensions:"bmp,jpeg,jpg,gif",
mimeTypes:"image/*"
},
fileSingleSizeLimit:5242880
},
8:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/*"
},
fileSingleSizeLimit:5242880
},
9:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:204800
},
10:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:5242880
},
11:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/*"
},
fileSingleSizeLimit:5242880
},
12:{
accept:{
extensions:"mp3,wma,wav,amr",
mimeTypes:"audio/*"
},
fileSingleSizeLimit:31457280
}
};
c[15]=c[4];
var p=function(e){
t.show({
type:"warn",
msg:"警告|"+e,
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
},m=function(e){
var i=n.Uploader;
0==i.support("flash")?p("<p>未安装或未正确配置flash插件，请检查后重试。<br><a href='http://get.adobe.com/cn/flashplayer/' target='_blank'>到adobe去下载flash插件</a></p>"):0==i.support()?p("<p>您的浏览器不支持上传</p>"):e.refresh();
},u=function(e){
e&&wx.jslog({
src:"common/wx/upload.js"
},null,e);
},d={
swf:l,
auto:!0,
pick:{
multiple:!0
},
fileNumLimit:20,
threads:3,
sendAsBinary:!1,
runtimeOrder:"html5,flash",
compress:{
width:1280,
height:1e8,
quality:90,
afterCompressSizeLimit:2097152,
compressSize:0,
resizeSize:2097152,
maxResolution:6e6,
noCompressIfLarger:!0
},
imageSize:!0,
chunked:!1,
duplicate:!0
},f=new Image,g={},h=function(e){
if(!e.url)throw"missing url";
var t,l,s,p=$('<ul class="upload_file_box" style="display:none"></ul>'),f=$(e.container);
f.on("click",function(){
Math.random()<.1&&u(12),m(t);
}).parent().append(p),function(){
0==n.Uploader.support("html5")&&0==n.Uploader.support("flash")&&((new Image).src="/misc/jslog?level=error&id=36&content=[pageurl:"+encodeURIComponent(location.href)+",ua:"+encodeURIComponent(window.navigator.userAgent)+"]");
}(),l={
server:wx.url(e.url+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&svr_time="+wx.data.time),
pick:{
id:f,
multiple:e.multi
},
fileNumLimit:e.queueSizeLimit
},s=c[e.type]||c[2],e=$.extend(!0,{},d,l,s,e);
e.server;
0==n.Uploader.support("html5")&&e.compress&&(e.compress.quality=70);
try{
t=n.create(e);
}catch(h){
if(!t)return;
}
return p.on("click",".js_cancel",function(){
var e=$(this).data("id");
t.cancelFile(e),$(this).hide();
}),t.on("beforeFileQueued",function(i){
return Math.random()<.1&&u(13),e.canContinueUpload&&!e.canContinueUpload()?!1:!(e.onSelect&&e.onSelect(null,i.id,i)===!1);
}),t.on("fileQueued",function(e){
var i={
id:e.id,
fileName:e.name,
size:n.formatSize(e.size)
};
p.append(r(o,i)).show();
}),t.on("fileDequeued",function(){
Math.random()<.1&&u(14),e.onCancel&&e.onCancel();
}),t.on("uploadProgress",function(i,n){
var t="#uploadItem%s".sprintf(i.id),a=p.find(t).find(".progress_bar_thumb");
a.width("%s%".sprintf(100*n)),1==n&&p.find(t).find(".js_cancel").remove(),e.onProgress&&e.onProgress(null,i.id,i,{
percentage:n
});
}),t.on("uploadStart",function(e){
g[e.id]=+new Date;
}),t.on("uploadSuccess",function(n,t,o){
if(Math.random()<.1&&u(16),t&&t.base_resp){
var r=+t.base_resp.ret;
if(0==r)Math.random()<.1&&(u(17),g[n.id]&&i(+new Date-g[n.id]));else switch(n.setStatus("invalid"),
r){
case-18:
case 200018:
a.err("页面停留时间过久，请刷新页面后重试！");
break;

case-20:
case 200020:
a.err("无法解释该图片，请使用另一图片或截图另存");
break;

case-13:
case 200013:
a.err("上传文件过于频繁，请稍后再试");
break;

case-10:
case 200010:
a.err("上传文件过大");
break;

case-22:
case 200022:
a.err("上传音频文件不能超过60秒");
break;

case-39:
case 200039:
a.err("上传图片高度（像素）与宽度（像素）的乘积不能超过600万");
break;

default:
a.err("上传文件发送出错，请刷新页面后重试！");
}
}
e.onComplete&&e.onComplete(null,n.id,n,t,{
fileCount:o.numOfProgress+o.numOfQueue
});
}),t.on("uploadFinished",function(i){
this.reset(),p.fadeOut().html(""),g={},0==i.numOfInvalid&&i.numOfSuccess>0&&e.onAllComplete&&e.onAllComplete(null,{
errors:i.numOfCancel+i.numOfInvalid+i.numOfUploadFailed+i.numofDeleted+i.numofInterrupt,
filesUploaded:i.numOfSuccess
});
}),t.on("uploadError",function(){
Math.random()<.1&&u(15),e.onError&&e.onError();
}),t.on("error",function(i,t,o){
switch("object"==typeof t&&(o=t),i){
case"Q_EXCEED_NUM_LIMIT":
a.err("一次上传最多只能上传%s个文件".sprintf(t));
break;

case"F_EXCEED_SIZE":
a.err("文件大小不能超过%s".sprintf(n.formatSize(t,"0")));
break;

case"F_EXCEED_COMPRESS_SIZE":
a.err("图片压缩后过大，请缩小图片尺寸再试"),u(42);
break;

case"Q_TYPE_DENIED":
a.err(e.errTypeMsg||"文件必须为以下格式：%s".sprintf(e.accept.extensions).replace(/,/g,", "));
}
}),t;
},w=function(e){
return function(i){
return i.url=e,h(i);
};
},b=function(e){
return function(i){
return wx.url(e+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&id="+i);
};
};
return{
uploadFile:h,
uploadBizFile:w(s+"/cgi-bin/filetransfer?action=upload_material&f=json"),
uploadTmpFile:w(s+"/cgi-bin/filetransfer?action=preview&f=json"),
uploadCdnFile:w(s+"/cgi-bin/filetransfer?action=upload_cdn&f=json"),
uploadShopFile:w(s+"/merchant/goodsimage?action=uploadimage"),
uploadShopUnsaveFile:w(s+"/merchant/goodsimage?action=uploadimage&save=0"),
uploadVideoCdnFile:w(s+"/cgi-bin/filetransfer?action=upload_video_cdn&f=json"),
uploadRegisterFile:w(s+"/acct/realnamesubmit?type=2&action=file_set"),
uploadUpgradeFile:w(s+"/acct/servicetypeupgrade?type=2&action=file_set"),
uploadPoiFile:w(s+"/misc/setlocation?action=upload"),
mediaFile:w(s+"/cgi-bin/filetransfer?action=bizmedia"),
uploadCdnFileFromAd:function(e){
return w(s+"/cgi-bin/filetransfer?action=upload_cdn_check_size&f=json&width="+e.w+"&height="+e.h+"&limit_size="+e.size);
},
uploadImageLibFile:function(e){
return e.url=s+"/cgi-bin/filetransfer?action=upload_material&f=json","undefined"!=typeof e.scene&&(e.url+="&scene="+e.scene),
1==e.doublewrite&&(e.url+="&writetype=doublewrite&groupid="+(e.groupid||1)),h(e);
},
uploadCdnFileWithCheck:function(e){
var i={
height:0,
width:0,
size:0,
min_height:0,
min_width:0,
min_size:0
};
e=$.extend(!0,i,e);
var n=[];
for(var t in e)n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));
return w(s+"/cgi-bin/filetransfer?action=upload_cdn_check_range&f=json&"+n.join("&"),"tmpfile");
},
uploadTmpFileWithCheck:function(e){
var i={
height:0,
width:0,
size:0,
min_height:0,
min_width:0,
min_size:0
};
e=$.extend(!0,i,e);
var n=[];
for(var t in e)n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));
return w(s+"/cgi-bin/filetransfer?action=preview_check_range&f=json&"+n.join("&"));
},
tmpFileUrl:b(s+"/cgi-bin/filetransfer?action=preview"),
mediaFileUrl:b(s+"/cgi-bin/filetransfer?action=bizmedia"),
multimediaFileUrl:b(s+"/cgi-bin/filetransfer?action=multimedia")
};
});define("biz_web/ui/dateRange.js",["tpl/biz_web/ui/dateRange.html.js","biz_web/widget/date_range.css"],function(t,e,a){
function s(t){
t.title_id="js_dateRangeTitle"+r,t.inputTrigger="js_dateRangeTrigger"+r,r++,$(t.container).html(template.compile(d)(t));
var e=new i(t.title_id,t);
return e.initOpt=t,e;
}
function i(t,e){
var a={
aToday:"aToday",
aYesterday:"aYesterday",
aRecent7Days:"aRecent7Days",
aRecent14Days:"aRecent14Days",
aRecent30Days:"aRecent30Days",
aRecent90Days:"aRecent90Days",
aDirectDay:[],
startDate:"",
endDate:"",
startCompareDate:"",
endCompareDate:"",
minValidDate:"315507600",
maxValidDate:"",
success:function(){
return!0;
},
startDateId:"startDate",
startCompareDateId:"startCompareDate",
endDateId:"endDate",
endCompareDateId:"endCompareDate",
target:"",
needCompare:!1,
suffix:"",
inputTrigger:"input_trigger",
compareTrigger:"compare_trigger",
compareCheckboxId:"needCompare",
calendars:2,
dayRangeMax:0,
monthRangeMax:12,
dateTable:"dateRangeDateTable",
selectCss:"dateRangeSelected",
compareCss:"dateRangeCompare",
coincideCss:"dateRangeCoincide",
firstCss:"first",
lastCss:"last",
clickCss:"today",
disableGray:"dateRangeGray",
isToday:"dateRangeToday",
joinLineId:"joinLine",
isSingleDay:!1,
defaultText:" 至 ",
singleCompare:!1,
stopToday:!0,
isTodayValid:!1,
weekendDis:!1,
disCertainDay:[],
disCertainDate:[],
shortOpr:!1,
noCalendar:!1,
theme:"gri",
autoCommit:!1,
autoSubmit:!1,
replaceBtn:"btn_compare",
onsubmit:$.noop,
beforeSelect:$.noop
},s=this;
if(this.inputId=t,this.inputCompareId=t+"Compare",this.compareInputDiv="div_compare_"+t,
this.mOpts=$.extend({},a,e),this.mOpts.calendars=Math.min(this.mOpts.calendars,3),
this.mOpts.compareCss="ta"==this.mOpts.theme?this.mOpts.selectCss:this.mOpts.compareCss,
this.periodObj={},s.mOpts.aDirectDay)for(var i=s.mOpts.aDirectDay,d=0,r=i.length;r>d;d++)this.periodObj[i[d].id]=i[d].value;else this.periodObj[s.mOpts.aToday]=0,
this.periodObj[s.mOpts.aYesterday]=1,this.periodObj[s.mOpts.aRecent7Days]=6,this.periodObj[s.mOpts.aRecent14Days]=13,
this.periodObj[s.mOpts.aRecent30Days]=29,this.periodObj[s.mOpts.aRecent90Days]=89;
this.startDefDate="";
var n=""==this.mOpts.suffix?(new Date).getTime():this.mOpts.suffix;
this.calendarId="calendar_"+n,this.dateListId="dateRangePicker_"+n,this.dateRangeCompareDiv="dateRangeCompareDiv_"+n,
this.dateRangeDiv="dateRangeDiv_"+n,this.compareCheckBoxDiv="dateRangeCompareCheckBoxDiv_"+n,
this.submitBtn="submit_"+n,this.closeBtn="closeBtn_"+n,this.preMonth="dateRangePreMonth_"+n,
this.nextMonth="dateRangeNextMonth_"+n,this.startDateId=this.mOpts.startDateId+"_"+n,
this.endDateId=this.mOpts.endDateId+"_"+n,this.compareCheckboxId=this.mOpts.compareCheckboxId+"_"+n,
this.startCompareDateId=this.mOpts.startCompareDateId+"_"+n,this.endCompareDateId=this.mOpts.endCompareDateId+"_"+n;
var p={
gri:['<div id="'+this.calendarId+'" class="gri_dateRangeCalendar">','<table class="gri_dateRangePicker"><tr id="'+this.dateListId+'"></tr></table>','<div class="gri_dateRangeOptions" '+(this.mOpts.autoSubmit?' style="display:none" ':"")+">",'<div class="gri_dateRangeInput" id="'+this.dateRangeDiv+'" >','<input type="text" class="gri_dateRangeInput" name="'+this.startDateId+'" id="'+this.startDateId+'" value="'+this.mOpts.startDate+'" readonly />','<span id="'+this.mOpts.joinLineId+'"> - </span>','<input type="text" class="gri_dateRangeInput" name="'+this.endDateId+'" id="'+this.endDateId+'" value="'+this.mOpts.endDate+'" readonly /><br />',"</div>",'<div class="gri_dateRangeInput" id="'+this.dateRangeCompareDiv+'">','<input type="text" class="gri_dateRangeInput" name="'+this.startCompareDateId+'" id="'+this.startCompareDateId+'" value="'+this.mOpts.startCompareDate+'" readonly />','<span class="'+this.mOpts.joinLineId+'"> - </span>','<input type="text" class="gri_dateRangeInput" name="'+this.endCompareDateId+'" id="'+this.endCompareDateId+'" value="'+this.mOpts.endCompareDate+'" readonly />',"</div>","<div>",'<input type="button" name="'+this.submitBtn+'" id="'+this.submitBtn+'" value="确定" />','&nbsp;<a id="'+this.closeBtn+'" href="javascript:;">关闭</a>',"</div>","</div>","</div>"],
ta:['<div id="'+this.calendarId+'" class="ta_calendar ta_calendar2 cf">','<div class="ta_calendar_cont cf" id="'+this.dateListId+'">',"</div>",'<div class="ta_calendar_footer cf" '+(this.mOpts.autoSubmit?' style="display:none" ':"")+">",'<div class="frm_msg">','<div id="'+this.dateRangeDiv+'">','<input type="text" class="ta_ipt_text_s" name="'+this.startDateId+'" id="'+this.startDateId+'" value="'+this.mOpts.startDate+'" readonly />','<span class="'+this.mOpts.joinLineId+'"> - </span>','<input type="text" class="ta_ipt_text_s" name="'+this.endDateId+'" id="'+this.endDateId+'" value="'+this.mOpts.endDate+'" readonly /><br />',"</div>",'<div id="'+this.dateRangeCompareDiv+'">','<input type="text" class="ta_ipt_text_s" name="'+this.startCompareDateId+'" id="'+this.startCompareDateId+'" value="'+this.mOpts.startCompareDate+'" readonly />','<span class="'+this.mOpts.joinLineId+'"> - </span>','<input type="text" class="ta_ipt_text_s" name="'+this.endCompareDateId+'" id="'+this.endCompareDateId+'" value="'+this.mOpts.endCompareDate+'" readonly />',"</div>","</div>",'<div class="frm_btn">','<input class="ta_btn ta_btn_primary" type="button" name="'+this.submitBtn+'" id="'+this.submitBtn+'" value="确定" />','<input class="ta_btn" type="button" id="'+this.closeBtn+'" value="取消"/>',"</div>","</div>","</div>"]
},m={
gri:['<label class="gri_contrast" for ="'+this.compareCheckboxId+'">','<input type="checkbox" class="gri_pc" name="'+this.compareCheckboxId+'" id="'+this.compareCheckboxId+'" value="1"/>对比',"</label>",'<input type="text" name="'+this.inputCompareId+'" id="'+this.inputCompareId+'" value="" class="gri_date"/>'],
ta:['<label class="contrast" for ="'+this.compareCheckboxId+'">','<input type="checkbox" class="pc" name="'+this.compareCheckboxId+'" id="'+this.compareCheckboxId+'" value="1"/>对比',"</label>",'<div class="ta_date" id="'+this.compareInputDiv+'">','	<span name="dateCompare" id="'+this.inputCompareId+'" class="date_title"></span>','	<a class="opt_sel" id="'+this.mOpts.compareTrigger+'" href="#">','		<i class="i_orderd"></i>',"	</a>","</div>"]
};
if($(m[this.mOpts.theme].join("")).insertAfter("ta"==this.mOpts.theme?$("#div_"+this.inputId):$("#"+this.inputId)),
this.mOpts.noCalendar&&($("#"+this.inputId).css("display","none"),$("#"+this.compareCheckboxId).parent().css("display","none")),
$(0<$("#appendParent").length?"#appendParent":document.body).append(p[this.mOpts.theme].join("")),
$("#"+this.calendarId).css("z-index",9999),1>$("#"+this.mOpts.startDateId).length?$(""!=this.mOpts.target?"#"+this.mOpts.target:"body").append('<input type="hidden" id="'+this.mOpts.startDateId+'" name="'+this.mOpts.startDateId+'" value="'+this.mOpts.startDate+'" />'):$("#"+this.mOpts.startDateId).val(this.mOpts.startDate),
1>$("#"+this.mOpts.endDateId).length?$(""!=this.mOpts.target?"#"+this.mOpts.target:"body").append('<input type="hidden" id="'+this.mOpts.endDateId+'" name="'+this.mOpts.endDateId+'" value="'+this.mOpts.endDate+'" />'):$("#"+this.mOpts.endDateId).val(this.mOpts.endDate),
1>$("#"+this.mOpts.compareCheckboxId).length&&$(""!=this.mOpts.target?"#"+this.mOpts.target:"body").append('<input type="checkbox" id="'+this.mOpts.compareCheckboxId+'" name="'+this.mOpts.compareCheckboxId+'" value="0" style="display:none;" />'),
0==this.mOpts.needCompare?($("#"+this.compareInputDiv).css("display","none"),$("#"+this.compareCheckBoxDiv).css("display","none"),
$("#"+this.dateRangeCompareDiv).css("display","none"),$("#"+this.compareCheckboxId).attr("disabled",!0),
$("#"+this.startCompareDateId).attr("disabled",!0),$("#"+this.endCompareDateId).attr("disabled",!0),
$("#"+this.compareCheckboxId).parent().css("display","none"),$("#"+this.mOpts.replaceBtn).length>0&&$("#"+this.mOpts.replaceBtn).hide()):(1>$("#"+this.mOpts.startCompareDateId).length?$(""!=this.mOpts.target?"#"+this.mOpts.target:"body").append('<input type="hidden" id="'+this.mOpts.startCompareDateId+'" name="'+this.mOpts.startCompareDateId+'" value="'+this.mOpts.startCompareDate+'" />'):$("#"+this.mOpts.startCompareDateId).val(this.mOpts.startCompareDate),
1>$("#"+this.mOpts.endCompareDateId).length?$(""!=this.mOpts.target?"#"+this.mOpts.target:"body").append('<input type="hidden" id="'+this.mOpts.endCompareDateId+'" name="'+this.mOpts.endCompareDateId+'" value="'+this.mOpts.endCompareDate+'" />'):$("#"+this.mOpts.endCompareDateId).val(this.mOpts.endCompareDate),
(""==this.mOpts.startCompareDate||""==this.mOpts.endCompareDate)&&($("#"+this.compareCheckboxId).attr("checked",!1),
$("#"+this.mOpts.compareCheckboxId).attr("checked",!1))),this.dateInput=this.startDateId,
this.changeInput(this.dateInput),$("#"+this.startDateId).bind("click",function(){
return s.endCompareDateId==s.dateInput&&$("#"+s.startCompareDateId).val(s.startDefDate),
s.startDefDate="",s.removeCSS(1),s.changeInput(s.startDateId),!1;
}),$("#"+this.calendarId).bind("click",function(t){
t.stopPropagation();
}),$("#"+this.startCompareDateId).bind("click",function(){
return s.endDateId==s.dateInput&&$("#"+s.startDateId).val(s.startDefDate),s.startDefDate="",
s.removeCSS(0),s.changeInput(s.startCompareDateId),!1;
}),$("#"+this.submitBtn).bind("click",function(){
return s.close(1),s.mOpts.success({
startDate:$("#"+s.mOpts.startDateId).val(),
endDate:$("#"+s.mOpts.endDateId).val(),
needCompare:$("#"+s.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+s.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+s.mOpts.endCompareDateId).val()
}),s.mOpts.onsubmit({
startDate:$("#"+s.mOpts.startDateId).val(),
endDate:$("#"+s.mOpts.endDateId).val(),
needCompare:$("#"+s.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+s.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+s.mOpts.endCompareDateId).val()
}),!1;
}),$("#"+this.closeBtn).bind("click",function(){
return s.close(),!1;
}),$("#"+this.inputId).bind("click",function(){
return s.init(),s.show(!1,s),!1;
}),$("#"+this.mOpts.inputTrigger).bind("click",function(){
return"none"==$("#"+s.calendarId).css("display")?(s.init(),s.show(!1,s)):s.close(),
!1;
}),$("#"+this.mOpts.compareTrigger).bind("click",function(){
return s.init(!0),s.show(!0,s),!1;
}),$("#"+this.inputCompareId).bind("click",function(){
return s.init(!0),s.show(!0,s),!1;
}),this.mOpts.singleCompare&&("ta"===this.mOpts.theme?($("#"+s.startDateId).val(s.mOpts.startDate),
$("#"+s.endDateId).val(s.mOpts.startDate),$("#"+s.startCompareDateId).val(s.mOpts.startCompareDate),
$("#"+s.endCompareDateId).val(s.mOpts.startCompareDate)):($("#"+s.startDateId).val(s.mOpts.startDate),
$("#"+s.endDateId).val(s.mOpts.startDate),$("#"+s.startCompareDateId).val(s.mOpts.startCompareDate),
$("#"+s.endCompareDateId).val(s.mOpts.startCompareDate),$("#"+this.compareCheckboxId).attr("checked",!0),
$("#"+this.mOpts.compareCheckboxId).attr("checked",!0))),$("#"+this.dateRangeCompareDiv).css("display",$("#"+this.compareCheckboxId).attr("checked")?"":"none"),
$("#"+this.compareInputDiv).css("display",$("#"+this.compareCheckboxId).attr("checked")?"":"none"),
$("#"+this.compareCheckboxId).bind("click",function(){
$("#"+s.inputCompareId).css("display",this.checked?"":"none"),$("#"+s.dateRangeCompareDiv).css("display",this.checked?"":"none"),
$("#"+s.compareInputDiv).css("display",this.checked?"":"none"),$("#"+s.startCompareDateId).css("disabled",this.checked?!1:!0),
$("#"+s.endCompareDateId).css("disabled",this.checked?!1:!0),$("#"+s.mOpts.compareCheckboxId).attr("checked",$("#"+s.compareCheckboxId).attr("checked")),
$("#"+s.mOpts.compareCheckboxId).val($("#"+s.compareCheckboxId).attr("checked")?1:0),
$("#"+s.compareCheckboxId).attr("checked")?(sDate=s.str2date($("#"+s.startDateId).val()),
sTime=sDate.getTime(),eDate=s.str2date($("#"+s.endDateId).val()),eTime=eDate.getTime(),
scDate=$("#"+s.startCompareDateId).val(),ecDate=$("#"+s.endCompareDateId).val(),
(""==scDate||""==ecDate)&&(ecDate=s.str2date(s.date2ymd(sDate).join("-")),ecDate.setDate(ecDate.getDate()-1),
scDate=s.str2date(s.date2ymd(sDate).join("-")),scDate.setDate(scDate.getDate()-(eTime-sTime)/864e5-1),
ecDate.getTime()<1e3*s.mOpts.minValidDate&&(scDate=sDate,ecDate=eDate),ecDate.getTime()>=1e3*s.mOpts.minValidDate&&scDate.getTime()<1e3*s.mOpts.minValidDate&&(scDate.setTime(1e3*s.mOpts.minValidDate),
scDate=s.str2date(s.date2ymd(scDate).join("-")),ecDate.setDate(scDate.getDate()+(eTime-sTime)/864e5-1)),
$("#"+s.startCompareDateId).val(s.formatDate(s.date2ymd(scDate).join("-"))),$("#"+s.endCompareDateId).val(s.formatDate(s.date2ymd(ecDate).join("-")))),
s.addCSS(1),s.changeInput(s.startCompareDateId)):(s.removeCSS(1),s.changeInput(s.startDateId)),
s.close(1),s.mOpts.success({
startDate:$("#"+s.mOpts.startDateId).val(),
endDate:$("#"+s.mOpts.endDateId).val(),
needCompare:$("#"+s.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+s.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+s.mOpts.endCompareDateId).val()
});
}),this.init(),this.close(1),this.mOpts.replaceBtn&&$("#"+this.mOpts.replaceBtn).length>0){
var h=$(this.mOpts.container);
$("#"+s.compareCheckboxId).hide(),h.find(".contrast").hide(),$("#"+this.mOpts.replaceBtn).bind("click",function(){
var t=this,e=$("#"+s.compareCheckboxId);
e.click(),e.attr("checked")?function(){
e.removeAttr("checked"),h.find(".contrast").hide(),$(t).text("按时间对比");
}():function(){
e.attr("checked","checked"),h.find(".contrast").show(),$(t).text("取消对比");
}();
});
}
this.mOpts.autoCommit&&this.mOpts.success({
startDate:$("#"+s.mOpts.startDateId).val(),
endDate:$("#"+s.mOpts.endDateId).val(),
needCompare:$("#"+s.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+s.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+s.mOpts.endCompareDateId).val()
}),$(document).bind("click",function(){
s.close();
});
}
var d=t("tpl/biz_web/ui/dateRange.html.js");
t("biz_web/widget/date_range.css");
var r=0;
a.exports=s,i.prototype.init=function(t){
var e=this,a="undefined"!=typeof t?t&&$("#"+e.compareCheckboxId).attr("checked"):$("#"+e.compareCheckboxId).attr("checked");
$("#"+this.dateListId).empty();
var s=""==this.mOpts.endDate?new Date:this.str2date(this.mOpts.endDate);
this.calendar_endDate=new Date(s.getFullYear(),s.getMonth()+1,0);
for(var i=0;i<this.mOpts.calendars;i++){
var d=null;
if("ta"==this.mOpts.theme?d=this.fillDate(s.getFullYear(),s.getMonth(),i):(d=document.createElement("td"),
$(d).append(this.fillDate(s.getFullYear(),s.getMonth(),i)),$(d).css("vertical-align","top")),
0==i)$("#"+this.dateListId).append(d);else{
var r="ta"==this.mOpts.theme?$("#"+this.dateListId).find("table").get(0):$("#"+this.dateListId).find("td").get(0);
$(r).before(d);
}
s.setMonth(s.getMonth()-1,1);
}
$("#"+this.preMonth).bind("click",function(){
return e.calendar_endDate.setMonth(e.calendar_endDate.getMonth()-1,1),e.mOpts.endDate=e.date2ymd(e.calendar_endDate).join("-"),
e.init(t),1==e.mOpts.calendars&&e.changeInput(""==$("#"+e.startDateId).val()?e.startDateId:e.endDateId),
!1;
}),$("#"+this.nextMonth).bind("click",function(){
return e.calendar_endDate.setMonth(e.calendar_endDate.getMonth()+1,1),e.mOpts.endDate=e.date2ymd(e.calendar_endDate).join("-"),
e.init(t),1==e.mOpts.calendars&&e.changeInput(""==$("#"+e.startDateId).val()?e.startDateId:e.endDateId),
!1;
}),this.calendar_startDate=new Date(s.getFullYear(),s.getMonth()+1,1),this.endDateId!=this.dateInput&&this.endCompareDateId!=this.dateInput&&this.addCSS(a&&"undefined"!=typeof t?1:0),
e.addCSS(a&&"undefined"!=typeof t?1:0),$("#"+e.inputCompareId).css("display",a?"":"none"),
$("#"+this.compareInputDiv).css("display",$("#"+this.compareCheckboxId).attr("checked")?"":"none");
for(var n in e.periodObj)$("#"+n).length>0&&($("#"+n).unbind("click"),$("#"+n).bind("click",function(){
var t="ta"==e.mOpts.theme?"active":"a";
$(this).parent().nextAll().removeClass(t),$(this).parent().prevAll().removeClass(t),
$(this).parent().addClass(t);
var a=e.getSpecialPeriod(e.periodObj[$(this).attr("id")]);
$("#"+e.startDateId).val(e.formatDate(a.otherday)),$("#"+e.endDateId).val(e.formatDate(a.today)),
$("#"+e.mOpts.startDateId).val($("#"+e.startDateId).val()),$("#"+e.mOpts.endDateId).val($("#"+e.endDateId).val()),
"ta"==e.mOpts.theme?$("#"+e.compareInputDiv).hide():$("#"+e.inputCompareId).css("display","none"),
$("#"+e.compareCheckboxId).attr("checked",!1),$("#"+e.mOpts.compareCheckboxId).attr("checked",!1),
$("#"+this.compareInputDiv).css("display",$("#"+this.compareCheckboxId).attr("checked")?"":"none"),
e.close(1),$("#"+e.startCompareDateId).val(""),$("#"+e.endCompareDateId).val(""),
$("#"+e.mOpts.startCompareDateId).val(""),$("#"+e.mOpts.endCompareDateId).val(""),
$("#"+e.mOpts.compareCheckboxId).val(0),$("#"+e.mOpts.replaceBtn).length>0&&($(".contrast").hide(),
$("#"+e.mOpts.replaceBtn).text("按时间对比")),e.mOpts.success({
startDate:$("#"+e.mOpts.startDateId).val(),
endDate:$("#"+e.mOpts.endDateId).val(),
needCompare:$("#"+e.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+e.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+e.mOpts.endCompareDateId).val()
});
}));
$(document).bind("click",function(){
e.close();
}),$("#"+this.inputId).bind("change",function(){
""===$(this).val()&&($("#"+e.startDateId).val(""),$("#"+e.endDateId).val(""),$("#"+e.startCompareDateId).val(""),
$("#"+e.endCompareDateId).val(""));
});
},i.prototype.getSpecialPeriod=function(t){
var e=this,a=new Date;
1==e.mOpts.isTodayValid&&""!=e.mOpts.isTodayValid||2>t?"":a.setTime(a.getTime()-864e5);
var s=a.getTime()-24*t*60*60*1e3<1e3*e.mOpts.minValidDate?1e3*e.mOpts.minValidDate:a.getTime()-24*t*60*60*1e3,i=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();
a.setTime(s);
var d=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();
return t==e.periodObj.aYesterday&&(i=d),{
today:i,
otherday:d
};
},i.prototype.getCurrentDate=function(){
return{
startDate:$("#"+this.startDateId).val(),
endDate:$("#"+this.endDateId).val(),
needCompare:$("#"+this.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+this.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+this.mOpts.endCompareDateId).val()
};
},i.prototype.removeCSS=function(t,e){
"undefined"==typeof e&&(e=this.mOpts.theme+"_"+this.mOpts.coincideCss),"undefined"==typeof t&&(t=0);
for(var a=new Date(this.calendar_startDate.getFullYear(),this.calendar_startDate.getMonth(),this.calendar_startDate.getDate()),s="",i=new Date(a);i.getTime()<=this.calendar_endDate.getTime();i.setDate(i.getDate()+1))s=0==t?this.mOpts.theme+"_"+this.mOpts.selectCss:this.mOpts.theme+"_"+this.mOpts.compareCss,
$("#"+this.calendarId+"_"+this.date2ymd(i).join("-")).removeClass(s),$("#"+this.calendarId+"_"+this.date2ymd(i).join("-")).removeClass(this.mOpts.firstCss).removeClass(this.mOpts.lastCss).removeClass(this.mOpts.clickCss);
},i.prototype.addCSS=function(t,e){
"undefined"==typeof e&&(e=this.mOpts.theme+"_"+this.mOpts.coincideCss),"undefined"==typeof t&&(t=0);
for(var a=this.str2date($("#"+this.startDateId).val()),s=this.str2date($("#"+this.endDateId).val()),i=this.str2date($("#"+this.startCompareDateId).val()),d=this.str2date($("#"+this.endCompareDateId).val()),r=0==t?a:i,n=0==t?s:d,p="",m=new Date(r);m.getTime()<=n.getTime();m.setDate(m.getDate()+1))0==t?(p=this.mOpts.theme+"_"+this.mOpts.selectCss,
$("#"+this.calendarId+"_"+this.date2ymd(m).join("-")).removeClass(this.mOpts.firstCss).removeClass(this.mOpts.lastCss).removeClass(this.mOpts.clickCss),
$("#"+this.calendarId+"_"+this.date2ymd(m).join("-")).removeClass(p)):p=this.mOpts.theme+"_"+this.mOpts.compareCss,
$("#"+this.calendarId+"_"+this.date2ymd(m).join("-")).attr("class",p);
"ta"==this.mOpts.theme&&($("#"+this.calendarId+"_"+this.date2ymd(new Date(r)).join("-")).removeClass().addClass(this.mOpts.firstCss),
$("#"+this.calendarId+"_"+this.date2ymd(new Date(n)).join("-")).removeClass().addClass(this.mOpts.lastCss),
r.getTime()==n.getTime()&&$("#"+this.calendarId+"_"+this.date2ymd(new Date(n)).join("-")).removeClass().addClass(this.mOpts.clickCss));
},i.prototype.checkDateRange=function(t,e){
var a=this.str2date(t),s=this.str2date(e),i=a.getTime(),d=s.getTime(),r=31*this.mOpts.monthRangeMax+this.mOpts.dayRangeMax,n=Math.abs(d-i)/864e5;
return r>0&&n>r?(alert("所选日期跨度最大不能超过"+r+"天"),!1):!0;
},i.prototype.selectDate=function(t){
this.changeInput(this.dateInput);
var e=this.formatDate(t);
if(this.startDateId==this.dateInput)this.removeCSS(0),this.removeCSS(1),$("#"+this.calendarId+"_"+t).attr("class","ta"==this.mOpts.theme?this.mOpts.clickCss:this.mOpts.theme+"_"+this.mOpts.selectCss),
this.startDefDate=$("#"+this.dateInput).val(),$("#"+this.dateInput).val(e),1==this.mOpts.singleCompare||1==this.mOpts.isSingleDay?(this.dateInput=this.startDateId,
$("#"+this.endDateId).val(e),(this.mOpts.shortOpr||this.mOpts.autoSubmit)&&this.close(1),
this.mOpts.success({
startDate:$("#"+this.mOpts.startDateId).val(),
endDate:$("#"+this.mOpts.endDateId).val(),
needCompare:$("#"+this.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+this.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+this.mOpts.endCompareDateId).val()
})):this.dateInput=this.endDateId;else if(this.endDateId==this.dateInput){
if(""==$("#"+this.startDateId).val())return this.dateInput=this.startDateId,this.selectDate(t),
!1;
if(0==this.checkDateRange($("#"+this.startDateId).val(),t))return!1;
-1==this.compareStrDate(t,$("#"+this.startDateId).val())&&($("#"+this.dateInput).val($("#"+this.startDateId).val()),
$("#"+this.startDateId).val(e),e=$("#"+this.dateInput).val()),$("#"+this.dateInput).val(e),
this.dateInput=this.startDateId,this.removeCSS(0),this.addCSS(0),this.startDefDate="",
this.mOpts.autoSubmit&&(this.close(1),this.mOpts.success({
startDate:$("#"+this.mOpts.startDateId).val(),
endDate:$("#"+this.mOpts.endDateId).val(),
needCompare:$("#"+this.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+this.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+this.mOpts.endCompareDateId).val()
}));
}else if(this.startCompareDateId==this.dateInput)this.removeCSS(1),this.removeCSS(0),
$("#"+this.calendarId+"_"+t).attr("class","ta"==this.mOpts.theme?this.mOpts.clickCss:this.mOpts.theme+"_"+this.mOpts.compareCss),
this.startDefDate=$("#"+this.dateInput).val(),$("#"+this.dateInput).val(e),1==this.mOpts.singleCompare||1==this.mOpts.isSingleDay?(this.dateInput=this.startCompareDateId,
$("#"+this.endCompareDateId).val(e),(this.mOpts.shortOpr||this.mOpts.autoSubmit)&&this.close(1),
this.mOpts.success({
startDate:$("#"+this.mOpts.startDateId).val(),
endDate:$("#"+this.mOpts.endDateId).val(),
needCompare:$("#"+this.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+this.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+this.mOpts.endCompareDateId).val()
})):this.dateInput=this.endCompareDateId;else if(this.endCompareDateId==this.dateInput){
if(""==$("#"+this.startCompareDateId).val())return this.dateInput=this.startCompareDateId,
this.selectDate(t),!1;
if(0==this.checkDateRange($("#"+this.startCompareDateId).val(),t))return!1;
-1==this.compareStrDate(t,$("#"+this.startCompareDateId).val())&&($("#"+this.dateInput).val($("#"+this.startCompareDateId).val()),
$("#"+this.startCompareDateId).val(e),e=$("#"+this.dateInput).val()),$("#"+this.dateInput).val(e),
this.dateInput=this.startCompareDateId,this.removeCSS(1),this.addCSS(1),this.startDefDate="",
this.mOpts.autoSubmit&&(this.close(1),this.mOpts.success({
startDate:$("#"+this.mOpts.startDateId).val(),
endDate:$("#"+this.mOpts.endDateId).val(),
needCompare:$("#"+this.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+this.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+this.mOpts.endCompareDateId).val()
}));
}
},i.prototype.show=function(t,e){
if(!this._disabled){
$("#"+e.dateRangeDiv).css("display",t?"none":""),$("#"+e.dateRangeCompareDiv).css("display",t?"":"none");
var a=t?$("#"+this.inputCompareId).offset():$("#"+this.inputId).offset(),s=(t?$("#"+this.inputCompareId).height():$("#"+this.inputId).height(),
parseInt($(document.body)[0].clientWidth)),i=a.left;
return $("#"+this.calendarId).css("display","block"),(1==this.mOpts.singleCompare||1==this.mOpts.isSingleDay)&&($("#"+this.endDateId).css("display","none"),
$("#"+this.endCompareDateId).css("display","none"),$("#"+this.mOpts.joinLineId).css("display","none"),
$("."+this.mOpts.joinLineId).css("display","none")),s>0&&$("#"+this.calendarId).width()+a.left>s&&(i=a.left+$("#"+this.inputId).width()-$("#"+this.calendarId).width()+(/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent)?5:0),
"ta"==e.mOpts.theme&&(i+=50)),$("#"+this.calendarId).css("left",i+"px"),$("#"+this.calendarId).css("top",a.top+("ta"==e.mOpts.theme?35:22)+"px"),
this.changeInput(t?this.startCompareDateId:this.startDateId),!1;
}
},i.prototype.close=function(t){
if(t){
this.mOpts.shortOpr===!0?($("#"+this.inputId).val($("#"+this.startDateId).val()),
$("#"+this.inputCompareId).val($("#"+this.startCompareDateId).val())):$("#"+this.inputId).val($("#"+this.startDateId).val()+(""==$("#"+this.endDateId).val()?"":this.mOpts.defaultText+$("#"+this.endDateId).val()));
var e=1==this.mOpts.isTodayValid&&""!=this.mOpts.isTodayValid?(new Date).getTime():(new Date).getTime()-864e5,a=this.str2date($("#"+this.startDateId).val()).getTime(),s=this.str2date($("#"+this.endDateId).val()).getTime();
if(a>s){
var i=$("#"+this.startDateId).val();
$("#"+this.startDateId).val($("#"+this.endDateId).val()),$("#"+this.endDateId).val(i);
}
var d=this.str2date($("#"+this.startCompareDateId).val()).getTime(),r=this.str2date($("#"+this.endCompareDateId).val()).getTime();
if(d>r){
var i=$("#"+this.startCompareDateId).val();
$("#"+this.startCompareDateId).val($("#"+this.endCompareDateId).val()),$("#"+this.endCompareDateId).val(i);
}
var n=1==this.mOpts.shortOpr?$("#"+this.startDateId).val():$("#"+this.startDateId).val()+(""==$("#"+this.endDateId).val()?"":this.mOpts.defaultText+$("#"+this.endDateId).val()),p=document.getElementById(this.inputId);
if(p&&"INPUT"==p.tagName?($("#"+this.inputId).val(n),$("#"+this.inputCompareId).is(":visible")&&$("#"+this.inputCompareId).val(c)):($("#"+this.inputId).html(n),
$("#"+this.inputCompareId).is(":visible")&&$("#"+this.inputCompareId).html(c)),"ta"!=this.mOpts.theme&&""!=$("#"+this.startCompareDateId).val()&&""!=$("#"+this.endCompareDateId).val()){
var m=this.str2date($("#"+this.startCompareDateId).val()).getTime(),h=this.str2date($("#"+this.endCompareDateId).val()).getTime(),o=m+s-a;
o>e&&(o=e,$("#"+this.startCompareDateId).val(this.formatDate(this.date2ymd(new Date(o+a-s)).join("-")))),
$("#"+this.endCompareDateId).val(this.formatDate(this.date2ymd(new Date(o)).join("-")));
var m=this.str2date($("#"+this.startCompareDateId).val()).getTime(),h=this.str2date($("#"+this.endCompareDateId).val()).getTime();
if(m>h){
var i=$("#"+this.startCompareDateId).val();
$("#"+this.startCompareDateId).val($("#"+this.endCompareDateId).val()),$("#"+this.endCompareDateId).val(i);
}
}
var c=1==this.mOpts.shortOpr?$("#"+this.startCompareDateId).val():$("#"+this.startCompareDateId).val()+(""==$("#"+this.endCompareDateId).val()?"":this.mOpts.defaultText+$("#"+this.endCompareDateId).val());
p&&"INPUT"==p.tagName?$("#"+this.inputCompareId).val(c):$("#"+this.inputCompareId).html(c);
$("#"+this.mOpts.startDateId).val($("#"+this.startDateId).val()),$("#"+this.mOpts.endDateId).val($("#"+this.endDateId).val()),
$("#"+this.mOpts.startCompareDateId).val($("#"+this.startCompareDateId).val()),$("#"+this.mOpts.endCompareDateId).val($("#"+this.endCompareDateId).val());
for(var l in this.periodObj)$("#"+this.mOpts[l])&&$("#"+this.mOpts[l]).parent().removeClass("a");
}
return $("#"+this.calendarId).css("display","none"),!1;
},i.prototype.fillDate=function(t,e,a){
var s=this,i="ta"==this.mOpts.theme,d=new Date(t,e,1),r=new Date(t,e,1),n=r.getDay();
r.setDate(1-n);
var p=new Date(t,e+1,0),m=new Date(t,e+1,0);
n=m.getDay(),m.setDate(m.getDate()+6-n);
var h=new Date,o=h.getDate(),c=h.getMonth(),l=h.getFullYear(),D=document.createElement("table");
if(i){
D.className=this.mOpts.dateTable,cap=document.createElement("caption"),$(cap).append(t+"年"+(e+1)+"月"),
$(D).append(cap),thead=document.createElement("thead"),tr=document.createElement("tr");
for(var I=["日","一","二","三","四","五","六"],C=0;7>C;C++)th=document.createElement("th"),
$(th).append(I[C]),$(tr).append(th);
$(thead).append(tr),$(D).append(thead),tr=document.createElement("tr"),td=document.createElement("td"),
0==a&&$(td).append('<a href="javascript:void(0);" id="'+this.nextMonth+'"><i class="i_next"></i></a>'),
a+1==this.mOpts.calendars&&$(td).append('<a href="javascript:void(0);" id="'+this.preMonth+'"><i class="i_pre"></i></a>'),
$(td).attr("colSpan",7),$(td).css("text-align","center"),$(tr).append(td),$(D).append(tr);
}else{
D.className=this.mOpts.theme+"_"+this.mOpts.dateTable,tr=document.createElement("tr"),
td=document.createElement("td"),0==a&&$(td).append('<a href="javascript:void(0);" id="'+this.nextMonth+'" class="gri_dateRangeNextMonth"><span>next</span></a>'),
a+1==this.mOpts.calendars&&$(td).append('<a href="javascript:void(0);" id="'+this.preMonth+'" class="gri_dateRangePreMonth"><span>pre</span></a>'),
$(td).append(t+"年"+(e+1)+"月"),$(td).attr("colSpan",7),$(td).css("text-align","center"),
$(td).css("background-color","#F9F9F9"),$(tr).append(td),$(D).append(tr);
var I=["日","一","二","三","四","五","六"];
tr=document.createElement("tr");
for(var C=0;7>C;C++)td=document.createElement("td"),$(td).append(I[C]),$(tr).append(td);
$(D).append(tr);
}
for(var v="",O=0,u="",g=r;g.getTime()<=m.getTime();g.setDate(g.getDate()+1)){
if(g.getTime()<d.getTime())v=this.mOpts.theme+"_"+this.mOpts.disableGray,O="-1";else if(g.getTime()>p.getTime())v=this.mOpts.theme+"_"+this.mOpts.disableGray,
O="1";else if(1==this.mOpts.stopToday&&g.getTime()>h.getTime()||g.getTime()<1e3*s.mOpts.minValidDate||""!==s.mOpts.maxValidDate&&g.getTime()>1e3*s.mOpts.maxValidDate)v=this.mOpts.theme+"_"+this.mOpts.disableGray,
O="2";else{
if(O="0",g.getDate()==o&&g.getMonth()==c&&g.getFullYear()==l?1==this.mOpts.isTodayValid?v=this.mOpts.theme+"_"+this.mOpts.isToday:(v=this.mOpts.theme+"_"+this.mOpts.disableGray,
O="2"):v="",!this.mOpts.weekendDis||6!=g.getDay()&&0!=g.getDay()||(v=this.mOpts.theme+"_"+this.mOpts.disableGray,
O="3"),this.mOpts.disCertainDay&&this.mOpts.disCertainDay.length>0)for(var y in this.mOpts.disCertainDay)isNaN(this.mOpts.disCertainDay[y])||g.getDay()!==this.mOpts.disCertainDay[y]||(v=this.mOpts.theme+"_"+this.mOpts.disableGray,
O="4");
if(this.mOpts.disCertainDate&&this.mOpts.disCertainDate.length>0){
var f=!1;
for(var y in this.mOpts.disCertainDate)if(!isNaN(this.mOpts.disCertainDate[y])||isNaN(parseInt(this.mOpts.disCertainDate[y])))if(this.mOpts.disCertainDate[0]===!0){
if(f=!(g.getDate()===this.mOpts.disCertainDate[y]),!f)break;
}else if(f=!(g.getDate()!==this.mOpts.disCertainDate[y]))break;
f&&(v=this.mOpts.theme+"_"+this.mOpts.disableGray,O="4");
}
}
0==g.getDay()&&(tr=document.createElement("tr")),td=document.createElement("td"),
td.innerHTML=g.getDate(),""!=v&&$(td).attr("class",v),0==O&&(u=g.getFullYear()+"-"+(g.getMonth()+1)+"-"+g.getDate(),
$(td).attr("id",s.calendarId+"_"+u),$(td).css("cursor","pointer"),function(t){
$(td).bind("click",t,function(){
return s.mOpts.beforeSelect.call(s,t)===!1?!1:(s.selectDate(t),!1);
});
}(u)),$(tr).append(td),6==g.getDay()&&$(D).append(tr);
}
return D;
},i.prototype.str2date=function(t){
var e=t.split("-");
return new Date(e[0],e[1]-1,e[2]);
},i.prototype.compareStrDate=function(t,e){
var a=this.str2date(t),s=this.str2date(e);
return a.getTime()>s.getTime()?1:a.getTime()==s.getTime()?0:-1;
},i.prototype.date2ymd=function(t){
return[t.getFullYear(),t.getMonth()+1,t.getDate()];
},i.prototype.changeInput=function(t){
1==this.mOpts.isSingleDay&&(t=this.startDateId);
var e=[this.startDateId,this.startCompareDateId,this.endDateId,this.endCompareDateId],a="";
a=t==this.startDateId||t==this.endDateId?this.mOpts.theme+"_"+this.mOpts.selectCss:this.mOpts.theme+"_"+this.mOpts.compareCss,
t==this.endDateId&&this.mOpts.singleCompare&&(a=this.mOpts.theme+"_"+this.mOpts.compareCss);
for(var s in e)e.hasOwnProperty(s)&&($("#"+e[s]).removeClass(this.mOpts.theme+"_"+this.mOpts.selectCss),
$("#"+e[s]).removeClass(this.mOpts.theme+"_"+this.mOpts.compareCss));
$("#"+t).addClass(a),$("#"+t).css("background-repeat","repeat"),this.dateInput=t;
},i.prototype.formatDate=function(t){
return t.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g,function(t,e,a,s){
return 10>a&&(a="0"+a),10>s&&(s="0"+s),e+"-"+a+"-"+s;
});
},i.prototype.setDate=function(t){
return t=$.extend({},this.initOpt||{},t),s(t);
};
});define("common/lib/datepicker.js", [ "widget/datepicker.css" ], function(e, t, n) {
try {
var r = +(new Date);
e("widget/datepicker.css"), function(e, t) {
function n(t, n) {
var i, s, o, u = t.nodeName.toLowerCase();
return "area" === u ? (i = t.parentNode, s = i.name, !t.href || !s || i.nodeName.toLowerCase() !== "map" ? !1 : (o = e("img[usemap=#" + s + "]")[0], !!o && r(o))) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && r(t);
}
function r(t) {
return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
return e.css(this, "visibility") === "hidden";
}).length;
}
var i = 0, s = /^ui-id-\d+$/;
e.ui = e.ui || {}, e.extend(e.ui, {
version: "1.10.3",
keyCode: {
BACKSPACE: 8,
COMMA: 188,
DELETE: 46,
DOWN: 40,
END: 35,
ENTER: 13,
ESCAPE: 27,
HOME: 36,
LEFT: 37,
NUMPAD_ADD: 107,
NUMPAD_DECIMAL: 110,
NUMPAD_DIVIDE: 111,
NUMPAD_ENTER: 108,
NUMPAD_MULTIPLY: 106,
NUMPAD_SUBTRACT: 109,
PAGE_DOWN: 34,
PAGE_UP: 33,
PERIOD: 190,
RIGHT: 39,
SPACE: 32,
TAB: 9,
UP: 38
}
}), e.fn.extend({
focus: function(t) {
return function(n, r) {
return typeof n == "number" ? this.each(function() {
var t = this;
setTimeout(function() {
e(t).focus(), r && r.call(t);
}, n);
}) : t.apply(this, arguments);
};
}(e.fn.focus),
scrollParent: function() {
var t;
return e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function() {
return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
}).eq(0) : t = this.parents().filter(function() {
return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
}).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t;
},
zIndex: function(n) {
if (n !== t) return this.css("zIndex", n);
if (this.length) {
var r = e(this[0]), i, s;
while (r.length && r[0] !== document) {
i = r.css("position");
if (i === "absolute" || i === "relative" || i === "fixed") {
s = parseInt(r.css("zIndex"), 10);
if (!isNaN(s) && s !== 0) return s;
}
r = r.parent();
}
}
return 0;
},
uniqueId: function() {
return this.each(function() {
this.id || (this.id = "ui-id-" + ++i);
});
},
removeUniqueId: function() {
return this.each(function() {
s.test(this.id) && e(this).removeAttr("id");
});
}
}), e.extend(e.expr[":"], {
data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
return function(n) {
return !!e.data(n, t);
};
}) : function(t, n, r) {
return !!e.data(t, r[3]);
},
focusable: function(t) {
return n(t, !isNaN(e.attr(t, "tabindex")));
},
tabbable: function(t) {
var r = e.attr(t, "tabindex"), i = isNaN(r);
return (i || r >= 0) && n(t, !i);
}
}), e("<a>").outerWidth(1).jquery || e.each([ "Width", "Height" ], function(n, r) {
function i(t, n, r, i) {
return e.each(s, function() {
n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), i && (n -= parseFloat(e.css(t, "margin" + this)) || 0);
}), n;
}
var s = r === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ], o = r.toLowerCase(), u = {
innerWidth: e.fn.innerWidth,
innerHeight: e.fn.innerHeight,
outerWidth: e.fn.outerWidth,
outerHeight: e.fn.outerHeight
};
e.fn["inner" + r] = function(n) {
return n === t ? u["inner" + r].call(this) : this.each(function() {
e(this).css(o, i(this, n) + "px");
});
}, e.fn["outer" + r] = function(t, n) {
return typeof t != "number" ? u["outer" + r].call(this, t) : this.each(function() {
e(this).css(o, i(this, t, !0, n) + "px");
});
};
}), e.fn.addBack || (e.fn.addBack = function(e) {
return this.add(e == null ? this.prevObject : this.prevObject.filter(e));
}), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
return function(n) {
return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this);
};
}(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({
disableSelection: function() {
return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
e.preventDefault();
});
},
enableSelection: function() {
return this.unbind(".ui-disableSelection");
}
}), e.extend(e.ui, {
plugin: {
add: function(t, n, r) {
var i, s = e.ui[t].prototype;
for (i in r) s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([ n, r[i] ]);
},
call: function(e, t, n) {
var r, i = e.plugins[t];
if (!i || !e.element[0].parentNode || e.element[0].parentNode.nodeType === 11) return;
for (r = 0; r < i.length; r++) e.options[i[r][0]] && i[r][1].apply(e.element, n);
}
},
hasScroll: function(t, n) {
if (e(t).css("overflow") === "hidden") return !1;
var r = n && n === "left" ? "scrollLeft" : "scrollTop", i = !1;
return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i);
}
});
}(jQuery), function(e, t) {
function n() {
this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
closeText: "Done",
prevText: "Prev",
nextText: "Next",
currentText: "Today",
monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
weekHeader: "Wk",
dateFormat: "mm/dd/yy",
firstDay: 0,
isRTL: !1,
showMonthAfterYear: !1,
yearSuffix: ""
}, this._defaults = {
showOn: "focus",
showAnim: "fadeIn",
showOptions: {},
defaultDate: null,
appendText: "",
buttonText: "...",
buttonImage: "",
buttonImageOnly: !1,
hideIfNoPrevNext: !1,
navigationAsDateFormat: !1,
gotoCurrent: !1,
changeMonth: !1,
changeYear: !1,
yearRange: "c-10:c+10",
showOtherMonths: !1,
selectOtherMonths: !1,
showWeek: !1,
calculateWeek: this.iso8601Week,
shortYearCutoff: "+10",
minDate: null,
maxDate: null,
duration: "fast",
beforeShowDay: null,
beforeShow: null,
onSelect: null,
onChangeMonthYear: null,
onClose: null,
numberOfMonths: 1,
showCurrentAtPos: 0,
stepMonths: 1,
stepBigMonths: 12,
altField: "",
altFormat: "",
constrainInput: !0,
showButtonPanel: !1,
autoSize: !1,
disabled: !1
}, e.extend(this._defaults, this.regional[""]), this.dpDiv = r(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
}
function r(t) {
var n = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
return t.delegate(n, "mouseout", function() {
e(this).removeClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && e(this).removeClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && e(this).removeClass("ui-datepicker-next-hover");
}).delegate(n, "mouseover", function() {
e.datepicker._isDisabledDatepicker(o.inline ? t.parent()[0] : o.input[0]) || (e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), e(this).addClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && e(this).addClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && e(this).addClass("ui-datepicker-next-hover"));
});
}
function i(t, n) {
e.extend(t, n);
for (var r in n) n[r] == null && (t[r] = n[r]);
return t;
}
e.extend(e.ui, {
datepicker: {
version: "1.10.3"
}
});
var s = "datepicker", o;
e.extend(n.prototype, {
markerClassName: "hasDatepicker",
maxRows: 4,
_widgetDatepicker: function() {
return this.dpDiv;
},
setDefaults: function(e) {
return i(this._defaults, e || {}), this;
},
_attachDatepicker: function(t, n) {
var r, i, s;
r = t.nodeName.toLowerCase(), i = r === "div" || r === "span", t.id || (this.uuid += 1, t.id = "dp" + this.uuid), s = this._newInst(e(t), i), s.settings = e.extend({}, n || {}), r === "input" ? this._connectDatepicker(t, s) : i && this._inlineDatepicker(t, s);
},
_newInst: function(t, n) {
var i = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
return {
id: i,
input: t,
selectedDay: 0,
selectedMonth: 0,
selectedYear: 0,
drawMonth: 0,
drawYear: 0,
inline: n,
dpDiv: n ? r(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
};
},
_connectDatepicker: function(t, n) {
var r = e(t);
n.append = e([]), n.trigger = e([]);
if (r.hasClass(this.markerClassName)) return;
this._attachments(r, n), r.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(n), e.data(t, s, n), n.settings.disabled && this._disableDatepicker(t);
},
_attachments: function(t, n) {
var r, i, s, o = this._get(n, "appendText"), u = this._get(n, "isRTL");
n.append && n.append.remove(), o && (n.append = e("<span class='" + this._appendClass + "'>" + o + "</span>"), t[u ? "before" : "after"](n.append)), t.unbind("focus", this._showDatepicker), n.trigger && n.trigger.remove(), r = this._get(n, "showOn"), (r === "focus" || r === "both") && t.focus(this._showDatepicker);
if (r === "button" || r === "both") i = this._get(n, "buttonText"), s = this._get(n, "buttonImage"), n.trigger = e(this._get(n, "buttonImageOnly") ? e("<img/>").addClass(this._triggerClass).attr({
src: s,
alt: i,
title: i
}) : e("<button type='button'></button>").addClass(this._triggerClass).html(s ? e("<img/>").attr({
src: s,
alt: i,
title: i
}) : i)), t[u ? "before" : "after"](n.trigger), n.trigger.click(function() {
return e.datepicker._datepickerShowing && e.datepicker._lastInput === t[0] ? e.datepicker._hideDatepicker() : e.datepicker._datepickerShowing && e.datepicker._lastInput !== t[0] ? (e.datepicker._hideDatepicker(), e.datepicker._showDatepicker(t[0])) : e.datepicker._showDatepicker(t[0]), !1;
});
},
_autoSize: function(e) {
if (this._get(e, "autoSize") && !e.inline) {
var t, n, r, i, s = new Date(2009, 11, 20), o = this._get(e, "dateFormat");
o.match(/[DM]/) && (t = function(e) {
n = 0, r = 0;
for (i = 0; i < e.length; i++) e[i].length > n && (n = e[i].length, r = i);
return r;
}, s.setMonth(t(this._get(e, o.match(/MM/) ? "monthNames" : "monthNamesShort"))), s.setDate(t(this._get(e, o.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - s.getDay())), e.input.attr("size", this._formatDate(e, s).length);
}
},
_inlineDatepicker: function(t, n) {
var r = e(t);
if (r.hasClass(this.markerClassName)) return;
r.addClass(this.markerClassName).append(n.dpDiv), e.data(t, s, n), this._setDate(n, this._getDefaultDate(n), !0), this._updateDatepicker(n), this._updateAlternate(n), n.settings.disabled && this._disableDatepicker(t), n.dpDiv.css("display", "block");
},
_dialogDatepicker: function(t, n, r, o, u) {
var a, f, l, c, h, p = this._dialogInst;
return p || (this.uuid += 1, a = "dp" + this.uuid, this._dialogInput = e("<input type='text' id='" + a + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), e("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, e.data(this._dialogInput[0], s, p)), i(p.settings, o || {}), n = n && n.constructor === Date ? this._formatDate(p, n) : n, this._dialogInput.val(n), this._pos = u ? u.length ? u : [ u.pageX, u.pageY ] : null, this._pos || (f = document.documentElement.clientWidth, l = document.documentElement.clientHeight, c = document.documentElement.scrollLeft || document.body.scrollLeft, h = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [ f / 2 - 100 + c, l / 2 - 150 + h ]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = r, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), e.blockUI && e.blockUI(this.dpDiv), e.data(this._dialogInput[0], s, p), this;
},
_destroyDatepicker: function(t) {
var n, r = e(t), i = e.data(t, s);
if (!r.hasClass(this.markerClassName)) return;
n = t.nodeName.toLowerCase(), e.removeData(t, s), n === "input" ? (i.append.remove(), i.trigger.remove(), r.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (n === "div" || n === "span") && r.removeClass(this.markerClassName).empty();
},
_enableDatepicker: function(t) {
var n, r, i = e(t), o = e.data(t, s);
if (!i.hasClass(this.markerClassName)) return;
n = t.nodeName.toLowerCase();
if (n === "input") t.disabled = !1, o.trigger.filter("button").each(function() {
this.disabled = !1;
}).end().filter("img").css({
opacity: "1.0",
cursor: ""
}); else if (n === "div" || n === "span") r = i.children("." + this._inlineClass), r.children().removeClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1);
this._disabledInputs = e.map(this._disabledInputs, function(e) {
return e === t ? null : e;
});
},
_disableDatepicker: function(t) {
var n, r, i = e(t), o = e.data(t, s);
if (!i.hasClass(this.markerClassName)) return;
n = t.nodeName.toLowerCase();
if (n === "input") t.disabled = !0, o.trigger.filter("button").each(function() {
this.disabled = !0;
}).end().filter("img").css({
opacity: "0.5",
cursor: "default"
}); else if (n === "div" || n === "span") r = i.children("." + this._inlineClass), r.children().addClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0);
this._disabledInputs = e.map(this._disabledInputs, function(e) {
return e === t ? null : e;
}), this._disabledInputs[this._disabledInputs.length] = t;
},
_isDisabledDatepicker: function(e) {
if (!e) return !1;
for (var t = 0; t < this._disabledInputs.length; t++) if (this._disabledInputs[t] === e) return !0;
return !1;
},
_getInst: function(t) {
try {
return e.data(t, s);
} catch (n) {
throw "Missing instance data for this datepicker";
}
},
_optionDatepicker: function(n, r, s) {
var o, u, a, f, l = this._getInst(n);
if (arguments.length === 2 && typeof r == "string") return r === "defaults" ? e.extend({}, e.datepicker._defaults) : l ? r === "all" ? e.extend({}, l.settings) : this._get(l, r) : null;
o = r || {}, typeof r == "string" && (o = {}, o[r] = s), l && (this._curInst === l && this._hideDatepicker(), u = this._getDateDatepicker(n, !0), a = this._getMinMaxDate(l, "min"), f = this._getMinMaxDate(l, "max"), i(l.settings, o), a !== null && o.dateFormat !== t && o.minDate === t && (l.settings.minDate = this._formatDate(l, a)), f !== null && o.dateFormat !== t && o.maxDate === t && (l.settings.maxDate = this._formatDate(l, f)), "disabled" in o && (o.disabled ? this._disableDatepicker(n) : this._enableDatepicker(n)), this._attachments(e(n), l), this._autoSize(l), this._setDate(l, u), this._updateAlternate(l), this._updateDatepicker(l));
},
_changeDatepicker: function(e, t, n) {
this._optionDatepicker(e, t, n);
},
_refreshDatepicker: function(e) {
var t = this._getInst(e);
t && this._updateDatepicker(t);
},
_setDateDatepicker: function(e, t) {
var n = this._getInst(e);
n && (this._setDate(n, t), this._updateDatepicker(n), this._updateAlternate(n));
},
_getDateDatepicker: function(e, t) {
var n = this._getInst(e);
return n && !n.inline && this._setDateFromField(n, t), n ? this._getDate(n) : null;
},
_doKeyDown: function(t) {
var n, r, i, s = e.datepicker._getInst(t.target), o = !0, u = s.dpDiv.is(".ui-datepicker-rtl");
s._keyEvent = !0;
if (e.datepicker._datepickerShowing) switch (t.keyCode) {
case 9:
e.datepicker._hideDatepicker(), o = !1;
break;
case 13:
return i = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", s.dpDiv), i[0] && e.datepicker._selectDay(t.target, s.selectedMonth, s.selectedYear, i[0]), n = e.datepicker._get(s, "onSelect"), n ? (r = e.datepicker._formatDate(s), n.apply(s.input ? s.input[0] : null, [ r, s ])) : e.datepicker._hideDatepicker(), !1;
case 27:
e.datepicker._hideDatepicker();
break;
case 33:
e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(s, "stepBigMonths") : -e.datepicker._get(s, "stepMonths"), "M");
break;
case 34:
e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(s, "stepBigMonths") : +e.datepicker._get(s, "stepMonths"), "M");
break;
case 35:
(t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target), o = t.ctrlKey || t.metaKey;
break;
case 36:
(t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target), o = t.ctrlKey || t.metaKey;
break;
case 37:
(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, u ? 1 : -1, "D"), o = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(s, "stepBigMonths") : -e.datepicker._get(s, "stepMonths"), "M");
break;
case 38:
(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, -7, "D"), o = t.ctrlKey || t.metaKey;
break;
case 39:
(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, u ? -1 : 1, "D"), o = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(s, "stepBigMonths") : +e.datepicker._get(s, "stepMonths"), "M");
break;
case 40:
(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, 7, "D"), o = t.ctrlKey || t.metaKey;
break;
default:
o = !1;
} else t.keyCode === 36 && t.ctrlKey ? e.datepicker._showDatepicker(this) : o = !1;
o && (t.preventDefault(), t.stopPropagation());
},
_doKeyPress: function(t) {
var n, r, i = e.datepicker._getInst(t.target);
if (e.datepicker._get(i, "constrainInput")) return n = e.datepicker._possibleChars(e.datepicker._get(i, "dateFormat")), r = String.fromCharCode(t.charCode == null ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || r < " " || !n || n.indexOf(r) > -1;
},
_doKeyUp: function(t) {
var n, r = e.datepicker._getInst(t.target);
if (r.input.val() !== r.lastVal) try {
n = e.datepicker.parseDate(e.datepicker._get(r, "dateFormat"), r.input ? r.input.val() : null, e.datepicker._getFormatConfig(r)), n && (e.datepicker._setDateFromField(r), e.datepicker._updateAlternate(r), e.datepicker._updateDatepicker(r));
} catch (i) {}
return !0;
},
_showDatepicker: function(t) {
t = t.target || t, t.nodeName.toLowerCase() !== "input" && (t = e("input", t.parentNode)[0]);
if (e.datepicker._isDisabledDatepicker(t) || e.datepicker._lastInput === t) return;
var n, r, s, o, u, a, f;
n = e.datepicker._getInst(t), e.datepicker._curInst && e.datepicker._curInst !== n && (e.datepicker._curInst.dpDiv.stop(!0, !0), n && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])), r = e.datepicker._get(n, "beforeShow"), s = r ? r.apply(t, [ t, n ]) : {};
if (s === !1) return;
i(n.settings, s), n.lastVal = null, e.datepicker._lastInput = t, e.datepicker._setDateFromField(n), e.datepicker._inDialog && (t.value = ""), e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(t), e.datepicker._pos[1] += t.offsetHeight), o = !1, e(t).parents().each(function() {
return o |= e(this).css("position") === "fixed", !o;
}), u = {
left: e.datepicker._pos[0],
top: e.datepicker._pos[1]
}, e.datepicker._pos = null, n.dpDiv.empty(), n.dpDiv.css({
position: "absolute",
display: "block",
top: "-1000px"
}), e.datepicker._updateDatepicker(n), u = e.datepicker._checkOffset(n, u, o), n.dpDiv.css({
position: e.datepicker._inDialog && e.blockUI ? "static" : o ? "fixed" : "absolute",
display: "none",
left: u.left + "px",
top: u.top + "px"
}), n.inline || (a = e.datepicker._get(n, "showAnim"), f = e.datepicker._get(n, "duration"), n.dpDiv.zIndex(e(t).zIndex() + 1), e.datepicker._datepickerShowing = !0, e.effects && e.effects.effect[a] ? n.dpDiv.show(a, e.datepicker._get(n, "showOptions"), f) : n.dpDiv[a || "show"](a ? f : null), e.datepicker._shouldFocusInput(n) && n.input.focus(), e.datepicker._curInst = n);
},
_updateDatepicker: function(t) {
this.maxRows = 4, o = t, t.dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t), t.dpDiv.find("." + this._dayOverClass + " a").mouseover();
var n, r = this._getNumberOfMonths(t), i = r[1], s = 17;
t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), i > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + i).css("width", s * i + "em"), t.dpDiv[(r[0] !== 1 || r[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), t === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(t) && t.input.focus(), t.yearshtml && (n = t.yearshtml, setTimeout(function() {
n === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), n = t.yearshtml = null;
}, 0));
},
_shouldFocusInput: function(e) {
return e.input && e.input.is(":visible") && !e.input.is(":disabled") && !e.input.is(":focus");
},
_checkOffset: function(t, n, r) {
var i = t.dpDiv.outerWidth(), s = t.dpDiv.outerHeight(), o = t.input ? t.input.outerWidth() : 0, u = t.input ? t.input.outerHeight() : 0, a = document.documentElement.clientWidth + (r ? 0 : e(document).scrollLeft()), f = document.documentElement.clientHeight + (r ? 0 : e(document).scrollTop());
return n.left -= this._get(t, "isRTL") ? i - o : 0, n.left -= r && n.left === t.input.offset().left ? e(document).scrollLeft() : 0, n.top -= r && n.top === t.input.offset().top + u ? e(document).scrollTop() : 0, n.left -= Math.min(n.left, n.left + i > a && a > i ? Math.abs(n.left + i - a) : 0), n.top -= Math.min(n.top, n.top + s > f && f > s ? Math.abs(s + u) : 0), n;
},
_findPos: function(t) {
var n, r = this._getInst(t), i = this._get(r, "isRTL");
while (t && (t.type === "hidden" || t.nodeType !== 1 || e.expr.filters.hidden(t))) t = t[i ? "previousSibling" : "nextSibling"];
return n = e(t).offset(), [ n.left, n.top ];
},
_hideDatepicker: function(t) {
var n, r, i, o, u = this._curInst;
if (!u || t && u !== e.data(t, s)) return;
this._datepickerShowing && (n = this._get(u, "showAnim"), r = this._get(u, "duration"), i = function() {
e.datepicker._tidyDialog(u);
}, e.effects && (e.effects.effect[n] || e.effects[n]) ? u.dpDiv.hide(n, e.datepicker._get(u, "showOptions"), r, i) : u.dpDiv[n === "slideDown" ? "slideUp" : n === "fadeIn" ? "fadeOut" : "hide"](n ? r : null, i), n || i(), this._datepickerShowing = !1, o = this._get(u, "onClose"), o && o.apply(u.input ? u.input[0] : null, [ u.input ? u.input.val() : "", u ]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
position: "absolute",
left: "0",
top: "-100px"
}), e.blockUI && (e.unblockUI(), e("body").append(this.dpDiv))), this._inDialog = !1);
},
_tidyDialog: function(e) {
e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
},
_checkExternalClick: function(t) {
if (!e.datepicker._curInst) return;
var n = e(t.target), r = e.datepicker._getInst(n[0]);
(n[0].id !== e.datepicker._mainDivId && n.parents("#" + e.datepicker._mainDivId).length === 0 && !n.hasClass(e.datepicker.markerClassName) && !n.closest("." + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && (!e.datepicker._inDialog || !e.blockUI) || n.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== r) && e.datepicker._hideDatepicker();
},
_adjustDate: function(t, n, r) {
var i = e(t), s = this._getInst(i[0]);
if (this._isDisabledDatepicker(i[0])) return;
this._adjustInstDate(s, n + (r === "M" ? this._get(s, "showCurrentAtPos") : 0), r), this._updateDatepicker(s);
},
_gotoToday: function(t) {
var n, r = e(t), i = this._getInst(r[0]);
this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear) : (n = new Date, i.selectedDay = n.getDate(), i.drawMonth = i.selectedMonth = n.getMonth(), i.drawYear = i.selectedYear = n.getFullYear()), this._notifyChange(i), this._adjustDate(r);
},
_selectMonthYear: function(t, n, r) {
var i = e(t), s = this._getInst(i[0]);
s["selected" + (r === "M" ? "Month" : "Year")] = s["draw" + (r === "M" ? "Month" : "Year")] = parseInt(n.options[n.selectedIndex].value, 10), this._notifyChange(s), this._adjustDate(i);
},
_selectDay: function(t, n, r, i) {
var s, o = e(t);
if (e(i).hasClass(this._unselectableClass) || this._isDisabledDatepicker(o[0])) return;
s = this._getInst(o[0]), s.selectedDay = s.currentDay = e("a", i).html(), s.selectedMonth = s.currentMonth = n, s.selectedYear = s.currentYear = r, this._selectDate(t, this._formatDate(s, s.currentDay, s.currentMonth, s.currentYear));
},
_clearDate: function(t) {
var n = e(t);
this._selectDate(n, "");
},
_selectDate: function(t, n) {
var r, i = e(t), s = this._getInst(i[0]);
n = n != null ? n : this._formatDate(s), s.input && s.input.val(n), this._updateAlternate(s), r = this._get(s, "onSelect"), r ? r.apply(s.input ? s.input[0] : null, [ n, s ]) : s.input && s.input.trigger("change"), s.inline ? this._updateDatepicker(s) : (this._hideDatepicker(), this._lastInput = s.input[0], typeof s.input[0] != "object" && s.input.focus(), this._lastInput = null);
},
_updateAlternate: function(t) {
var n, r, i, s = this._get(t, "altField");
s && (n = this._get(t, "altFormat") || this._get(t, "dateFormat"), r = this._getDate(t), i = this.formatDate(n, r, this._getFormatConfig(t)), e(s).each(function() {
e(this).val(i);
}));
},
noWeekends: function(e) {
var t = e.getDay();
return [ t > 0 && t < 6, "" ];
},
iso8601Week: function(e) {
var t, n = new Date(e.getTime());
return n.setDate(n.getDate() + 4 - (n.getDay() || 7)), t = n.getTime(), n.setMonth(0), n.setDate(1), Math.floor(Math.round((t - n) / 864e5) / 7) + 1;
},
parseDate: function(t, n, r) {
if (t == null || n == null) throw "Invalid arguments";
n = typeof n == "object" ? n.toString() : n + "";
if (n === "") return null;
var i, s, o, u = 0, a = (r ? r.shortYearCutoff : null) || this._defaults.shortYearCutoff, f = typeof a != "string" ? a : (new Date).getFullYear() % 100 + parseInt(a, 10), l = (r ? r.dayNamesShort : null) || this._defaults.dayNamesShort, c = (r ? r.dayNames : null) || this._defaults.dayNames, h = (r ? r.monthNamesShort : null) || this._defaults.monthNamesShort, p = (r ? r.monthNames : null) || this._defaults.monthNames, d = -1, v = -1, m = -1, g = -1, y = !1, b, w = function(e) {
var n = i + 1 < t.length && t.charAt(i + 1) === e;
return n && i++, n;
}, E = function(e) {
var t = w(e), r = e === "@" ? 14 : e === "!" ? 20 : e === "y" && t ? 4 : e === "o" ? 3 : 2, i = new RegExp("^\\d{1," + r + "}"), s = n.substring(u).match(i);
if (!s) throw "Missing number at position " + u;
return u += s[0].length, parseInt(s[0], 10);
}, S = function(t, r, i) {
var s = -1, o = e.map(w(t) ? i : r, function(e, t) {
return [ [ t, e ] ];
}).sort(function(e, t) {
return -(e[1].length - t[1].length);
});
e.each(o, function(e, t) {
var r = t[1];
if (n.substr(u, r.length).toLowerCase() === r.toLowerCase()) return s = t[0], u += r.length, !1;
});
if (s !== -1) return s + 1;
throw "Unknown name at position " + u;
}, x = function() {
if (n.charAt(u) !== t.charAt(i)) throw "Unexpected literal at position " + u;
u++;
};
for (i = 0; i < t.length; i++) if (y) t.charAt(i) === "'" && !w("'") ? y = !1 : x(); else switch (t.charAt(i)) {
case "d":
m = E("d");
break;
case "D":
S("D", l, c);
break;
case "o":
g = E("o");
break;
case "m":
v = E("m");
break;
case "M":
v = S("M", h, p);
break;
case "y":
d = E("y");
break;
case "@":
b = new Date(E("@")), d = b.getFullYear(), v = b.getMonth() + 1, m = b.getDate();
break;
case "!":
b = new Date((E("!") - this._ticksTo1970) / 1e4), d = b.getFullYear(), v = b.getMonth() + 1, m = b.getDate();
break;
case "'":
w("'") ? x() : y = !0;
break;
default:
x();
}
if (u < n.length) {
o = n.substr(u);
if (!/^\s+/.test(o)) throw "Extra/unparsed characters found in date: " + o;
}
d === -1 ? d = (new Date).getFullYear() : d < 100 && (d += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (d <= f ? 0 : -100));
if (g > -1) {
v = 1, m = g;
do {
s = this._getDaysInMonth(d, v - 1);
if (m <= s) break;
v++, m -= s;
} while (!0);
}
b = this._daylightSavingAdjust(new Date(d, v - 1, m));
if (b.getFullYear() !== d || b.getMonth() + 1 !== v || b.getDate() !== m) throw "Invalid date";
return b;
},
ATOM: "yy-mm-dd",
COOKIE: "D, dd M yy",
ISO_8601: "yy-mm-dd",
RFC_822: "D, d M y",
RFC_850: "DD, dd-M-y",
RFC_1036: "D, d M y",
RFC_1123: "D, d M yy",
RFC_2822: "D, d M yy",
RSS: "D, d M y",
TICKS: "!",
TIMESTAMP: "@",
W3C: "yy-mm-dd",
_ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7,
formatDate: function(e, t, n) {
if (!t) return "";
var r, i = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort, s = (n ? n.dayNames : null) || this._defaults.dayNames, o = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort, u = (n ? n.monthNames : null) || this._defaults.monthNames, a = function(t) {
var n = r + 1 < e.length && e.charAt(r + 1) === t;
return n && r++, n;
}, f = function(e, t, n) {
var r = "" + t;
if (a(e)) while (r.length < n) r = "0" + r;
return r;
}, l = function(e, t, n, r) {
return a(e) ? r[t] : n[t];
}, c = "", h = !1;
if (t) for (r = 0; r < e.length; r++) if (h) e.charAt(r) === "'" && !a("'") ? h = !1 : c += e.charAt(r); else switch (e.charAt(r)) {
case "d":
c += f("d", t.getDate(), 2);
break;
case "D":
c += l("D", t.getDay(), i, s);
break;
case "o":
c += f("o", Math.round(((new Date(t.getFullYear(), t.getMonth(), t.getDate())).getTime() - (new Date(t.getFullYear(), 0, 0)).getTime()) / 864e5), 3);
break;
case "m":
c += f("m", t.getMonth() + 1, 2);
break;
case "M":
c += l("M", t.getMonth(), o, u);
break;
case "y":
c += a("y") ? t.getFullYear() : (t.getYear() % 100 < 10 ? "0" : "") + t.getYear() % 100;
break;
case "@":
c += t.getTime();
break;
case "!":
c += t.getTime() * 1e4 + this._ticksTo1970;
break;
case "'":
a("'") ? c += "'" : h = !0;
break;
default:
c += e.charAt(r);
}
return c;
},
_possibleChars: function(e) {
var t, n = "", r = !1, i = function(n) {
var r = t + 1 < e.length && e.charAt(t + 1) === n;
return r && t++, r;
};
for (t = 0; t < e.length; t++) if (r) e.charAt(t) === "'" && !i("'") ? r = !1 : n += e.charAt(t); else switch (e.charAt(t)) {
case "d":
case "m":
case "y":
case "@":
n += "0123456789";
break;
case "D":
case "M":
return null;
case "'":
i("'") ? n += "'" : r = !0;
break;
default:
n += e.charAt(t);
}
return n;
},
_get: function(e, n) {
return e.settings[n] !== t ? e.settings[n] : this._defaults[n];
},
_setDateFromField: function(e, t) {
if (e.input.val() === e.lastVal) return;
var n = this._get(e, "dateFormat"), r = e.lastVal = e.input ? e.input.val() : null, i = this._getDefaultDate(e), s = i, o = this._getFormatConfig(e);
try {
s = this.parseDate(n, r, o) || i;
} catch (u) {
r = t ? "" : r;
}
e.selectedDay = s.getDate(), e.drawMonth = e.selectedMonth = s.getMonth(), e.drawYear = e.selectedYear = s.getFullYear(), e.currentDay = r ? s.getDate() : 0, e.currentMonth = r ? s.getMonth() : 0, e.currentYear = r ? s.getFullYear() : 0, this._adjustInstDate(e);
},
_getDefaultDate: function(e) {
return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date));
},
_determineDate: function(t, n, r) {
var i = function(e) {
var t = new Date;
return t.setDate(t.getDate() + e), t;
}, s = function(n) {
try {
return e.datepicker.parseDate(e.datepicker._get(t, "dateFormat"), n, e.datepicker._getFormatConfig(t));
} catch (r) {}
var i = (n.toLowerCase().match(/^c/) ? e.datepicker._getDate(t) : null) || new Date, s = i.getFullYear(), o = i.getMonth(), u = i.getDate(), a = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, f = a.exec(n);
while (f) {
switch (f[2] || "d") {
case "d":
case "D":
u += parseInt(f[1], 10);
break;
case "w":
case "W":
u += parseInt(f[1], 10) * 7;
break;
case "m":
case "M":
o += parseInt(f[1], 10), u = Math.min(u, e.datepicker._getDaysInMonth(s, o));
break;
case "y":
case "Y":
s += parseInt(f[1], 10), u = Math.min(u, e.datepicker._getDaysInMonth(s, o));
}
f = a.exec(n);
}
return new Date(s, o, u);
}, o = n == null || n === "" ? r : typeof n == "string" ? s(n) : typeof n == "number" ? isNaN(n) ? r : i(n) : new Date(n.getTime());
return o = o && o.toString() === "Invalid Date" ? r : o, o && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)), this._daylightSavingAdjust(o);
},
_daylightSavingAdjust: function(e) {
return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null;
},
_setDate: function(e, t, n) {
var r = !t, i = e.selectedMonth, s = e.selectedYear, o = this._restrictMinMax(e, this._determineDate(e, t, new Date));
e.selectedDay = e.currentDay = o.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = o.getMonth(), e.drawYear = e.selectedYear = e.currentYear = o.getFullYear(), (i !== e.selectedMonth || s !== e.selectedYear) && !n && this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(r ? "" : this._formatDate(e));
},
_getDate: function(e) {
var t = !e.currentYear || e.input && e.input.val() === "" ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
return t;
},
_attachHandlers: function(t) {
var n = this._get(t, "stepMonths"), r = "#" + t.id.replace(/\\\\/g, "\\");
t.dpDiv.find("[data-handler]").map(function() {
var t = {
prev: function() {
e.datepicker._adjustDate(r, -n, "M");
},
next: function() {
e.datepicker._adjustDate(r, +n, "M");
},
hide: function() {
e.datepicker._hideDatepicker();
},
today: function() {
e.datepicker._gotoToday(r);
},
selectDay: function() {
return e.datepicker._selectDay(r, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1;
},
selectMonth: function() {
return e.datepicker._selectMonthYear(r, this, "M"), !1;
},
selectYear: function() {
return e.datepicker._selectMonthYear(r, this, "Y"), !1;
}
};
e(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")]);
});
},
_generateHTML: function(e) {
var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L, A, O, M, _, D, P, H, B, j, F, I, q = new Date, R = this._daylightSavingAdjust(new Date(q.getFullYear(), q.getMonth(), q.getDate())), U = this._get(e, "isRTL"), z = this._get(e, "showButtonPanel"), W = this._get(e, "hideIfNoPrevNext"), X = this._get(e, "navigationAsDateFormat"), V = this._getNumberOfMonths(e), $ = this._get(e, "showCurrentAtPos"), J = this._get(e, "stepMonths"), K = V[0] !== 1 || V[1] !== 1, Q = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)), G = this._getMinMaxDate(e, "min"), Y = this._getMinMaxDate(e, "max"), Z = e.drawMonth - $, et = e.drawYear;
Z < 0 && (Z += 12, et--);
if (Y) {
t = this._daylightSavingAdjust(new Date(Y.getFullYear(), Y.getMonth() - V[0] * V[1] + 1, Y.getDate())), t = G && t < G ? G : t;
while (this._daylightSavingAdjust(new Date(et, Z, 1)) > t) Z--, Z < 0 && (Z = 11, et--);
}
e.drawMonth = Z, e.drawYear = et, n = this._get(e, "prevText"), n = X ? this.formatDate(n, this._daylightSavingAdjust(new Date(et, Z - J, 1)), this._getFormatConfig(e)) : n, r = this._canAdjustMonth(e, -1, et, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (U ? "e" : "w") + "'>" + n + "</span></a>" : W ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (U ? "e" : "w") + "'>" + n + "</span></a>", i = this._get(e, "nextText"), i = X ? this.formatDate(i, this._daylightSavingAdjust(new Date(et, Z + J, 1)), this._getFormatConfig(e)) : i, s = this._canAdjustMonth(e, 1, et, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (U ? "w" : "e") + "'>" + i + "</span></a>" : W ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (U ? "w" : "e") + "'>" + i + "</span></a>", o = this._get(e, "currentText"), u = this._get(e, "gotoCurrent") && e.currentDay ? Q : R, o = X ? this.formatDate(o, u, this._getFormatConfig(e)) : o, a = e.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(e, "closeText") + "</button>", f = z ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (U ? a : "") + (this._isInRange(e, u) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + o + "</button>" : "") + (U ? "" : a) + "</div>" : "", l = parseInt(this._get(e, "firstDay"), 10), l = isNaN(l) ? 0 : l, c = this._get(e, "showWeek"), h = this._get(e, "dayNames"), p = this._get(e, "dayNamesMin"), d = this._get(e, "monthNames"), v = this._get(e, "monthNamesShort"), m = this._get(e, "beforeShowDay"), g = this._get(e, "showOtherMonths"), y = this._get(e, "selectOtherMonths"), b = this._getDefaultDate(e), w = "", E;
for (S = 0; S < V[0]; S++) {
x = "", this.maxRows = 4;
for (T = 0; T < V[1]; T++) {
N = this._daylightSavingAdjust(new Date(et, Z, e.selectedDay)), C = " ui-corner-all", k = "";
if (K) {
k += "<div class='ui-datepicker-group";
if (V[1] > 1) switch (T) {
case 0:
k += " ui-datepicker-group-first", C = " ui-corner-" + (U ? "right" : "left");
break;
case V[1] - 1:
k += " ui-datepicker-group-last", C = " ui-corner-" + (U ? "left" : "right");
break;
default:
k += " ui-datepicker-group-middle", C = "";
}
k += "'>";
}
k += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + C + "'>" + (/all|left/.test(C) && S === 0 ? U ? s : r : "") + (/all|right/.test(C) && S === 0 ? U ? r : s : "") + this._generateMonthYearHeader(e, Z, et, G, Y, S > 0 || T > 0, d, v) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", L = c ? "<th class='ui-datepicker-week-col'>" + this._get(e, "weekHeader") + "</th>" : "";
for (E = 0; E < 7; E++) A = (E + l) % 7, L += "<th" + ((E + l + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + h[A] + "'>" + p[A] + "</span></th>";
k += L + "</tr></thead><tbody>", O = this._getDaysInMonth(et, Z), et === e.selectedYear && Z === e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, O)), M = (this._getFirstDayOfMonth(et, Z) - l + 7) % 7, _ = Math.ceil((M + O) / 7), D = K ? this.maxRows > _ ? this.maxRows : _ : _, this.maxRows = D, P = this._daylightSavingAdjust(new Date(et, Z, 1 - M));
for (H = 0; H < D; H++) {
k += "<tr>", B = c ? "<td class='ui-datepicker-week-col'>" + this._get(e, "calculateWeek")(P) + "</td>" : "";
for (E = 0; E < 7; E++) j = m ? m.apply(e.input ? e.input[0] : null, [ P ]) : [ !0, "" ], F = P.getMonth() !== Z, I = F && !y || !j[0] || G && P < G || Y && P > Y, B += "<td class='" + ((E + l + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (P.getTime() === N.getTime() && Z === e.selectedMonth && e._keyEvent || b.getTime() === P.getTime() && b.getTime() === N.getTime() ? " " + this._dayOverClass : "") + (I ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !g ? "" : " " + j[1] + (P.getTime() === Q.getTime() ? " " + this._currentClass : "") + (P.getTime() === R.getTime() ? " ui-datepicker-today" : "")) + "'" + ((!F || g) && j[2] ? " title='" + j[2].replace(/'/g, "&#39;") + "'" : "") + (I ? "" : " data-handler='selectDay' data-event='click' data-month='" + P.getMonth() + "' data-year='" + P.getFullYear() + "'") + ">" + (F && !g ? "&#xa0;" : I ? "<span class='ui-state-default'>" + P.getDate() + "</span>" : "<a class='ui-state-default" + (P.getTime() === R.getTime() ? " ui-state-highlight" : "") + (P.getTime() === Q.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + "' href='#'>" + P.getDate() + "</a>") + "</td>", P.setDate(P.getDate() + 1), P = this._daylightSavingAdjust(P);
k += B + "</tr>";
}
Z++, Z > 11 && (Z = 0, et++), k += "</tbody></table>" + (K ? "</div>" + (V[0] > 0 && T === V[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += k;
}
w += x;
}
return w += f, e._keyEvent = !1, w;
},
_generateMonthYearHeader: function(e, t, n, r, i, s, o, u) {
var a, f, l, c, h, p, d, v, m = this._get(e, "changeMonth"), g = this._get(e, "changeYear"), y = this._get(e, "showMonthAfterYear"), b = "<div class='ui-datepicker-title'>", w = "";
if (s || !m) w += "<span class='ui-datepicker-month'>" + o[t] + "</span>"; else {
a = r && r.getFullYear() === n, f = i && i.getFullYear() === n, w += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
for (l = 0; l < 12; l++) (!a || l >= r.getMonth()) && (!f || l <= i.getMonth()) && (w += "<option value='" + l + "'" + (l === t ? " selected='selected'" : "") + ">" + u[l] + "</option>");
w += "</select>";
}
y || (b += w + (s || !m || !g ? "&#xa0;" : ""));
if (!e.yearshtml) {
e.yearshtml = "";
if (s || !g) b += "<span class='ui-datepicker-year'>" + n + "</span>"; else {
c = this._get(e, "yearRange").split(":"), h = (new Date).getFullYear(), p = function(e) {
var t = e.match(/c[+\-].*/) ? n + parseInt(e.substring(1), 10) : e.match(/[+\-].*/) ? h + parseInt(e, 10) : parseInt(e, 10);
return isNaN(t) ? h : t;
}, d = p(c[0]), v = Math.max(d, p(c[1] || "")), d = r ? Math.max(d, r.getFullYear()) : d, v = i ? Math.min(v, i.getFullYear()) : v, e.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
for (; d <= v; d++) e.yearshtml += "<option value='" + d + "'" + (d === n ? " selected='selected'" : "") + ">" + d + "</option>";
e.yearshtml += "</select>", b += e.yearshtml, e.yearshtml = null;
}
}
return b += this._get(e, "yearSuffix"), y && (b += (s || !m || !g ? "&#xa0;" : "") + w), b += "</div>", b;
},
_adjustInstDate: function(e, t, n) {
var r = e.drawYear + (n === "Y" ? t : 0), i = e.drawMonth + (n === "M" ? t : 0), s = Math.min(e.selectedDay, this._getDaysInMonth(r, i)) + (n === "D" ? t : 0), o = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(r, i, s)));
e.selectedDay = o.getDate(), e.drawMonth = e.selectedMonth = o.getMonth(), e.drawYear = e.selectedYear = o.getFullYear(), (n === "M" || n === "Y") && this._notifyChange(e);
},
_restrictMinMax: function(e, t) {
var n = this._getMinMaxDate(e, "min"), r = this._getMinMaxDate(e, "max"), i = n && t < n ? n : t;
return r && i > r ? r : i;
},
_notifyChange: function(e) {
var t = this._get(e, "onChangeMonthYear");
t && t.apply(e.input ? e.input[0] : null, [ e.selectedYear, e.selectedMonth + 1, e ]);
},
_getNumberOfMonths: function(e) {
var t = this._get(e, "numberOfMonths");
return t == null ? [ 1, 1 ] : typeof t == "number" ? [ 1, t ] : t;
},
_getMinMaxDate: function(e, t) {
return this._determineDate(e, this._get(e, t + "Date"), null);
},
_getDaysInMonth: function(e, t) {
return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate();
},
_getFirstDayOfMonth: function(e, t) {
return (new Date(e, t, 1)).getDay();
},
_canAdjustMonth: function(e, t, n, r) {
var i = this._getNumberOfMonths(e), s = this._daylightSavingAdjust(new Date(n, r + (t < 0 ? t : i[0] * i[1]), 1));
return t < 0 && s.setDate(this._getDaysInMonth(s.getFullYear(), s.getMonth())), this._isInRange(e, s);
},
_isInRange: function(e, t) {
var n, r, i = this._getMinMaxDate(e, "min"), s = this._getMinMaxDate(e, "max"), o = null, u = null, a = this._get(e, "yearRange");
return a && (n = a.split(":"), r = (new Date).getFullYear(), o = parseInt(n[0], 10), u = parseInt(n[1], 10), n[0].match(/[+\-].*/) && (o += r), n[1].match(/[+\-].*/) && (u += r)), (!i || t.getTime() >= i.getTime()) && (!s || t.getTime() <= s.getTime()) && (!o || t.getFullYear() >= o) && (!u || t.getFullYear() <= u);
},
_getFormatConfig: function(e) {
var t = this._get(e, "shortYearCutoff");
return t = typeof t != "string" ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
shortYearCutoff: t,
dayNamesShort: this._get(e, "dayNamesShort"),
dayNames: this._get(e, "dayNames"),
monthNamesShort: this._get(e, "monthNamesShort"),
monthNames: this._get(e, "monthNames")
};
},
_formatDate: function(e, t, n, r) {
t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
var i = t ? typeof t == "object" ? t : this._daylightSavingAdjust(new Date(r, n, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
return this.formatDate(this._get(e, "dateFormat"), i, this._getFormatConfig(e));
}
}), e.fn.datepicker = function(t) {
if (!this.length) return this;
e.datepicker.initialized || (e(document).mousedown(e.datepicker._checkExternalClick), e.datepicker.initialized = !0), e("#" + e.datepicker._mainDivId).length === 0 && e("body").append(e.datepicker.dpDiv);
var n = Array.prototype.slice.call(arguments, 1);
return typeof t != "string" || t !== "isDisabled" && t !== "getDate" && t !== "widget" ? t === "option" && arguments.length === 2 && typeof arguments[1] == "string" ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [ this[0] ].concat(n)) : this.each(function() {
typeof t == "string" ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [ this ].concat(n)) : e.datepicker._attachDatepicker(this, t);
}) : e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [ this[0] ].concat(n));
}, e.datepicker = new n, e.datepicker.initialized = !1, e.datepicker.uuid = (new Date).getTime(), e.datepicker.version = "1.10.3", e.datepicker.regional.zh_CN = {
closeText: "关闭",
prevText: "&#x3C;上月",
nextText: "下月&#x3E;",
currentText: "今天",
monthNames: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
monthNamesShort: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
dayNames: [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ],
dayNamesShort: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
dayNamesMin: [ "日", "一", "二", "三", "四", "五", "六" ],
weekHeader: "周",
dateFormat: "yy-mm-dd",
firstDay: 1,
isRTL: !1,
showMonthAfterYear: !0,
yearSuffix: "年"
}, e.datepicker.setDefaults(e.datepicker.regional.zh_CN);
}(jQuery);
} catch (i) {
wx.jslog({
src: "common/lib/datepicker.js"
}, i);
}
});define("tpl/vote/vote_item.html.js",[],function(){
return'<div class="frm_control_group vote_op_third">\n	<div class="frm_label">选项{itemSize}</div>\n	<div class="frm_controls">\n		<span class="frm_input_box with_counter counter_in append"><input type="text" placeholder="" class="frm_input" name="optionss"><em class="frm_input_append frm_counter">43/43</em></span>\n		<span class="btn btn_input btn_default">\n			<button>上传图片</button>\n		</span>\n		<a href="javascript:;" class="js_delete_item" data-tag="{index}" data-item="{itemSize}">删除选项</a>\n	</div>\n</div>';
});define("tpl/vote/vote_question.html.js",[],function(){
return'<form id="question_{index}" class="vote_form">\n	<div class="vote_meta_title group">\n		<div class="vote_meta_title_opr">\n			<a href="javascript:;" class="js_question_edit" data-tag="{index}">收起</a>\n			{if index > 0}\n			<a href="javascript:;" class="js_question_delete" data-tag="{index}">删除</a>\n			{/if}\n		</div>\n		<span class="vote_warn" style="display:none">问题填写完整才能添加下一个问题</span>\n		<span class="vote_num">问题{size}</span>\n		<span class="vote_question js_vote_question"></span>\n	</div>\n	<div class="vote_meta js_item_container vote_meta_content" style="display:{if show == false}none{/if}">\n		<div class="vote_meta_detail">\n			<div class="frm_control_group">\n				<label for="" class="frm_label">标题</label>\n				<div class="frm_controls">\n					<span class="frm_input_box with_counter counter_in append vote_title js_question_title">\n						<input autofocus="" type="text" placeholder="" class="frm_input js_option_input" name="question_title" value="{title}"><em class="frm_input_append frm_counter">0/35</em>\n					</span>\n					<span class="frm_tips"></span>\n				</div>\n			</div>\n		</div>\n		<div class="vote_meta_detail js_vote_type vote_meta_radio">\n			<div class="frm_control_group">\n				<div class="frm_controls vote_meta_radio">\n					<label class="vote_radio_label selected">\n						<i class="icon_radio"></i>\n						<span type="label_content">单选</span>\n						<input name="isMlt" type="radio" value="1" class="vote_radio" {if type == 1}checked{/if}>\n					</label>\n					<label class="vote_radio_label">\n						<i class="icon_radio"></i>\n						<span type="label_content">多选</span>\n						<input name="isMlt" type="radio" value="2" class="vote_radio" {if type == 2}checked{/if}>\n					</label>\n				</div>\n			</div>	\n		</div>\n		{each options as item ids}\n		<div class="vote_meta_detail js_vote_option">\n			<div class="frm_control_group">\n				<div class="frm_label">选项{formartNum ids+1}</div>\n				<div class="frm_controls">\n					<span class="frm_input_box with_counter counter_in append">\n						<input type="text" placeholder="" class="frm_input js_option_input" name="option{ids}" value="{item.name}"><em class="frm_input_append frm_counter">0/35</em>\n					</span>\n					<!-- <span class="frm_num warning">0/35</span> -->\n					<!-- <span class="btn btn_input btn_default">\n						<a href="javascript:;" id="123">上传图片</a>\n					</span> -->\n					<div class="upload_area">\n						{if item.url}\n						<a class="btn btn_upload js_vote_upload_btn" id="js_upload_{index}_{ids}">重新上传</a>\n						{else}\n						<a class="btn btn_upload js_vote_upload_btn" id="js_upload_{index}_{ids}">上传图片</a>\n						{/if}\n					</div>\n					\n					{if ids >=2 }\n					<a href="javascript:;" class="link_delete js_delete_item" data-tag="{index}" data-item="{ids}">删除选项</a>\n					{/if}\n					<span class="frm_tips"></span>\n				</div>\n\n				<div class="img_container" id="js_upload_{index}_{ids}" style="display:{if item.url}\'\'{else}none{/if}">\n					<span class="img_panel"><img class="preview" src="{item.url}"/></span>\n					<a href="javascript:;" class="link_dele" id="js_delete_{index}_{ids}">删除</a>\n				</div>\n			</div>\n		</div>\n		{/each}\n		<div class="vote_meta_detail tips_wrp">\n			<p id="voteAdd" class="tips_global option_tips">\n				<a href="javascript:;" class="js_add_item" data-tag="{index}">添加选项</a>\n			</p>\n			<!--<p id="voteFull" class="tips_global option_tips">选项已满，不可继续添加</p>-->\n		</div>\n	</div>\n</form>	';
});define("tpl/vote/vote.html.js",[],function(){
return'<div class="tc_dialog_content vote_container">\n    <form id="voteForm">\n		<div class="vote_meta">\n	        <div class="vote_meta_detail">\n				<div class="frm_control_group">\n					<label for="" class="frm_label">投票名称</label>\n					<div class="frm_controls">\n						<span class="frm_input_box with_counter counter_in append vote_title"><input autofocus="" type="text" placeholder="" class="frm_input" name="vote_title" id=""><em class="frm_input_append frm_counter">0/35</em></span>\n						<p class="frm_tips">投票名称只用于管理，不显示在下发的投票内容中</p>\n					</div>\n				</div>\n	        </div>\n	    </div>\n	\n		<div class="vote_meta time_setting">\n	        <div class="vote_meta_detail">\n				<div class="frm_control_group">\n					<label for="" class="frm_label">截止时间</label>\n					<div class="frm_controls">\n						<div class="date_select timepicker">\n							<div class="datepicker_area">\n								<span class="btn datepicker_switch">\n									<input type="text" class="frm_input" style="ime-mode:disabled" onpaste="return false" id="jsVoteDate">\n									<i class="icon_datepicker"></i>\n								</span>\n							</div>\n							<!-- <div id="js_begin_time_container"><div class="ta_date">\n								<span class="date_title" id=""></span>\n								<a class="opt_sel" id="" href="#">\n									<i class="i_orderd"></i>\n								</a>\n							</div></div> -->\n							<div class="dropdown_menu time" id="jsVoteHour"></div>\n							<span class="date_select_gap">时</span>\n\n							<div class="dropdown_menu time" id="jsVoteMin"></div>\n							<span class="date_select_gap">分</span>\n						</div>\n					</div>\n				</div>\n	        </div>\n	    </div>\n		<div class="vote_meta js_vote_auth">\n	        <div class="vote_meta_detail">\n				<div class="frm_control_group">\n					<label for="" class="frm_label frm_label_top">投票权限</label>\n					<div class="frm_controls">\n						<label class="vote_radio_label selected">\n							<i class="icon_radio"></i>\n							<span type="label_content">所有人都可参与</span>\n							<input name="permission" type="radio" value="1" class="vote_radio" checked>\n						</label>\n						<label class="vote_radio_label">\n							<i class="icon_radio"></i>\n							<span type="label_content">仅关注我的人可参与</span>\n							<input name="permission" type="radio" value="2" class="vote_radio">\n						</label>\n					</div>\n				</div>\n	        </div>\n	    </div>\n		 <p class="frm_tips frm_tips_btm">上传图片的最佳尺寸：300像素*300像素，其他尺寸会影响页面效果，格式png，jpeg，jpg，gif。大小不超过1M  </p>\n	</form>		\n	   \n	<div class="">\n		<div class="vote_meta_container js_question_container">\n			\n		</div>\n		<div class="vote_container_dec">\n			<a class="btn btn_default btn_add btn_vote_add" href="javascript:;" id="js_add_question"><i class="icon14_common add_gray"></i>添加问题</a>\n			<p id="js_error" style="display:none;" class="frm_tips">问题填写完整才能添加下一个问题</p>\n			<!--<div id="js_error" style="display:none;" class="bubble_tips bubble_left warn">\n				<div class="bubble_tips_inner">\n					<p>问题填写完整才能添加下一个问题</p>\n				</div>\n				<i class="bubble_tips_arrow out"></i>\n				<i class="bubble_tips_arrow in"></i>\n			</div>-->\n		</div>\n	</div>\n   \n</div>\n';
});define("tpl/mpEditor/layout.html.js",[],function(){
return'<div id="##" class="%%">\n    <!-- 工具栏 -->\n    <div id="##_toolbarbox" class="%%-toolbarbox show-edui-more">\n        {if length}\n        <div id="##_toolbarboxouter" class="%%-toolbarboxouter">\n            <div class="%%-toolbarboxinner">{=toolbarBoxHtml}</div>\n            <div id="##_toolbar_mask" class="edui_toolbar_mask"></div>\n        </div>\n        {/if}\n        <div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;">\n            <div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">{clickToUpload}</div>\n            <div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div>\n            <div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div>\n            <div style="height:0;overflow:hidden;clear:both;"></div>\n        </div>\n        <div id="js_autosave" class="mpeditor_global_tips mini_tips icon_after weak_text" style="display:none;">\n            自动保存<i class="icon16_common waiting_gray"></i>\n        </div>\n    </div>\n\n    <!-- 载入草稿提示 -->\n    <div id="js_draft_tips" class="page_msg mini with_closed" style="display:none;">\n        <div class="inner">\n            <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>\n            <div class="msg_content">\n                <p><span class="js_msg_content"></span><span class="link_global tail_link" id="js_draft_cancel">撤消</span></p>\n            </div>\n        </div>\n        <span class="msg_closed js_msg_close">关闭</span>\n    </div>\n    <!-- 标题报错 -->\n    <div class="page_msg mini with_closed js_title_error" style="display:none;">\n        <div class="inner">\n            <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>\n            <div class="msg_content">\n                <p class="js_msg_content">标题不能为空且长度不能超过64字</p>\n            </div>\n        </div>\n        <span class="msg_closed js_msg_close">关闭</span>\n    </div>\n    <!-- 作者报错 -->\n    <div class="page_msg mini with_closed js_author_error" style="display:none;">\n        <div class="inner">\n            <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>\n            <div class="msg_content">\n                <p class="js_msg_content">作者不能超过8个字</p>\n            </div>\n        </div>\n        <span class="msg_closed js_msg_close">关闭</span>\n    </div>\n    <!-- 标题 -->\n    <div class="appmsg_edit_item title frm_input_box">\n        <label for="title" class="tips_global placeholder_tips" style="display:none">请在这里输入标题</label>\n        <input id="title" type="text" placeholder="请在这里输入标题" class="frm_input js_title js_counter js_field" name="title" max-length="64">\n    </div>\n\n    <!-- 作者 -->\n    <div class="appmsg_edit_item author frm_input_box">\n        <label for="author" class="tips_global placeholder_tips" style="display:none">请输入作者</label>\n        <input id="author" type="text" placeholder="请输入作者" class="frm_input js_author js_counter js_field" name="author" max-length="8">\n    </div>\n\n    <!-- 正文 -->\n    <div class="editor_area">\n        <div class="split_line"></div>\n        <!-- 正文报错 -->\n        <div class="page_msg mini with_closed js_catch_tips" style="display:none;">\n            <div class="inner">\n                <span class="msg_icon_wrp"><i class="icon_msg_mini warn"></i></span>\n                <div class="msg_content">\n                    <p class="js_msg_content">粘贴失败</p>\n                </div>\n            </div>\n            <span class="msg_closed js_msg_close">关闭</span>\n        </div>\n        <div class="page_msg mini with_closed js_content_error" style="display:none;">\n            <div class="inner">\n                <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>\n                <div class="msg_content">\n                    <p class="js_msg_content">正文不能为空</p>\n                </div>\n            </div>\n            <span class="msg_closed js_msg_close">关闭</span>\n        </div>\n        <div id="##_iframeholder" class="%%-iframeholder">\n            <div id="##_contentplaceholder" class="editor_content_placeholder" style="display:none">从这里开始写作</div>\n        </div>\n    </div>\n    <!-- 底部 -->\n    <div id="##_bottombar" class="%%-bottomContainer">\n        <table>\n            <tr>\n                <td id="##_elementpath" class="%%-bottombar"></td>\n                <td id="##_wordcount" class="%%-wordcount"></td>\n                <td id="##_scale" class="%%-scale"><div class="%%-icon"></div></td>\n            </tr>\n        </table>\n    </div>\n    <div id="##_scalelayer"></div>\n</div>\n';
});define("tpl/media/qqmusicaudio.html.js",[],function(){
return'<div class="qqmusic_audio " id="wxAudioBox{id}" data-aid="{id}">\n    <a class="audio_switch" href="javascript:;"  onclick=\'return false;\' title="点击播放">\n        <i class="icon_qqmusic"></i>\n    </a>\n</div>\n';
});define("tpl/media/audio.html.js",[],function(){
return'<div class="audio_msg" id="wxAudioBox{id}" data-aid="{id}" data-fid="{file_id}" data-source="{source}">\n    <div class="icon_audio_wrp"><span class="icon_audio_msg"></span></div>\n    <div class="audio_content">\n        <div class="audio_title">{title}</div>\n        <div class="audio_length">{play_length}</div>\n        {if showTime==true}<div class="audio_date">{update_time}</div>{/if}\n    </div>\n</div>\n';
});define("biz_web/lib/soundmanager2.js",[],function(){
"use strict";
function e(e,n){
function o(e){
return pt.preferFlash&&rt&&!pt.ignoreFlash&&pt.flash[e]!==t&&pt.flash[e];
}
function i(e){
return function(t){
var n,o=this._s;
return o&&o._a?n=e.call(this,t):(pt._wD(o&&o.id?o.id+": Ignoring "+t.type:wt+"Ignoring "+t.type),
n=null),n;
};
}
this.setupOptions={
url:e||null,
flashVersion:8,
debugMode:!1,
debugFlash:!1,
useConsole:!1,
consoleOnly:!0,
waitForWindowLoad:!1,
bgColor:"#ffffff",
useHighPerformance:!1,
flashPollingInterval:null,
html5PollingInterval:null,
flashLoadTimeout:1e3,
wmode:null,
allowScriptAccess:"always",
useFlashBlock:!1,
useHTML5Audio:!0,
html5Test:/^(probably|maybe)$/i,
preferFlash:!0,
noSWFCache:!1,
idPrefix:"sound"
},this.defaultOptions={
autoLoad:!1,
autoPlay:!1,
from:null,
loops:1,
onid3:null,
onload:null,
whileloading:null,
onplay:null,
onpause:null,
onresume:null,
whileplaying:null,
onposition:null,
onstop:null,
onfailure:null,
onfinish:null,
multiShot:!0,
multiShotEvents:!1,
position:null,
pan:0,
stream:!0,
to:null,
type:null,
usePolicyFile:!1,
volume:100
},this.flash9Options={
isMovieStar:null,
usePeakData:!1,
useWaveformData:!1,
useEQData:!1,
onbufferchange:null,
ondataerror:null
},this.movieStarOptions={
bufferTime:3,
serverURL:null,
onconnect:null,
duration:null
},this.audioFormats={
mp3:{
type:['audio/mpeg; codecs="mp3"',"audio/mpeg","audio/mp3","audio/MPA","audio/mpa-robust"],
required:!0
},
mp4:{
related:["aac","m4a","m4b"],
type:['audio/mp4; codecs="mp4a.40.2"',"audio/aac","audio/x-m4a","audio/MP4A-LATM","audio/mpeg4-generic"],
required:!1
},
ogg:{
type:["audio/ogg; codecs=vorbis"],
required:!1
},
opus:{
type:["audio/ogg; codecs=opus","audio/opus"],
required:!1
},
wav:{
type:['audio/wav; codecs="1"',"audio/wav","audio/wave","audio/x-wav"],
required:!1
}
},this.movieID="sm2-container",this.id=n||"sm2movie",this.debugID="soundmanager-debug",
this.debugURLParam=/([#?&])debug=1/i,this.versionNumber="V2.97a.20130512",this.version=null,
this.movieURL=null,this.altURL=null,this.swfLoaded=!1,this.enabled=!1,this.oMC=null,
this.sounds={},this.soundIDs=[],this.muted=!1,this.didFlashBlock=!1,this.filePattern=null,
this.filePatterns={
flash8:/\.mp3(\?.*)?$/i,
flash9:/\.mp3(\?.*)?$/i
},this.features={
buffering:!1,
peakData:!1,
waveformData:!1,
eqData:!1,
movieStar:!1
},this.sandbox={
type:null,
types:{
remote:"remote (domain-based) rules",
localWithFile:"local with file access (no internet access)",
localWithNetwork:"local with network (internet access only, no local access)",
localTrusted:"local, trusted (local+internet access)"
},
description:null,
noRemote:null,
noLocal:null
},this.html5={
usingFlash:null
},this.flash={},this.html5Only=!1,this.ignoreFlash=!1;
var a,s,r,l,u,d,f,h,c,p,m,_,g,y,w,v,b,O,D,M,L,T,P,S,F,I,H,E,A,k,C,x,R,N,U,B,W,j,q,V,Q,$,K,J,X,z,G,Z,Y,et,tt,nt,ot,it,at,st,rt,lt,ut,dt,ft,ht,ct,pt=this,mt=null,_t=null,gt="soundManager",yt=gt+": ",wt="HTML5::",vt=navigator.userAgent,bt=window.location.href.toString(),Ot=document,Dt=[],Mt=!0,Lt=!1,Tt=!1,Pt=!1,St=!1,Ft=!1,It=0,Ht=["log","info","warn","error"],Et=8,At=null,kt=null,Ct=!1,xt=!1,Rt=0,Nt=null,Ut=[],Bt=null,Wt=Array.prototype.slice,jt=!1,qt=0,Vt=vt.match(/(ipad|iphone|ipod)/i),Qt=vt.match(/android/i),$t=vt.match(/msie/i),Kt=vt.match(/webkit/i),Jt=vt.match(/safari/i)&&!vt.match(/chrome/i),Xt=vt.match(/opera/i),zt=vt.match(/firefox/i),Gt=vt.match(/(mobile|pre\/|xoom)/i)||Vt||Qt,Zt=!bt.match(/usehtml5audio/i)&&!bt.match(/sm2\-ignorebadua/i)&&Jt&&!vt.match(/silk/i)&&vt.match(/OS X 10_6_([3-7])/i),Yt=window.console!==t&&console.log!==t,en=Ot.hasFocus!==t?Ot.hasFocus():null,tn=Jt&&(Ot.hasFocus===t||!Ot.hasFocus()),nn=!tn,on=/(mp3|mp4|mpa|m4a|m4b)/i,an=1e3,sn="about:blank",rn=Ot.location?Ot.location.protocol.match(/http/i):null,ln=rn?"":"http://",un=/^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,dn=["mpeg4","aac","flv","mov","mp4","m4v","f4v","m4a","m4b","mp4v","3gp","3g2"],fn=new RegExp("\\.("+dn.join("|")+")(\\?.*)?$","i");
this.mimePattern=/^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i,this.useAltURL=!rn,
W={
swfBox:"sm2-object-box",
swfDefault:"movieContainer",
swfError:"swf_error",
swfTimedout:"swf_timedout",
swfLoaded:"swf_loaded",
swfUnblocked:"swf_unblocked",
sm2Debug:"sm2_debug",
highPerf:"high_performance",
flashDebug:"flash_debug"
},this.hasHTML5=function(){
try{
return Audio!==t&&(Xt&&opera!==t&&opera.version()<10?new Audio(null):new Audio).canPlayType!==t;
}catch(e){
return!1;
}
}(),this.setup=function(e){
var n=!pt.url;
return e!==t&&Pt&&Bt&&pt.ok()&&(e.flashVersion!==t||e.url!==t||e.html5Test!==t)&&Q(N("setupLate")),
m(e),e&&(n&&F&&e.url!==t&&pt.beginDelayedInit(),F||e.url===t||"complete"!==Ot.readyState||setTimeout(P,1)),
pt;
},this.ok=function(){
return Bt?Pt&&!St:pt.useHTML5Audio&&pt.hasHTML5;
},this.supported=this.ok,this.getMovie=function(e){
return s(e)||Ot[e]||window[e];
},this.createSound=function(e,n){
function o(){
return r=q(r),pt.sounds[r.id]=new a(r),pt.soundIDs.push(r.id),pt.sounds[r.id];
}
var i,s,r,l=null;
if(i=gt+".createSound(): ",s=i+N(Pt?"notOK":"notReady"),!Pt||!pt.ok())return Q(s),
!1;
if(n!==t&&(e={
id:e,
url:n
}),r=p(e),r.url=z(r.url),void 0===r.id&&(r.id=pt.setupOptions.idPrefix+qt++),r.id.toString().charAt(0).match(/^[0-9]$/)&&pt._wD(i+N("badID",r.id),2),
pt._wD(i+r.id+(r.url?" ("+r.url+")":""),1),$(r.id,!0))return pt._wD(i+r.id+" exists",1),
pt.sounds[r.id];
if(Y(r))l=o(),pt._wD(r.id+": Using HTML5"),l._setup_html5(r);else{
if(pt.html5Only)return pt._wD(r.id+": No HTML5 support for this sound, and no Flash. Exiting."),
o();
if(pt.html5.usingFlash&&r.url&&r.url.match(/data\:/i))return pt._wD(r.id+": data: URIs not supported via Flash. Exiting."),
o();
d>8&&(null===r.isMovieStar&&(r.isMovieStar=!!(r.serverURL||(r.type?r.type.match(un):!1)||r.url&&r.url.match(fn))),
r.isMovieStar&&(pt._wD(i+"using MovieStar handling"),r.loops>1&&h("noNSLoop"))),
r=V(r,i),l=o(),8===d?_t._createSound(r.id,r.loops||1,r.usePolicyFile):(_t._createSound(r.id,r.url,r.usePeakData,r.useWaveformData,r.useEQData,r.isMovieStar,r.isMovieStar?r.bufferTime:!1,r.loops||1,r.serverURL,r.duration||null,r.autoPlay,!0,r.autoLoad,r.usePolicyFile),
r.serverURL||(l.connected=!0,r.onconnect&&r.onconnect.apply(l))),r.serverURL||!r.autoLoad&&!r.autoPlay||l.load(r);
}
return!r.serverURL&&r.autoPlay&&l.play(),l;
},this.destroySound=function(e,t){
if(!$(e))return!1;
var n,o=pt.sounds[e];
for(o._iO={},o.stop(),o.unload(),n=0;n<pt.soundIDs.length;n++)if(pt.soundIDs[n]===e){
pt.soundIDs.splice(n,1);
break;
}
return t||o.destruct(!0),o=null,delete pt.sounds[e],!0;
},this.load=function(e,t){
return $(e)?pt.sounds[e].load(t):!1;
},this.unload=function(e){
return $(e)?pt.sounds[e].unload():!1;
},this.onPosition=function(e,t,n,o){
return $(e)?pt.sounds[e].onposition(t,n,o):!1;
},this.onposition=this.onPosition,this.clearOnPosition=function(e,t,n){
return $(e)?pt.sounds[e].clearOnPosition(t,n):!1;
},this.play=function(e,t){
var n=null,o=t&&!(t instanceof Object);
if(!Pt||!pt.ok())return Q(gt+".play(): "+N(Pt?"notOK":"notReady")),!1;
if($(e,o))o&&(t={
url:t
});else{
if(!o)return!1;
o&&(t={
url:t
}),t&&t.url&&(pt._wD(gt+'.play(): Attempting to create "'+e+'"',1),t.id=e,n=pt.createSound(t).play());
}
return null===n&&(n=pt.sounds[e].play(t)),n;
},this.start=this.play,this.setPosition=function(e,t){
return $(e)?pt.sounds[e].setPosition(t):!1;
},this.stop=function(e){
return $(e)?(pt._wD(gt+".stop("+e+")",1),pt.sounds[e].stop()):!1;
},this.stopAll=function(){
var e;
pt._wD(gt+".stopAll()",1);
for(e in pt.sounds)pt.sounds.hasOwnProperty(e)&&pt.sounds[e].stop();
},this.pause=function(e){
return $(e)?pt.sounds[e].pause():!1;
},this.pauseAll=function(){
var e;
for(e=pt.soundIDs.length-1;e>=0;e--)pt.sounds[pt.soundIDs[e]].pause();
},this.resume=function(e){
return $(e)?pt.sounds[e].resume():!1;
},this.resumeAll=function(){
var e;
for(e=pt.soundIDs.length-1;e>=0;e--)pt.sounds[pt.soundIDs[e]].resume();
},this.togglePause=function(e){
return $(e)?pt.sounds[e].togglePause():!1;
},this.setPan=function(e,t){
return $(e)?pt.sounds[e].setPan(t):!1;
},this.setVolume=function(e,t){
return $(e)?pt.sounds[e].setVolume(t):!1;
},this.mute=function(e){
var t=0;
if(e instanceof String&&(e=null),e)return $(e)?(pt._wD(gt+'.mute(): Muting "'+e+'"'),
pt.sounds[e].mute()):!1;
for(pt._wD(gt+".mute(): Muting all sounds"),t=pt.soundIDs.length-1;t>=0;t--)pt.sounds[pt.soundIDs[t]].mute();
return pt.muted=!0,!0;
},this.muteAll=function(){
pt.mute();
},this.unmute=function(e){
var t;
if(e instanceof String&&(e=null),e)return $(e)?(pt._wD(gt+'.unmute(): Unmuting "'+e+'"'),
pt.sounds[e].unmute()):!1;
for(pt._wD(gt+".unmute(): Unmuting all sounds"),t=pt.soundIDs.length-1;t>=0;t--)pt.sounds[pt.soundIDs[t]].unmute();
return pt.muted=!1,!0;
},this.unmuteAll=function(){
pt.unmute();
},this.toggleMute=function(e){
return $(e)?pt.sounds[e].toggleMute():!1;
},this.getMemoryUse=function(){
var e=0;
return _t&&8!==d&&(e=parseInt(_t._getMemoryUse(),10)),e;
},this.disable=function(e){
var n;
if(e===t&&(e=!1),St)return!1;
for(St=!0,h("shutdown",1),n=pt.soundIDs.length-1;n>=0;n--)C(pt.sounds[pt.soundIDs[n]]);
return c(e),at.remove(window,"load",w),!0;
},this.canPlayMIME=function(e){
var t;
return pt.hasHTML5&&(t=et({
type:e
})),!t&&Bt&&(t=e&&pt.ok()?!!((d>8?e.match(un):null)||e.match(pt.mimePattern)):null),
t;
},this.canPlayURL=function(e){
var t;
return pt.hasHTML5&&(t=et({
url:e
})),!t&&Bt&&(t=e&&pt.ok()?!!e.match(pt.filePattern):null),t;
},this.canPlayLink=function(e){
return e.type!==t&&e.type&&pt.canPlayMIME(e.type)?!0:pt.canPlayURL(e.href);
},this.getSoundById=function(e,t){
if(!e)return null;
var n=pt.sounds[e];
return n||t||pt._wD(gt+'.getSoundById(): Sound "'+e+'" not found.',2),n;
},this.onready=function(e,t){
var n="onready",o=!1;
if("function"!=typeof e)throw N("needFunction",n);
return Pt&&pt._wD(N("queue",n)),t||(t=window),g(n,e,t),y(),o=!0,o;
},this.ontimeout=function(e,t){
var n="ontimeout",o=!1;
if("function"!=typeof e)throw N("needFunction",n);
return Pt&&pt._wD(N("queue",n)),t||(t=window),g(n,e,t),y({
type:n
}),o=!0,o;
},this._writeDebug=function(e,n){
var o,i,a="soundmanager-debug";
return pt.debugMode?Yt&&pt.useConsole&&(n&&"object"==typeof n?console.log(e,n):Ht[n]!==t?console[Ht[n]](e):console.log(e),
pt.consoleOnly)?!0:(o=s(a))?(i=Ot.createElement("div"),++It%2===0&&(i.className="sm2-alt"),
n=n===t?0:parseInt(n,10),i.appendChild(Ot.createTextNode(e)),n&&(n>=2&&(i.style.fontWeight="bold"),
3===n&&(i.style.color="#ff3333")),o.insertBefore(i,o.firstChild),o=null,!0):!1:!1;
},-1!==bt.indexOf("sm2-debug=alert")&&(this._writeDebug=function(e){
window.alert(e);
}),this._wD=this._writeDebug,this._debug=function(){
var e,t;
for(h("currentObj",1),e=0,t=pt.soundIDs.length;t>e;e++)pt.sounds[pt.soundIDs[e]]._debug();
},this.reboot=function(e,t){
pt.soundIDs.length&&pt._wD("Destroying "+pt.soundIDs.length+" SMSound object"+(1!==pt.soundIDs.length?"s":"")+"...");
var n,o,i;
for(n=pt.soundIDs.length-1;n>=0;n--)pt.sounds[pt.soundIDs[n]].destruct();
if(_t)try{
$t&&(kt=_t.innerHTML),At=_t.parentNode.removeChild(_t);
}catch(a){
h("badRemove",2);
}
if(kt=At=Bt=_t=null,pt.enabled=F=Pt=Ct=xt=Lt=Tt=St=jt=pt.swfLoaded=!1,pt.soundIDs=[],
pt.sounds={},qt=0,e)Dt=[];else for(n in Dt)if(Dt.hasOwnProperty(n))for(o=0,i=Dt[n].length;i>o;o++)Dt[n][o].fired=!1;
return t||pt._wD(gt+": Rebooting..."),pt.html5={
usingFlash:null
},pt.flash={},pt.html5Only=!1,pt.ignoreFlash=!1,window.setTimeout(function(){
T(),t||pt.beginDelayedInit();
},20),pt;
},this.reset=function(){
return h("reset"),pt.reboot(!0,!0);
},this.getMoviePercent=function(){
return _t&&"PercentLoaded"in _t?_t.PercentLoaded():null;
},this.beginDelayedInit=function(){
Ft=!0,P(),setTimeout(function(){
return xt?!1:(H(),L(),xt=!0,!0);
},20),v();
},this.destruct=function(){
pt._wD(gt+".destruct()"),pt.disable(!0);
},a=function(e){
var n,o,i,a,s,r,l,u,c,m,_=this,g=!1,y=[],w=0,v=null;
c={
duration:null,
time:null
},this.id=e.id,this.sID=this.id,this.url=e.url,this.options=p(e),this.instanceOptions=this.options,
this._iO=this.instanceOptions,this.pan=this.options.pan,this.volume=this.options.volume,
this.isHTML5=!1,this._a=null,m=this.url?!1:!0,this.id3={},this._debug=function(){
pt._wD(_.id+": Merged options:",_.options);
},this.load=function(e){
var n,o=null;
if(e!==t?_._iO=p(e,_.options):(e=_.options,_._iO=e,v&&v!==_.url&&(h("manURL"),_._iO.url=_.url,
_.url=null)),_._iO.url||(_._iO.url=_.url),_._iO.url=z(_._iO.url),_.instanceOptions=_._iO,
n=_._iO,pt._wD(_.id+": load ("+n.url+")"),!n.url&&!_.url)return pt._wD(_.id+": load(): url is unassigned. Exiting.",2),
_;
if(_.isHTML5||8!==d||_.url||n.autoPlay||pt._wD(_.id+": Flash 8 load() limitation: Wait for onload() before calling play().",1),
n.url===_.url&&0!==_.readyState&&2!==_.readyState)return h("onURL",1),3===_.readyState&&n.onload&&ct(_,function(){
n.onload.apply(_,[!!_.duration]);
}),_;
if(_.loaded=!1,_.readyState=1,_.playState=0,_.id3={},Y(n))o=_._setup_html5(n),o._called_load?pt._wD(_.id+": Ignoring request to load again"):(_._html5_canplay=!1,
_.url!==n.url&&(pt._wD(h("manURL")+": "+n.url),_._a.src=n.url,_.setPosition(0)),
_._a.autobuffer="auto",_._a.preload="auto",_._a._called_load=!0,n.autoPlay&&_.play());else{
if(pt.html5Only)return pt._wD(_.id+": No flash support. Exiting."),_;
if(_._iO.url&&_._iO.url.match(/data\:/i))return pt._wD(_.id+": data: URIs not supported via Flash. Exiting."),
_;
try{
_.isHTML5=!1,_._iO=V(q(n)),n=_._iO,8===d?_t._load(_.id,n.url,n.stream,n.autoPlay,n.usePolicyFile):_t._load(_.id,n.url,!!n.stream,!!n.autoPlay,n.loops||1,!!n.autoLoad,n.usePolicyFile);
}catch(i){
h("smError",2),f("onload",!1),E({
type:"SMSOUND_LOAD_JS_EXCEPTION",
fatal:!0
});
}
}
return _.url=n.url,_;
},this.unload=function(){
return 0!==_.readyState&&(pt._wD(_.id+": unload()"),_.isHTML5?(a(),_._a&&(_._a.pause(),
v=nt(_._a))):8===d?_t._unload(_.id,sn):_t._unload(_.id),n()),_;
},this.destruct=function(e){
pt._wD(_.id+": Destruct"),_.isHTML5?(a(),_._a&&(_._a.pause(),nt(_._a),jt||i(),_._a._s=null,
_._a=null)):(_._iO.onfailure=null,_t._destroySound(_.id)),e||pt.destroySound(_.id,!0);
},this.play=function(e,n){
var o,i,a,l,f,h,c,y=!0,w=null;
if(o=_.id+": play(): ",n=n===t?!0:n,e||(e={}),_.url&&(_._iO.url=_.url),_._iO=p(_._iO,_.options),
_._iO=p(e,_._iO),_._iO.url=z(_._iO.url),_.instanceOptions=_._iO,!_.isHTML5&&_._iO.serverURL&&!_.connected)return _.getAutoPlay()||(pt._wD(o+" Netstream not connected yet - setting autoPlay"),
_.setAutoPlay(!0)),_;
if(Y(_._iO)&&(_._setup_html5(_._iO),s()),1!==_.playState||_.paused||(i=_._iO.multiShot,
i?pt._wD(o+"Already playing (multi-shot)",1):(pt._wD(o+"Already playing (one-shot)",1),
_.isHTML5&&_.setPosition(_._iO.position),w=_)),null!==w)return w;
if(e.url&&e.url!==_.url&&(_.readyState||_.isHTML5||8!==d||!m?_.load(_._iO):m=!1),
_.loaded?pt._wD(o.substr(0,o.lastIndexOf(":"))):0===_.readyState?(pt._wD(o+"Attempting to load"),
_.isHTML5||pt.html5Only?_.isHTML5?_.load(_._iO):(pt._wD(o+"Unsupported type. Exiting."),
w=_):(_._iO.autoPlay=!0,_.load(_._iO)),_.instanceOptions=_._iO):2===_.readyState?(pt._wD(o+"Could not load - exiting",2),
w=_):pt._wD(o+"Loading - attempting to play..."),null!==w)return w;
if(!_.isHTML5&&9===d&&_.position>0&&_.position===_.duration&&(pt._wD(o+"Sound at end, resetting to position:0"),
e.position=0),_.paused&&_.position>=0&&(!_._iO.serverURL||_.position>0))pt._wD(o+"Resuming from paused state",1),
_.resume();else{
if(_._iO=p(e,_._iO),null!==_._iO.from&&null!==_._iO.to&&0===_.instanceCount&&0===_.playState&&!_._iO.serverURL){
if(l=function(){
_._iO=p(e,_._iO),_.play(_._iO);
},_.isHTML5&&!_._html5_canplay?(pt._wD(o+"Beginning load for from/to case"),_.load({
oncanplay:l
}),w=!1):_.isHTML5||_.loaded||_.readyState&&2===_.readyState||(pt._wD(o+"Preloading for from/to case"),
_.load({
onload:l
}),w=!1),null!==w)return w;
_._iO=u();
}
(!_.instanceCount||_._iO.multiShotEvents||_.isHTML5&&_._iO.multiShot&&!jt||!_.isHTML5&&d>8&&!_.getAutoPlay())&&_.instanceCount++,
_._iO.onposition&&0===_.playState&&r(_),_.playState=1,_.paused=!1,_.position=_._iO.position===t||isNaN(_._iO.position)?0:_._iO.position,
_.isHTML5||(_._iO=V(q(_._iO))),_._iO.onplay&&n&&(_._iO.onplay.apply(_),g=!0),_.setVolume(_._iO.volume,!0),
_.setPan(_._iO.pan,!0),_.isHTML5?_.instanceCount<2?(s(),a=_._setup_html5(),_.setPosition(_._iO.position),
a.play()):(pt._wD(_.id+": Cloning Audio() for instance #"+_.instanceCount+"..."),
f=new Audio(_._iO.url),h=function(){
at.remove(f,"onended",h),_._onfinish(_),nt(f),f=null;
},c=function(){
at.remove(f,"canplay",c);
try{
f.currentTime=_._iO.position/an;
}catch(e){
Q(_.id+": multiShot play() failed to apply position of "+_._iO.position/an);
}
f.play();
},at.add(f,"ended",h),_._iO.position?at.add(f,"canplay",c):f.play()):(y=_t._start(_.id,_._iO.loops||1,9===d?_.position:_.position/an,_._iO.multiShot||!1),
9!==d||y||(pt._wD(o+"No sound hardware, or 32-sound ceiling hit",2),_._iO.onplayerror&&_._iO.onplayerror.apply(_)));
}
return _;
},this.start=this.play,this.stop=function(e){
var t,n=_._iO;
return 1===_.playState&&(pt._wD(_.id+": stop()"),_._onbufferchange(0),_._resetOnPosition(0),
_.paused=!1,_.isHTML5||(_.playState=0),l(),n.to&&_.clearOnPosition(n.to),_.isHTML5?_._a&&(t=_.position,
_.setPosition(0),_.position=t,_._a.pause(),_.playState=0,_._onTimer(),a()):(_t._stop(_.id,e),
n.serverURL&&_.unload()),_.instanceCount=0,_._iO={},n.onstop&&n.onstop.apply(_)),
_;
},this.setAutoPlay=function(e){
pt._wD(_.id+": Autoplay turned "+(e?"on":"off")),_._iO.autoPlay=e,_.isHTML5||(_t._setAutoPlay(_.id,e),
e&&(_.instanceCount||1!==_.readyState||(_.instanceCount++,pt._wD(_.id+": Incremented instance count to "+_.instanceCount))));
},this.getAutoPlay=function(){
return _._iO.autoPlay;
},this.setPosition=function(e){
e===t&&(e=0);
var n,o,i=_.isHTML5?Math.max(e,0):Math.min(_.duration||_._iO.duration,Math.max(e,0));
if(_.position=i,o=_.position/an,_._resetOnPosition(_.position),_._iO.position=i,
_.isHTML5){
if(_._a){
if(_._html5_canplay){
if(_._a.currentTime!==o){
pt._wD(_.id+": setPosition("+o+")");
try{
_._a.currentTime=o,(0===_.playState||_.paused)&&_._a.pause();
}catch(a){
pt._wD(_.id+": setPosition("+o+") failed: "+a.message,2);
}
}
}else if(o)return pt._wD(_.id+": setPosition("+o+"): Cannot seek yet, sound not ready",2),
_;
_.paused&&_._onTimer(!0);
}
}else n=9===d?_.position:o,_.readyState&&2!==_.readyState&&_t._setPosition(_.id,n,_.paused||!_.playState,_._iO.multiShot);
return _;
},this.pause=function(e){
return _.paused||0===_.playState&&1!==_.readyState?_:(pt._wD(_.id+": pause()"),_.paused=!0,
_.isHTML5?(_._setup_html5().pause(),a()):(e||e===t)&&_t._pause(_.id,_._iO.multiShot),
_._iO.onpause&&_._iO.onpause.apply(_),_);
},this.resume=function(){
var e=_._iO;
return _.paused?(pt._wD(_.id+": resume()"),_.paused=!1,_.playState=1,_.isHTML5?(_._setup_html5().play(),
s()):(e.isMovieStar&&!e.serverURL&&_.setPosition(_.position),_t._pause(_.id,e.multiShot)),
!g&&e.onplay?(e.onplay.apply(_),g=!0):e.onresume&&e.onresume.apply(_),_):_;
},this.togglePause=function(){
return pt._wD(_.id+": togglePause()"),0===_.playState?(_.play({
position:9!==d||_.isHTML5?_.position/an:_.position
}),_):(_.paused?_.resume():_.pause(),_);
},this.setPan=function(e,n){
return e===t&&(e=0),n===t&&(n=!1),_.isHTML5||_t._setPan(_.id,e),_._iO.pan=e,n||(_.pan=e,
_.options.pan=e),_;
},this.setVolume=function(e,n){
return e===t&&(e=100),n===t&&(n=!1),_.isHTML5?_._a&&(_._a.volume=Math.max(0,Math.min(1,e/100))):_t._setVolume(_.id,pt.muted&&!_.muted||_.muted?0:e),
_._iO.volume=e,n||(_.volume=e,_.options.volume=e),_;
},this.mute=function(){
return _.muted=!0,_.isHTML5?_._a&&(_._a.muted=!0):_t._setVolume(_.id,0),_;
},this.unmute=function(){
_.muted=!1;
var e=_._iO.volume!==t;
return _.isHTML5?_._a&&(_._a.muted=!1):_t._setVolume(_.id,e?_._iO.volume:_.options.volume),
_;
},this.toggleMute=function(){
return _.muted?_.unmute():_.mute();
},this.onPosition=function(e,n,o){
return y.push({
position:parseInt(e,10),
method:n,
scope:o!==t?o:_,
fired:!1
}),_;
},this.onposition=this.onPosition,this.clearOnPosition=function(e,t){
var n;
if(e=parseInt(e,10),isNaN(e))return!1;
for(n=0;n<y.length;n++)e===y[n].position&&(t&&t!==y[n].method||(y[n].fired&&w--,
y.splice(n,1)));
},this._processOnPosition=function(){
var e,t,n=y.length;
if(!n||!_.playState||w>=n)return!1;
for(e=n-1;e>=0;e--)t=y[e],!t.fired&&_.position>=t.position&&(t.fired=!0,w++,t.method.apply(t.scope,[t.position]));
return!0;
},this._resetOnPosition=function(e){
var t,n,o=y.length;
if(!o)return!1;
for(t=o-1;t>=0;t--)n=y[t],n.fired&&e<=n.position&&(n.fired=!1,w--);
return!0;
},u=function(){
var e,t,n=_._iO,o=n.from,i=n.to;
return t=function(){
pt._wD(_.id+': "To" time of '+i+" reached."),_.clearOnPosition(i,t),_.stop();
},e=function(){
pt._wD(_.id+': Playing "from" '+o),null===i||isNaN(i)||_.onPosition(i,t);
},null===o||isNaN(o)||(n.position=o,n.multiShot=!1,e()),n;
},r=function(){
var e,t=_._iO.onposition;
if(t)for(e in t)t.hasOwnProperty(e)&&_.onPosition(parseInt(e,10),t[e]);
},l=function(){
var e,t=_._iO.onposition;
if(t)for(e in t)t.hasOwnProperty(e)&&_.clearOnPosition(parseInt(e,10));
},s=function(){
_.isHTML5&&K(_);
},a=function(){
_.isHTML5&&J(_);
},n=function(e){
e||(y=[],w=0),g=!1,_._hasTimer=null,_._a=null,_._html5_canplay=!1,_.bytesLoaded=null,
_.bytesTotal=null,_.duration=_._iO&&_._iO.duration?_._iO.duration:null,_.durationEstimate=null,
_.buffered=[],_.eqData=[],_.eqData.left=[],_.eqData.right=[],_.failures=0,_.isBuffering=!1,
_.instanceOptions={},_.instanceCount=0,_.loaded=!1,_.metadata={},_.readyState=0,
_.muted=!1,_.paused=!1,_.peakData={
left:0,
right:0
},_.waveformData={
left:[],
right:[]
},_.playState=0,_.position=null,_.id3={};
},n(),this._onTimer=function(e){
var t,n,o=!1,i={};
return _._hasTimer||e?(_._a&&(e||(_.playState>0||1===_.readyState)&&!_.paused)&&(t=_._get_html5_duration(),
t!==c.duration&&(c.duration=t,_.duration=t,o=!0),_.durationEstimate=_.duration,n=_._a.currentTime*an||0,
n!==c.time&&(c.time=n,o=!0),(o||e)&&_._whileplaying(n,i,i,i,i)),o):void 0;
},this._get_html5_duration=function(){
var e=_._iO,t=_._a&&_._a.duration?_._a.duration*an:e&&e.duration?e.duration:null,n=t&&!isNaN(t)&&1/0!==t?t:null;
return n;
},this._apply_loop=function(e,t){
!e.loop&&t>1&&pt._wD("Note: Native HTML5 looping is infinite.",1),e.loop=t>1?"loop":"";
},this._setup_html5=function(e){
var t,i=p(_._iO,e),a=jt?mt:_._a,s=decodeURI(i.url);
if(jt?s===decodeURI(st)&&(t=!0):s===decodeURI(v)&&(t=!0),a){
if(a._s)if(jt)a._s&&a._s.playState&&!t&&a._s.stop();else if(!jt&&s===decodeURI(v))return _._apply_loop(a,i.loops),
a;
t||(n(!1),a.src=i.url,_.url=i.url,v=i.url,st=i.url,a._called_load=!1);
}else _._a=i.autoLoad||i.autoPlay?new Audio(i.url):Xt&&opera.version()<10?new Audio(null):new Audio,
a=_._a,a._called_load=!1,jt&&(mt=a);
return _.isHTML5=!0,_._a=a,a._s=_,o(),_._apply_loop(a,i.loops),i.autoLoad||i.autoPlay?_.load():(a.autobuffer=!1,
a.preload="auto"),a;
},o=function(){
function e(e,t,n){
return _._a?_._a.addEventListener(e,t,n||!1):null;
}
if(_._a._added_events)return!1;
var t;
_._a._added_events=!0;
for(t in dt)dt.hasOwnProperty(t)&&e(t,dt[t]);
return!0;
},i=function(){
function e(e,t,n){
return _._a?_._a.removeEventListener(e,t,n||!1):null;
}
var t;
pt._wD(_.id+": Removing event listeners"),_._a._added_events=!1;
for(t in dt)dt.hasOwnProperty(t)&&e(t,dt[t]);
},this._onload=function(e){
var t,n=!!e||!_.isHTML5&&8===d&&_.duration;
return t=_.id+": ",pt._wD(t+(n?"onload()":"Failed to load / invalid sound?"+(_.duration?" -":" Zero-length duration reported.")+" ("+_.url+")"),n?1:2),
n||_.isHTML5||(pt.sandbox.noRemote===!0&&pt._wD(t+N("noNet"),1),pt.sandbox.noLocal===!0&&pt._wD(t+N("noLocal"),1)),
_.loaded=n,_.readyState=n?3:2,_._onbufferchange(0),_._iO.onload&&ct(_,function(){
_._iO.onload.apply(_,[n]);
}),!0;
},this._onbufferchange=function(e){
return 0===_.playState?!1:e&&_.isBuffering||!e&&!_.isBuffering?!1:(_.isBuffering=1===e,
_._iO.onbufferchange&&(pt._wD(_.id+": Buffer state change: "+e),_._iO.onbufferchange.apply(_)),
!0);
},this._onsuspend=function(){
return _._iO.onsuspend&&(pt._wD(_.id+": Playback suspended"),_._iO.onsuspend.apply(_)),
!0;
},this._onfailure=function(e,t,n){
_.failures++,pt._wD(_.id+": Failures = "+_.failures),_._iO.onfailure&&1===_.failures?_._iO.onfailure(_,e,t,n):pt._wD(_.id+": Ignoring failure");
},this._onfinish=function(){
var e=_._iO.onfinish;
_._onbufferchange(0),_._resetOnPosition(0),_.instanceCount&&(_.instanceCount--,_.instanceCount||(l(),
_.playState=0,_.paused=!1,_.instanceCount=0,_.instanceOptions={},_._iO={},a(),_.isHTML5&&(_.position=0)),
(!_.instanceCount||_._iO.multiShotEvents)&&e&&(pt._wD(_.id+": onfinish()"),ct(_,function(){
e.apply(_);
})));
},this._whileloading=function(e,t,n,o){
var i=_._iO;
_.bytesLoaded=e,_.bytesTotal=t,_.duration=Math.floor(n),_.bufferLength=o,_.durationEstimate=_.isHTML5||i.isMovieStar?_.duration:i.duration?_.duration>i.duration?_.duration:i.duration:parseInt(_.bytesTotal/_.bytesLoaded*_.duration,10),
_.isHTML5||(_.buffered=[{
start:0,
end:_.duration
}]),(3!==_.readyState||_.isHTML5)&&i.whileloading&&i.whileloading.apply(_);
},this._whileplaying=function(e,n,o,i,a){
var s,r=_._iO;
return isNaN(e)||null===e?!1:(_.position=Math.max(0,e),_._processOnPosition(),!_.isHTML5&&d>8&&(r.usePeakData&&n!==t&&n&&(_.peakData={
left:n.leftPeak,
right:n.rightPeak
}),r.useWaveformData&&o!==t&&o&&(_.waveformData={
left:o.split(","),
right:i.split(",")
}),r.useEQData&&a!==t&&a&&a.leftEQ&&(s=a.leftEQ.split(","),_.eqData=s,_.eqData.left=s,
a.rightEQ!==t&&a.rightEQ&&(_.eqData.right=a.rightEQ.split(",")))),1===_.playState&&(_.isHTML5||8!==d||_.position||!_.isBuffering||_._onbufferchange(0),
r.whileplaying&&r.whileplaying.apply(_)),!0);
},this._oncaptiondata=function(e){
pt._wD(_.id+": Caption data received."),_.captiondata=e,_._iO.oncaptiondata&&_._iO.oncaptiondata.apply(_,[e]);
},this._onmetadata=function(e,t){
pt._wD(_.id+": Metadata received.");
var n,o,i={};
for(n=0,o=e.length;o>n;n++)i[e[n]]=t[n];
_.metadata=i,_._iO.onmetadata&&_._iO.onmetadata.apply(_);
},this._onid3=function(e,t){
pt._wD(_.id+": ID3 data received.");
var n,o,i=[];
for(n=0,o=e.length;o>n;n++)i[e[n]]=t[n];
_.id3=p(_.id3,i),_._iO.onid3&&_._iO.onid3.apply(_);
},this._onconnect=function(e){
e=1===e,pt._wD(_.id+": "+(e?"Connected.":"Failed to connect? - "+_.url),e?1:2),_.connected=e,
e&&(_.failures=0,$(_.id)&&(_.getAutoPlay()?_.play(t,_.getAutoPlay()):_._iO.autoLoad&&_.load()),
_._iO.onconnect&&_._iO.onconnect.apply(_,[e]));
},this._ondataerror=function(e){
_.playState>0&&(pt._wD(_.id+": Data error: "+e),_._iO.ondataerror&&_._iO.ondataerror.apply(_));
},this._debug();
},I=function(){
return Ot.body||Ot._docElement||Ot.getElementsByTagName("div")[0];
},s=function(e){
return Ot.getElementById(e);
},p=function(e,n){
var o,i,a=e||{};
o=n===t?pt.defaultOptions:n;
for(i in o)o.hasOwnProperty(i)&&a[i]===t&&(a[i]="object"!=typeof o[i]||null===o[i]?o[i]:p(a[i],o[i]));
return a;
},ct=function(e,t){
e.isHTML5||8!==d?t():window.setTimeout(t,0);
},_={
onready:1,
ontimeout:1,
defaultOptions:1,
flash9Options:1,
movieStarOptions:1
},m=function(e,n){
var o,i=!0,a=n!==t,s=pt.setupOptions,r=_;
if(e===t){
i=[];
for(o in s)s.hasOwnProperty(o)&&i.push(o);
for(o in r)r.hasOwnProperty(o)&&i.push("object"==typeof pt[o]?o+": {...}":pt[o]instanceof Function?o+": function() {...}":o);
return pt._wD(N("setup",i.join(", "))),!1;
}
for(o in e)if(e.hasOwnProperty(o))if("object"!=typeof e[o]||null===e[o]||e[o]instanceof Array||e[o]instanceof RegExp)a&&r[n]!==t?pt[n][o]=e[o]:s[o]!==t?(pt.setupOptions[o]=e[o],
pt[o]=e[o]):r[o]===t?(Q(N(pt[o]===t?"setupUndef":"setupError",o),2),i=!1):pt[o]instanceof Function?pt[o].apply(pt,e[o]instanceof Array?e[o]:[e[o]]):pt[o]=e[o];else{
if(r[o]!==t)return m(e[o],o);
Q(N(pt[o]===t?"setupUndef":"setupError",o),2),i=!1;
}
return i;
},at=function(){
function e(e){
var t=Wt.call(e),n=t.length;
return i?(t[1]="on"+t[1],n>3&&t.pop()):3===n&&t.push(!1),t;
}
function t(e,t){
var n=e.shift(),o=[a[t]];
i?n[o](e[0],e[1]):n[o].apply(n,e);
}
function n(){
t(e(arguments),"add");
}
function o(){
t(e(arguments),"remove");
}
var i=window.attachEvent,a={
add:i?"attachEvent":"addEventListener",
remove:i?"detachEvent":"removeEventListener"
};
return{
add:n,
remove:o
};
}(),dt={
abort:i(function(){
pt._wD(this._s.id+": abort");
}),
canplay:i(function(){
var e,n=this._s;
if(n._html5_canplay)return!0;
if(n._html5_canplay=!0,pt._wD(n.id+": canplay"),n._onbufferchange(0),e=n._iO.position===t||isNaN(n._iO.position)?null:n._iO.position/an,
n.position&&this.currentTime!==e){
pt._wD(n.id+": canplay: Setting position to "+e);
try{
this.currentTime=e;
}catch(o){
pt._wD(n.id+": canplay: Setting position of "+e+" failed: "+o.message,2);
}
}
n._iO._oncanplay&&n._iO._oncanplay();
}),
canplaythrough:i(function(){
var e=this._s;
e.loaded||(e._onbufferchange(0),e._whileloading(e.bytesLoaded,e.bytesTotal,e._get_html5_duration()),
e._onload(!0));
}),
ended:i(function(){
var e=this._s;
pt._wD(e.id+": ended"),e._onfinish();
}),
error:i(function(){
pt._wD(this._s.id+": HTML5 error, code "+this.error.code),this._s._onload(!1);
}),
loadeddata:i(function(){
var e=this._s;
pt._wD(e.id+": loadeddata"),e._loaded||Jt||(e.duration=e._get_html5_duration());
}),
loadedmetadata:i(function(){
pt._wD(this._s.id+": loadedmetadata");
}),
loadstart:i(function(){
pt._wD(this._s.id+": loadstart"),this._s._onbufferchange(1);
}),
play:i(function(){
this._s._onbufferchange(0);
}),
playing:i(function(){
pt._wD(this._s.id+": playing"),this._s._onbufferchange(0);
}),
progress:i(function(e){
var t,n,o,i=this._s,a=0,s="progress"===e.type,r=e.target.buffered,l=e.loaded||0,u=e.total||1;
if(i.buffered=[],r&&r.length){
for(t=0,n=r.length;n>t;t++)i.buffered.push({
start:r.start(t)*an,
end:r.end(t)*an
});
if(a=(r.end(0)-r.start(0))*an,l=Math.min(1,a/(e.target.duration*an)),s&&r.length>1){
for(o=[],n=r.length,t=0;n>t;t++)o.push(e.target.buffered.start(t)*an+"-"+e.target.buffered.end(t)*an);
pt._wD(this._s.id+": progress, timeRanges: "+o.join(", "));
}
s&&!isNaN(l)&&pt._wD(this._s.id+": progress, "+Math.floor(100*l)+"% loaded");
}
isNaN(l)||(i._onbufferchange(0),i._whileloading(l,u,i._get_html5_duration()),l&&u&&l===u&&dt.canplaythrough.call(this,e));
}),
ratechange:i(function(){
pt._wD(this._s.id+": ratechange");
}),
suspend:i(function(e){
var t=this._s;
pt._wD(this._s.id+": suspend"),dt.progress.call(this,e),t._onsuspend();
}),
stalled:i(function(){
pt._wD(this._s.id+": stalled");
}),
timeupdate:i(function(){
this._s._onTimer();
}),
waiting:i(function(){
var e=this._s;
pt._wD(this._s.id+": waiting"),e._onbufferchange(1);
})
},Y=function(e){
var t;
return t=e&&(e.type||e.url||e.serverURL)?e.serverURL||e.type&&o(e.type)?!1:e.type?et({
type:e.type
}):et({
url:e.url
})||pt.html5Only||e.url.match(/data\:/i):!1;
},nt=function(e){
var t;
return e&&(t=Jt&&!Vt?null:zt?sn:null,e.removeAttribute("src"),void 0!==e._called_unload&&(e._called_load=!1)),
jt&&(st=null),t;
},et=function(e){
if(!pt.useHTML5Audio||!pt.hasHTML5)return!1;
var n,i,a,s,r=e.url||null,l=e.type||null,u=pt.audioFormats;
if(l&&pt.html5[l]!==t)return pt.html5[l]&&!o(l);
if(!tt){
tt=[];
for(s in u)u.hasOwnProperty(s)&&(tt.push(s),u[s].related&&(tt=tt.concat(u[s].related)));
tt=new RegExp("\\.("+tt.join("|")+")(\\?.*)?$","i");
}
return a=r?r.toLowerCase().match(tt):null,a&&a.length?a=a[1]:l?(i=l.indexOf(";"),
a=(-1!==i?l.substr(0,i):l).substr(6)):n=!1,a&&pt.html5[a]!==t?n=pt.html5[a]&&!o(a):(l="audio/"+a,
n=pt.html5.canPlayType({
type:l
}),pt.html5[a]=n,n=n&&pt.html5[l]&&!o(l)),n;
},it=function(){
function e(e){
var t,n,o,i=!1,a=!1;
if(!s||"function"!=typeof s.canPlayType)return i;
if(e instanceof Array){
for(n=0,o=e.length;o>n;n++)(pt.html5[e[n]]||s.canPlayType(e[n]).match(pt.html5Test))&&(a=!0,
pt.html5[e[n]]=!0,pt.flash[e[n]]=!!e[n].match(on));
i=a;
}else t=s&&"function"==typeof s.canPlayType?s.canPlayType(e):!1,i=!(!t||!t.match(pt.html5Test));
return i;
}
if(!pt.useHTML5Audio||!pt.hasHTML5)return pt.html5.usingFlash=!0,Bt=!0,!1;
var n,o,i,a,s=Audio!==t?Xt&&opera.version()<10?new Audio(null):new Audio:null,r={};
i=pt.audioFormats;
for(n in i)if(i.hasOwnProperty(n)&&(o="audio/"+n,r[n]=e(i[n].type),r[o]=r[n],n.match(on)?(pt.flash[n]=!0,
pt.flash[o]=!0):(pt.flash[n]=!1,pt.flash[o]=!1),i[n]&&i[n].related))for(a=i[n].related.length-1;a>=0;a--)r["audio/"+i[n].related[a]]=r[n],
pt.html5[i[n].related[a]]=r[n],pt.flash[i[n].related[a]]=r[n];
return r.canPlayType=s?e:null,pt.html5=p(pt.html5,r),pt.html5.usingFlash=Z(),Bt=pt.html5.usingFlash,
!0;
},M={
notReady:"Unavailable - wait until onready() has fired.",
notOK:"Audio support is not available.",
domError:gt+"exception caught while appending SWF to DOM.",
spcWmode:"Removing wmode, preventing known SWF loading issue(s)",
swf404:yt+"Verify that %s is a valid path.",
tryDebug:"Try "+gt+".debugFlash = true for more security details (output goes to SWF.)",
checkSWF:"See SWF output for more debug info.",
localFail:yt+"Non-HTTP page ("+Ot.location.protocol+" URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/",
waitFocus:yt+"Special case: Waiting for SWF to load with window focus...",
waitForever:yt+"Waiting indefinitely for Flash (will recover if unblocked)...",
waitSWF:yt+"Waiting for 100% SWF load...",
needFunction:yt+"Function object expected for %s",
badID:'Sound ID "%s" should be a string, starting with a non-numeric character',
currentObj:yt+"_debug(): Current sound objects",
waitOnload:yt+"Waiting for window.onload()",
docLoaded:yt+"Document already loaded",
onload:yt+"initComplete(): calling soundManager.onload()",
onloadOK:gt+".onload() complete",
didInit:yt+"init(): Already called?",
secNote:"Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html",
badRemove:yt+"Failed to remove Flash node.",
shutdown:gt+".disable(): Shutting down",
queue:yt+"Queueing %s handler",
smError:"SMSound.load(): Exception: JS-Flash communication failed, or JS error.",
fbTimeout:"No flash response, applying ."+W.swfTimedout+" CSS...",
fbLoaded:"Flash loaded",
fbHandler:yt+"flashBlockHandler()",
manURL:"SMSound.load(): Using manually-assigned URL",
onURL:gt+".load(): current URL already assigned.",
badFV:gt+'.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
as2loop:"Note: Setting stream:false so looping can work (flash 8 limitation)",
noNSLoop:"Note: Looping not implemented for MovieStar formats",
needfl9:"Note: Switching to flash 9, required for MP4 formats.",
mfTimeout:"Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case",
needFlash:yt+"Fatal error: Flash is needed to play some required formats, but is not available.",
gotFocus:yt+"Got window focus.",
policy:"Enabling usePolicyFile for data access",
setup:gt+".setup(): allowed parameters: %s",
setupError:gt+'.setup(): "%s" cannot be assigned with this method.',
setupUndef:gt+'.setup(): Could not find option "%s"',
setupLate:gt+".setup(): url, flashVersion and html5Test property changes will not take effect until reboot().",
noURL:yt+"Flash URL required. Call soundManager.setup({url:...}) to get started.",
sm2Loaded:"SoundManager 2: Ready.",
reset:gt+".reset(): Removing event callbacks",
mobileUA:"Mobile UA detected, preferring HTML5 by default.",
globalHTML5:"Using singleton HTML5 Audio() pattern for this device."
},N=function(){
var e,t,n=Wt.call(arguments),o=n.shift(),i=M&&M[o]?M[o]:"";
if(i&&n&&n.length)for(e=0,t=n.length;t>e;e++)i=i.replace("%s",n[e]);
return i;
},q=function(e){
return 8===d&&e.loops>1&&e.stream&&(h("as2loop"),e.stream=!1),e;
},V=function(e,t){
return e&&!e.usePolicyFile&&(e.onid3||e.usePeakData||e.useWaveformData||e.useEQData)&&(pt._wD((t||"")+N("policy")),
e.usePolicyFile=!0),e;
},Q=function(e){
Yt&&console.warn!==t?console.warn(e):pt._wD(e);
},r=function(){
return!1;
},C=function(e){
var t;
for(t in e)e.hasOwnProperty(t)&&"function"==typeof e[t]&&(e[t]=r);
t=null;
},x=function(e){
e===t&&(e=!1),(St||e)&&pt.disable(e);
},R=function(e){
var t,n=null;
if(e)if(e.match(/\.swf(\?.*)?$/i)){
if(n=e.substr(e.toLowerCase().lastIndexOf(".swf?")+4))return e;
}else e.lastIndexOf("/")!==e.length-1&&(e+="/");
return t=(e&&-1!==e.lastIndexOf("/")?e.substr(0,e.lastIndexOf("/")+1):"./")+pt.movieURL,
pt.noSWFCache&&(t+="?ts="+(new Date).getTime()),t;
},O=function(){
d=parseInt(pt.flashVersion,10),8!==d&&9!==d&&(pt._wD(N("badFV",d,Et)),pt.flashVersion=d=Et);
var e=pt.debugMode||pt.debugFlash?"_debug.swf":".swf";
pt.useHTML5Audio&&!pt.html5Only&&pt.audioFormats.mp4.required&&9>d&&(pt._wD(N("needfl9")),
pt.flashVersion=d=9),pt.version=pt.versionNumber+(pt.html5Only?" (HTML5-only mode)":9===d?" (AS3/Flash 9)":" (AS2/Flash 8)"),
d>8?(pt.defaultOptions=p(pt.defaultOptions,pt.flash9Options),pt.features.buffering=!0,
pt.defaultOptions=p(pt.defaultOptions,pt.movieStarOptions),pt.filePatterns.flash9=new RegExp("\\.(mp3|"+dn.join("|")+")(\\?.*)?$","i"),
pt.features.movieStar=!0):pt.features.movieStar=!1,pt.filePattern=pt.filePatterns[8!==d?"flash9":"flash8"],
pt.movieURL=(8===d?"soundmanager2.swf":"soundmanager2_flash9.swf").replace(".swf",e),
pt.features.peakData=pt.features.waveformData=pt.features.eqData=d>8;
},A=function(e,t){
return _t?void _t._setPolling(e,t):!1;
},k=function(){
if(pt.debugURLParam.test(bt)&&(pt.debugMode=!0),s(pt.debugID))return!1;
var e,t,n,o,i;
if(!(!pt.debugMode||s(pt.debugID)||Yt&&pt.useConsole&&pt.consoleOnly)){
e=Ot.createElement("div"),e.id=pt.debugID+"-toggle",o={
position:"fixed",
bottom:"0px",
right:"0px",
width:"1.2em",
height:"1.2em",
lineHeight:"1.2em",
margin:"2px",
textAlign:"center",
border:"1px solid #999",
cursor:"pointer",
background:"#fff",
color:"#333",
zIndex:10001
},e.appendChild(Ot.createTextNode("-")),e.onclick=j,e.title="Toggle SM2 debug console",
vt.match(/msie 6/i)&&(e.style.position="absolute",e.style.cursor="hand");
for(i in o)o.hasOwnProperty(i)&&(e.style[i]=o[i]);
if(t=Ot.createElement("div"),t.id=pt.debugID,t.style.display=pt.debugMode?"block":"none",
pt.debugMode&&!s(e.id)){
try{
n=I(),n.appendChild(e);
}catch(a){
throw new Error(N("domError")+" \n"+a.toString());
}
n.appendChild(t);
}
}
n=null;
},$=this.getSoundById,h=function(e,t){
return e?pt._wD(N(e),t):"";
},j=function(){
var e=s(pt.debugID),t=s(pt.debugID+"-toggle");
return e?(Mt?(t.innerHTML="+",e.style.display="none"):(t.innerHTML="-",e.style.display="block"),
void(Mt=!Mt)):!1;
},f=function(e,n,o){
if(window.sm2Debugger!==t)try{
sm2Debugger.handleEvent(e,n,o);
}catch(i){
return!1;
}
return!0;
},B=function(){
var e=[];
return pt.debugMode&&e.push(W.sm2Debug),pt.debugFlash&&e.push(W.flashDebug),pt.useHighPerformance&&e.push(W.highPerf),
e.join(" ");
},U=function(){
var e=N("fbHandler"),t=pt.getMoviePercent(),n=W,o={
type:"FLASHBLOCK"
};
return pt.html5Only?!1:void(pt.ok()?(pt.didFlashBlock&&pt._wD(e+": Unblocked"),pt.oMC&&(pt.oMC.className=[B(),n.swfDefault,n.swfLoaded+(pt.didFlashBlock?" "+n.swfUnblocked:"")].join(" "))):(Bt&&(pt.oMC.className=B()+" "+n.swfDefault+" "+(null===t?n.swfTimedout:n.swfError),
pt._wD(e+": "+N("fbTimeout")+(t?" ("+N("fbLoaded")+")":""))),pt.didFlashBlock=!0,
y({
type:"ontimeout",
ignoreInit:!0,
error:o
}),E(o)));
},g=function(e,n,o){
Dt[e]===t&&(Dt[e]=[]),Dt[e].push({
method:n,
scope:o||null,
fired:!1
});
},y=function(e){
if(e||(e={
type:pt.ok()?"onready":"ontimeout"
}),!Pt&&e&&!e.ignoreInit)return!1;
if("ontimeout"===e.type&&(pt.ok()||St&&!e.ignoreInit))return!1;
var t,n,o={
success:e&&e.ignoreInit?pt.ok():!St
},i=e&&e.type?Dt[e.type]||[]:[],a=[],s=[o],r=Bt&&!pt.ok();
for(e.error&&(s[0].error=e.error),t=0,n=i.length;n>t;t++)i[t].fired!==!0&&a.push(i[t]);
if(a.length)for(t=0,n=a.length;n>t;t++)a[t].scope?a[t].method.apply(a[t].scope,s):a[t].method.apply(this,s),
r||(a[t].fired=!0);
return!0;
},w=function(){
window.setTimeout(function(){
pt.useFlashBlock&&U(),y(),"function"==typeof pt.onload&&(h("onload",1),pt.onload.apply(window),
h("onloadOK",1)),pt.waitForWindowLoad&&at.add(window,"load",w);
},1);
},lt=function(){
if(rt!==t)return rt;
var e,n,o,i=!1,a=navigator,s=a.plugins,r=window.ActiveXObject;
if(s&&s.length)n="application/x-shockwave-flash",o=a.mimeTypes,o&&o[n]&&o[n].enabledPlugin&&o[n].enabledPlugin.description&&(i=!0);else if(r!==t&&!vt.match(/MSAppHost/i)){
try{
e=new r("ShockwaveFlash.ShockwaveFlash");
}catch(l){
e=null;
}
i=!!e,e=null;
}
return rt=i,i;
},Z=function(){
var e,t,n=pt.audioFormats,o=Vt&&!!vt.match(/os (1|2|3_0|3_1)/i);
if(o?(pt.hasHTML5=!1,pt.html5Only=!0,pt.oMC&&(pt.oMC.style.display="none")):pt.useHTML5Audio&&(pt.html5&&pt.html5.canPlayType||(pt._wD("SoundManager: No HTML5 Audio() support detected."),
pt.hasHTML5=!1),Zt&&pt._wD(yt+"Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - "+(rt?"will use flash fallback for MP3/MP4, if available":" would use flash fallback for MP3/MP4, but none detected."),1)),
pt.useHTML5Audio&&pt.hasHTML5){
G=!0;
for(t in n)n.hasOwnProperty(t)&&n[t].required&&(pt.html5.canPlayType(n[t].type)?pt.preferFlash&&(pt.flash[t]||pt.flash[n[t].type])&&(e=!0):(G=!1,
e=!0));
}
return pt.ignoreFlash&&(e=!1,G=!0),pt.html5Only=pt.hasHTML5&&pt.useHTML5Audio&&!e,
!pt.html5Only;
},z=function(e){
var t,n,o,i=0;
if(e instanceof Array){
for(t=0,n=e.length;n>t;t++)if(e[t]instanceof Object){
if(pt.canPlayMIME(e[t].type)){
i=t;
break;
}
}else if(pt.canPlayURL(e[t])){
i=t;
break;
}
e[i].url&&(e[i]=e[i].url),o=e[i];
}else o=e;
return o;
},K=function(e){
e._hasTimer||(e._hasTimer=!0,!Gt&&pt.html5PollingInterval&&(null===Nt&&0===Rt&&(Nt=setInterval(X,pt.html5PollingInterval)),
Rt++));
},J=function(e){
e._hasTimer&&(e._hasTimer=!1,!Gt&&pt.html5PollingInterval&&Rt--);
},X=function(){
var e;
if(null!==Nt&&!Rt)return clearInterval(Nt),Nt=null,!1;
for(e=pt.soundIDs.length-1;e>=0;e--)pt.sounds[pt.soundIDs[e]].isHTML5&&pt.sounds[pt.soundIDs[e]]._hasTimer&&pt.sounds[pt.soundIDs[e]]._onTimer();
},E=function(e){
e=e!==t?e:{},"function"==typeof pt.onerror&&pt.onerror.apply(window,[{
type:e.type!==t?e.type:null
}]),e.fatal!==t&&e.fatal&&pt.disable();
},ut=function(){
if(!Zt||!lt())return!1;
var e,t,n=pt.audioFormats;
for(t in n)if(n.hasOwnProperty(t)&&("mp3"===t||"mp4"===t)&&(pt._wD(gt+": Using flash fallback for "+t+" format"),
pt.html5[t]=!1,n[t]&&n[t].related))for(e=n[t].related.length-1;e>=0;e--)pt.html5[n[t].related[e]]=!1;
},this._setSandboxType=function(e){
var n=pt.sandbox;
n.type=e,n.description=n.types[n.types[e]!==t?e:"unknown"],"localWithFile"===n.type?(n.noRemote=!0,
n.noLocal=!1,h("secNote",2)):"localWithNetwork"===n.type?(n.noRemote=!1,n.noLocal=!0):"localTrusted"===n.type&&(n.noRemote=!1,
n.noLocal=!1);
},this._externalInterfaceOK=function(e){
if(pt.swfLoaded)return!1;
var t;
return f("swf",!0),f("flashtojs",!0),pt.swfLoaded=!0,tn=!1,Zt&&ut(),e&&e.replace(/\+dev/i,"")===pt.versionNumber.replace(/\+dev/i,"")?void setTimeout(u,$t?100:1):(t=gt+': Fatal: JavaScript file build "'+pt.versionNumber+'" does not match Flash SWF build "'+e+'" at '+pt.url+". Ensure both are up-to-date.",
setTimeout(function(){
throw new Error(t);
},0),!1);
},H=function(e,n){
function o(){
var e,t=[],n=[],o=" + ";
e="SoundManager "+pt.version+(!pt.html5Only&&pt.useHTML5Audio?pt.hasHTML5?" + HTML5 audio":", no HTML5 audio support":""),
pt.html5Only?pt.html5PollingInterval&&t.push("html5PollingInterval ("+pt.html5PollingInterval+"ms)"):(pt.preferFlash&&t.push("preferFlash"),
pt.useHighPerformance&&t.push("useHighPerformance"),pt.flashPollingInterval&&t.push("flashPollingInterval ("+pt.flashPollingInterval+"ms)"),
pt.html5PollingInterval&&t.push("html5PollingInterval ("+pt.html5PollingInterval+"ms)"),
pt.wmode&&t.push("wmode ("+pt.wmode+")"),pt.debugFlash&&t.push("debugFlash"),pt.useFlashBlock&&t.push("flashBlock")),
t.length&&(n=n.concat([t.join(o)])),pt._wD(e+(n.length?o+n.join(", "):""),1),ft();
}
function i(e,t){
return'<param name="'+e+'" value="'+t+'" />';
}
if(Lt&&Tt)return!1;
if(pt.html5Only)return O(),o(),pt.oMC=s(pt.movieID),u(),Lt=!0,Tt=!0,!1;
var a,r,l,d,f,h,c,p,m=n||pt.url,_=pt.altURL||m,g="JS/Flash audio component (SoundManager 2)",y=I(),w=B(),v=null,b=Ot.getElementsByTagName("html")[0];
if(v=b&&b.dir&&b.dir.match(/rtl/i),e=e===t?pt.id:e,O(),pt.url=R(rn?m:_),n=pt.url,
pt.wmode=!pt.wmode&&pt.useHighPerformance?"transparent":pt.wmode,null!==pt.wmode&&(vt.match(/msie 8/i)||!$t&&!pt.useHighPerformance)&&navigator.platform.match(/win32|win64/i)&&(Ut.push(M.spcWmode),
pt.wmode=null),a={
name:e,
id:e,
src:n,
quality:"high",
allowScriptAccess:pt.allowScriptAccess,
bgcolor:pt.bgColor,
pluginspage:ln+"www.macromedia.com/go/getflashplayer",
title:g,
type:"application/x-shockwave-flash",
wmode:pt.wmode,
hasPriority:"true"
},pt.debugFlash&&(a.FlashVars="debug=1"),pt.wmode||delete a.wmode,$t)r=Ot.createElement("div"),
d=['<object id="'+e+'" data="'+n+'" type="'+a.type+'" title="'+a.title+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+ln+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',i("movie",n),i("AllowScriptAccess",pt.allowScriptAccess),i("quality",a.quality),pt.wmode?i("wmode",pt.wmode):"",i("bgcolor",pt.bgColor),i("hasPriority","true"),pt.debugFlash?i("FlashVars",a.FlashVars):"","</object>"].join("");else{
r=Ot.createElement("embed");
for(l in a)a.hasOwnProperty(l)&&r.setAttribute(l,a[l]);
}
if(k(),w=B(),y=I())if(pt.oMC=s(pt.movieID)||Ot.createElement("div"),pt.oMC.id)p=pt.oMC.className,
pt.oMC.className=(p?p+" ":W.swfDefault)+(w?" "+w:""),pt.oMC.appendChild(r),$t&&(f=pt.oMC.appendChild(Ot.createElement("div")),
f.className=W.swfBox,f.innerHTML=d),Tt=!0;else{
if(pt.oMC.id=pt.movieID,pt.oMC.className=W.swfDefault+" "+w,h=null,f=null,pt.useFlashBlock||(pt.useHighPerformance?h={
position:"fixed",
width:"8px",
height:"8px",
bottom:"0px",
left:"0px",
overflow:"hidden"
}:(h={
position:"absolute",
width:"6px",
height:"6px",
top:"-9999px",
left:"-9999px"
},v&&(h.left=Math.abs(parseInt(h.left,10))+"px"))),Kt&&(pt.oMC.style.zIndex=1e4),
!pt.debugFlash)for(c in h)h.hasOwnProperty(c)&&(pt.oMC.style[c]=h[c]);
try{
$t||pt.oMC.appendChild(r),y.appendChild(pt.oMC),$t&&(f=pt.oMC.appendChild(Ot.createElement("div")),
f.className=W.swfBox,f.innerHTML=d),Tt=!0;
}catch(D){
throw new Error(N("domError")+" \n"+D.toString());
}
}
return Lt=!0,o(),!0;
},L=function(){
return pt.html5Only?(H(),!1):_t?!1:pt.url?(_t=pt.getMovie(pt.id),_t||(At?($t?pt.oMC.innerHTML=kt:pt.oMC.appendChild(At),
At=null,Lt=!0):H(pt.id,pt.url),_t=pt.getMovie(pt.id)),"function"==typeof pt.oninitmovie&&setTimeout(pt.oninitmovie,1),
ht(),!0):(h("noURL"),!1);
},v=function(){
setTimeout(b,1e3);
},b=function(){
var e,t=!1;
return pt.url?Ct?!1:(Ct=!0,at.remove(window,"load",v),tn&&!en?(h("waitFocus"),!1):(Pt||(e=pt.getMoviePercent(),
e>0&&100>e&&(t=!0)),void setTimeout(function(){
return e=pt.getMoviePercent(),t?(Ct=!1,pt._wD(N("waitSWF")),window.setTimeout(v,1),
!1):(Pt||(pt._wD(gt+": No Flash response within expected time. Likely causes: "+(0===e?"SWF load failed, ":"")+"Flash blocked or JS-Flash security error."+(pt.debugFlash?" "+N("checkSWF"):""),2),
!rn&&e&&(h("localFail",2),pt.debugFlash||h("tryDebug",2)),0===e&&pt._wD(N("swf404",pt.url),1),
f("flashtojs",!1," (Check flash security or flash blockers)")),void(!Pt&&nn&&(null===e?pt.useFlashBlock||0===pt.flashLoadTimeout?(pt.useFlashBlock&&U(),
h("waitForever")):!pt.useFlashBlock&&G?window.setTimeout(function(){
Q(yt+"useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false..."),
pt.setup({
preferFlash:!1
}).reboot(),pt.didFlashBlock=!0,pt.beginDelayedInit();
},1):(h("waitForever"),y({
type:"ontimeout",
ignoreInit:!0
})):0===pt.flashLoadTimeout?h("waitForever"):x(!0))));
},pt.flashLoadTimeout))):!1;
},D=function(){
function e(){
at.remove(window,"focus",D);
}
return en||!tn?(e(),!0):(nn=!0,en=!0,h("gotFocus"),Ct=!1,v(),e(),!0);
},ht=function(){
Ut.length&&(pt._wD("SoundManager 2: "+Ut.join(" "),1),Ut=[]);
},ft=function(){
ht();
var e,t=[];
if(pt.useHTML5Audio&&pt.hasHTML5){
for(e in pt.audioFormats)pt.audioFormats.hasOwnProperty(e)&&t.push(e+" = "+pt.html5[e]+(!pt.html5[e]&&Bt&&pt.flash[e]?" (using flash)":pt.preferFlash&&pt.flash[e]&&Bt?" (preferring flash)":pt.html5[e]?"":" ("+(pt.audioFormats[e].required?"required, ":"")+"and no flash support)"));
pt._wD("SoundManager 2 HTML5 support: "+t.join(", "),1);
}
},c=function(e){
if(Pt)return!1;
if(pt.html5Only)return h("sm2Loaded"),Pt=!0,w(),f("onload",!0),!0;
var t,n=pt.useFlashBlock&&pt.flashLoadTimeout&&!pt.getMoviePercent(),o=!0;
return n||(Pt=!0,St&&(t={
type:!rt&&Bt?"NO_FLASH":"INIT_TIMEOUT"
})),pt._wD("SoundManager 2 "+(St?"failed to load":"loaded")+" ("+(St?"Flash security/load error":"OK")+")",St?2:1),
St||e?(pt.useFlashBlock&&pt.oMC&&(pt.oMC.className=B()+" "+(null===pt.getMoviePercent()?W.swfTimedout:W.swfError)),
y({
type:"ontimeout",
error:t,
ignoreInit:!0
}),f("onload",!1),E(t),o=!1):f("onload",!0),St||(pt.waitForWindowLoad&&!Ft?(h("waitOnload"),
at.add(window,"load",w)):(pt.waitForWindowLoad&&Ft&&h("docLoaded"),w())),o;
},l=function(){
var e,n=pt.setupOptions;
for(e in n)n.hasOwnProperty(e)&&(pt[e]===t?pt[e]=n[e]:pt[e]!==n[e]&&(pt.setupOptions[e]=pt[e]));
},u=function(){
function e(){
at.remove(window,"load",pt.beginDelayedInit);
}
if(Pt)return h("didInit"),!1;
if(pt.html5Only)return Pt||(e(),pt.enabled=!0,c()),!0;
L();
try{
_t._externalInterfaceTest(!1),A(!0,pt.flashPollingInterval||(pt.useHighPerformance?10:50)),
pt.debugMode||_t._disableDebug(),pt.enabled=!0,f("jstoflash",!0),pt.html5Only||at.add(window,"unload",r);
}catch(t){
return pt._wD("js/flash exception: "+t.toString()),f("jstoflash",!1),E({
type:"JS_TO_FLASH_EXCEPTION",
fatal:!0
}),x(!0),c(),!1;
}
return c(),e(),!0;
},P=function(){
return F?!1:(F=!0,l(),k(),function(){
var e="sm2-usehtml5audio=",t="sm2-preferflash=",n=null,o=null,i=bt.toLowerCase();
-1!==i.indexOf(e)&&(n="1"===i.charAt(i.indexOf(e)+e.length),Yt&&console.log((n?"Enabling ":"Disabling ")+"useHTML5Audio via URL parameter"),
pt.setup({
useHTML5Audio:n
})),-1!==i.indexOf(t)&&(o="1"===i.charAt(i.indexOf(t)+t.length),Yt&&console.log((o?"Enabling ":"Disabling ")+"preferFlash via URL parameter"),
pt.setup({
preferFlash:o
}));
}(),!rt&&pt.hasHTML5&&(pt._wD("SoundManager: No Flash detected"+(pt.useHTML5Audio?". Trying HTML5-only mode.":", enabling HTML5."),1),
pt.setup({
useHTML5Audio:!0,
preferFlash:!1
})),it(),!rt&&Bt&&(Ut.push(M.needFlash),pt.setup({
flashLoadTimeout:1
})),Ot.removeEventListener&&Ot.removeEventListener("DOMContentLoaded",P,!1),L(),
!0);
},ot=function(){
return"complete"===Ot.readyState&&(P(),Ot.detachEvent("onreadystatechange",ot)),
!0;
},S=function(){
Ft=!0,at.remove(window,"load",S);
},T=function(){
Gt&&((!pt.setupOptions.useHTML5Audio||pt.setupOptions.preferFlash)&&Ut.push(M.mobileUA),
pt.setupOptions.useHTML5Audio=!0,pt.setupOptions.preferFlash=!1,(Vt||Qt&&!vt.match(/android\s2\.3/i))&&(Ut.push(M.globalHTML5),
Vt&&(pt.ignoreFlash=!0),jt=!0));
},T(),lt(),at.add(window,"focus",D),at.add(window,"load",v),at.add(window,"load",S),
Ot.addEventListener?Ot.addEventListener("DOMContentLoaded",P,!1):Ot.attachEvent?Ot.attachEvent("onreadystatechange",ot):(f("onload",!1),
E({
type:"NO_DOM2_EVENTS",
fatal:!0
}));
}
var t,n=null;
return void 0!==window.SM2_DEFER&&SM2_DEFER||(n=new e),window.soundManager=n,n;
});define("tpl/pagebar.html.js", [], function(e, t, n) {
return '<div class="pagination">\n    <span class="page_nav_area">\n        <a href="javascript:void(0);" class="btn page_first">{firstButtonText}</a>\n        <a href="javascript:void(0);" class="btn page_prev"><i class="arrow"></i></a>\n        {if isSimple}\n            <span class="page_num">\n                <label>{initShowPage}</label>\n                <span class="num_gap">/</span>\n                <label>{endPage}</label>\n            </span>\n        {else}\n            {each startRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav">{pageIndex}</a>\n            {/each}\n            <span class="gap_prev">...</span>\n            {each midRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav js_mid">{pageIndex}</a>\n            {/each}\n            <span class="gap_next">...</span>\n            {each endRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav">{pageIndex}</a>\n            {/each}\n        {/if}\n        <a href="javascript:void(0);" class="btn page_next"><i class="arrow"></i></a>\n        <a href="javascript:void(0);" class="btn page_last">{lastButtonText}</a>            \n    </span>\n    {if (endPage>1)}\n    <span class="goto_area">\n        <input type="text">\n        <a href="javascript:void(0);" class="btn page_go">跳转</a>\n    </span>\n    {/if}\n</div>\n';
});define("tpl/popup.html.js",[],function(){
return'<div class="dialog_wrp {className}" style="{if width}width:{width}px;{/if}{if height}height:{height}px;{/if}">\n	<div class="dialog">\n		<div class="dialog_hd">\n			<h3>{title}</h3>\n			<!--#0001#-->\n			<a href="javascript:;" onclick="return false" class="icon16_opr closed pop_closed">关闭</a>\n			<!--%0001%-->\n		</div>\n		<div class="dialog_bd">{=content}</div>\n		{if buttons && buttons.length}\n		<div class="dialog_ft">\n			{each buttons as bt index}\n            <span class="btn {bt.type} btn_input js_btn_p"><button type="button" class="js_btn" data-index="{index}">{bt.text}</button></span>\n	        {/each}\n		</div>\n		{/if}\n	</div>\n</div>{if mask}<div class="mask"><iframe frameborder="0" style="filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);position:absolute;top:0px;left:0px;width:100%;height:100%;" src="about:blank"></iframe></div>{/if}\n';
});define("common/wx/widgetBridge.js", [], function(e, t, n) {
try {
var r = +(new Date);
"use strict", $.widgetBridge || ($.widgetBridge = function(e, t) {
var n = e, r = n.split("."), e = r.length > 1 ? r[1] : r[0];
$.fn[e] = function(r) {
var i = typeof r == "string", s = [].slice.call(arguments, 1), o = this;
r = r || {};
if (i) {
var u;
return r.indexOf("_") !== 0 && this.each(function() {
var t = $.data(this, n);
if (!t) return $.error("cannot call methods on " + e + " prior to initialization; " + "attempted to call method '" + r + "'");
if (r === "instance") return u = t, !1;
if (r === "option") return u = t.options, !1;
u || (u = (t[r] || jQuery.noop).apply(t, s)), r === "destroy" && (t.elements = null);
}), u;
}
var a = this;
return this.each(function() {
var e = this, i = $.data(this, n);
if (!i) {
i = $.extend(!0, {}, t), i.destroy || (i.destroy = function() {
$.removeData(e, n);
}), i.options = $.extend(!0, i.options || {}, r), i.element = $(this), i.elements = a, i._create && (o = i._create.call(i, r));
var s = o && o.length && o.get(0) || this;
$.data(s, n, i);
}
}), o;
};
});
} catch (i) {
wx.jslog({
src: "common/wx/widgetBridge.js"
}, i);
}
});define("common/qq/events.js", [], function(e, t, n) {
try {
var r = +(new Date);
"use strict";
function i(e) {
e === !0 ? this.data = window.wx.events || {} : this.data = {};
}
i.prototype = {
on: function(e, t) {
return this.data[e] = this.data[e] || [], this.data[e].push(t), this;
},
off: function(e, t) {
this.data[e] && this.data[e].length > 0 && (t && typeof t == "function" ? $.each(this.data[e], function(n, r) {
r === t && this.data[e].splice(n, 1);
}) : this.data[e] = []);
},
trigger: function(e) {
var t = arguments;
this.data[e] && this.data[e].length > 0 && $.each(this.data[e], function(e, n) {
var r = n.apply(this, Array.prototype.slice.call(t, 1));
if (r === !1) return !1;
});
}
}, n.exports = function(e) {
return new i(e);
};
} catch (s) {
wx.jslog({
src: "common/qq/events.js"
}, s);
}
});