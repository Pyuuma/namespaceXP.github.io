$(document).ready(function(){
	mytime();
	setInterval(function() {mytime()},60000);
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