var nowNumber = "";
var callflag = false;
var showflag = false;
var addresslist = document.getElementById("addresslist");
var recentlist = document.getElementById("recentlist");

$(document).ready(function(){
	getAddressList();
	getRecentList();
	addresslist.style.height = (document.documentElement.clientHeight - 0.46 * document.documentElement.clientWidth) + "px";
	recentlist.style.height = addresslist.style.height;
});

window.onresize = function(){
	addresslist.style.height = (document.documentElement.clientHeight - 0.46 * document.documentElement.clientWidth) + "px";
	recentlist.style.height = addresslist.style.height;
}

var config = {
  syncURL: "https://wd3142915294flcvux.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

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

$("#userback").click(function(){
	$("#userpage").css("display", "none");
	$("#addresspage").css("display", "block");
})

function getRecentList(){
	$.getJSON("http://namespaceXP.github.io/XPhone/recent.json", function(json){
		for(var i = 0; i < json.recent.length; i++){
			var newdiv = newRecentdiv(json.recent[i].date, json.recent[i].number, json.recent[i].time, json.recent[i].count,json.recent[i].sendflag);
			recentlist.appendChild(newdiv);
		}
	});
}

function newRecentdiv(date, number, time, count, sendflag){
	var maxlength = 22;
	
	var messagediv = document.createElement("div");
	var datediv = document.createElement("div");
	var numberdiv = document.createElement("div");
	messagediv.id = number;
	messagediv.className = "recentdiv";
	datediv.className = "recentdatediv";
	numberdiv.className = "recentnumberdiv";
	datediv.innerHTML = date;
	numberdiv.innerHTML = number;
	if(sendflag == 1){
		numberdiv.style.color = "#FF0000";
	}
	if(count > 1){
		numberdiv.innerHTML += " (" + count + ")";
	}
	messagediv.appendChild(datediv);
	messagediv.appendChild(numberdiv);
	messagediv.onclick = function(){
		
	}
	return messagediv;
}

function getAddressList(){
	$.getJSON("http://namespaceXP.github.io/XPhone/addr.json", function(json){
		for(var i = 0; i < json.address.length; i++){
			var newdiv = newAddressdiv(json.address[i].name, json.address[i].number);
			addresslist.appendChild(newdiv);
		}
	});
}

function newAddressdiv(mname, number){
	var maxlength = 22;
	var messagediv = document.createElement("div");
	var namediv = document.createElement("div");
	messagediv.id = number;
	messagediv.className = "addrdiv";
	namediv.className = "namediv";
	namediv.innerHTML = mname;
	messagediv.appendChild(namediv);
	messagediv.onclick = function(){
		$("#username").html( this.innerHTML);
		$("#userphone").html("手机: " + this.id);
		$("#addresspage").css("display","none");
		$("#userpage").css("display","block");
	}
	return messagediv;
}


$("#address").click(function(){
	this.src = "img/addresslist_pushed.png";
	$("#boardpage").css("display", "none");
	$("#userpage").css("display", "none");
	$("#addresspage").css("display", "block");
	$("#recentpage").css("display", "none");
	$("#board").attr('src',"img/board.png"); 
	$("#recent").attr('src',"img/recent.png"); 
});

$("#recent").click(function(){
	this.src = "img/recent_pushed.png";
	$("#boardpage").css("display", "none");
	$("#userpage").css("display", "none");
	$("#addresspage").css("display", "none");
	$("#recentpage").css("display", "block");
	$("#board").attr('src',"img/board.png"); 
	$("#address").attr('src',"img/addresslist.png"); 
});

$("#board").click(function(){
	this.src = "img/board_pushed.png";
	$("#userpage").css("display", "none");
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
	$("#callbar").css("display","none");
	$("#call").attr("src","img/shut.png");
	$("#dial").css("background-color","#777777");
	var myAuto = document.getElementById('myaudio');
	myAuto.play();
	if(nowNumber == "12133482349"){
		ref.set({
		  "messageboard":1
		});
	}
}

function enddial(){
	callflag = false;
	$("#table").css("display","block");
	$("#delete").css("display","block");
	$("#callbar").css("display","block");
	$("#call").attr("src","img/call.png");
	$("#dial").css("background-color","#ffffff");
	var myAuto = document.getElementById('myaudio');
	myAuto.pause();
	ref.set({
		"messageboard":0
	});
}
