var count = 0;
var rightcount = 0;
var problemid = 0;
var myopenid;

$("#hint").html("本日已答" + count + "题，剩余" + (10 - count) + "题");

function submit(answerid){
	if(checkanswer(problemid, answerid)){
		rightcount++;
		$("#alert").html("答对了！捐献出1步~");
	}
	else{
		$("#alert").html("很遗憾答错了……");
	}
	showalert();
	setTimeout("hidealert();showanswer();", 2000);
	count++;
	$("#hint").html("本日已答" + count + "题，剩余" + (10 - count) + "题");
}


function showanswer(){
	$("#quizpage").css("z-index","1");
	$("#quizpage").css("opacity","0");
	$("#nextpage").css("opacity","1");
	$("#nextpage").css("z-index","2");
}

function shownext(){
	$("#quizpage").css("z-index","2");
	$("#quizpage").css("opacity","1");
	$("#nextpage").css("opacity","0");
	$("#nextpage").css("z-index","1");
}

function showalert(){
	$("#alert").css("display","block");
	$("#cover").css("display","block");
}

function hidealert(){
	$("#alert").css("display","none");
	$("#cover").css("display","none");
}

function showend(){
	$("#alert").html("今日答题次数已经用完> <");
	$("#alert").click(function(){
		return;
	});
	$("#cover").click(function(){
		return;
	});
	showalert();
}

function showquit(){
	$("#alert").html("本次答对" + count + "道~");
	$("#alert").click(function(){
		return;
	});
	$("#cover").click(function(){
		return;
	});
	showalert();
}

function checkanswer(prblem, answer){
	if(answer == 1){
		return true;
	}
	else{
		return false;
	}
}

$("#alert").click(function(){
	hidealert();
	showanswer();
})

$("#cover").click(function(){
	hidealert();
	showanswer();
})


$("#next").click(function(){
	if(count < 10){
		shownext();
	}
	else{
		showend();
	}
})

$("#quit").click(function(){
	showquit();
})

$("#mya").click(function(){
	submit(1);
})

$("#myb").click(function(){
	submit(2);
})

$("#myc").click(function(){
	submit(3);
})

$("#myd").click(function(){
	submit(4);
})

function hideload(){
	$("#load").css("display", "none");
}

 $(document).ready(function(){
 		setTimeout("hideload();", 3000);
 }); 