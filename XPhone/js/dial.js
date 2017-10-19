var nowNumber = "";
var addresslist = document.getElementById("addresslist");
var callflag = false;
var showflag = false;

$(document).ready(function(){
	getAddressList();
});


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

function getRecentList(){
	$.getJSON("http://namespaceXP.github.io/XPhone/recent.json", function(json){
		for(var i = 0; i < json.messages.length; i++){
			var newdiv = newMessagediv(json.messages[i].date, json.messages[i].number, json.messages[i].content);
			messagelist.appendChild(newdiv);
		}
	});
}

function newRecentdiv(date, number, content){
	var maxlength = 22;
	
	var messagediv = document.createElement("div");
	var datediv = document.createElement("div");
	var numberdiv = document.createElement("div");
	var contentdiv = document.createElement("div");
	messagediv.id = number;
	messagediv.className = "messagediv";
	datediv.className = "datediv";
	numberdiv.className = "numberdiv";
	contentdiv.className = "contentdiv";
	datediv.innerHTML = date;
	numberdiv.innerHTML = number;
	if(content.length <= maxlength){
		contentdiv.innerHTML = content;
	}
	else{
		contentdiv.innerHTML = content.substr(0, maxlength-2) + "……";
	}
	
	messagediv.appendChild(datediv);
	messagediv.appendChild(numberdiv);
	messagediv.appendChild(contentdiv);
	messagediv.onclick = function(){
		
	}
	return messagediv;
}

function getAddressList(){
	$.getJSON("http://namespaceXP.github.io/XPhone/address.json", function(json){
		for(var i = 0; i < json.address.length; i++){
			var newdiv = newAddressdiv(json.address[i].name, json.address[i].number);
			addresslist.appendChild(newdiv);
		}
	});
}

function newAddressdiv(mname, number){
	var maxlength = 22;
	var messagediv = document.createElement("div");
	var numberdiv = document.createElement("div");
	var namediv = document.createElement("div");
	messagediv.id = number;
	messagediv.className = "messagediv";
	numberdiv.className = "numberdiv";
	namediv.className = "contentdiv";
	namediv.innerHTML = mname;
	numberdiv.innerHTML = number;

	messagediv.appendChild(nameiv);
	messagediv.appendChild(numberdiv);
	messagediv.onclick = function(){
		
	}
	return messagediv;
}


$("#address").click(function(){
	this.src = "img/addresslist_pushed.png";
	$("#boardpage").css("display", "none");
	$("#addresspage").css("display", "block");
	$("#recentpage").css("display", "none");
	$("#board").attr('src',"img/board.png"); 
	$("#recent").attr('src',"img/recent.png"); 
});

$("#recent").click(function(){
	this.src = "img/recent_pushed.png";
	$("#boardpage").css("display", "none");
	$("#addresspage").css("display", "none");
	$("#recentpage").css("display", "block");
	$("#board").attr('src',"img/board.png"); 
	$("#address").attr('src',"img/addresslist.png"); 
});

$("#board").click(function(){
	this.src = "img/board_pushed.png";
	$("#boardpage").css("display", "block");
	$("#addresspage").css("display", "none");
	$("#recentpage").css("display", "none");
	$("#recent").attr('src',"img/recent.png"); 
	$("#address").attr('src',"img/addresslist.png"); 
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
