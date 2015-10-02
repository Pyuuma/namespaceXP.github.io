var sign = 10;
$('#header').css('height', '83px');
/*
function set_height(){
	if(navigator.userAgent.indexOf("iPad") == -1)
	{
		$("#page0").attr('height', $('#page1').width() * 800 / 2020);
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
*/

window.onscroll = function () {
	
	if(getScrollTop() > $('#production1').offset().top - 20 && getScrollTop() < $('#production1').offset().top + 600){
		anime1();
	}	
	if(getScrollTop() > $('#production2').offset().top - 200 && getScrollTop() < $('#production2').offset().top + 600){
		anime2();
	}	
	if(getScrollTop() > $('#production3').offset().top - 30 && getScrollTop() < $('#production3').offset().top + 600){
		anime3();
	}	
	if(getScrollTop() > $('#production4').offset().top - 20 && getScrollTop() < $('#production4').offset().top + 600){
		anime4();
	}	
	if(getScrollTop() > $('#production5').offset().top - 20 && getScrollTop() < $('#production5').offset().top + 600){
		anime5();
	}	
	if(getScrollTop() > $('#production6').offset().top - 20 && getScrollTop() < $('#production6').offset().top + 600){
		anime6();
	}	
	if(getScrollTop() > $('#production7').offset().top - 20 && getScrollTop() < $('#production7').offset().top + 600){
		anime7();
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
			$('#header').css('height', '83px');
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

//set_height();