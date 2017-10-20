var messagelist = document.getElementById("messagelist");

$(document).ready(function(){
	$("#messagelist").css("height", (document.documentElement.clientHeight - 0.36 * document.documentElement.clientWidth) + "px");
	getMainMessageList();
});

function getMainMessageList(){
	$.getJSON("http://namespaceXP.github.io/XPhone/messages.json", function(json){
		alert(json.messages.length);
		for(var i = 0; i < json.messages.length; i++){
			console.log(i);
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
	}
	return messagediv;
}


$("#msgback").click(function(){
	$("#msgpage").css("display","block");
	$("#msgdetailpage").css("display", "none");
})
