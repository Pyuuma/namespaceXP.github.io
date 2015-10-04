var sign = 10, listflag = false;
var width = (document.all ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth) / 100;
var height = (document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight) / 100;
var top_padding = 8 * width;
var left_padding = 4 * width;
var content_fontsize = 2.8 * width;
var job_fontrate = 3.2; 
var contact_height = 32 * width;
var lineheight_rate =1.8; 
var language_height = 9.6 * width;
var copyright_height = 2 * width;

window.onload = function(){
	$('#header').css('height', $('#header_image').height().toString() + 'px');
	$('#job_list').css('top', $('#header').height().toString() + 'px');
	$('#x-border2').css('bottom', '0px');
	$('#job_list').css('height', ($('#header').width() * 540 / 2258).toString() + 'px');
	$('#x-border1').css('bottom', ($('#job_list').height() / 2).toString() + 'px');
	$('.y_border').css('height',  $('#job_list').height().toString() + 'px');
	$('.job_div').css('height',  ($('#job_list').height() / 2).toString() + 'px');
	$('.job_div').css('line-height',  $('.job_div').height().toString() + 'px');
	$('.job_div').css('font-size',  ($('.job_div').height() / job_fontrate).toString() + 'px');
	$('#y-border1').css('left', ($('#header').width() / 3).toString() + 'px');
	$('#y-border2').css('right', ($('#header').width() / 3).toString() + 'px');
	
	
	$('#job1').css('top','0px');
	$('#job1').css('left','0px');
	$('#job2').css('left',($('#header').width() / 3).toString() + 'px');
	$('#job2').css('top','0px');
	$('#job3').css('top','0px');
	$('#job3').css('left',($('#header').width() * 2 / 3).toString() + 'px');
	    
	$('#job4').css('top',($('#job_list').height() / 2).toString() + 'px');
	$('#job4').css('left','0px');
	$('#job5').css('left',($('#header').width() / 3).toString() + 'px');
	$('#job5').css('top',($('#job_list').height() / 2).toString() + 'px');
	$('#job6').css('top',($('#job_list').height() / 2).toString() + 'px');
	$('#job6').css('left',($('#header').width() * 2 / 3).toString() + 'px');
	
	
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
	
	$('#content').css('top', ($('#job_list').height() + $('#header').height()).toString() + 'px');
	$('#content').css('height', 100 * height - ($('#job_list').height() + $('#header').height() + $('#contact').height()).toString() + 'px');
	$('#content').css('left', (left_padding).toString() + 'px');
	$('#content').css('font-size', content_fontsize.toString() + 'px');
	$('#content').css('line-height', (content_fontsize * lineheight_rate).toString() + 'px');
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

job1.onclick = function(){
	$('#duty').html('-&nbsp;负责云平台的前端开发<br>-&nbsp;复杂用户界面与交互应用开发<br>-&nbsp;现有产品持续改进<br>');
	$('#requirement').html('-&nbsp;2年以上任职经验，有CSS3/HTML5实战经验<br>-&nbsp;精通JavaScript和AJAX相关技巧，紧跟前端开发趋势，不断学习进步<br>-&nbsp;熟悉Java，PHP，了解Thinkphp等框架<br>-&nbsp;掌握CSS高级特性、响应式布局框架、手机显示界面<br>');
}

job2.onclick = function(){
	$('#duty').html('-&nbsp;云平台数据转存(Java)<br>-&nbsp;官方网站开发、后台开发(php)<br>-&nbsp;现有产品持续改进<br>');
	$('#requirement').html('-&nbsp;1年以上实战经验、了解JavaScript、Ajax相关技巧<br>-&nbsp;掌握Java、php和Thinkphp等框架，紧跟趋势<br>-&nbsp;掌握MySQL，npsql等数据库<br>');
}

job3.onclick = function(){
	$('#duty').html('-&nbsp;网站内共建设的布局和结构等方面的整体规划和文字编辑工作<br>-&nbsp;负责网站日常美术设计和宣传资料的制作，编写网站宣传资料及相关<br>&nbsp;&nbsp;产品资料<br>-&nbsp;配合策划推广活动，并参与执行<br>');
	$('#requirement').html('-&nbsp;美术相关专业，具有深厚的美术功底和良好的创意构思能力、综合视<br>&nbsp;&nbsp;觉把握能力<br>-&nbsp;熟练使用Photoshop、AI等常用设计制作软件<br>-&nbsp;工作认真，有责任心，踏实肯干，有团队合作精神<br>-&nbsp;具有一定的美术功底，出色的创意构思能力<br>');
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