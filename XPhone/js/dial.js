var nowNumber = "";
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
	showflag = true;
	$("#number").html(nowNumber);
});