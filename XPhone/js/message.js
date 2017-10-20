var messagelist = document.getElementById("messagelist");
var detaillist = document.getElementById("detaillist");
var msgs = new Array();

$(document).ready(function(){
	$("#messagelist").css("height", (document.documentElement.clientHeight - 0.36 * document.documentElement.clientWidth) + "px");
	getMainMessageList();
});

function getMainMessageList(){
	$.getJSON("http://namespaceXP.github.io/XPhone/messages.json", function(json){
		for(var i = 0; i < json.messages.length; i++){
			var newaddr = new Object();
			newaddr.number = json.messages[i].number;
			newaddr.messages = new Array();
			for(var j = 0; j < json.messages[i].msgs.length; j++){
				var newmsg = new Object();
				newmsg.date = json.messages[i].msgs[j].date;
				newmsg.time = json.messages[i].msgs[j].time;
				newmsg.content = json.messages[i].msgs[j].content;
				newmsg.sendflag = json.messages[i].msgs[j].sendflag;
				newaddr.messages.push(newmsg);
			}
			msgs.push(newaddr);
			var newdiv = newMessagediv(json.messages[i].msgs[0].date, json.messages[i].number, json.messages[i].msgs[0].content);
			messagelist.appendChild(newdiv);
		}
	});
}

function newMessagediv(date, number, content){
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
		$("#msgpage").css("display","none");
		$("#msgname").html(this.id);
		$("#msgdetailpage").css("display", "block");
		detaillist.innerHTML = "";
		var j = findName(this.id);
		console.log(j);
		for(var i = msgs[j].messages.length - 1; i >= 0; i--){
			var newdetail = newDetaildiv(msgs[j].messages[i].date, msgs[j].messages[i].time, msgs[j].messages[i].content, msgs[j].messages[i].sendflag);
			detaillist.appendChild(newdetail);
		}
	}
	return messagediv;
}


$("#msgback").click(function(){
	$("#msgpage").css("display","block");
	$("#msgdetailpage").css("display", "none");
})

function newDetaildiv(date, time, content, sendflag){
	var messagediv = document.createElement("div");
	var datediv = document.createElement("div");
	var timediv = document.createElement("div");
	var contentdiv = document.createElement("div");
	messagediv.id = number;
	messagediv.className = "detaildiv";
	datediv.className = "detaildatediv";
	contentdiv.className = "detailcontentdiv"
	if(sendflag != 2 && sendflag != "2"){
		contentdiv.className = "detailcontentdiv"
	}
	else{
		contentdiv.className = "rightdetailcontentdiv"
	}
	datediv.innerHTML = date + " " + time;
	contentdiv.innerHTML = content;
	messagediv.appendChild(datediv);
	messagediv.appendChild(contentdiv);
	return messagediv;
}

function findName(n){
	for(var i = 0; i < msgs.length; i++){
		if(msgs[i].number == n){
			return i;
		}
	}
	return -1;
}
