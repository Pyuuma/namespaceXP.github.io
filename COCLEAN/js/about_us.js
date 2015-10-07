var sign = 10, listflag = false;
var width = (document.all ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth) / 100;
var height = (document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight) / 100;

var another_change_img = document.getElementById('another_change_img');
var change_img = document.getElementById('change_img');
var up = document.getElementById('up');
var down = document.getElementById('down');

var title_font_rate = 0.333;
var member_width = 85;
var member_height = 50;
var members = 10;
var content_font = 2.4;
var motto_height = 19.04;
var motto_font = 3.54;
var content_line_height = 1.8;
var content_width = 85;
var title_left_rate = 7.8;
var top_now = $('#header_image').height();

window.onload = function(){
	$('#header').css('height', $('#header_image').height().toString() + 'px');
	set_title();
	set_content();
	set_company();
	set_everyone();
	set_motto();
	set_member_title();
	set_members();
}

function set_title(){
	$('#company_title').css('top', top_now.toString() + 'px');
	$('.title').css('height', $('#header_image').height().toString() + 'px');
	$('.title').css('font-size', (title_font_rate * $('.title').height()).toString() + 'px');
	$('.title').css('line-height', $('.title').height().toString() + 'px');
	$('.title').css('text-indent', (title_left_rate * width).toString() + 'px');
	top_now += $('.title').height();
}

function set_content(){
	$('.content').css('width', (content_width * width).toString() + 'px');
	$('.content').css('left', ((50 - content_width / 2)  * width).toString() + 'px');
	$('.content').css('font-size', ((content_width * width) / 30).toString() + 'px');
	$('.content').css('line-height', (content_line_height * content_font * width).toString() + 'px');
}


function set_company(){
	$('#company').css('top', top_now.toString() + 'px');
	top_now += $('#company').height();
}

function set_everyone(){
	$('#everyone').css('top', top_now.toString() + 'px');
	top_now += $('#everyone').height();
}

function set_motto(){
	$('#motto').css('height', (motto_height * width).toString() + 'px');
	$('#motto').css('line-height', (motto_height * width).toString() + 'px');
	$('#motto').css('font-size', (motto_font * width).toString() + 'px');
	$('#motto').css('top', top_now.toString() + 'px');
	top_now += $('#motto').height();
}

function set_member_title(){
	$('#member_title').css('top', top_now.toString() + 'px');
	top_now += $('#motto').height();
}

function set_members(){
	$('#members').css('top', top_now.toString() + 'px');
	$('#members').css('left', (50 * width - (member_width * width / 2)).toString() + 'px');
	$('#members').css('height', (members * member_height * width).toString() + 'px');
	$('#members').css('width', (member_width * width).toString() + 'px');
	top_now += $('#members').height();
}



header_button.ontouchend = function(){
	if(!listflag){
		this.src = 'img/close.png';
		listflag = true;
	}
	else{
		this.src = 'img/menu.png';
		listflag = false;
	}
}

//header_button.onmouseup = header_button.ontouchend;




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


window.onscroll = function () {	
	var scrtop = document.documentElement.scrollTop||document.body.scrollTop;
	var height = document.documentElement.clientHeight||document.body.clientHeight;
	if (scrtop > sign){
		if(scrtop - sign > 20){
			$('#header').css('height', '0px');
		}
		sign = scrtop;  
		
		    
	}
	else if(scrtop < sign){
		if(scrtop - sign < -10){
			$('#header').css('height', $('#header_image').height().toString() + 'px');
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

set_height();