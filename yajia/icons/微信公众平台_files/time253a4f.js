define("common/lib/MockJax.js", [], function(e, t, n) {
try {
var r = +(new Date);
(function(e) {
function t(t) {
window.DOMParser == undefined && window.ActiveXObject && (DOMParser = function() {}, DOMParser.prototype.parseFromString = function(e) {
var t = new ActiveXObject("Microsoft.XMLDOM");
return t.async = "false", t.loadXML(e), t;
});
try {
var n = (new DOMParser).parseFromString(t, "text/xml");
if (!e.isXMLDoc(n)) throw "Unable to parse XML";
var r = e("parsererror", n);
if (r.length == 1) throw "Error: " + e(n).text();
return n;
} catch (i) {
var s = i.name == undefined ? i : i.name + ": " + i.message;
return e(document).trigger("xmlParseError", [ s ]), undefined;
}
}
function n(t, n, r) {
(t.context ? e(t.context) : e.event).trigger(n, r);
}
function r(t, n) {
var i = !0;
return typeof n == "string" ? e.isFunction(t.test) ? t.test(n) : t == n : (e.each(t, function(s) {
if (n[s] === undefined) return i = !1, i;
typeof n[s] == "object" ? i = i && r(t[s], n[s]) : e.isFunction(t[s].test) ? i = i && t[s].test(n[s]) : i = i && t[s] == n[s];
}), i);
}
function i(t, n) {
if (e.isFunction(t)) return t(n);
if (e.isFunction(t.url.test)) {
if (!t.url.test(n.url)) return null;
} else {
var i = t.url.indexOf("*");
if (t.url !== n.url && i === -1 || !(new RegExp(t.url.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&").replace(/\*/g, ".+"))).test(n.url)) return null;
}
return t.data && n.data && !r(t.data, n.data) ? null : t && t.type && t.type.toLowerCase() != n.type.toLowerCase() ? null : t;
}
function s(n, r, i) {
var s = function(s) {
return function() {
return function() {
var s;
this.status = n.status, this.statusText = n.statusText, this.readyState = 4, e.isFunction(n.response) && n.response(i), r.dataType == "json" && typeof n.responseText == "object" ? this.responseText = JSON.stringify(n.responseText) : r.dataType == "xml" ? typeof n.responseXML == "string" ? (this.responseXML = t(n.responseXML), this.responseText = n.responseXML) : this.responseXML = n.responseXML : this.responseText = n.responseText;
if (typeof n.status == "number" || typeof n.status == "string") this.status = n.status;
typeof n.statusText == "string" && (this.statusText = n.statusText), s = this.onreadystatechange || this.onload, e.isFunction(s) ? (n.isTimeout && (this.status = -1), s.call(this, n.isTimeout ? "timeout" : undefined)) : n.isTimeout && (this.status = -1);
}.apply(s);
};
}(this);
n.proxy ? v({
global: !1,
url: n.proxy,
type: n.proxyType,
data: n.data,
dataType: r.dataType === "script" ? "text/plain" : r.dataType,
complete: function(e) {
n.responseXML = e.responseXML, n.responseText = e.responseText, n.status = e.status, n.statusText = e.statusText, this.responseTimer = setTimeout(s, n.responseTime || 0);
}
}) : r.async === !1 ? s() : this.responseTimer = setTimeout(s, n.responseTime || 50);
}
function o(t, n, r, i) {
return t = e.extend(!0, {}, e.mockjaxSettings, t), typeof t.headers == "undefined" && (t.headers = {}), t.contentType && (t.headers["content-type"] = t.contentType), {
status: t.status,
statusText: t.statusText,
readyState: 1,
open: function() {},
send: function() {
i.fired = !0, s.call(this, t, n, r);
},
abort: function() {
clearTimeout(this.responseTimer);
},
setRequestHeader: function(e, n) {
t.headers[e] = n;
},
getResponseHeader: function(e) {
if (t.headers && t.headers[e]) return t.headers[e];
if (e.toLowerCase() == "last-modified") return t.lastModified || (new Date).toString();
if (e.toLowerCase() == "etag") return t.etag || "";
if (e.toLowerCase() == "content-type") return t.contentType || "text/plain";
},
getAllResponseHeaders: function() {
var n = "";
return e.each(t.headers, function(e, t) {
n += e + ": " + t + "\n";
}), n;
}
};
}
function u(e, t, n) {
a(e), e.dataType = "json";
if (e.data && y.test(e.data) || y.test(e.url)) {
l(e, t, n);
var r = /^(\w+:)?\/\/([^\/?#]+)/, i = r.exec(e.url), s = i && (i[1] && i[1] !== location.protocol || i[2] !== location.host);
e.dataType = "script";
if (e.type.toUpperCase() === "GET" && s) {
var o = f(e, t, n);
return o ? o : !0;
}
}
return null;
}
function a(e) {
if (e.type.toUpperCase() === "GET") y.test(e.url) || (e.url += (/\?/.test(e.url) ? "&" : "?") + (e.jsonp || "callback") + "=?"); else if (!e.data || !y.test(e.data)) e.data = (e.data ? e.data + "&" : "") + (e.jsonp || "callback") + "=?";
}
function f(t, n, r) {
var i = r && r.context || t, s = null;
return n.response && e.isFunction(n.response) ? n.response(r) : typeof n.responseText == "object" ? e.globalEval("(" + JSON.stringify(n.responseText) + ")") : e.globalEval("(" + n.responseText + ")"), c(t, i, n), h(t, i, n), e.Deferred && (s = new e.Deferred, typeof n.responseText == "object" ? s.resolveWith(i, [ n.responseText ]) : s.resolveWith(i, [ e.parseJSON(n.responseText) ])), s;
}
function l(e, t, n) {
var r = n && n.context || e, i = e.jsonpCallback || "jsonp" + b++;
e.data && (e.data = (e.data + "").replace(y, "=" + i + "$1")), e.url = e.url.replace(y, "=" + i + "$1"), window[i] = window[i] || function(n) {
data = n, c(e, r, t), h(e, r, t), window[i] = undefined;
try {
delete window[i];
} catch (s) {}
head && head.removeChild(script);
};
}
function c(e, t, r) {
e.success && e.success.call(t, r.responseText || "", status, {}), e.global && n(e, "ajaxSuccess", [ {}, e ]);
}
function h(t, r) {
t.complete && t.complete.call(r, {}, status), t.global && n("ajaxComplete", [ {}, t ]), t.global && !--e.active && e.event.trigger("ajaxStop");
}
function p(t, n) {
var r, s, a;
typeof t == "object" ? (n = t, t = undefined) : n.url = t, s = e.extend(!0, {}, e.ajaxSettings, n);
for (var f = 0; f < m.length; f++) {
if (!m[f]) continue;
a = i(m[f], s);
if (!a) continue;
g.push(s), e.mockjaxSettings.log(a, s);
if (s.dataType === "jsonp") if (r = u(s, a, n)) return r;
return a.cache = s.cache, a.timeout = s.timeout, a.global = s.global, d(a, n), function(t, n, i, s) {
r = v.call(e, e.extend(!0, {}, i, {
xhr: function() {
return o(t, n, i, s);
}
}));
}(a, s, n, m[f]), r;
}
return v.apply(e, [ n ]);
}
function d(e, t) {
if (!(e.url instanceof RegExp)) return;
if (!e.hasOwnProperty("urlParams")) return;
var n = e.url.exec(t.url);
if (n.length === 1) return;
n.shift();
var r = 0, i = n.length, s = e.urlParams.length, o = Math.min(i, s), u = {};
for (r; r < o; r++) {
var a = e.urlParams[r];
u[a] = n[r];
}
t.urlParams = u;
}
var v = e.ajax, m = [], g = [], y = /=\?(&|$)/, b = (new Date).getTime();
e.extend({
ajax: p
}), e.mockjaxSettings = {
log: function(t, n) {
if (t.logging === !1 || typeof t.logging == "undefined" && e.mockjaxSettings.logging === !1) return;
if (window.console && console.log) {
var r = "MOCK " + n.type.toUpperCase() + ": " + n.url, i = e.extend({}, n);
if (typeof console.log == "function") console.log(r, i); else try {
console.log(r + " " + JSON.stringify(i));
} catch (s) {
console.log(r);
}
}
},
logging: !0,
status: 200,
statusText: "OK",
responseTime: 500,
isTimeout: !1,
contentType: "text/plain",
response: "",
responseText: "",
responseXML: "",
proxy: "",
proxyType: "GET",
lastModified: null,
etag: "",
headers: {
etag: "IJF@H#@923uf8023hFO@I#H#",
"content-type": "text/plain"
}
}, e.mockjax = function(e) {
var t = m.length;
return m[t] = e, t;
}, e.mockjaxClear = function(e) {
arguments.length == 1 ? m[e] = null : m = [], g = [];
}, e.mockjax.handler = function(e) {
if (arguments.length == 1) return m[e];
}, e.mockjax.mockedAjaxCalls = function() {
return g;
};
})(jQuery);
} catch (i) {
wx.jslog({
src: "common/lib/MockJax.js"
}, i);
}
});define("common/wx/cgiReport.js", [ "common/wx/Tips.js" ], function(e, t, n) {
try {
var r = +(new Date);
"use strict";
var i = e("common/wx/Tips.js");
t.error = function(e, t) {
var n = 11;
switch (e) {
case "timeout":
n = 7;
break;
case "error":
n = 8;
break;
case "notmodified":
n = 9;
break;
case "parsererror":
n = 10;
}
t.data.lang && delete t.data.lang, t.data.random && delete t.data.random, t.data.f && delete t.data.f, t.data.ajax && delete t.data.ajax, t.data.token && delete t.data.token, $.ajax({
url: "/misc/jslog?1=1",
data: {
content: "[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={userAgent}] [page={page}]".format({
uin: wx.data.uin,
useragent: window.navigator.userAgent,
page: location.href,
url: t.url,
param: $.param(t.data).substr(0, 50),
info: e
}),
id: n,
level: "error"
},
type: "POST"
}), $.ajax({
url: "/misc/jslog?1=1",
data: {
content: "[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={userAgent}] [page={page}]".format({
uin: wx.data.uin,
useragent: window.navigator.userAgent,
page: location.href,
url: t.url,
param: $.param(t.data).substr(0, 50),
info: e
}),
id: 6,
level: "error"
},
type: "POST"
}), e == "timeout" && i.err("你的网络环境较差，请稍后重试");
};
} catch (s) {
wx.jslog({
src: "common/wx/cgiReport.js"
}, s);
}
});define("common/qq/mask.js", [ "biz_web/lib/spin.js" ], function(e, t, n) {
try {
var r = +(new Date);
"use strict", e("biz_web/lib/spin.js");
var i = 0, s = '<div class="mask"></div>';
function o(e) {
if (this.mask) this.mask.show(); else {
var t = "body";
e && !!e.parent && (t = $(e.parent)), this.mask = $(s).appendTo(t), this.mask.id = "wxMask_" + ++i, this.mask.spin("flower");
}
if (e) {
if (e.spin === !1) return this;
this.mask.spin(e.spin || "flower");
}
return this;
}
o.prototype = {
show: function() {
this.mask.show();
},
hide: function() {
this.mask.hide();
},
remove: function() {
this.mask.remove();
}
}, t.show = function(e) {
return new o(e);
}, t.hide = function() {
$(".mask").hide();
}, t.remove = function() {
$(".mask").remove();
};
} catch (u) {
wx.jslog({
src: "common/qq/mask.js"
}, u);
}
});define("tpl/dialog.html.js",[],function(){
return'<div class="dialog_wrp {className}" style="{if width}width:{width}px;{/if}{if height}height:{height}px;{/if};display:none;">\n  <div class="dialog" id="{id}">\n    <div class="dialog_hd">\n      <h3>{title}</h3>\n      {if !hideClose}\n      <!--#0001#-->\n      <a href="javascript:;" class="pop_closed" onclick="return false;">关闭</a>\n      <!--%0001%-->\n      {/if}\n    </div>\n    <div class="dialog_bd">\n      <div class="page_msg large simple default {msg.msgClass}">\n        <div class="inner group">\n          <span class="msg_icon_wrapper"><i class="icon_msg {icon} "></i></span>\n          <div class="msg_content ">\n          {if msg.title}<h4>{=msg.title}</h4>{/if}\n          {if msg.text}<p>{=msg.text}</p>{/if}\n          </div>\n        </div>\n      </div>\n    </div> \n    <div class="dialog_ft">\n  	{if !hideClose}\n      {each buttons as bt index}\n      <a href="javascript:;" class="btn {bt.type} js_btn" onclick="return false;">{bt.text}</a>\n      {/each}\n  	{/if}\n    </div>\n  </div>\n</div>\n{if mask}<div class="mask"></div>{/if}\n\n';
});define("biz_common/jquery.ui/jquery.ui.draggable.js",[],function(){
!function(t,e){
function i(e,i){
var o,n,r,a=e.nodeName.toLowerCase();
return"area"===a?(o=e.parentNode,n=o.name,e.href&&n&&"map"===o.nodeName.toLowerCase()?(r=t("img[usemap=#"+n+"]")[0],
!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(a)?!e.disabled:"a"===a?e.href||i:i)&&s(e);
}
function s(e){
return t.expr.filters.visible(e)&&!t(e).parents().addBack().filter(function(){
return"hidden"===t.css(this,"visibility");
}).length;
}
var o=0,n=/^ui-id-\d+$/;
t.ui=t.ui||{},t.extend(t.ui,{
version:"1.10.3"
}),t.fn.extend({
focus:function(e){
return function(i,s){
return"number"==typeof i?this.each(function(){
var e=this;
setTimeout(function(){
t(e).focus(),s&&s.call(e);
},i);
}):e.apply(this,arguments);
};
}(t.fn.focus),
scrollParent:function(){
var e;
return e=t.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){
return/(relative|absolute|fixed)/.test(t.css(this,"position"))&&/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"));
}).eq(0):this.parents().filter(function(){
return/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"));
}).eq(0),/fixed/.test(this.css("position"))||!e.length?t(document):e;
},
zIndex:function(i){
if(i!==e)return this.css("zIndex",i);
if(this.length)for(var s,o,n=t(this[0]);n.length&&n[0]!==document;){
if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(o=parseInt(n.css("zIndex"),10),
!isNaN(o)&&0!==o))return o;
n=n.parent();
}
return 0;
},
uniqueId:function(){
return this.each(function(){
this.id||(this.id="ui-id-"+ ++o);
});
},
removeUniqueId:function(){
return this.each(function(){
n.test(this.id)&&t(this).removeAttr("id");
});
}
}),t.extend(t.expr[":"],{
data:t.expr.createPseudo?t.expr.createPseudo(function(e){
return function(i){
return!!t.data(i,e);
};
}):function(e,i,s){
return!!t.data(e,s[3]);
},
focusable:function(e){
return i(e,!isNaN(t.attr(e,"tabindex")));
},
tabbable:function(e){
var s=t.attr(e,"tabindex"),o=isNaN(s);
return(o||s>=0)&&i(e,!o);
}
}),t.extend(t.ui,{
plugin:{
add:function(e,i,s){
var o,n=t.ui[e].prototype;
for(o in s)n.plugins[o]=n.plugins[o]||[],n.plugins[o].push([i,s[o]]);
},
call:function(t,e,i){
var s,o=t.plugins[e];
if(o&&t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType)for(s=0;s<o.length;s++)t.options[o[s][0]]&&o[s][1].apply(t.element,i);
}
},
hasScroll:function(e,i){
if("hidden"===t(e).css("overflow"))return!1;
var s=i&&"left"===i?"scrollLeft":"scrollTop",o=!1;
return e[s]>0?!0:(e[s]=1,o=e[s]>0,e[s]=0,o);
}
});
}(jQuery),function(t,e){
var i=0,s=Array.prototype.slice,o=t.cleanData;
t.cleanData=function(e){
for(var i,s=0;null!=(i=e[s]);s++)try{
t(i).triggerHandler("remove");
}catch(n){}
o(e);
},t.widget=function(e,i,s){
var o,n,r,a,l={},h=e.split(".")[0];
e=e.split(".")[1],o=h+"-"+e,s||(s=i,i=t.Widget),t.expr[":"][o.toLowerCase()]=function(e){
return!!t.data(e,o);
},t[h]=t[h]||{},n=t[h][e],r=t[h][e]=function(t,e){
return this._createWidget?void(arguments.length&&this._createWidget(t,e)):new r(t,e);
},t.extend(r,n,{
version:s.version,
_proto:t.extend({},s),
_childConstructors:[]
}),a=new i,a.options=t.widget.extend({},a.options),t.each(s,function(e,s){
return t.isFunction(s)?void(l[e]=function(){
var t=function(){
return i.prototype[e].apply(this,arguments);
},o=function(t){
return i.prototype[e].apply(this,t);
};
return function(){
var e,i=this._super,n=this._superApply;
return this._super=t,this._superApply=o,e=s.apply(this,arguments),this._super=i,
this._superApply=n,e;
};
}()):void(l[e]=s);
}),r.prototype=t.widget.extend(a,{
widgetEventPrefix:n?a.widgetEventPrefix:e
},l,{
constructor:r,
namespace:h,
widgetName:e,
widgetFullName:o
}),n?(t.each(n._childConstructors,function(e,i){
var s=i.prototype;
t.widget(s.namespace+"."+s.widgetName,r,i._proto);
}),delete n._childConstructors):i._childConstructors.push(r),t.widget.bridge(e,r);
},t.widget.extend=function(i){
for(var o,n,r=s.call(arguments,1),a=0,l=r.length;l>a;a++)for(o in r[a])n=r[a][o],
r[a].hasOwnProperty(o)&&n!==e&&(i[o]=t.isPlainObject(n)?t.isPlainObject(i[o])?t.widget.extend({},i[o],n):t.widget.extend({},n):n);
return i;
},t.widget.bridge=function(i,o){
var n=o.prototype.widgetFullName||i;
t.fn[i]=function(r){
var a="string"==typeof r,l=s.call(arguments,1),h=this;
return r=!a&&l.length?t.widget.extend.apply(null,[r].concat(l)):r,this.each(a?function(){
var s,o=t.data(this,n);
return o?t.isFunction(o[r])&&"_"!==r.charAt(0)?(s=o[r].apply(o,l),s!==o&&s!==e?(h=s&&s.jquery?h.pushStack(s.get()):s,
!1):void 0):t.error("no such method '"+r+"' for "+i+" widget instance"):t.error("cannot call methods on "+i+" prior to initialization; attempted to call method '"+r+"'");
}:function(){
var e=t.data(this,n);
e?e.option(r||{})._init():t.data(this,n,new o(r,this));
}),h;
};
},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={
widgetName:"widget",
widgetEventPrefix:"",
defaultElement:"<div>",
options:{
disabled:!1,
create:null
},
_createWidget:function(e,s){
s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,
this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this.bindings=t(),
this.hoverable=t(),this.focusable=t(),s!==this&&(t.data(s,this.widgetFullName,this),
this._on(!0,this.element,{
remove:function(t){
t.target===s&&this.destroy();
}
}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),
this._create(),this._trigger("create",null,this._getCreateEventData()),this._init();
},
_getCreateOptions:t.noop,
_getCreateEventData:t.noop,
_create:t.noop,
_init:t.noop,
destroy:function(){
this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),
this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),
this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),
this.focusable.removeClass("ui-state-focus");
},
_destroy:t.noop,
widget:function(){
return this.element;
},
option:function(i,s){
var o,n,r,a=i;
if(0===arguments.length)return t.widget.extend({},this.options);
if("string"==typeof i)if(a={},o=i.split("."),i=o.shift(),o.length){
for(n=a[i]=t.widget.extend({},this.options[i]),r=0;r<o.length-1;r++)n[o[r]]=n[o[r]]||{},
n=n[o[r]];
if(i=o.pop(),s===e)return n[i]===e?null:n[i];
n[i]=s;
}else{
if(s===e)return this.options[i]===e?null:this.options[i];
a[i]=s;
}
return this._setOptions(a),this;
},
_setOptions:function(t){
var e;
for(e in t)this._setOption(e,t[e]);
return this;
},
_setOption:function(t,e){
return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),
this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),
this;
},
enable:function(){
return this._setOption("disabled",!1);
},
disable:function(){
return this._setOption("disabled",!0);
},
_on:function(e,i,s){
var o,n=this;
"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=o=t(i),this.bindings=this.bindings.add(i)):(s=i,
i=this.element,o=this.widget()),t.each(s,function(s,r){
function a(){
return e||n.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof r?n[r]:r).apply(n,arguments):void 0;
}
"string"!=typeof r&&(a.guid=r.guid=r.guid||a.guid||t.guid++);
var l=s.match(/^(\w+)\s*(.*)$/),h=l[1]+n.eventNamespace,c=l[2];
c?o.delegate(c,h,a):i.bind(h,a);
});
},
_off:function(t,e){
e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e);
},
_delay:function(t,e){
function i(){
return("string"==typeof t?s[t]:t).apply(s,arguments);
}
var s=this;
return setTimeout(i,e||0);
},
_hoverable:function(e){
this.hoverable=this.hoverable.add(e),this._on(e,{
mouseenter:function(e){
t(e.currentTarget).addClass("ui-state-hover");
},
mouseleave:function(e){
t(e.currentTarget).removeClass("ui-state-hover");
}
});
},
_focusable:function(e){
this.focusable=this.focusable.add(e),this._on(e,{
focusin:function(e){
t(e.currentTarget).addClass("ui-state-focus");
},
focusout:function(e){
t(e.currentTarget).removeClass("ui-state-focus");
}
});
},
_trigger:function(e,i,s){
var o,n,r=this.options[e];
if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),
i.target=this.element[0],n=i.originalEvent)for(o in n)o in i||(i[o]=n[o]);
return this.element.trigger(i,s),!(t.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented());
}
},t.each({
show:"fadeIn",
hide:"fadeOut"
},function(e,i){
t.Widget.prototype["_"+e]=function(s,o,n){
"string"==typeof o&&(o={
effect:o
});
var r,a=o?o===!0||"number"==typeof o?i:o.effect||i:e;
o=o||{},"number"==typeof o&&(o={
duration:o
}),r=!t.isEmptyObject(o),o.complete=n,o.delay&&s.delay(o.delay),r&&t.effects&&t.effects.effect[a]?s[e](o):a!==e&&s[a]?s[a](o.duration,o.easing,n):s.queue(function(i){
t(this)[e](),n&&n.call(s[0]),i();
});
};
});
}(jQuery),function(t){
var e=!1;
t(document).mouseup(function(){
e=!1;
}),t.widget("ui.mouse",{
version:"1.10.3",
options:{
cancel:"input,textarea,button,select,option",
distance:1,
delay:0
},
_mouseInit:function(){
var e=this;
this.element.bind("mousedown."+this.widgetName,function(t){
return e._mouseDown(t);
}).bind("click."+this.widgetName,function(i){
return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),
i.stopImmediatePropagation(),!1):void 0;
}),this.started=!1;
},
_mouseDestroy:function(){
this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
},
_mouseDown:function(i){
if(!e){
this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;
var s=this,o=1===i.which,n="string"==typeof this.options.cancel&&i.target.nodeName?t(i.target).closest(this.options.cancel).length:!1;
return o&&!n&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){
s.mouseDelayMet=!0;
},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,
!this._mouseStarted)?(i.preventDefault(),!0):(!0===t.data(i.target,this.widgetName+".preventClickEvent")&&t.removeData(i.target,this.widgetName+".preventClickEvent"),
this._mouseMoveDelegate=function(t){
return s._mouseMove(t);
},this._mouseUpDelegate=function(t){
return s._mouseUp(t);
},t(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),
i.preventDefault(),e=!0,!0)):!0;
}
},
_mouseMove:function(e){
return t.ui.ie&&(!document.documentMode||document.documentMode<9)&&!e.button?this._mouseUp(e):this._mouseStarted?(this._mouseDrag(e),
e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,
this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted);
},
_mouseUp:function(e){
return t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),
this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),
this._mouseStop(e)),!1;
},
_mouseDistanceMet:function(t){
return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance;
},
_mouseDelayMet:function(){
return this.mouseDelayMet;
},
_mouseStart:function(){},
_mouseDrag:function(){},
_mouseStop:function(){},
_mouseCapture:function(){
return!0;
}
});
}(jQuery),function(t){
t.widget("ui.draggable",t.ui.mouse,{
version:"1.10.3",
widgetEventPrefix:"drag",
options:{
addClasses:!0,
appendTo:"parent",
axis:!1,
connectToSortable:!1,
containment:!1,
cursor:"auto",
cursorAt:!1,
grid:!1,
handle:!1,
helper:"original",
iframeFix:!1,
opacity:!1,
refreshPositions:!1,
revert:!1,
revertDuration:500,
scope:"default",
scroll:!0,
scrollSensitivity:20,
scrollSpeed:20,
snap:!1,
snapMode:"both",
snapTolerance:20,
stack:!1,
zIndex:!1,
drag:null,
start:null,
stop:null
},
_create:function(){
"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),
this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),
this._mouseInit();
},
_destroy:function(){
this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
this._mouseDestroy();
},
_mouseCapture:function(e){
var i=this.options;
return this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(e),
this.handle?(t(i.iframeFix===!0?"iframe":i.iframeFix).each(function(){
t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
width:this.offsetWidth+"px",
height:this.offsetHeight+"px",
position:"absolute",
opacity:"0.001",
zIndex:1e3
}).css(t(this).offset()).appendTo("body");
}),!0):!1);
},
_mouseStart:function(e){
var i=this.options;
return this.helper=this._createHelper(e),this.helper.addClass("ui-draggable-dragging"),
this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),
this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),
this.offsetParent=this.helper.offsetParent(),this.offsetParentCssPosition=this.offsetParent.css("position"),
this.offset=this.positionAbs=this.element.offset(),this.offset={
top:this.offset.top-this.margins.top,
left:this.offset.left-this.margins.left
},this.offset.scroll=!1,t.extend(this.offset,{
click:{
left:e.pageX-this.offset.left,
top:e.pageY-this.offset.top
},
parent:this._getParentOffset(),
relative:this._getRelativeOffset()
}),this.originalPosition=this.position=this._generatePosition(e),this.originalPageX=e.pageX,
this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),
this._setContainment(),this._trigger("start",e)===!1?(this._clear(),!1):(this._cacheHelperProportions(),
t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._mouseDrag(e,!0),
t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0);
},
_mouseDrag:function(e,i){
if("fixed"===this.offsetParentCssPosition&&(this.offset.parent=this._getParentOffset()),
this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),
!i){
var s=this._uiHash();
if(this._trigger("drag",e,s)===!1)return this._mouseUp({}),!1;
this.position=s.position;
}
return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),
this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),
t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1;
},
_mouseStop:function(e){
var i=this,s=!1;
return t.ui.ddmanager&&!this.options.dropBehaviour&&(s=t.ui.ddmanager.drop(this,e)),
this.dropped&&(s=this.dropped,this.dropped=!1),"original"!==this.options.helper||t.contains(this.element[0].ownerDocument,this.element[0])?("invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){
i._trigger("stop",e)!==!1&&i._clear();
}):this._trigger("stop",e)!==!1&&this._clear(),!1):!1;
},
_mouseUp:function(e){
return t("div.ui-draggable-iframeFix").each(function(){
this.parentNode.removeChild(this);
}),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),t.ui.mouse.prototype._mouseUp.call(this,e);
},
cancel:function(){
return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),
this;
},
_getHandle:function(e){
return this.options.handle?!!t(e.target).closest(this.element.find(this.options.handle)).length:!0;
},
_createHelper:function(e){
var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;
return s.parents("body").length||s.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),
s[0]===this.element[0]||/(fixed|absolute)/.test(s.css("position"))||s.css("position","absolute"),
s;
},
_adjustOffsetFromHelper:function(e){
"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={
left:+e[0],
top:+e[1]||0
}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),
"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top);
},
_getParentOffset:function(){
var e=this.offsetParent.offset();
return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),
e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={
top:0,
left:0
}),{
top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),
left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)
};
},
_getRelativeOffset:function(){
if("relative"===this.cssPosition){
var t=this.element.position();
return{
top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),
left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()
};
}
return{
top:0,
left:0
};
},
_cacheMargins:function(){
this.margins={
left:parseInt(this.element.css("marginLeft"),10)||0,
top:parseInt(this.element.css("marginTop"),10)||0,
right:parseInt(this.element.css("marginRight"),10)||0,
bottom:parseInt(this.element.css("marginBottom"),10)||0
};
},
_cacheHelperProportions:function(){
this.helperProportions={
width:this.helper.outerWidth(),
height:this.helper.outerHeight()
};
},
_setContainment:function(){
var e,i,s,o=this.options;
return o.containment?"window"===o.containment?void(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):"document"===o.containment?void(this.containment=[0,0,t(document).width()-this.helperProportions.width-this.margins.left,(t(document).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):o.containment.constructor===Array?void(this.containment=o.containment):("parent"===o.containment&&(o.containment=this.helper[0].parentNode),
i=t(o.containment),s=i[0],void(s&&(e="hidden"!==i.css("overflow"),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],
this.relative_container=i))):void(this.containment=null);
},
_convertPositionTo:function(e,i){
i||(i=this.position);
var s="absolute"===e?1:-1,o="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent;
return this.offset.scroll||(this.offset.scroll={
top:o.scrollTop(),
left:o.scrollLeft()
}),{
top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top)*s,
left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)*s
};
},
_generatePosition:function(e){
var i,s,o,n,r=this.options,a="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=e.pageX,h=e.pageY;
return this.offset.scroll||(this.offset.scroll={
top:a.scrollTop(),
left:a.scrollLeft()
}),this.originalPosition&&(this.containment&&(this.relative_container?(s=this.relative_container.offset(),
i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,
e.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(h=i[1]+this.offset.click.top),
e.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(h=i[3]+this.offset.click.top)),
r.grid&&(o=r.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/r.grid[1])*r.grid[1]:this.originalPageY,
h=i?o-this.offset.click.top>=i[1]||o-this.offset.click.top>i[3]?o:o-this.offset.click.top>=i[1]?o-r.grid[1]:o+r.grid[1]:o,
n=r.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/r.grid[0])*r.grid[0]:this.originalPageX,
l=i?n-this.offset.click.left>=i[0]||n-this.offset.click.left>i[2]?n:n-this.offset.click.left>=i[0]?n-r.grid[0]:n+r.grid[0]:n)),
{
top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top),
left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)
};
},
_clear:function(){
this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),
this.helper=null,this.cancelHelperRemoval=!1;
},
_trigger:function(e,i,s){
return s=s||this._uiHash(),t.ui.plugin.call(this,e,[i,s]),"drag"===e&&(this.positionAbs=this._convertPositionTo("absolute")),
t.Widget.prototype._trigger.call(this,e,i,s);
},
plugins:{},
_uiHash:function(){
return{
helper:this.helper,
position:this.position,
originalPosition:this.originalPosition,
offset:this.positionAbs
};
}
}),t.ui.plugin.add("draggable","connectToSortable",{
start:function(e,i){
var s=t(this).data("ui-draggable"),o=s.options,n=t.extend({},i,{
item:s.element
});
s.sortables=[],t(o.connectToSortable).each(function(){
var i=t.data(this,"ui-sortable");
i&&!i.options.disabled&&(s.sortables.push({
instance:i,
shouldRevert:i.options.revert
}),i.refreshPositions(),i._trigger("activate",e,n));
});
},
stop:function(e,i){
var s=t(this).data("ui-draggable"),o=t.extend({},i,{
item:s.element
});
t.each(s.sortables,function(){
this.instance.isOver?(this.instance.isOver=0,s.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,
this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(e),
this.instance.options.helper=this.instance.options._helper,"original"===s.options.helper&&this.instance.currentItem.css({
top:"auto",
left:"auto"
})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",e,o));
});
},
drag:function(e,i){
var s=t(this).data("ui-draggable"),o=this;
t.each(s.sortables,function(){
var n=!1,r=this;
this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,
this.instance.offset.click=s.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(n=!0,
t.each(s.sortables,function(){
return this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,
this.instance.offset.click=s.offset.click,this!==r&&this.instance._intersectsWith(this.instance.containerCache)&&t.contains(r.instance.element[0],this.instance.element[0])&&(n=!1),
n;
})),n?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=t(o).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),
this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){
return i.helper[0];
},e.target=this.instance.currentItem[0],this.instance._mouseCapture(e,!0),this.instance._mouseStart(e,!0,!0),
this.instance.offset.click.top=s.offset.click.top,this.instance.offset.click.left=s.offset.click.left,
this.instance.offset.parent.left-=s.offset.parent.left-this.instance.offset.parent.left,
this.instance.offset.parent.top-=s.offset.parent.top-this.instance.offset.parent.top,
s._trigger("toSortable",e),s.dropped=this.instance.element,s.currentItem=s.element,
this.instance.fromOutside=s),this.instance.currentItem&&this.instance._mouseDrag(e)):this.instance.isOver&&(this.instance.isOver=0,
this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",e,this.instance._uiHash(this.instance)),
this.instance._mouseStop(e,!0),this.instance.options.helper=this.instance.options._helper,
this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),
s._trigger("fromSortable",e),s.dropped=!1);
});
}
}),t.ui.plugin.add("draggable","cursor",{
start:function(){
var e=t("body"),i=t(this).data("ui-draggable").options;
e.css("cursor")&&(i._cursor=e.css("cursor")),e.css("cursor",i.cursor);
},
stop:function(){
var e=t(this).data("ui-draggable").options;
e._cursor&&t("body").css("cursor",e._cursor);
}
}),t.ui.plugin.add("draggable","opacity",{
start:function(e,i){
var s=t(i.helper),o=t(this).data("ui-draggable").options;
s.css("opacity")&&(o._opacity=s.css("opacity")),s.css("opacity",o.opacity);
},
stop:function(e,i){
var s=t(this).data("ui-draggable").options;
s._opacity&&t(i.helper).css("opacity",s._opacity);
}
}),t.ui.plugin.add("draggable","scroll",{
start:function(){
var e=t(this).data("ui-draggable");
e.scrollParent[0]!==document&&"HTML"!==e.scrollParent[0].tagName&&(e.overflowOffset=e.scrollParent.offset());
},
drag:function(e){
var i=t(this).data("ui-draggable"),s=i.options,o=!1;
i.scrollParent[0]!==document&&"HTML"!==i.scrollParent[0].tagName?(s.axis&&"x"===s.axis||(i.overflowOffset.top+i.scrollParent[0].offsetHeight-e.pageY<s.scrollSensitivity?i.scrollParent[0].scrollTop=o=i.scrollParent[0].scrollTop+s.scrollSpeed:e.pageY-i.overflowOffset.top<s.scrollSensitivity&&(i.scrollParent[0].scrollTop=o=i.scrollParent[0].scrollTop-s.scrollSpeed)),
s.axis&&"y"===s.axis||(i.overflowOffset.left+i.scrollParent[0].offsetWidth-e.pageX<s.scrollSensitivity?i.scrollParent[0].scrollLeft=o=i.scrollParent[0].scrollLeft+s.scrollSpeed:e.pageX-i.overflowOffset.left<s.scrollSensitivity&&(i.scrollParent[0].scrollLeft=o=i.scrollParent[0].scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(e.pageY-t(document).scrollTop()<s.scrollSensitivity?o=t(document).scrollTop(t(document).scrollTop()-s.scrollSpeed):t(window).height()-(e.pageY-t(document).scrollTop())<s.scrollSensitivity&&(o=t(document).scrollTop(t(document).scrollTop()+s.scrollSpeed))),
s.axis&&"y"===s.axis||(e.pageX-t(document).scrollLeft()<s.scrollSensitivity?o=t(document).scrollLeft(t(document).scrollLeft()-s.scrollSpeed):t(window).width()-(e.pageX-t(document).scrollLeft())<s.scrollSensitivity&&(o=t(document).scrollLeft(t(document).scrollLeft()+s.scrollSpeed)))),
o!==!1&&t.ui.ddmanager&&!s.dropBehaviour&&t.ui.ddmanager.prepareOffsets(i,e);
}
}),t.ui.plugin.add("draggable","snap",{
start:function(){
var e=t(this).data("ui-draggable"),i=e.options;
e.snapElements=[],t(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){
var i=t(this),s=i.offset();
this!==e.element[0]&&e.snapElements.push({
item:this,
width:i.outerWidth(),
height:i.outerHeight(),
top:s.top,
left:s.left
});
});
},
drag:function(e,i){
var s,o,n,r,a,l,h,c,p,u,f=t(this).data("ui-draggable"),d=f.options,g=d.snapTolerance,m=i.offset.left,v=m+f.helperProportions.width,_=i.offset.top,b=_+f.helperProportions.height;
for(p=f.snapElements.length-1;p>=0;p--)a=f.snapElements[p].left,l=a+f.snapElements[p].width,
h=f.snapElements[p].top,c=h+f.snapElements[p].height,a-g>v||m>l+g||h-g>b||_>c+g||!t.contains(f.snapElements[p].item.ownerDocument,f.snapElements[p].item)?(f.snapElements[p].snapping&&f.options.snap.release&&f.options.snap.release.call(f.element,e,t.extend(f._uiHash(),{
snapItem:f.snapElements[p].item
})),f.snapElements[p].snapping=!1):("inner"!==d.snapMode&&(s=Math.abs(h-b)<=g,o=Math.abs(c-_)<=g,
n=Math.abs(a-v)<=g,r=Math.abs(l-m)<=g,s&&(i.position.top=f._convertPositionTo("relative",{
top:h-f.helperProportions.height,
left:0
}).top-f.margins.top),o&&(i.position.top=f._convertPositionTo("relative",{
top:c,
left:0
}).top-f.margins.top),n&&(i.position.left=f._convertPositionTo("relative",{
top:0,
left:a-f.helperProportions.width
}).left-f.margins.left),r&&(i.position.left=f._convertPositionTo("relative",{
top:0,
left:l
}).left-f.margins.left)),u=s||o||n||r,"outer"!==d.snapMode&&(s=Math.abs(h-_)<=g,
o=Math.abs(c-b)<=g,n=Math.abs(a-m)<=g,r=Math.abs(l-v)<=g,s&&(i.position.top=f._convertPositionTo("relative",{
top:h,
left:0
}).top-f.margins.top),o&&(i.position.top=f._convertPositionTo("relative",{
top:c-f.helperProportions.height,
left:0
}).top-f.margins.top),n&&(i.position.left=f._convertPositionTo("relative",{
top:0,
left:a
}).left-f.margins.left),r&&(i.position.left=f._convertPositionTo("relative",{
top:0,
left:l-f.helperProportions.width
}).left-f.margins.left)),!f.snapElements[p].snapping&&(s||o||n||r||u)&&f.options.snap.snap&&f.options.snap.snap.call(f.element,e,t.extend(f._uiHash(),{
snapItem:f.snapElements[p].item
})),f.snapElements[p].snapping=s||o||n||r||u);
}
}),t.ui.plugin.add("draggable","stack",{
start:function(){
var e,i=this.data("ui-draggable").options,s=t.makeArray(t(i.stack)).sort(function(e,i){
return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0);
});
s.length&&(e=parseInt(t(s[0]).css("zIndex"),10)||0,t(s).each(function(i){
t(this).css("zIndex",e+i);
}),this.css("zIndex",e+s.length));
}
}),t.ui.plugin.add("draggable","zIndex",{
start:function(e,i){
var s=t(i.helper),o=t(this).data("ui-draggable").options;
s.css("zIndex")&&(o._zIndex=s.css("zIndex")),s.css("zIndex",o.zIndex);
},
stop:function(e,i){
var s=t(this).data("ui-draggable").options;
s._zIndex&&t(i.helper).css("zIndex",s._zIndex);
}
});
}(jQuery);
});define("tpl/ban/page_msg.html.js",[],function(){
return'<div class="page_msg mini ban_page_msg">\n    <div class="inner group">\n        <span class="msg_icon_wrp"><i class="icon_msg_mini warn"></i></span>\n        <div class="msg_content">{=content}</div>\n    </div>\n</div>';
});define("tpl/ban/highlight_box.html.js",[],function(){
return'<div class="highlight_box icon_wrap icon_small border ban_highlight_box" id="div_stop">\n    <span class="icon lock"></span>\n    <h4 class="title">{title}</h4>\n    <p class="desc">{=desc}</p>\n</div>';
});define("biz_common/utils/monitor.js",[],function(){
var n=[],i={};
return i.setAvg=function(e,t,o){
return n.push(e+"_"+t+"_"+o),n.push(e+"_"+(t-1)+"_1"),i;
},i.setSum=function(e,t,o){
return n.push(e+"_"+t+"_"+o),i;
},i.send=function(){
if(0!=n.length){
var i=new Image;
i.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+n.join(";"),n=[];
}
},i;
});define("tpl/media/appmsg_edit/article_list_item.html.js",[],function(){
return'<div id="appmsgItem{id}" data-fileId="{file_id}" data-id="{id}" class="js_appmsg_item appmsg_item_wrp {if cover}has_thumb{/if}">\n    <div class="first_appmsg_item" {if !isFirst}style="display:none;"{/if} title="{title || \'标题\'}">\n        <div class="cover_appmsg_item">\n            <h4 class="appmsg_title"><a href="javascript:void(0);" onclick="return false;">{title || \'标题\'}</a></h4>\n            <div class="appmsg_thumb_wrp">\n                <img class="js_appmsg_thumb appmsg_thumb" src="{cover}">\n                <i class="appmsg_thumb default">封面图片</i>\n            </div>        \n        </div>\n        <div class="appmsg_edit_mask">\n            <a onclick="return false;" class="icon20_common sort_down_white js_down" data-id="{id}" href="javascript:;" title="下移">向下</a>\n        </div>\n    </div>\n    <div class="appmsg_item" {if isFirst}style="display:none;"{/if} title="{title || \'标题\'}">\n        <img class="js_appmsg_thumb appmsg_thumb" src="{cover}">\n        <i class="appmsg_thumb default">缩略图</i>\n        <h4 class="appmsg_title"><a onclick="return false;" href="javascript:void(0);">{title || \'标题\'}</a></h4>\n        <div class="appmsg_edit_mask">\n            <a onclick="return false;" class="icon20_common sort_up_white   js_up"   data-id="{id}" href="javascript:;" title="上移">向上</a>\n            <a onclick="return false;" class="icon20_common sort_down_white js_down" data-id="{id}" href="javascript:;" title="下移">向下</a>\n            <a onclick="return false;" class="icon20_common del_media_white js_del"  data-id="{id}" href="javascript:;" title="删除">删除</a>\n        </div>\n    </div>\n</div>\n';
});define("media/draft.js",["common/qq/Class.js","biz_web/lib/store.js","biz_common/moment.js","media/report.js"],function(e){
"use strict";
var t=e("common/qq/Class.js"),a=e("biz_web/lib/store.js"),i=e("biz_common/moment.js"),r=e("media/report.js"),s=t.declare({
init:function(e){
var t=this;
if(!t._supportUserData()&&"undefined"==typeof localStorage)return!1;
t.app_id=e,t.draftId=wx.data.uin+(e?e:""),t.timeKey="Time"+t.draftId,t.appKey="App"+t.draftId,
t.isDropped=!1,a.get(t.timeKey)&&(t._showTips(t._getSaveTime()),r.addPvUv("usecache"));
var s=Math.floor(wx.cgiData.svr_time-new Date/1e3);
a.get(t.timeKey)&&Number(wx.cgiData.updateTime)>i(a.get(t.timeKey),"YYYY-MM-DD HH:mm:ss").unix()+s&&confirm("当前图文消息本地草稿保存后，服务器图文消息有更新。请确认是否放弃保存本地草稿？")&&(a.remove(t.timeKey),
a.remove(t.appKey));
},
_supportUserData:function(){
try{
var e=document.createElement("input");
e.addBehavior("#default#userData");
}catch(t){
return!1;
}
return!0;
},
_getSaveTime:function(){
return a.get(this.timeKey);
},
_showTips:function(e){
$("#js_autosave").attr("title",e+" 已自动保存").show(),$("#js_draft_tips").show().find(".js_msg_content").html("已从本地读取"+e+"的草稿");
},
clear:function(){
a.remove(this.timeKey),a.remove(this.appKey);
},
save:function(e){
var t=this;
t.clear(),a.set(t.timeKey,i().format("YYYY-MM-DD HH:mm:ss")),a.set(t.appKey,e),$("#js_autosave").attr("title",a.get(t.timeKey)+" 已自动保存").fadeIn(500);
},
get:function(){
var e=a.get(this.appKey);
return e?e:!1;
}
});
return s;
});define("media/article.js",["common/qq/Class.js","biz_common/jquery.validate.js","common/wx/Tips.js","common/wx/dialog.js"],function(e){
"use strict";
function t(e,t){
setTimeout(function(){
$("html, body").animate({
scrollTop:$(e).offset().top-(t||50)
});
},100);
}
function r(e,t){
$(e).show().find(".js_msg_content").text(t);
}
var i=e("common/qq/Class.js"),n=e("biz_common/jquery.validate.js"),o=e("common/wx/Tips.js"),s=e("common/wx/dialog.js"),_=n.rules,d=wx.cgiData,a=i.declare({
init:function(e){
this.opt=e,this.$dom=$(e.dom),this.data=e.data||{},this.$item=$(e.item),this.ueditor=e.ueditor,
this.freeUEditor=e.freeUEditor,this.scrollTop=Math.min($(".main_hd").offset().top,$(".main_bd").offset().top);
},
_setEditorContent:function(){
var e=this,t=e.data;
e.ueditor.ready(function(){
e.ueditor.setContent(t.content);
});
},
_setOriginal:function(){
var e=this,t=e.data,r=e.$dom,i=$("#js_original");
i.find(".js_original_type").hide().eq(t.copyright_type||0).show(),t.copyright_type?(i.find(".js_original_content").show(),
i.find(".js_original_publish").val(t.releasefirst),i.find(".js_reprint_frm").val(t.reprint_permit_type),
i.find(".js_url").text(t.source_url).closest("li")[t.source_url?"show":"hide"](),
i.find(".js_author").text(t.author),i.find(".js_platform").text(+t.releasefirst?"微信公众平台":t.platform),
i.find(".js_frm").text(1==+t.reprint_permit_type?"允许转载":2==t.reprint_permit_type?"授权转载":"禁止转载"),
i.find(".js_classify").text(t.original_article_type),r.find(".js_author").closest(".appmsg_edit_item").eq(0).hide(),
r.find(".js_url_area").hide(),r.find(".js_reward").checkbox("disabled",!1),$("#js_pay").checkbox("disabled",1==t.reprint_permit_type),
1==t.reprint_permit_type?i.find(".js_pay_tips").text("（只有“禁止转载”的原创文章才可以设置付费阅读）").show():i.find(".js_pay_tips").text("（每月可群发10篇付费阅读文章）")):(i.find(".js_original_content").hide(),
r.find(".js_author").closest(".appmsg_edit_item").eq(0).show(),r.find(".js_url_area").show(),
r.find(".js_reward").checkbox("disabled",!0),r.find(".js_reward_div").hide(),$("#js_pay").checkbox("disabled",!0),
i.find(".js_pay_tips").show().text("（只有“禁止转载”的原创文章才可以设置付费阅读）"),i.find(".js_pay_setting").hide());
},
_setPay:function(){
var e=this,t=e.data,r=e.$dom;
$("#js_pay").checkbox("checked",!!t.payforread_enabled),r.find(".js_pay_setting")[t.payforread_enabled?"show":"hide"]().find(".js_fee").text(t.fee?(t.fee/100).toFixed(2):""),
r.find(".js_pay_tips")[t.payforread_enabled?"hide":"show"](),e.freeUEditor.val(t.free_content||"").trigger("keydown");
},
hideErrorTips:function(){
this.$dom.find(".js_title_error,.js_author_error,.js_desc_error,.js_cover_error,.js_url_error,.js_content_error,.js_platform_error").hide();
},
flush:function(){
var e=this,t=e.data,r=e.$dom;
if(r.find(".js_field").each(function(){
var e=$(this).attr("name"),r=$(this).attr("type");
t[e]="checkbox"==r?$(this).checkbox("value")?1:0:$.trim($(this).val());
}),t=e.ueditor.getEditorData(t),t.source_url=t.source_url_checked?t.source_url:"",
t.source_url&&!/:\/\//.test(t.source_url)&&(t.source_url="http://"+t.source_url),
1==d.can_use_hyperlink){
var i=t.content.match(/<a([^>]*)>(.*?)<\/a>/g);
i&&(t.link_count=i.length);
}
t.isFirst=0==e.$item.index(),t.digest=t.digest||t.content.text().html(!1).substr(0,54);
var n=r.find("#js_original");
return t.copyright_type=$(".js_original_type:visible").index(),t.copyright_type=t.copyright_type<0?0:t.copyright_type,
t.copyright_type&&(t.releasefirst=n.find(".js_original_publish").val(),t.author=n.find(".js_author").text(),
t.source_url=n.find(".js_url").text(),t.platform=+t.releasefirst?"":n.find(".js_platform").text(),
t.reprint_permit_type=n.find(".js_reprint_frm").val(),t.original_article_type=n.find(".js_classify").text()),
t.free_content=this.freeUEditor.val(),t.fee=100*r.find(".js_fee").text(),e.scrollTop=Math.max($(window).scrollTop(),$(".main_hd").offset().top),
console.log(e.scrollTop),this;
},
getData:function(e){
var t=this,r=t.data,i={},n=["title","content","digest","author","fileid","music_id","video_id","show_cover_pic","shortvideofileid","copyright_type","releasefirst","platform","reprint_permit_type","original_article_type","can_reward","reward_wording","need_open_comment","sourceurl","payforread_enabled","free_content","fee","voteid","voteismlt","supervoteid","cardid","cardquantity","cardlimit"];
return $.each(n,function(e,t){
switch(t){
case"fileid":
i.fileid=r.file_id;
break;

case"sourceurl":
i.sourceurl=r.source_url;
break;

default:
i[t]=r[t];
}
}),e?t.validate(i):$.extend(!0,{},r);
},
validate:function(e){
var i,n=this,d=n.$dom,a=n.ueditor.getDocument(),l=!0,c=null,f="",u=$(a).find(".js_catchremoteimageerror").length;
if(u)return i=d.find(".js_content_error"),r(i,"正文有%s张图片粘贴失败".sprintf(u)),t(i,200),
null;
if(_.rangelength(e.title,[1,64])||(r(d.find(".js_title_error"),"标题不能为空且长度不能超过64字"),
c=c||".js_title_error",l=null),0==e.copyright_type&&e.author.len()>16&&(r(d.find(".js_author_error"),"作者不能超过8个字"),
c=c||".js_author_error",l=null),_.rangelength(e.content,[1,1e7])||(r(d.find(".js_content_error"),"正文总大小不得超过10M字节"),
c=c||".js_content_error",l=null),_.rangelength(e.content.text(),[1,2e4])||(r(d.find(".js_content_error"),"正文不能为空且长度不能超过20000字"),
c=c||".js_content_error",l=null),1==d.find(".js_url_checkbox").prop("checked")&&""==e.sourceurl&&(d.find(".js_url_error").text("请输入原文链接").show(),
c=c||".js_url",f=f||"请输入原文链接",l=null),0==e.copyright_type&&e.sourceurl&&!_.url(e.sourceurl)&&(d.find(".js_url_error").text("链接不合法").show(),
c=c||".js_url",f=f||"链接不合法",l=null),e.fileid||"1675779340"!=wx.data.uin&&"3080043700"!=wx.data.uin&&(r(d.find(".js_cover_error"),"必须插入一张图片"),
c=c||".js_cover_error",l=null),_.rangelength(e.digest,[0,120])||(d.find(".js_desc_error").text("摘要长度不能超过120字").show(),
c=c||".js_desc",l=null),1!=e.can_reward||_.maxlength(e.reward_wording,15)||(f=f||"赞赏引导语不能超过15个字",
l=null),!l)return t(d.find(c),150),null;
if(1==e.copyright_type&&e.content.text().replace(/\s/g,"").length<300)return s.show({
type:"warn",
msg:"很抱歉，原创声明不成功|你的文章内容少于300字，未达到申请原创内容声明的字数要求。",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
}),null;
if(e.payforread_enabled){
if(!/\d+(\.\d+)?/.test(e.fee))return o.err("请输入正确的付费金额"),null;
if(""==e.free_content)return o.err("请输入免费区域内容"),null;
}
return n.ueditor.checkPlugins()?e:null;
},
render:function(){
var e=this,t=e.$dom,r=e.data,i=0==e.$item.index();
if(r.source_url_checked="undefined"==typeof r.source_url_checked?!!r.source_url:r.source_url_checked,
t.find(".js_cover_tip").html(i?"大图片建议尺寸：900像素 * 500像素":"小图片建议尺寸：200像素 * 200像素"),
t.find(".js_field").each(function(){
var e=$(this).attr("name"),t=$(this).attr("type");
"checkbox"==t?$(this).checkbox("checked",!!r[e]):$(this).val(r[e]||"").trigger("blur keydown");
}),t.find("input.js_title,input.js_author").trigger("keydown"),t.find("input.js_title,input.js_author").trigger("blur"),
t.find(".js_comment").checkbox("checked",0==r.need_open_comment?!1:!0),r.file_id){
var n=wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s>".sprintf(r.file_id));
t.find(".js_cover").find("img").remove(),t.find(".js_cover").prepend('<img src="%s">'.sprintf(n)).show();
}else t.find(".js_cover").hide().find("img").remove();
r.source_url_checked?t.find(".js_url_area .frm_input_box").show():t.find(".js_url_area .frm_input_box").hide(),
1==r.can_reward?(t.find(".js_reward").checkbox("checked",!0),t.find(".js_reward_div").show()):(t.find(".js_reward").checkbox("checked",!1),
t.find(".js_reward_div").hide()),e._setEditorContent(),e._setOriginal(),e._setPay();
}
});
return a;
});define("media/media_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(e){
"use strict";
var r=e("common/wx/Tips.js"),s=e("common/wx/Cgi.js"),a={
del:function(e,a){
s.post({
mask:!1,
url:wx.url("/cgi-bin/operate_appmsg?sub=del&t=ajax-response"),
data:{
AppMsgId:e
},
error:function(){
r.err("删除失败");
}
},function(e){
"0"==e.ret?(r.suc("删除成功"),a&&a(e)):r.err("删除失败");
});
},
del_sv:function(e,a){
s.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=del&t=ajax-response"),
data:{
fileid:e
},
error:function(){
r.err("删除失败");
}
},function(e){
e.base_resp&&0==+e.base_resp.ret?(r.suc("删除成功"),a.suc&&a.suc(e)):(r.err("删除失败"),
a.fail&&a.fail(e));
});
},
edit_sv:function(e,a){
s.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=rename&t=ajax-response"),
data:{
fileid:e.id,
filename:e.name
},
error:function(){
r.err("编辑失败");
}
},function(e){
e.base_resp&&0==+e.base_resp.ret?(r.suc("编辑成功"),a.suc&&a.suc(e)):(r.err("编辑失败"),
a.fail&&a.fail(e));
});
},
save:function(e,a,i,t,n,o){
var c=wx.url(i.AppMsgId?"/cgi-bin/operate_appmsg?t=ajax-response&sub=update&type=%s".sprintf(a):"/cgi-bin/operate_appmsg?t=ajax-response&sub=create&type=%s".sprintf(a));
i.ajax=1,s.post({
url:c,
data:i,
dataType:"html",
error:function(e,s){
"timeout"!=s&&r.err("保存失败"),n&&n(!1,-1);
},
complete:o
},function(e){
if(e=$.parseJSON(e),"0"==e.ret)r.suc("保存成功"),t&&t(e);else{
var s=!1;
switch(e.ret){
case"64506":
r.err("保存失败,链接不合法");
break;

case"64507":
r.err("内容不能包含链接，请调整");
break;

case"64510":
r.err("内容不能包含语音，请调整");
break;

case"64511":
r.err("内容不能包多个语音，请调整");
break;

case"64512":
r.err("文章中语音错误,请使用语音添加按钮重新添加。");
break;

case"64508":
r.err("查看原文链接可能具备安全风险，请检查");
break;

case"64550":
r.err("请勿插入不合法的已群发的图文消息链接");
break;

case"-99":
r.err("内容超出字数，请调整");
break;

case"10801":
r.err("标题不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),s=e.msg;
break;

case"10802":
r.err("作者不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),s=e.msg;
break;

case"10803":
r.err("敏感链接，请重新添加。"),s=e.msg;
break;

case"10804":
r.err("摘要不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),s=e.msg;
break;

case"10806":
r.err("正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),s=e.msg;
break;

case"-20000":
r.err("登录态超时，请重新登录。");
break;

case"15801":
case"15802":
case"15803":
case"15804":
case"15805":
case"15806":
break;

default:
r.err("保存失败");
}
n&&n(s,e.ret);
}
});
},
preview:function(e,a,i,t,n){
s.post({
url:wx.url("/cgi-bin/operate_appmsg?sub=preview&t=ajax-appmsg-preview&type=%s".sprintf(a)),
data:i,
dataType:"html",
error:function(){
r.err("发送失败，请稍后重试"),n&&n();
}
},function(e){
if(e=$.parseJSON(e),"0"==e.ret)r.suc("发送预览成功，请留意你的手机微信"),t&&t(e);else{
switch(e.ret){
case"64501":
e.word="你输入的帐号不存在，请重新输入";
break;

case"64502":
e.word="你输入的微信号不存在，请重新输入";
break;

case"10700":
case"64503":
e.word="你尚未关注公众号，请先关注";
break;

case"64510":
e.word="内容不能包含语音,请调整";
break;

case"64511":
e.word="内容不能包含多个语音,请调整";
break;

case"64512":
e.word="文章中语音错误,请使用语音添加按钮重新添加。";
break;

case"64550":
e.word="请勿插入不合法的已群发的图文消息链接";
break;

case"10703":
e.word="对方关闭了接收消息";
break;

case"10701":
e.word="用户已被加入黑名单，无法向其发送消息";
break;

case"10704":
case"10705":
e.word="该素材已被删除";
break;

case"64504":
e.word="保存图文消息发送错误，请稍后再试";
break;

case"64505":
e.word="发送预览失败，请稍后再试";
break;

case"64507":
e.word="内容不能包含链接，请调整";
break;

case"-99":
e.word="内容超出字数，请调整";
break;

case"62752":
e.word="可能含有具备安全风险的链接，请检查";
break;

case"10801":
e.word="标题不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",e.antispam=!0;
break;

case"10802":
e.word="作者不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",e.antispam=!0;
break;

case"10803":
e.word="敏感链接，请重新添加。",e.antispam=!0;
break;

case"10804":
e.word="摘要不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",e.antispam=!0;
break;

case"10806":
e.word="正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",e.antispam=!0;
break;

case"10807":
e.word="内容不能违反公众平台协议、相关法律法规和政策，请重新编辑。",e.antispam=!0;
break;

case"-8":
case"-6":
e.ret="-6",e.word="请输入验证码";
break;

case"15801":
case"15802":
case"15803":
case"15804":
case"15805":
case"15806":
break;

default:
e.word="系统繁忙，请稍后重试";
}
15==a&&r.err(e.word),n&&n(e);
}
});
},
getList:function(e,a,i,t,n,o){
var c="";
c=wx.url(n?"/cgi-bin/appmsg?type=%s&action=list&begin=%s&count=%s&query=%s&f=json".sprintf(e,a,i,n):"/cgi-bin/appmsg?type=%s&action=list&begin=%s&count=%s&f=json".sprintf(e,a,i)),
0==o?c=wx.url("/cgi-bin/appmsg?type=%s&action=list&begin=%s&count=%s&f=json".sprintf(e,a,i)):1==o&&(c=wx.url("/cgi-bin/video_mgr?type=%s&action=get_video_list&begin=%s&offset=%s&f=json".sprintf(e,a,i))),
s.get({
mask:!1,
url:c,
error:function(){
r.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?t&&t(e.app_msg_info):r.err("获取列表失败");
});
},
getSingleList:function(e,a,i,t){
s.get({
mask:!1,
url:wx.url("/cgi-bin/appmsg?type=%s&action=for_advert&begin=%s&count=%s&f=json".sprintf(e,a,i)),
error:function(){
r.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?t&&t(e.app_msg_info):r.err("获取列表失败");
});
}
},i={
save:function(e,a,i){
var t=wx.url("/cgi-bin/operate_vote");
e.ajax=1,s.post({
url:t,
data:e,
error:function(){
r.err("保存失败"),i&&i();
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?(r.suc("保存成功"),a&&a(e)):(r.err("保存失败"),i&&i(e));
});
}
};
return{
rename:function(e,a,i){
s.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=rename&t=ajax-response"),
data:{
fileid:e,
fileName:a
},
error:function(){
r.err("重命名失败");
}
},function(e){
if(!e||!e.base_resp)return void r.err("重命名失败");
var s=e.base_resp.ret;
if("0"==s)r.suc("重命名成功"),i&&i(e);else switch(s){
case"200002":
r.err("素材名不能包含空格");
break;

default:
r.err("重命名失败");
}
});
},
del:function(e,a){
s.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=del&t=ajax-response"),
data:{
fileid:e
},
error:function(){
r.err("删除失败");
}
},function(e){
return e&&e.base_resp?void("0"==e.base_resp.ret?(r.suc("删除成功"),a&&a(e)):r.err("删除失败")):void r.err("删除失败");
});
},
getList:function(e,a,i,t){
s.get({
mask:!1,
url:wx.url("/cgi-bin/filepage?type=%s&begin=%s&count=%s&f=json".sprintf(e,a,i)),
error:function(){
r.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?t&&t(e.page_info):r.err("获取列表失败");
});
},
appmsg:a,
vote:i
};
});define("common/wx/popover.js",["tpl/popover.html.js"],function(o,t,e){
"use strict";
function i(o){
if(o=$.extend(!0,{},h,o),this.opt=o,this.$dom=$(o.dom),this.$dom.data("popover")){
var t=this.$dom.data("popover");
return s(o,t),t.$pop.show(),t;
}
return o.buttons&&o.buttons&&o.buttons.each(function(o){
o.type=o.type||"default";
}),this.$pop=$(template.compile(p)(o)),o.addCls&&this.$pop.addClass(o.addCls),$("body").append(this.$pop),
n(this,o),s(o,this),this.$pop.show(),this.$dom.data("popover",this),this.clickIn=!0,
this;
}
function n(o,t){
function e(){
clearTimeout(n),o.show();
}
function i(){
n=setTimeout(function(){
o.hide();
},s);
}
if(t.buttons&&t.buttons.length>0&&o.$pop.find(".jsPopoverBt").each(function(e,i){
t.buttons[e]&&"function"==typeof t.buttons[e].click&&$(i).click(function(i){
t.buttons[e].click.call(o,i);
});
}),o.$pop.find(".jsPopoverClose").click(function(){
t.close===!0?o.hide():"function"==typeof t.close&&t.close.call(o);
}),t.hover&&(o.$dom.hover(function(){
o.hoverTime&&clearTimeout(o.hoverTime);
},function(){
o.hoverTime=o.hide.delay(1,o);
}),o.$pop.hover(function(){
o.hoverTime&&clearTimeout(o.hoverTime);
},function(){
o.hoverTime&&clearTimeout(o.hoverTime),o.hoverTime=o.hide.delay(1,o);
})),t.isToggle){
var n=null,s=300;
o.$dom.hover(e,i),o.$pop.hover(e,i);
}
t.hideIfBlur&&(o._onBlur=function(o){
var t=o.data.context,e=o.target,i=t.$dom.get(0),n=t.$pop.get(0);
t.clickIn?t.clickIn=!1:$.contains(i,e)||i===e||$.contains(n,e)||n===e||o.data.context.hide();
},$(document).on("click",{
context:o
},o._onBlur)),o._onResize=function(o){
o.data.context.resetPosition();
},$(window).on("resize",{
context:o
},o._onResize);
}
function s(o,t){
var e=t.$dom.offset();
"left"==o.margin?(console.log(e.top),console.log(t.$dom.height()),t.$pop.css({
top:e.top+t.$dom.height(),
left:e.left
}).addClass("pos_left")):"right"==o.margin?t.$pop.css({
top:e.top+t.$dom.height(),
left:e.left+t.$dom.width()-t.$pop.width()
}).addClass("pos_right"):t.$pop.css({
top:e.top+t.$dom.height(),
left:e.left+t.$dom.outerWidth()/2-t.$pop.width()/2
}).addClass("pos_center");
}
var p=o("tpl/popover.html.js"),h={
dom:"",
content:"",
place:"bottom",
margin:"center",
hideIfBlur:!1,
hover:!1,
addCls:"",
isToggle:!1,
onHide:!1,
onShow:!1,
onRemove:!1
};
i.prototype={
remove:function(){
this.$pop.remove(),this.$dom.removeData("popover"),this._onBlur&&$(document).off("click",this._onBlur),
$(window).off("resize",this._onResize),"function"==typeof this.opt.onRemove&&this.opt.onRemove.call(this);
},
hide:function(){
this.$pop.hide(),"function"==typeof this.opt.onHide&&this.opt.onHide.call(this);
},
show:function(){
this.$pop.show(),"function"==typeof this.opt.onShow&&this.opt.onShow.call(this);
},
resetPosition:function(){
return s(this.opt,this);
}
},e.exports=i;
});define("biz_web/lib/store.js", [ "biz_web/lib/json.js" ], function(e, t, n) {
try {
var r = +(new Date), i = e("biz_web/lib/json.js"), s = {}, o = window.document, u = "localStorage", a = "__storejs__", f;
s.disabled = !1, s.set = function(e, t) {}, s.get = function(e) {}, s.remove = function(e) {}, s.clear = function() {}, s.transact = function(e, t, n) {
var r = s.get(e);
n == null && (n = t, t = null), typeof r == "undefined" && (r = t || {}), n(r), s.set(e, r);
}, s.getAll = function() {}, s.serialize = function(e) {
return i.stringify2(e);
}, s.deserialize = function(e) {
if (typeof e != "string") return undefined;
try {
return i.parse(e);
} catch (t) {
return e || undefined;
}
};
function l() {
try {
return u in window && window[u];
} catch (e) {
return !1;
}
}
if (l()) f = window[u], s.set = function(e, t) {
if (t === undefined) return s.remove(e);
try {
f.setItem(e, s.serialize(t));
} catch (n) {
f.clear(), f.setItem(e, s.serialize(t));
}
return t;
}, s.get = function(e) {
return s.deserialize(f.getItem(e));
}, s.remove = function(e) {
f.removeItem(e);
}, s.clear = function() {
f.clear();
}, s.getAll = function() {
var e = {};
for (var t = 0; t < f.length; ++t) {
var n = f.key(t);
e[n] = s.get(n);
}
return e;
}; else if (o.documentElement.addBehavior) {
var c, h;
try {
h = new ActiveXObject("htmlfile"), h.open(), h.write('<script>document.w=window</script><iframe src="/favicon.ico"></iframe>'), h.close(), c = h.w.frames[0].document, f = c.createElement("div");
} catch (p) {
f = o.createElement("div"), c = o.body;
}
function d(e) {
return function() {
var t = Array.prototype.slice.call(arguments, 0);
t.unshift(f), c.appendChild(f), f.addBehavior("#default#userData"), f.load(u);
var n = e.apply(s, t);
return c.removeChild(f), n;
};
}
var v = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
function m(e) {
return e.replace(v, "___");
}
s.set = d(function(e, t, n) {
return t = m(t), n === undefined ? s.remove(t) : (e.setAttribute(t, s.serialize(n)), e.save(u), n);
}), s.get = d(function(e, t) {
return t = m(t), s.deserialize(e.getAttribute(t));
}), s.remove = d(function(e, t) {
t = m(t), e.removeAttribute(t), e.save(u);
}), s.clear = d(function(e) {
var t = e.XMLDocument.documentElement.attributes;
e.load(u);
for (var n = 0, r; r = t[n]; n++) e.removeAttribute(r.name);
e.save(u);
}), s.getAll = d(function(e) {
var t = e.XMLDocument.documentElement.attributes, n = {};
for (var r = 0, i; i = t[r]; ++r) {
var o = m(i.name);
n[i.name] = s.deserialize(e.getAttribute(o));
}
return n;
});
}
try {
s.set(a, a), s.get(a) != a && (s.disabled = !0), s.remove(a);
} catch (p) {
s.disabled = !0;
}
s.enabled = !s.disabled, n.exports = s;
} catch (p) {
wx.jslog({
src: "biz_web/lib/store.js"
}, p);
}
});define("common/wx/time.js",[],function(){
"use strict";
function e(e){
var t=new Date(1e3*e),r=new Date,g=t.getTime(),a=r.getTime(),u=864e5;
return u>a-g&&r.getDate()==t.getDate()?"%s:%s".sprintf(n(t.getHours()),n(t.getMinutes())):2*u>a-g&&new Date(1*t+u).getDate()==r.getDate()?"昨天 %s:%s".sprintf(n(t.getHours()),n(t.getMinutes())):6*u>=a-g?"%s %s:%s".sprintf(s[t.getDay()],n(t.getHours()),n(t.getMinutes())):t.getFullYear()==r.getFullYear()?"%s月%s日".sprintf(n(t.getMonth()+1),n(t.getDate())):"%s年%s月%s日".sprintf(t.getFullYear(),n(t.getMonth()+1),n(t.getDate()));
}
function t(e){
var t=new Date(1e3*e);
return"%s-%s-%s %s:%s:%s".sprintf(t.getFullYear(),n(t.getMonth()+1),n(t.getDate()),n(t.getHours()),n(t.getMinutes()),n(t.getSeconds()));
}
function r(e,t){
var r=["日","一","二","三","四","五","六"],n=t.replace(/yyyy|YYYY/,e.getFullYear()).replace(/yy|YY/,g(e.getFullYear()%100,2)).replace(/mm|MM/,g(e.getMonth()+1,2)).replace(/m|M/g,e.getMonth()+1).replace(/dd|DD/,g(e.getDate(),2)).replace(/d|D/g,e.getDate()).replace(/hh|HH/,g(e.getHours(),2)).replace(/h|H/g,e.getHours()).replace(/ii|II/,g(e.getMinutes(),2)).replace(/i|I/g,e.getMinutes()).replace(/ss|SS/,g(e.getSeconds(),2)).replace(/s|S/g,e.getSeconds()).replace(/w/g,e.getDay()).replace(/W/g,r[e.getDay()]);
return n;
}
function g(e,t){
for(var r=0,g=t-(e+"").length;g>r;r++)e="0"+e;
return e+"";
}
var n=function(e){
return e+="",e.length>=2?e:"0"+e;
},s=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
return{
timeFormat:e,
getFullTime:t,
formatDate:r
};
});