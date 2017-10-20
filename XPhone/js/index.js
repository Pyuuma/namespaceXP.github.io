$(document).ready(function(){
	mytime();
	setInterval(function() {mytime()},30000);
});

function mytime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
   	var hour = date.getHours();
	var min = date.getMinutes();
	var mytime = document.getElementById("time");
    if (hour >= 1 && hour <= 9) {
        hour = "0" + hour;
    }
    if (min >= 0 && min <= 9) {
        min = "0" + min;
    }
	
    var currentdate = hour + seperator2 + min;
	mytime.innerHTML = currentdate;
    return currentdate;
}


$("#phonebutton").click(function(){
	$("#dial").css("display", "block");
})

$("#messagebutton").click(function(){
	$("#message").css("display", "block");
})

$("#photobutton").click(function(){
	$("#photo").css("display", "block");
})


$("#myhome").click(function(){
	$("#dial").css("display", "none");
	$("#message").css("display", "none");
	$("#photo").css("display", "none");
})

$("#small").click(function(){
	$("#myphoto").css("width","90vw");
	$("#myphoto").css("height","140vw");
	$("#myphoto").css("left","5vw");
	$("#myphoto").css("top","19vw");
	$("#phototitle").html("2017-4-23");
	$("#photoback").css("display", "block");
	this.style.width = "90vw";
	this.style.height = "auto";
})

$("#photoback").click(function(){
	$("#myphoto").css("width","30vw");
	$("#myphoto").css("height","30vw");
	$("#myphoto").css("left","6vw");
	$("#myphoto").css("top","25vw");
	$("#small").css("height","30vw");
	$("#small").css("width","auto");
	$("#phototitle").html("所有照片");
	this.style.display = "none";
})