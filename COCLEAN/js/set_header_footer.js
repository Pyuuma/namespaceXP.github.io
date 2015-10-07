var width = (document.all ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth) / 100;
var height = (document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight) / 100;
var sign = 10, listflag = false;

var another_change_img = document.getElementById('another_change_img');
var change_img = document.getElementById('change_img');
var up = document.getElementById('up');
var down = document.getElementById('down');
var goto_production = document.getElementById('goto_production');
var goto_aboutus = document.getElementById('goto_aboutus');
var goto_addus = document.getElementById('goto_addus');
var header_button = document.getElementById('header_button');


var top_padding = 8 * width;
var left_padding = 4 * width;
var content_fontsize = 2.8 * width;
var job_fontrate = 3.6; 
var contact_height = 32 * width;
var lineheight_rate = 1.8; 
var goto_lineheight_rate = 3.5; 
var language_height = 9.6 * width;
var copyright_height = 2 * width;
var chosen = 1;
var language = 1;
var language_now_width = 13 * width;
var change_language_innerwidth = 2 * width;
var change_language_height = 16 * width;
var header_full_height = 42;

function set_header(){
	$('#header').css('height', $('#header_image').height().toString() + 'px');
	$('#header_button').css('height', $('#header_image').height().toString() + 'px');
	$('#goto').css('top', $('#header_image').height().toString() + 'px');
	$('#goto').css('font-size', content_fontsize.toString() + 'px');
	$('#goto').css('line-height', (content_fontsize * goto_lineheight_rate).toString() + 'px');
}

function set_change_language(){
	if(top_now == 0){
		top_now = 100 * height -  contact_height;
	}
	$('#contact').css('top', top_now.toString() + 'px');
	$('#contact').css('height', contact_height.toString() + 'px');
	$('#contact_title').css('font-size',(3.8 * width).toString() + 'px');
	$('#contact_address').css('font-size',(2.8 * width).toString() + 'px');
	$('#copyright').css('height',copyright_height.toString() + 'px');
	$('#copyright').css('font-size', $('#copyright').height().toString() + 'px');
	$('#copyright').css('line-height', $('#copyright').height().toString() + 'px');
	$('#contact_address').css('line-height',(1.8 * parseInt($('#contact_address').css('font-size'))).toString() + 'px');
	
	$('#weibo_img').css('height',(9.2 * width).toString() + 'px');
	$('#wechat_img').css('height',(9.2 * width).toString() + 'px');
	$('#weibo_img').css('top',(2 * width).toString() + 'px');
	$('#wechat_img').css('top', $('#weibo_img').css('top'));
	
	$('#weibo_img').css('right',(3 * width).toString() + 'px');
	$('#wechat_img').css('right',(16 * width).toString() + 'px');
	$('#curve').css('bottom', language_height.toString() + 'px');
	$('#copyright').css('bottom', ((parseInt($('#curve').css('bottom')) - $('#copyright').height()) / 2).toString() + 'px');
	
	$('#change_img').css('height', (parseInt($('#curve').css('bottom')) * 0.16).toString() + 'px');
	$('#change_img').css('right', (4.5 * width).toString() + 'px');
	$('#change_img').css('bottom', ((language_height - $('#change_img').height()) / 2).toString() + 'px');
	
	$('#language_now').css('height', (parseInt($('#curve').css('bottom')) * 0.29).toString() + 'px');
	$('#language_now').css('width', language_now_width.toString() + 'px');
	$('#language_now').css('font-size', $('#language_now').height().toString() + 'px');
	$('#language_now').css('line-height', $('#language_now').height().toString() + 'px');
	$('#language_now').css('right', (parseInt($('#change_img').css('right')) + $('#change_img').width()).toString() + 'px');
	$('#language_now').css('bottom', ((parseInt($('#curve').css('bottom')) - $('#language_now').height()) / 2).toString() + 'px');
	
	$('#language_img').css('height', (parseInt($('#curve').css('bottom')) * 0.7).toString() + 'px');
	$('#language_img').css('right', (parseInt($('#language_now').css('right')) + $('#language_now').width()).toString() + 'px');
	$('#language_img').css('bottom', ((parseInt($('#curve').css('bottom')) - $('#language_img').height()) / 2).toString() + 'px');
	
	$('#other_language_img').css('height', $('#language_img').height().toString() + 'px');
	$('#this_language_img').css('height', $('#language_img').height().toString() + 'px');
	$('#change_language').css('height', change_language_height.toString() + 'px');
	$('#change_language').css('width', (2 * change_language_innerwidth + language_now_width + $('#change_img').height() + $('#language_img').height()).toString() + 'px');
	
	$('#another_change_img').css('height', $('#change_img').height().toString() + 'px');
	$('#another_change_img').css('right', change_language_innerwidth.toString() + 'px');
	$('#another_change_img').css('bottom', (((change_language_height / 2) - $('#change_img').height()) / 2).toString() + 'px');
	
	$('.language').css('height', (parseInt($('#curve').css('bottom')) * 0.29).toString() + 'px');
	$('.language').css('width', language_now_width.toString() + 'px');
	$('.language').css('font-size', $('#this_language').height().toString() + 'px');
	$('.language').css('line-height', $('#this_language').height().toString() + 'px');
	$('.language').css('right', (parseInt($('#another_change_img').css('right')) + $('#another_change_img').width()).toString() + 'px');
	$('.language').css('bottom', (((change_language_height / 2) - $('#this_language').height()) / 2).toString() + 'px');
	
	$('#this_language_img').css('right', (parseInt($('.language').css('right')) + $('.language').width()).toString() + 'px');
	$('#this_language_img').css('bottom', (((change_language_height / 2) - $('#language_img').height()) / 2).toString() + 'px');
	$('#other_language_img').css('right', (parseInt($('.language').css('right')) + $('.language').width()).toString() + 'px');
	$('#other_language_img').css('bottom', (((change_language_height / 2) - $('#language_img').height()) / 2).toString() + 'px');
	
	$('#change_language').css('right', (parseInt($('#change_img').css('right')) - parseInt($('#another_change_img').css('right')) - 1).toString() + 'px');
	$('#change_language').css('bottom', (parseInt($('#change_img').css('bottom')) - parseInt($('#another_change_img').css('bottom')) - 1).toString() + 'px');
	
	$('#change_language').css('display', 'none');
	
	top_now += contact_height;
}

