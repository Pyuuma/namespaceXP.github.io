var nowNumber = "";
var callflag = false;
var showflag = false;

$(".dialbutton").mousedown(function(){
	this.style.backgroundColor="#aaaaaa";
});

$(".dialbutton").mouseup(function(){
	this.style.backgroundColor="#bbbbbb";
});

$(".dialbutton").mouseleave(function(){
	this.style.backgroundColor="#bbbbbb";
});

$(".dialbutton").click(function(){
	nowNumber += this.id;
	$("#delete").css("display", "block");
	$("#number").html(nowNumber);
});


$("#delete").click(function(){
	nowNumber = nowNumber.substr(0, nowNumber.length - 1);
	$("#number").html(nowNumber);
	if(nowNumber == "")
		$("#delete").css("display", "none");
});

$("#call").click(function(){
	if(callflag == false && nowNumber != "")
	{
		showdial();
	}
	else{
		enddial();
	}
});


$("#addresslist").click(function(){
	this.src = "img/addresslist_pushed.png";
	$("#board").attr('src',"img/board.png"); 
	$("#recent").attr('src',"img/recent.png"); 
});

$("#recent").click(function(){
	this.src = "img/recent_pushed.png";
	$("#board").attr('src',"img/board.png"); 
	$("#addresslist").attr('src',"img/addresslist.png"); 
});

$("#board").click(function(){
	this.src = "img/board_pushed.png";
	$("#recent").attr('src',"img/recent.png"); 
	$("#addresslist").attr('src',"img/addresslist.png"); 
});

function showdial(){
	callflag = true;
	$("#table").css("display","none");
	$("#delete").css("display","none");
	$("#call").attr("src","img/shut.png");
	$("#dial").css("background-color","#777777");
	var myAuto = document.getElementById('myaudio');
	myAuto.play();
}

function enddial(){
	callflag = false;
	$("#table").css("display","block");
	$("#delete").css("display","block");
	$("#call").attr("src","img/call.png");
	$("#dial").css("background-color","#ffffff");
	var myAuto = document.getElementById('myaudio');
	myAuto.pause();
}
