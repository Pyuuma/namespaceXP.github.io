var sign = 10;
$('#header').css('height', '83px');

function set_height(){
	if(navigator.userAgent.indexOf("iPad") == -1)
	{
		;
	}
	else
	{		
		$("#page1").attr('height', $('#page1').width() * 665 / 1024);
		$("#page2").attr('height', $('#page2').width() * 665 / 1024);
		$("#page3").attr('height', $('#page3').width() * 665 / 1024);
		$("#page4").attr('height', $('#page4').width() * 665 / 1024);
		$("#page5").attr('height', $('#page5').width() * 665 / 1024);
		$("#page6").attr('height', $('#page6').width() * 665 / 1024);
		$("#page7").attr('height', $('#page7').width() * 665 / 1024);
	}  
}

window.onscroll = function () {
	var scrtop = document.documentElement.scrollTop||document.body.scrollTop;
	var height = document.documentElement.clientHeight||document.body.clientHeight;
	

	if(getScrollTop() > $('#page2').offset().top - 20 && getScrollTop() < $('#page2').offset().top + 600){
		//document.getElementById('page2').contentWindow.anime();
	}	
	if(getScrollTop() > $('#page3').offset().top - 20 && getScrollTop() < $('#page3').offset().top + 600){
		//document.getElementById('page3').contentWindow.anime();
	}	
	if(getScrollTop() > $('#page4').offset().top - 20 && getScrollTop() < $('#page4').offset().top + 600){
		//document.getElementById('page4').contentWindow.anime();
	}	
	if(getScrollTop() > $('#page5').offset().top - 20 && getScrollTop() < $('#page5').offset().top + 600){
		//document.getElementById('page5').contentWindow.anime();
	}	
	if(getScrollTop() > $('#page6').offset().top - 20 && getScrollTop() < $('#page6').offset().top + 600){
		//document.getElementById('page6').contentWindow.anime();
	}	
	if(getScrollTop() > $('#page7').offset().top - 20 && getScrollTop() < $('#page7').offset().top + 600){
		//document.getElementById('page7').contentWindow.anime();
	}	
	
	if (scrtop > sign){
		sign = scrtop;  
		if(getScrollTop() < $('#page2').offset().top && getScrollTop() > $('#page2').offset().top - 0.6 * $('#page2').height()){
		    $("body,html").animate({
		     scrollTop : $('#page2').offset().top  //让body的scrollTop等于pos的top，就实现了滚动
		     }, 600);
		}	
		
		if(scrtop - sign > 20){
			$('#header').css('height', '0px');
		}    
	}
	
	else if(scrtop < sign){
		if(scrtop - sign < -10){
			$('#header').css('height', '83px');
		}
		sign = scrtop;
	}
	
}



function getScrollTop(){
    var scrollTop = 0;
    if(document.documentElement && document.documentElement.scrollTop){
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