function set_language(){
	if(language){
		$('#language_now').html('中文');
		$('#this_language').html('中文');
		$('#other_language').html('English');
		$('#other_language_img').attr('src', 'img/english.png');
		$('#this_language_img').attr('src', 'img/chinese.png');
		$('#language_img').attr('src', 'img/chinese.png');
	}
	else{
		$('#language_now').html('English');
		$('#this_language').html('English');
		$('#other_language').html('中文');
		$('#other_language_img').attr('src', 'img/chinese.png');
		$('#this_language_img').attr('src', 'img/english.png');
		$('#language_img').attr('src', 'img/english.png');
	}
}

goto_production.ontouchend = function(){
	window.location.href = 'index.html'
}

goto_addus.ontouchend = function(){
	window.location.href = 'add_us.html'
}

goto_aboutus.ontouchend = function(){
	window.location.href = 'about_us.html'
}

header_button.ontouchend = function(){
	if(!listflag){
		this.src = 'img/close.png';
		$('#header').css('height', (header_full_height * width).toString() + 'px');
		$('#cover').css('opacity', 0.5);
		$('#cover').css('background-color', '#111111');
		$('#cover').css('display', 'block');
		listflag = true;
	}
	else{
		this.src = 'img/menu.png';
		$('#header').css('height', $('#header_image').height().toString() + 'px');
		$('#cover').css('display', 'none');
		listflag = false;
	}
}


header_button.onmouseup = header_button.ontouchend;
goto_production.onmouseup = goto_production.ontouchend;
goto_aboutus.onmouseup = goto_aboutus.ontouchend;
goto_addus.onmouseup = goto_addus.ontouchend;

another_change_img.onclick = function(){
	$('#change_language').css('display', 'none');
}

change_img.onclick = function(){
	$('#change_language').css('display', 'block');
}

up.onclick = function(){
	language = 1 - language;
	set_language();
	$('#change_language').css('display', 'none');
}

down.onclick = function(){
	$('#change_language').css('display', 'none');
}

window.onscroll = function () {	
	var scrtop = document.documentElement.scrollTop||document.body.scrollTop;
	var height = document.documentElement.clientHeight||document.body.clientHeight;
	if (scrtop > sign){
		if(scrtop - sign > 20){
			//$('#header').css('height', '0px');
		}
		sign = scrtop;  
		
		    
	}
	else if(scrtop < sign){
		if(scrtop - sign < -10){
			//$('#header').css('height', $('#header_image').height().toString() + 'px');
		}
		sign = scrtop;
	}
	
}


function getScrollTop(){
    var scrollTop = 0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    }
    else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}


function getClientHeight(){
    var clientHeight=0;
    if(document.body.clientHeight&&document.documentElement.clientHeight){
        var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;        
    }
    else{
        var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;    
    }
    return clientHeight;
}


function getScrollHeight(){
    return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
}


