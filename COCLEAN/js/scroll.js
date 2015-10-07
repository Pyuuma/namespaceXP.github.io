var sign = 10, listflag = false;
var width = (document.all ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth) / 100;
var height = (document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight) / 100;


window.onload = function(){
	$('#header').css('height', $('#header_image').height().toString() + 'px');
	$('#footer').css('height', $('#footer_image').height().toString() + 'px');
	$('#blank').css('height', $('#footer_image').height().toString() + 'px');
	$('.page').css('height', $('.image').height().toString() + 'px');
	$('.title').css('height', (7 * width).toString() + 'px');
	$('.title').css('font-size', $('.title').height().toString() + 'px');
	$('.title').css('line-height', $('.title').height().toString() + 'px');
	$('.title').css('top', (0.058 * $('.page').height()).toString() + 'px');
	
	$('#page2_word').css('top',(0.164 * $('.page').height()).toString() + 'px');
	$('.normal_words').css('font-size',(2.84 * width).toString() + 'px');
	$('.normal_words').css('line-height',(1.8 * parseInt($('#page2_word').css('font-size'))).toString() + 'px');
	
	$('#page3_word').css('top',(0.245 * $('.page').height()).toString() + 'px');
	$('#page3_word').css('font-size',(2.84 * width).toString() + 'px');
	$('#page3_word').css('line-height',(1.8 * parseInt($('#page2_word').css('font-size'))).toString() + 'px');
	
	$('#page6_word').css('top',(0.224 * $('.page').height()).toString() + 'px');
	$('#page7_word').css('top',(0.224 * $('.page').height()).toString() + 'px');
	$('#page8_word').css('top',(0.170 * $('.page').height()).toString() + 'px');
	$('#page8_hint').css('top',(0.254 * $('.page').height()).toString() + 'px');
	
	$('.subtitle').css('font-size',(3.83 * width).toString() + 'px');
	$('.subtitle').css('left',(53 * width).toString() + 'px');
	
	$('.compare_words').css('font-size',(2.84 * width).toString() + 'px');
	$('.compare_words').css('line-height',(1.8 * parseInt($('.compare_words').css('font-size'))).toString() + 'px');
	$('.compare_words').css('left',(53 * width).toString() + 'px');
	
	$('.division_words').css('font-size',(2.84 * width).toString() + 'px');
	$('.division_words').css('line-height',(1.8 * parseInt($('.compare_words').css('font-size'))).toString() + 'px');
	
	$('.page8_words').css('font-size',(2.84 * width).toString() + 'px');
	$('#page8_hint').css('font-size',(2.44 * width).toString() + 'px');
	
	$('#contact').css('height',(34 * width).toString() + 'px');
	$('#contact_title').css('font-size',(3.8 * width).toString() + 'px');
	$('#contact_address').css('font-size',(2.8 * width).toString() + 'px');
	$('#copyright').css('height',(2.4 * width).toString() + 'px');
	$('#copyright').css('font-size', $('#copyright').height().toString() + 'px');
	$('#copyright').css('line-height', $('#copyright').height().toString() + 'px');
	$('#contact_address').css('line-height',(1.8 * parseInt($('#contact_address').css('font-size'))).toString() + 'px');
	
	$('#weibo_img').css('height',(9.2 * width).toString() + 'px');
	$('#wechat_img').css('height',(9.2 * width).toString() + 'px');
	$('#weibo_img').css('top',(2 * width).toString() + 'px');
	$('#wechat_img').css('top', $('#weibo_img').css('top'));
	
	$('#weibo_img').css('right',(3 * width).toString() + 'px');
	$('#wechat_img').css('right',(16 * width).toString() + 'px');
	$('#curve').css('bottom', (12 * width).toString() + 'px');
	$('#copyright').css('bottom', ((parseInt($('#curve').css('bottom')) - $('#copyright').height()) / 2).toString() + 'px');
	
	$('#language_img').css('height', (parseInt($('#curve').css('bottom')) * 0.7).toString() + 'px');
	$('#language_img').css('right', (19 * width).toString() + 'px');
	$('#language_img').css('bottom', ((parseInt($('#curve').css('bottom')) - $('#language_img').height()) / 2).toString() + 'px');
	
	$('#change_img').css('height', (parseInt($('#curve').css('bottom')) * 0.16).toString() + 'px');
	$('#change_img').css('right', (4.6 * width).toString() + 'px');
	$('#change_img').css('bottom', ((parseInt($('#curve').css('bottom')) - $('#change_img').height()) / 2).toString() + 'px');
	
	$('#language_now').css('height', (parseInt($('#curve').css('bottom')) * 0.29).toString() + 'px');
	$('#language_now').css('font-size', $('#language_now').height().toString() + 'px');
	$('#language_now').css('right', (10 * width).toString() + 'px');
	$('#language_now').css('bottom', ((parseInt($('#curve').css('bottom')) - $('#language_now').height()) / 2).toString() + 'px');
	
	
	$('.footer_word').css('font-size',($('#footer').height() * 0.34).toString() + 'px');
	$('#go_jd').css('height', ($('#footer').height() * 0.6));
	$('#go_jd').css('width', ($('#go_jd').width() * 1.4));
	$('#go_jd').css('line-height', ($('#go_jd').height()).toString() + 'px');
	$('#buybuybuy').css('left', (10 * width).toString() + 'px');
	$('#go_jd').css('right', (10 * width  - $('#go_jd').width() *  1 / 7).toString() + 'px');
	$('#go_jd').css('border-radius', ($('#go_jd').height() / 2).toString() + 'px');
	$('.footer_word').css('bottom', (($('#footer').height() - $('.footer_word').height()) / 2).toString() + 'px');
	$('#go_jd').css('bottom', (($('#footer').height() - $('#go_jd').height()) / 2).toString() + 'px');
	
	set_change_language();
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




window.onscroll = function () {
	
	if(getScrollTop() > $('#page1').offset().top - 20 && getScrollTop() < $('#page1').offset().top + 600){
		document.getElementById('page1').contentWindow.anime();
	}	
	if(getScrollTop() > $('#page2').offset().top - 20 && getScrollTop() < $('#page2').offset().top + 600){
		document.getElementById('page2').contentWindow.anime();
	}	
	if(getScrollTop() > $('#page3').offset().top - 20 && getScrollTop() < $('#page3').offset().top + 600){
		document.getElementById('page3').contentWindow.anime();
	}	
	if(getScrollTop() > $('#page4').offset().top - 20 && getScrollTop() < $('#page4').offset().top + 600){
		document.getElementById('page4').contentWindow.anime();
	}	
	if(getScrollTop() > $('#page5').offset().top - 20 && getScrollTop() < $('#page5').offset().top + 600){
		document.getElementById('page5').contentWindow.anime();
	}	
	if(getScrollTop() > $('#page6').offset().top - 20 && getScrollTop() < $('#page6').offset().top + 600){
		document.getElementById('page6').contentWindow.anime();
	}	
	if(getScrollTop() > $('#page7').offset().top - 20 && getScrollTop() < $('#page7').offset().top + 600){
		document.getElementById('page7').contentWindow.anime();
	}	
	
	
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