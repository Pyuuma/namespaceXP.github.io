var winHeight, winWidth;

	getWindowSize();
	if(winHeight/winWidth > 16/9){
		$("#main").css("width", winWidth + "px");
		$("#main").css("left","0");
		$("#main").css("top",(winHeight -  16 / 9 * winWidth) / 2 + "px");
		$("#main").css("height", 16 / 9 * winWidth + "px");
		
	}
	else{
		$("#main").css("width", 9 / 16 * winHeight + "px");
		$("#main").css("top","0");
		$("#main").css("left",(winWidth - 9 / 16 * winHeight) / 2 + "px");
		$("#main").css("height", winHeight + "px");
	}

window.onresize = function(){
	getWindowSize();
		if(winHeight/winWidth > 16/9){
		$("#main").css("width", winWidth + "px");
		$("#main").css("left","0");
		$("#main").css("top",(winHeight -  16 / 9 * winWidth) / 2 + "px");
		$("#main").css("height", 16 / 9 * winWidth + "px");
	}
	else{
		$("#main").css("width", 9 / 16 * winHeight + "px");
		$("#main").css("top","0");
		$("#main").css("left",(winWidth - 9 / 16 * winHeight) / 2 + "px");
		$("#main").css("height", winHeight + "px");
	} 
}

function getWindowSize(){
	if (window.innerWidth)
		winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))
		winWidth = document.body.clientWidth;
	// 获取窗口高度
	if (window.innerHeight)
	winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
	winHeight = document.body.clientHeight;
	// 通过深入 Document 内部对 body 进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}
}
