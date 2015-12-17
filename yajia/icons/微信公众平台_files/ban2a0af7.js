define("tpl/media/dialog/audiomsg_layout.html.js",[],function(){
return'{if curnum == 0}\n<div class="media_list_tips_wrp tips_global">\n    <span class="tips">暂无素材</span>\n    <span class="vm_box"></span>\n</div>\n{else}\n<div class="media_list_tips_wrp" style="display:none;">\n    <i class="icon_loading_small white">loading...</i>\n    <span class="vm_box"></span>\n</div>\n<div class="qqmusic_list" id="js_audiomsg_list">\n    {each list as item}\n    <label class="frm_radio_label qqmusic_item">\n        <i class="icon_radio"></i>\n        <span class="lbl_content">\n            <span class="qqmusic_meta qqmusic_thumb_info">\n                <span class="songname" id=\'songname_{item.songid}\'>{item.songname}</span> \n                <span class="singername" id=\'singername_{item.songid}\'>{item.singername}</span> \n            </span>\n            <span class="qqmusic_meta qqmusic_songsize">{item.songsize}</span> \n            <span class="qqmusic_meta qqmusic_songtime">{item.songtime}</span>  \n            <span class=\'qqmusic_meta qqmusic_audioplay\'  play_length=\'{item.play_length}\' id=\'url_{item.songid}\' audioid=\'{item.songid}\' audiourl=\'{item.m4a}\' mid=\'{item.mid}\' songid=\'{item.songid}\' albumurl=\'{item.albumurl}\'></span>\n        </span>\n        <input type="radio" class="frm_radio" value=\'{item.songid}\'>\n    </label>\n    {/each}\n</div>\n<div class="js_pagebar pagination_wrp" id=\'js_pagebar\'></div>\n{/if}\n';
});define("tpl/mpEditor/plugin/music.html.js",[],function(){
return'<div>\n    <div class="global_mod qqmusic_box_hd float_layout gap_top" id="searchDiv">\n        <span class="global_info frm_input_box search with_del append">\n            <a class="del_btn" onclick="return false" href="javascript:;" id="searchCloseBt"><i class="icon_search_del"></i>&nbsp;</a>\n            <a onclick="return false" id="searchBt" href="javascript:;" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a> \n            <input id="keyInput" type="text" placeholder="歌名/作者" value="" class="frm_input">\n        </span>\n        <p class="global_extra gap_top_item tips_global">\n            音乐数据由 <a href="http://cp.music.qq.com" target="_blank">QQ音乐</a> 版权提供        </p>\n    </div>\n    <input type=\'hidden\' id=\'inputSelectedMusicId\' value= \'\'>\n    <div class="qqmusic_box_bd qqmusic_list_container" id="dialog_audio_container"></div>\n</div>\n';
});define("tpl/preview.html.js",[],function(){
return'<div class="mask preview_mask"></div>\n<div class="img_preview_container" id="preview_container">\n    <div class="img_preview_inner" id="img_container">\n        <img src="/mpres/htmledition/images/icon/common/icon32_loading_dark.gif" id="loading_dom">\n        <span class="img_preview_wrp" style="display:none;" id="img_dom">\n            <img src="{imgsrc}">\n            <!--#0001#-->\n            <a href="javascript:;" class="img_preview_close" id="closebtn" title="关闭"><i class="icon_img_preview_close">关闭</i></a>\n            <!--%0001%-->\n        </span>\n        <span class="vm_box"></span>\n    </div>\n    <span class="vm_box"></span>\n    {if !prev}\n    <div class="img_preview_opr_container prev_disabled" id="img_opr_container">\n    {else if !next}\n    <div class="img_preview_opr_container next_disabled" id="img_opr_container">\n    {else}\n    <div class="img_preview_opr_container" id="img_opr_container">\n    {/if}\n        <ul class="img_preview_opr_list">\n            <li class="img_preview_opr_item"><a href="javascript:;" id="btnview" title="查看原图"><i class="icon_img_preview origin">查看原图</i>&nbsp;</a></li>\n            {if view}<li class="img_preview_opr_item"><a href="javascript:;" id="btnprev" title="查看上一个"><i class="icon_img_preview prev">上一个</i>&nbsp;</a></li>{/if}\n            {if view}<li class="img_preview_opr_item"><a href="javascript:;" id="btnnext" title="查看下一个"><i class="icon_img_preview next">下一个</i>&nbsp;</a></li>{/if}\n            {if downsrc}<li class="img_preview_opr_item"><a href="{downsrc}" id="btndown" title="下载图片"><i class="icon_img_preview download">下载图片</i>&nbsp;</a></li>{/if}\n        </ul>\n    </div>\n</div>\n';
});define("tpl/media/dialog/image_water.html.js",[],function(){
return'<div>\n    {if status == 3}\n    <p>不添加水印</p>\n    {else if status == 2}\n    <p>水印类型：公众号名称</p>\n    {else if status == 1}\n    <p>水印类型：微信号</p>\n    {/if}\n\n    <p>\n        {if status == 3}\n        <span>已关闭水印，所有上传的图片都不会带有水印。若需修改请前往</span>\n        {else}\n        <span>已开启水印，所有上传的图片都将自动带上水印。若需修改请前往</span>\n        {/if}\n        <a target="_blank" href="{set_water_url}">公众号设置/功能设置</a>\n        设置图片水印。\n    </p>\n</div>\n';
});define("tpl/media/dialog/image_group.html.js",[],function(){
return'{each file_group_list.file_group as item}\n<dd id="js_group{item.id}" class="inner_menu_item js_groupitem{if item.id == group} selected{/if}" data-groupid="{item.id}">\n    <a href="javascript:;" class="inner_menu_link" title="{item.name}" onclick="return false">\n        <strong>{item.name}</strong><em class="num">(<span>{item.count}</span>)</em>\n    </a>\n</dd>\n{/each}\n';
});define("tpl/media/dialog/image_list.html.js",[],function(){
return'{if file_item.length == 0}\n<div class="empty_tips">该分组暂时没有图片素材</div>\n{else}\n{each file_item as item}\n<li class="img_item js_imageitem" data-id="{item.file_id}" data-url="{item.cdn_url}" data-oristatus="{item.copyright_status||0}" data-format="{item.img_format}">\n    <label class="frm_checkbox_label{if item.selected} selected{/if} img_item_bd">\n        {if scene == \'cdn\' && item.cdn_url}\n        <img src="{item.cdn_url}" alt="{item.name}" class="pic">\n        {else}\n        <img src="{item.img_url}" alt="{item.name}" class="pic">\n        {/if}\n        <span class="lbl_content">\n            {if item.copyright_status==2}\n            <i class="icon_original accessed"></i>\n            {/if}            \n            {item.name}\n        </span>\n        <div class="selected_mask">\n            <div class="selected_mask_inner"></div>\n            <div class="selected_mask_icon"></div>\n        </div>\n    </label>\n</li>\n{/each}\n{/if}\n';
});define("tpl/media/dialog/image_layout.html.js",[],function(){
return'<div class="img_pick_panel inner_container_box side_l cell_layout">\n    <div class="inner_side">\n        <div class="group_list">\n            <div class="inner_menu_box">\n                <dl class="inner_menu js_group"></dl>\n            </div>                    \n        </div>\n    </div>\n    <div class="inner_main">\n        <div class="img_pick_area">\n            <div class="sub_title_bar in_dialog">\n                <div class="upload_box r align_right">\n                    <span class="upload_area"><a id="js_imageupload" class="btn btn_primary js_imageupload" data-groupid="">本地上传</a></span>\n                </div>\n                <div class="img_water_tips mini_tips icon_after r weak_text">\n                    {if desc}{desc}{/if}<span class="js_water"></span>\n                    <i class="js_water_tips icon_msg_mini ask"></i>\n                </div>\n            </div>\n            <div>\n                <div class="img_pick">\n                    <i class="icon_loading_small white js_loading"></i>\n                    <ul class="group js_list img_list"></ul>\n                </div>\n                <div class="js_pagebar"></div>\n            </div>\n        </div>\n    </div>\n    <p class="dialog_ft_desc">已选<span class="js_selected">0</span>个，可选{maxSelect}个</p>\n</div>\n';
});define("common/wx/pagebar.js",["widget/pagination.css","tpl/pagebar.html.js","common/qq/Class.js","common/wx/Tips.js"],function(t,e){
"use strict";
var i,n,s,a=(t("widget/pagination.css"),t("tpl/pagebar.html.js")),r=t("common/qq/Class.js"),h=t("common/wx/Tips.js");
s=template.compile(a),i=e,n={
first:"首页",
last:"末页",
prev:"上页",
next:"下页",
startPage:1,
initShowPage:1,
perPage:10,
startRange:1,
midRange:3,
endRange:1,
totalItemsNum:0,
container:"",
callback:null,
isNavHide:!1,
isSimple:!0
};
var o=function(t,e,i){
var n;
return n=t+(e-1),n=n>i?i:n;
},g=function(t,e,i){
var n;
return n=i%2===0?e-(i/2-1):e-(i-1)/2,n=t>n?t:n;
},u=function(t,e,i){
var n;
return n=e%2===0?parseInt(t)+e/2:parseInt(t)+(e-1)/2,n=n>i?i:n;
},c=function(t,e,i){
var n;
return n=e-(i-1),n=t>n?t:n;
},l=function(t,e){
if(e[t]&&isNaN(e[t]))throw new Error("Invalid arguments: "+t+" should be a number");
},p=function(t){
if(l("perPage",t),l("totalItemsNum",t),l("startPage",t),l("startRange",t),l("midRange",t),
l("endRange",t),l("initShowPage",t),void 0!==t.callback&&null!==t.callback&&!$.isFunction(t.callback))throw new Error("Invalid arguments: callback should be a function");
},d=function(t,e,i){
var n=t.container.find(".page_"+i);
if("string"==typeof e){
var s=$(e);
0!==s.length&&(n=s);
}else{
if(e!==!1)throw new Error("Invalid Paramter: '"+i+"' should be a string or false");
n.hide();
}
return n;
},P=r.declare({
init:function(t){
if(t.totalItemsNum){
var e;
if(p(t),e=$.extend(!0,{},n,t),this._init(e),e.initShowPage<e.startPage)throw new Error("Invalid arguments: initShowPage should be larger than startPage");
if(e.initShowPage>e.endPage)throw new Error("Invalid arguments: initShowPage should be smaller than endPage");
this.paginate();
}
},
_init:function(t){
this.currentPage=t.initShowPage,this._isNextButtonShow=!0,this._isPrevButtonShow=!0,
this.uid="wxPagebar_"+ +new Date,this.initEventCenter(),this.optionsForTemplate={},
$.extend(this,t),this.container=$(t.container),this.optionsForTemplate.isSimple=t.isSimple,
this.optionsForTemplate.firstButtonText=0===$(t.first).length?t.first:n.first,this.optionsForTemplate.lastButtonText=0===$(t.last).length?t.last:n.last,
this.optionsForTemplate.nextButtonText=0===$(t.next).length?t.next:n.next,this.optionsForTemplate.prevButtonText=0===$(t.prev).length?t.prev:n.prev,
this.optionsForTemplate.isNavHide=t.isNavHide,this.generatePages(parseInt(this.totalItemsNum)),
this.gapForStartRange=this.container.find(".gap_prev"),this.gapForEndRange=this.container.find(".gap_next"),
this.firstButton=d(this,t.first,"first"),this.lastButton=d(this,t.last,"last"),this.prevButton=d(this,t.prev,"prev"),
this.nextButton=d(this,t.next,"next"),this.bindEvent();
},
initEventCenter:function(){
this.eventCenter={
eventList:[],
bind:function(t,e){
this.eventList[t]||(this.eventList[t]=[]),this.eventList[t].push(e);
},
trigger:function(t){
var e,i;
this.eventList[t]||(this.eventList[t]=[]),e=this.eventList[t];
for(var n=0;n<e.length;n++)if(i=Array.prototype.slice.call(arguments,1),e[n].apply(this,i)===!1)return!1;
},
unbind:function(t,e){
if(!this.eventList)throw new Error("The eventList was undefined");
if(!this.eventList[t])throw new Error("The event type "+t+" was not found");
if(void 0===e)this.eventList[t]=[];else for(var i=this.eventList[t],n=i.length,s=0;n>s;s++)if(i[s]===e){
i.splice(s,1);
break;
}
}
};
},
generatePages:function(t){
var e,i,n,a,r,h;
for(this.pageNum=Math.ceil(t/this.perPage),this.endPage=this.startPage+this.pageNum-1,
this.gapForStartRange=null,this.gapForEndRange=null,this.optionsForTemplate.startRange=[],
this.optionsForTemplate.midRange=[],this.optionsForTemplate.endRange=[],i=o(this.startPage,this.startRange,this.endPage),
n=g(this.startPage,this.currentPage,this.midRange),a=u(this.currentPage,this.midRange,this.endPage),
r=c(this.startPage,this.endPage,this.endRange),i>=r&&(r=i+1),e=this.startPage;i>=e;e+=1)this.optionsForTemplate.startRange.push(e);
for(var l=0,e=n;l<this.midRange;l+=1,e+=1)this.optionsForTemplate.midRange.push(e);
for(e=r;e<=this.endPage;e+=1)this.optionsForTemplate.endRange.push(e);
this.optionsForTemplate.endPage=this.endPage,this.optionsForTemplate.initShowPage=this.initShowPage,
h=s(this.optionsForTemplate),this.container.html(h),1==this.pageNum?this.container.hide():this.container.show(),
this.pages=this.container.find(".page_nav"),this.midPages=this.container.find(".js_mid"),
this.labels=this.container.find(".page_num label"),this.container.find(".pagination").attr("id",this.uid);
},
paginate:function(){
var t,e,i,n,s,a,r,h,l,p;
if(this.isSimple===!0)for(var d=0,P=this.labels.length;P>d;d++)d%2===0&&$(this.labels[d]).html(this.currentPage);else{
e=o(this.startPage,this.startRange,this.endPage),a=g(this.startPage,this.currentPage,this.midRange),
r=u(this.currentPage,this.midRange,this.endPage),h=c(this.startPage,this.endPage,this.endRange),
e>=h&&(h=e+1),e>=a&&(a=e+1),r>=h&&(r=h-1),this.pages.show(),this.pages.removeClass("current"),
p=parseInt(this.midPages.length/this.midRange);
for(var d=0,P=p;P>d;d++){
for(s=0,t=a;r>=t;t+=1)n=this.midRange*d+(t-a),l=$(this.midPages[n]),l.html(t),s+=1,
t==this.currentPage&&l.addClass("current");
for(n=this.midRange*d+s;s<this.midRange;s+=1)l=$(this.midPages[n]),l.hide(),l.removeClass("current"),
n+=1;
}
for(var d=0,P=this.pages.length;P>=d;d++)i=$(this.pages[d]),t=parseInt(i.html()),
t===parseInt(this.currentPage)&&i.addClass("current");
if(a>e+1?this.gapForStartRange.show():this.gapForStartRange.hide(),h>r+1?this.gapForEndRange.show():this.gapForEndRange.hide(),
this.isNavHide){
for(var d=this.startPage;d<=this.endPage;d+=1)this.pages.hide();
this.gapForStartRange.hide(),this.gapForEndRange.hide();
}
}
this.checkButtonShown();
},
destroy:function(){
this.container.off("click","#"+this.uid+" a.page_nav"),this.container.off("click","#"+this.uid+" a.page_go"),
this.container.off("keydown","#"+this.uid+" .goto_area input"),this.nextButton.off("click"),
this.prevButton.off("click"),this.firstButton.off("click"),this.lastButton.off("click");
},
bindEvent:function(){
this.container.on("click","#"+this.uid+" a.page_nav",this.proxy(function(t){
var e=$(t.target);
return e.hasClass("current")?!1:(this.clickPage(parseInt(e.html())),!1);
},this)),this.nextButton.on("click",this.proxy(function(t){
$(t.target);
return this.nextPage(),!1;
},this)),this.prevButton.on("click",this.proxy(function(t){
$(t.target);
return this.prevPage(),!1;
},this)),this.firstButton.on("click",this.proxy(function(t){
$(t.target);
return this.goFirstPage(),!1;
},this)),this.lastButton.on("click",this.proxy(function(t){
$(t.target);
return this.goLastPage(),!1;
},this)),this.container.on("click","#"+this.uid+" a.page_go",this.proxy(function(t){
var e=$(t.target).prev();
return this.goPage(e.val()),!1;
},this)),this.container.on("keydown","#"+this.uid+" .goto_area input",this.proxy(function(t){
return wx.isHotkey(t,"enter")?(this.container.find("a.page_go").click(),!1):void 0;
},this));
},
on:function(t,e){
this.eventCenter.bind(t,this.proxy(e,this));
},
callbackFunc:function(t){
var e={
currentPage:this.currentPage,
perPage:this.perPage,
count:this.pageNum
};
return $.isFunction(this.callback)&&this.callback(e)===!1?!1:this.eventCenter.trigger(t,e)===!1?!1:void this.paginate();
},
proxy:function(t,e){
return function(){
var i=Array.prototype.slice.call(arguments,0);
return t.apply(e,i);
};
},
nextPage:function(){
this.currentPage!==this.endPage&&(this.currentPage++,this.callbackFunc("next")===!1&&this.currentPage--);
},
prevPage:function(){
this.currentPage!==this.startPage&&(this.currentPage--,this.callbackFunc("prev")===!1&&this.currentPage++);
},
goFirstPage:function(){
var t=this.currentPage;
this.currentPage=this.startPage,this.callbackFunc("goFirst")===!1&&(this.currentPage=t);
},
goLastPage:function(){
var t=this.currentPage;
this.currentPage=this.endPage,this.callbackFunc("goLast")===!1&&(this.currentPage=t);
},
checkButtonShown:function(){
+this.currentPage===+this.startPage?this.hidePrevButton():this.showPrevButton(),
+this.currentPage===+this.endPage?this.hideNextButton():this.showNextButton();
},
goPage:function(t){
var e=this.currentPage;
return t===this.currentPage?!1:isNaN(t)?(h.err("请输入正确的页码"),!1):""===t?!1:t<this.startPage?(h.err("请输入正确的页码"),
!1):t>this.endPage?(h.err("请输入正确的页码"),!1):(this.currentPage=t,void(this.callbackFunc("go")===!1&&(this.currentPage=e)));
},
clickPage:function(t){
var e=this.currentPage;
isNaN(t)&&(t=this.startPage),this.currentPage=t<this.startPage?this.startPage:t>this.endPage?this.endPage:t,
this.callbackFunc("click")===!1&&(this.currentPage=e);
},
showNextButton:function(){
this.nextButton&&this._isNextButtonShow===!1&&(this.nextButton.show(),this._isNextButtonShow=!0);
},
showPrevButton:function(){
this.prevButton&&this._isPrevButtonShow===!1&&(this.prevButton.show(),this._isPrevButtonShow=!0);
},
hideNextButton:function(){
this.nextButton&&this._isNextButtonShow===!0&&(this.nextButton.hide(),this._isNextButtonShow=!1);
},
hidePrevButton:function(){
this.prevButton&&this._isPrevButtonShow===!0&&(this.prevButton.hide(),this._isPrevButtonShow=!1);
}
});
return e=P;
});define("tpl/tooltips.html.js",[],function(){
return'<div class="popover {parentClass}" style="display:none;position:{container_mode};{if offset.left}left:{offset.left}px;top:{offset.top}px;{/if}">\n    <div class="popover_inner">\n        <div class="popover_content">{=content}</div>\n        {if container_close}\n        <!--#0001#-->\n        <a href="javascript:;" class="popover_close icon16_common close_flat js_popover_close">关闭</a>\n        <!--%0001%-->\n        {/if}\n        {if buttons.length > 0}\n        <div class="popover_bar">\n			{each buttons as o index}\n			<a onclick="return false;" href="javascript:;" class="js_btn btn {o.type}">{o.text}</a>\n			{/each}\n        </div>\n        {/if}\n    </div>\n    <i class="popover_arrow popover_arrow_out"></i>\n    <i class="popover_arrow popover_arrow_in"></i>\n</div>\n';
});define("tpl/biz_web/ui/dropdown.html.js", [], function(e, t, n) {
return '<a href="javascript:;" class="btn dropdown_switch jsDropdownBt"><label class="jsBtLabel" {if search}contenteditable="true"{/if}>{label}</label><i class="arrow"></i></a>\n<div class="dropdown_data_container jsDropdownList">\n    <ul class="dropdown_data_list">\n        {if renderHtml}\n        {renderHtml}\n        {else}\n            {each data as o index}\n            <li class="dropdown_data_item {if o.className}{o.className}{/if}">  \n                <a onclick="return false;" href="javascript:;" class="jsDropdownItem" data-value="{o.value}" data-index="{index}" data-name="{o.name}">{o.name}</a>\n            </li>\n            {/each}        \n        {/if}\n    </ul>\n</div>\n';
});define("tpl/step.html.js", [], function(e, t, n) {
return '<ul class="processor_bar grid_line">\n    {each stepArr as item index}\n    <li class="{if (index+1==length)}no_extra{/if} step grid_item size1of{length} {item.cls}">\n        <h4>{item.name}</h4>\n    </li>\n    {/each}\n</ul>\n';
});define("tpl/biz_web/ui/checkbox.html.js", [], function(e, t, n) {
return '<label for="_checkbox_{index}" class="frm_{type}_label">\n	<i class="icon_{type}"></i>\n	<input type="{type}" class="frm_{type}" name="{name}" id="_checkbox_{index}">\n	<span class="lbl_content">{label}</span>\n</label>';
});define("tpl/uploader.html.js",[],function(){
return'<li id="uploadItem{id}" data-status="{className}" class="upload_file">\n    <strong class="upload_file_name">{fileName}</strong>\n    <span class="upload_file_size">({size})</span>\n    <div class="progress_bar"><div class="progress_bar_thumb" style="width:0%"></div></div>\n    <a href="javascript:;" data-id="{id}" class="upload_file_cancel js_cancel">取消</a>\n</li>\n';
});define("common/wx/ban.js",["tpl/ban/highlight_box.html.js","tpl/ban/page_msg.html.js","common/wx/dialog.js"],function(e,a,i){
"use strict";
var n=e("tpl/ban/highlight_box.html.js"),o=e("tpl/ban/page_msg.html.js"),t=e("common/wx/dialog.js"),p={
"mass-send":{
func_id:1,
name:"群发功能"
},
copyright:{
func_id:2,
name:"原创功能"
},
reward:{
func_id:3,
name:"赞赏功能"
},
seller:{
func_id:4,
name:"流量主功能"
},
comment:{
func_id:5,
name:"评论功能"
},
follow:{
func_id:6,
name:"被关注"
},
search:{
func_id:7,
name:"被搜索"
},
outlink:{
func_id:8,
name:"外链功能"
},
share:{
func_id:9,
name:"文章分享至朋友圈可见"
},
reply:{
func_id:10,
name:"自动回复功能",
highlight:"已禁用自动回复|你的帐号{=reason}，已被{forever}屏蔽自动回复功能{date}，期间用户将不会收到自动回复消息。",
hide:"all"
},
menu:{
func_id:11,
name:"自定义菜单功能",
highlight:"已禁用自定义菜单|你的帐号{=reason}，已被{forever}屏蔽自定义菜单功能{date}，期间自定义菜单将不可见。",
hide:"all"
},
"single-send":{
func_id:12,
name:"聊天功能",
pagemsg:"你的帐号{=reason}，已被{forever}屏蔽聊天功能{date}，期间将不可和粉丝互动聊天。"
},
preview:{
func_id:13,
name:"消息预览功能",
dialogmsg:"你的帐号{=reason}，已被{forever}屏蔽消息预览功能{date}，期间消息预览功能将不可用。"
}
},r=[{
illegal_reason_id:22,
reason_id:21e3,
reason_name:"默认",
reason_type:0,
reason_description:"涉嫌违规",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN"
},{
illegal_reason_id:3,
reason_id:90004,
reason_name:"滥用原创声明",
reason_type:0,
reason_description:"涉嫌滥用原创声明功能",
reason_rule:"《微信公众平台运营规范》3.6条规定",
wap_url:"",
pc_url:""
},{
illegal_reason_id:4,
reason_id:90005,
reason_name:"滥用赞赏",
reason_type:0,
reason_description:"涉嫌滥用赞赏功能",
reason_rule:"《微信公众平台运营规范》3.7条规定",
wap_url:"",
pc_url:""
},{
illegal_reason_id:10,
reason_id:10001,
reason_name:"垃圾广告",
reason_type:0,
reason_description:"涉嫌发布垃圾广告",
reason_rule:"《微信公众平台运营规范》4.8条规定-广告类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8"
},{
illegal_reason_id:11,
reason_id:20001,
reason_name:"政治敏感",
reason_type:0,
reason_description:"涉嫌违反相关法律法规和政策",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN"
},{
illegal_reason_id:12,
reason_id:20002,
reason_name:"色情",
reason_type:0,
reason_description:"涉及低俗、性暗示或色情信息",
reason_rule:"《微信公众平台运营规范》4.2条规定-色情及色情擦边类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=18&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_2"
},{
illegal_reason_id:13,
reason_id:20004,
reason_name:"社会事件",
reason_type:0,
reason_description:"涉嫌违反相关法律法规和政策",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN"
},{
illegal_reason_id:14,
reason_id:20006,
reason_name:"违法犯罪",
reason_type:0,
reason_description:"涉嫌违反相关法律法规和政策",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN"
},{
illegal_reason_id:15,
reason_id:20008,
reason_name:"欺诈",
reason_type:0,
reason_description:"涉嫌欺诈",
reason_rule:"《微信公众平台运营规范》4.8.1条规定-欺诈虚假广告类",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8"
},{
illegal_reason_id:16,
reason_id:20012,
reason_name:"低俗",
reason_type:0,
reason_description:"涉及低俗、性暗示或色情信息",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN"
},{
illegal_reason_id:18,
reason_id:20013,
reason_name:"冒名侵权",
reason_type:0,
reason_description:"涉嫌侵犯他人合法权益",
reason_rule:"《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1"
},{
illegal_reason_id:21,
reason_id:20106,
reason_name:"骚扰",
reason_type:0,
reason_description:"涉及骚扰信息",
reason_rule:"《微信公众平台运营规范》4.10条规定-搔扰类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=26&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_10"
},{
illegal_reason_id:23,
reason_id:90001,
reason_name:"侵犯隐私",
reason_type:0,
reason_description:"涉嫌侵犯他人隐私",
reason_rule:"《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1"
},{
illegal_reason_id:35,
reason_id:20104,
reason_name:"造遥",
reason_type:2,
reason_description:"涉嫌造谣或传谣",
reason_rule:"《微信公众平台运营规范》4.9条规定-谣言类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=25&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_9"
},{
illegal_reason_id:36,
reason_id:20105,
reason_name:"诱导分享",
reason_type:0,
reason_description:"涉嫌诱导分享",
reason_rule:"《微信公众平台运营规范》3.3.1条规定-诱导分享",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3"
},{
illegal_reason_id:40,
reason_id:90002,
reason_name:"抄袭",
reason_type:0,
reason_description:"涉嫌抄袭他人内容",
reason_rule:"《微信公众平台运营规范》4.1.2条规定-内容侵权",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1"
},{
illegal_reason_id:41,
reason_id:90003,
reason_name:"诱导关注 ",
reason_type:0,
reason_description:"涉嫌诱导关注",
reason_rule:"《微信公众平台运营规范》3.3.2条规定-诱导关注",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3"
},{
illegal_reason_id:42,
reason_id:1,
reason_name:"默认",
reason_type:1,
reason_description:"其他",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN"
},{
illegal_reason_id:43,
reason_id:2,
reason_name:"政治敏感",
reason_type:1,
reason_description:"涉嫌违反相关法律法规",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN"
},{
illegal_reason_id:44,
reason_id:3,
reason_name:"色情",
reason_type:1,
reason_description:"涉及低俗或色情信息",
reason_rule:"《微信公众平台运营规范》4.2条规定-色情及色情擦边类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=18&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_2"
},{
illegal_reason_id:45,
reason_id:4,
reason_name:"虚假认证",
reason_type:1,
reason_description:"涉嫌虚假认证",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN"
},{
illegal_reason_id:46,
reason_id:5,
reason_name:"侵权",
reason_type:1,
reason_description:"涉嫌侵犯他人合法权益",
reason_rule:"《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1"
},{
illegal_reason_id:47,
reason_id:4,
reason_name:"政治敏感",
reason_type:2,
reason_description:"涉嫌违反相关法律法规",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN"
},{
illegal_reason_id:48,
reason_id:1,
reason_name:"色情",
reason_type:2,
reason_description:"涉嫌低俗或色情",
reason_rule:"《微信公众平台运营规范》4.2条规定-色情及色情擦边类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=18&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_2"
},{
illegal_reason_id:49,
reason_id:3,
reason_name:"欺诈",
reason_type:2,
reason_description:"涉嫌欺诈",
reason_rule:"《微信公众平台运营规范》4.8.1条规定-欺诈虚假广告类",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8"
},{
illegal_reason_id:50,
reason_id:5,
reason_name:"诱导分享",
reason_type:2,
reason_description:"涉嫌诱导分享",
reason_rule:"《微信公众平台运营规范》3.3.1条规定-诱导分享",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3"
},{
illegal_reason_id:51,
reason_id:19,
reason_name:"诱导关注",
reason_type:2,
reason_description:"涉嫌诱导关注",
reason_rule:"《微信公众平台运营规范》3.3.2条规定-诱导关注",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3"
},{
illegal_reason_id:52,
reason_id:7,
reason_name:"侵犯隐私",
reason_type:2,
reason_description:"涉嫌侵犯隐私",
reason_rule:"《微信公众平台运营规范》4.1.2条规定-内容侵权",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1"
},{
illegal_reason_id:53,
reason_id:6,
reason_name:"冒名侵权",
reason_type:2,
reason_description:"涉嫌侵犯他人合法权益",
reason_rule:"《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1"
},{
illegal_reason_id:54,
reason_id:11,
reason_name:"外挂",
reason_type:2,
reason_description:"涉嫌使用外挂",
reason_rule:"《微信公众平台运营规范》3.1条规定－使用外挂行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_1"
},{
illegal_reason_id:55,
reason_id:8,
reason_name:"造遥",
reason_type:2,
reason_description:"涉嫌造谣或传谣",
reason_rule:"《微信公众平台运营规范》4.9条规定-谣言类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=25&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_9"
},{
illegal_reason_id:56,
reason_id:12,
reason_name:"骚扰",
reason_type:2,
reason_description:"涉嫌骚扰他人",
reason_rule:"《微信公众平台运营规范》4.10条规定-搔扰类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_10"
},{
illegal_reason_id:57,
reason_id:14,
reason_name:"刷粉",
reason_type:2,
reason_description:"涉嫌刷粉",
reason_rule:"《微信公众平台运营规范》3.2条规定－刷粉行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2"
},{
illegal_reason_id:58,
reason_id:13,
reason_name:"互推",
reason_type:2,
reason_description:"涉嫌互推",
reason_rule:"《微信公众平台运营规范》3.2条规定－刷粉行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2"
},{
illegal_reason_id:59,
reason_id:16,
reason_name:"抄袭",
reason_type:2,
reason_description:"涉嫌抄袭",
reason_rule:"《微信公众平台运营规范》4.1.2条规定-内容侵权",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1"
},{
illegal_reason_id:60,
reason_id:9,
reason_name:"垃圾广告",
reason_type:2,
reason_description:"涉嫌发送垃圾广告",
reason_rule:"《微信公众平台运营规范》4.8条规定-广告类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8"
},{
illegal_reason_id:61,
reason_id:10,
reason_name:"恶意注册",
reason_type:2,
reason_description:"涉嫌恶意注册",
reason_rule:"《微信公众平台运营规范》1条规定－ 注册规范",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot1"
},{
illegal_reason_id:62,
reason_id:17,
reason_name:"恶意举报",
reason_type:2,
reason_description:"涉嫌恶意举报",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN"
},{
illegal_reason_id:63,
reason_id:18,
reason_name:"违规分销",
reason_type:2,
reason_description:"涉嫌多级分销",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN"
}],_=function(e){
return e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate();
},s=function(e,a){
for(var i=$(".main_bd"),p=0,s=0;s<r.length;s++)r[s].reason_id==e.reason_id&&(p=s);
var l={};
if(l.reason='<a href="'+(r[p].pc_url?r[p].pc_url:r[0].pc_url)+'">'+r[p].reason_description+"</a>",
e.ban_time===e.unlock_time?(l.forever="永久",l.date=""):(l.forever="",l.date="至"+_(new Date(1e3*e.unlock_time))),
a.hide&&("all"===a.hide?i.children().hide():$(a.hide).hide()),a.highlight){
a.highlight=template.compile(a.highlight)(l);
var m={
title:a.highlight.split("|")[0],
desc:template.compile(a.highlight.split("|")[1])()
};
$(template.compile(n)(m)).prependTo(i);
}
if(a.pagemsg){
var c={
content:template.compile(a.pagemsg)(l)
};
$(template.compile(o)(c)).prependTo(i);
}
return a.dialogmsg&&t.show({
type:"warn",
title:"提示",
msg:"能力封禁提示|"+template.compile(a.dialogmsg)(l),
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove();
}
}]
}),!1;
},l=function(e,a,i){
var n=!0;
if(!p[a])return!0;
for(var o=0,t=e.length;t>o;o++)if(e[o].func_id==p[a].func_id){
var r=s(e[o],p[a]);
n=r&&n;
}
return!n&&i&&"function"==typeof i&&i(),n;
};
l.getReason=function(e){
if("default"==e)return r[0];
for(var a=0;a<r.length;a++)if(r[a].reason_id==e)return r[a];
return r[0];
},l.getTypeName=function(e){
for(var a in p)if(p[a].func_id==e)return p[a].name;
},i.exports=l;
});