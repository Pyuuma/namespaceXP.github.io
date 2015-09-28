var window_height = document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight;
var window_width = document.all ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth;
var width = window_width / 100;
var height = window_height / 100;

var restaurant_name = "XP小馆";


function set_header(){
	$('#header').css("height", (8 * height).toString() + 'px');
	
	$('#logo').css("height", (5 * height).toString() + 'px');
	$('#logo').css("width", (5 * height).toString() + 'px');
	$('#logo').css("border-radius", (5 * height).toString() + 'px');
	$('#logo').css("top", ($("#header").height() - $("#logo").height())/2);
	$('#logo').css("left", ($("#header").height() - $("#logo").height())/2);
	
	$('#restaurant_name').html(restaurant_name);
	$('#restaurant_name').css("width", (40 * height).toString() + 'px');
	$('#restaurant_name').css("left", ($("#header").width() - $("#restaurant_name").width())/2);
	$('#restaurant_name').css("font-size", (3.5 * height).toString() + 'px');
	$('#restaurant_name').css("line-height",  $("#restaurant_name").height().toString() + 'px');
	
	$('#call_service').css("font-size", (2.4 * height).toString() + 'px');
	$('#call_service').css("right", $("#call_service").css('font-size'));
	$('#call_service').css("line-height",  $("#restaurant_name").height().toString() + 'px');
	
}


set_header();