var width = (document.all ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth) / 100;
var height = (document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight) / 100;

var another_change_img = document.getElementById('another_change_img');
var change_img = document.getElementById('change_img');
var up = document.getElementById('up');
var down = document.getElementById('down');

var top_padding = 8 * width;
var left_padding = 4 * width;
var content_fontsize = 2.8 * width;
var job_fontrate = 3.6; 
var contact_height = 32 * width;
var lineheight_rate =1.8; 
var language_height = 9.6 * width;
var copyright_height = 2 * width;
var chosen = 1;
var language = 1;
var language_now_width = 13 * width;
var change_language_innerwidth = 2 * width;
var change_language_height = 16 * width;
var top_now = 0;

window.onload = function(){
	set_header();
	set_job_list();
	set_change_language();
	set_content();
	job1.style.color = 'RGB(27, 190, 231)';
	hide_cover();
}


function set_job_list(){
	$('#job_list').css('top', $('#header_image').height().toString() + 'px');
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
	
}

function set_content(){
	$('#content').css('top', ($('#job_list').height() + $('#header_image').height()).toString() + 'px');
	$('#content').css('height', 97 * height - ($('#job_list').height() + $('#header').height() + $('#contact').height()).toString() + 'px');
	$('#content').css('left', (left_padding).toString() + 'px');
	$('#content').css('font-size', content_fontsize.toString() + 'px');
	$('#content').css('line-height', (content_fontsize * lineheight_rate).toString() + 'px');
}


job1.onclick = function(){
	document.getElementById('job' + chosen.toString()).style.color = 'RGB(82, 82, 82)';
	chosen = 1;
	this.style.color = 'RGB(27, 190, 231)';
	$('#duty').html('-&nbsp;负责云平台的前端开发<br>-&nbsp;复杂用户界面与交互应用开发<br>-&nbsp;现有产品持续改进<br>');
	$('#requirement').html('-&nbsp;2年以上任职经验，有CSS3/HTML5实战经验<br>-&nbsp;精通JavaScript和AJAX相关技巧，紧跟前端开发趋势，不断学习进步<br>-&nbsp;熟悉Java，PHP，了解Thinkphp等框架<br>-&nbsp;掌握CSS高级特性、响应式布局框架、手机显示界面<br>');
}

job2.onclick = function(){
	document.getElementById('job' + chosen.toString()).style.color = 'RGB(82, 82, 82)';
	chosen = 2;
	this.style.color = 'RGB(27, 190, 231)';
	$('#duty').html('-&nbsp;云平台数据转存(Java)<br>-&nbsp;官方网站开发、后台开发(php)<br>-&nbsp;现有产品持续改进<br>');
	$('#requirement').html('-&nbsp;1年以上实战经验、了解JavaScript、Ajax相关技巧<br>-&nbsp;掌握Java、php和Thinkphp等框架，紧跟趋势<br>-&nbsp;掌握MySQL，npsql等数据库<br>');
}

job3.onclick = function(){
	document.getElementById('job' + chosen.toString()).style.color = 'RGB(82, 82, 82)';
	chosen = 3;
	this.style.color = 'RGB(27, 190, 231)';
	$('#duty').html('-&nbsp;网站内共建设的布局和结构等方面的整体规划和文字编辑工作<br>-&nbsp;负责网站日常美术设计和宣传资料的制作，编写网站宣传资料及相关<br>&nbsp;&nbsp;产品资料<br>-&nbsp;配合策划推广活动，并参与执行<br>');
	$('#requirement').html('-&nbsp;美术相关专业，具有深厚的美术功底和良好的创意构思能力、综合视<br>&nbsp;&nbsp;觉把握能力<br>-&nbsp;熟练使用Photoshop、AI等常用设计制作软件<br>-&nbsp;工作认真，有责任心，踏实肯干，有团队合作精神<br>-&nbsp;具有一定的美术功底，出色的创意构思能力<br>');
}

job4.onclick = function(){
	document.getElementById('job' + chosen.toString()).style.color = 'RGB(82, 82, 82)';
	chosen = 4;
	this.style.color = 'RGB(27, 190, 231)';
	$('#duty').html('-&nbsp;负责产品的构思、设计、造型等<br>-&nbsp;将品牌、产品规划以及产品定位物化为合适的产品设计<br>-&nbsp;将好的产品设计转化为好的商品和用品<br>');
	$('#requirement').html('-&nbsp;1年以上实战经验，产品设计、工业设计等相关专业但并不局限，重点<br>&nbsp;&nbsp;是出色的造型表达能力<br>-&nbsp;对材料、工艺、表面处理有丰富的经验和独特的视角，并结合设计趋势<br>&nbsp;&nbsp;进行突破和创新<br>-&nbsp;同相关部门一起解决产品开发过程中的问题<br>-&nbsp;良好的沟通能力，富有团队合作精神<br>');
}

job5.onclick = function(){
	document.getElementById('job' + chosen.toString()).style.color = 'RGB(82, 82, 82)';
	chosen = 5;
	this.style.color = 'RGB(27, 190, 231)';
	$('#duty').html('-&nbsp;配合品牌及产品推广、营销策划撰写相关稿件，包括新闻稿、深度稿<br>&nbsp;&nbsp;与评论稿等<br>-&nbsp;对品牌及产品进行精准如实的描述，负责产品及品牌相关的广告创意<br>&nbsp;&nbsp;文案的撰写<br>-&nbsp;负责行业相关资讯的采集，微信、微博、论坛等相关平台的内容编辑<br>&nbsp;&nbsp;发布（综合文字、图片等资料），能够独立策划内容主题<br>-&nbsp;协助产品对外宣传资料的编辑撰写和包装等<br>');
	$('#requirement').html('-&nbsp;本科以上学历，中文、广告、传播、新闻、营销等相关专业，1年以上<br>&nbsp;&nbsp;文案实战经验，优秀的文案撰写、策划能力及执行力，思维活跃，思路<br>&nbsp;&nbsp;开阔，逻辑性强，文笔好，文案撰写效率高<br>-&nbsp;对微博、微信、论坛等有深入了解并有独到见解，热衷活跃于各大交流<br>&nbsp;&nbsp;平台<br>-&nbsp;有激情和动力，具有较强的责任心和团队合作精神，熟练使用Word、<br>&nbsp;&nbsp;Excel、PowerPoint等办公软件<br>');
}

job6.onclick = function(){
	document.getElementById('job' + chosen.toString()).style.color = 'RGB(82, 82, 82)';
	chosen = 6;
	this.style.color = 'RGB(27, 190, 231)';
	$('#duty').html('-&nbsp;嵌入式系统开发，熟悉ARM和STM32内核<br>-&nbsp;外设驱动开发<br>-&nbsp;现配合系统联调测试<br>');
	$('#requirement').html('-&nbsp;通信或计算机专业本科及以上学历<br>-&nbsp;有实际项目开发经验，熟知相关系统运行机制<br>-&nbsp;有蓝牙或WiFi相关项目开发经验者优先<br>');
}

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


