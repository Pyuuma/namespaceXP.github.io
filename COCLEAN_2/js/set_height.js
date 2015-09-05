$(function () {
	var window_height = document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight ;
	var width = window_height/50;
	$("#set_font_size").css("font-size",width);
	$("#set_font_size").css("font-family","hi");
	$("#head").css("height",window_height * 0.07);
	$("#call_manage").css("height",window_height * 0.052);
	$("#call_manage").css("top",window_height * 0.02);
	var border_radius = window_height * 0.026 + "px " + 0 + "px " + 0 + "px " + window_height * 0.026 + "px";
	$("#call_manage").css("border-radius",border_radius);
	$("#set_img").css("height",window_height * 0.05);
	$("#set_img").css("top",window_height * 0.001);
	var heightA = window_height * 0.1726; 
	$("#partA").css('height', heightA);
	var heightB = window_height * 0.3720; 	 
	$("#partB").css('height', heightB);
	$("#partC").css('top', heightA);
	var heightC = window_height * 0.74; 
	$("#partC").css('height', heightC);
	var heightD = window_height * 0.0873;
	$("#partD").css('top', heightA + heightC);
	$("#share_img").css('top', heightA + heightC);	
	$("#share_img").css('height', heightD);
	$("#share_img").css('width', heightD * 7.273);
	$("#share_img").css('left', ($("#partD").width() - $("#share_img").width())/2);
	debugger;
	$("#partD").css('height', heightD);
	var height = window_height * 0.0784;	
	$("#temprature_div").css('height', height);
	$("#temprature_evaluation").css('height', height/2.5);
	$("#temprature_evaluation").css('line-height', height/2.5+"px");
	$("#temprature_evaluation").css('border-radius', height/5);
	$("#humidity_div").css('height', height); 
	$("#humidity_evaluation").css('height', height/2.5);
	$("#humidity_evaluation").css('line-height', height/2.5+"px");
	$("#humidity_evaluation").css('border-radius', height/5);
	height = window_height * 0.6071; 
	$("#temprature_div").css('top', height);
	$("#humidity_div").css('top', height);
	height = window_height * 0.1558; 	 
	$("#partB").css('top', height);
	height = window_height * 0.1071; 
	$("#PM_div").css('height', height);
	$("#PM_evaluation").css('height', height/2.5);
	$("#PM_evaluation").css('line-height', height/2.5+"px");
	$("#PM_evaluation").css('border-radius', height/5);
	height = window_height * 0.0427;
	$("#PM_div").css('top', height);	
	draw_partA();
	draw_partB();
	draw_partC();
});

function delete_cover()
{
	if($("#cover")[0].style.opacity == 0.8)
	{
		$("#cover").css("z-index",1);
	}
	if($("#share_prompt")[0].style.display == "block")
		$("#share_prompt").css("display", "none");
}