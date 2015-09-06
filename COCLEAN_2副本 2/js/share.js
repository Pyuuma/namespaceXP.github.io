function share()
{
	$("#partD").css("display","none");
	$("#partE").css("display","block");
	$("#cover").css("opacity","0.8");
	$("#cover").css("z-index","1");
	$("#partE").css("z-index","2");
}

function cancel_share()
{
	$("#partE").css("display","none");
	$("#partD").css("display","block");
	$("#cover").css("opacity","0");
	$("#cover").css("z-index","-1");
	$("#partE").css("z-index","-1");
}

function shareTowx()
{
	$("#cover").css("opacity","0.8");
	$("#cover").css("z-index","100");
	$("#share_prompt").css("display","block");
}
var _title,_source,_sourceUrl,_pic,_showcount,_desc,_summary,_site,
_width = 600,
_height = 600,
_top = (screen.height-_height)/2,
_left = (screen.width-_width)/2,
_url = 'http://www.coclean.cn/',
_pic = 'http://www.coclean.cn/Annex/image/ZQ.jpg';

//分享到QQ空间
function shareToQzone(event){
	event.preventDefault();	
	var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
	_shareUrl += 'url=' + encodeURIComponent(_url||document.location);   //参数url设置分享的内容链接|默认当前页location
	_shareUrl += '&showcount=' + _showcount||0;      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
	_shareUrl += '&desc=' + encodeURIComponent(_desc||'分享的描述');    //参数desc设置分享的描述，可选参数
	_shareUrl += '&summary=' + encodeURIComponent(_summary||'分享摘要');    //参数summary设置分享摘要，可选参数
	_shareUrl += '&title=' + encodeURIComponent(_title||document.title);    //参数title设置分享标题，可选参数
	_shareUrl += '&site=' + encodeURIComponent(_site||'');   //参数site设置分享来源，可选参数
	_shareUrl += '&pics=' + encodeURIComponent(_pic||'');   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
	window.open(_shareUrl,'_blank','width='+_width+',height='+_height+',top='+_top+',left='+_left+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
}

//分享到新浪微博    
 function shareToSinaWB(event){
     event.preventDefault();   
     var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey=895033136';     //真实的appkey，必选参数 
     _shareUrl += '&url='+ encodeURIComponent(_url||document.location);     //参数url设置分享的内容链接|默认当前页location，可选参数
     _shareUrl += '&title=' + encodeURIComponent(_title||document.title);    //参数title设置分享的标题|默认当前页标题，可选参数
     _shareUrl += '&source=' + encodeURIComponent(_source||'');
     _shareUrl += '&sourceUrl=' + encodeURIComponent(_sourceUrl||'');
     _shareUrl += '&content=' + 'utf-8';   //参数content设置页面编码gb2312|utf-8，可选参数
     _shareUrl += '&pic=' + encodeURIComponent(_pic||'');  //参数pic设置图片链接|默认为空，可选参数
     window.open(_shareUrl,'_blank','width='+_width+',height='+_height+',top='+_top+',left='+_left+',toolbar=no,menubar=no,scrollbars=no, resizable=1,location=no,status=0');
 }

//分享到腾讯微博
function shareToQQwb(event){
	event.preventDefault();
	var _shareUrl = 'http://v.t.qq.com/share/share.php?';
	_shareUrl += 'title=' + encodeURIComponent(_title||document.title);    //分享的标题
	_shareUrl += '&url=' + encodeURIComponent(_url||location.href);    //分享的链接
	_shareUrl += '&appkey=5bd32d6f1dff4725ba40338b233ff155';    //在腾迅微博平台创建应用获取微博AppKey
	_shareUrl += '&site=' + encodeURIComponent(_site||'');   //分享来源
	_shareUrl += '&pic=' + encodeURIComponent(_pic||'');    //分享的图片，如果是多张图片，则定义var _pic='图片url1|图片url2|图片url3....'
	window.open(_shareUrl,'_blank','width='+_width+',height='+_height+',left='+_left+',top='+_top+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
}