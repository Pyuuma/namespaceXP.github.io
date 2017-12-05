var count = 0;
var rightcount = 0;
var problemid = 0;
var myopenid;
var flag = true;
var mode = false;   //是否答题
var temp = 1;
var audio1 = document.getElementById("bgm1");
var audio2 = document.getElementById("bgm2");
var nowTime = 0;
var countTime = 0;
var countline = 0;
var wordflag = false;
var linecount = new Array(5,6,6,6,7,3,5,5,3,7);
var correct = "a";
var quizselect= new Array(75);
var server = "http://127.0.0.1:8000/"
var link = "";
var awarded = false;

window.setInterval(clock, 1000);
$("#bg").attr("src", "img/1.png");

for(var i = 0; i < 75; i++){
	quizselect[i] = i;
}
swap();

function swap(){
	for(var j = 0; j < 100; j++){
		var t1 = Math.round(Math.random()*75);
		var t2 = Math.round(Math.random()*75);
		var temp = quizselect[t1];
		quizselect[t1] = quizselect[t2];
		quizselect[t2] = temp;
	}
}

function clock(){
	nowTime++;
	if(nowTime % 2 == 0){
		shine();
	}
}

function shine(){
	if(flag){
		flag = false;
		$("#touchhint").css("opacity","0");
	}
	else{
		flag = true;
		$("#touchhint").css("opacity","1");
	}
}

$("#titleimg").click(function(){
	$("#init").css("display","none");
	$('#bg').css('filter',"blur(0px)");
	$('#bg').css('opacity',"1");
	$('#word1').css('display',"block");
	audio1.play();
	showword();
})

function showword(){
	wordflag = true;
	if(count == 0){
		setTimeout("$('#1_1').css('opacity', '1');", 3000);
		setTimeout("$('#1_2').css('opacity', '1');", 6000);
		setTimeout("$('#1_3').css('opacity', '1');", 9000);
		setTimeout("$('#1_4').css('opacity', '1');", 12000);
		setTimeout("$('#1_5').css('opacity', '1');", 15000);
	}
	else if(count == 1){
		setTimeout("$('#2_1').css('opacity', '1');", 3000);
		setTimeout("$('#2_2').css('opacity', '1');", 6000);
		setTimeout("$('#2_3').css('opacity', '1');", 9000);
		setTimeout("$('#2_4').css('opacity', '1');", 12000);
		setTimeout("$('#2_5').css('opacity', '1');", 15000);
		setTimeout("$('#2_6').css('opacity', '1');", 18000);
	}
	else if(count == 2){
		setTimeout("$('#3_1').css('opacity', '1');", 3000);
		setTimeout("$('#3_2').css('opacity', '1');", 6000);
		setTimeout("$('#3_3').css('opacity', '1');", 9000);
		setTimeout("$('#3_4').css('opacity', '1');", 12000);
		setTimeout("$('#3_5').css('opacity', '1');", 15000);
		setTimeout("$('#3_6').css('opacity', '1');", 18000);
	}
	else if(count == 3){
		setTimeout("$('#4_1').css('opacity', '1');", 3000);
		setTimeout("$('#4_2').css('opacity', '1');", 6000);
		setTimeout("$('#4_3').css('opacity', '1');", 9000);
		setTimeout("$('#4_4').css('opacity', '1');", 12000);
		setTimeout("$('#4_5').css('opacity', '1');", 15000);
		setTimeout("$('#4_6').css('opacity', '1');", 18000)
	}
	else if(count == 4){
		audio1.pause();
		audio2.play();
		setTimeout("$('#5_1').css('opacity', '1');", 3000);
		setTimeout("$('#5_2').css('opacity', '1');", 6000);
		setTimeout("$('#5_3').css('opacity', '1');", 9000);
		setTimeout("$('#5_4').css('opacity', '1');", 12000);
		setTimeout("$('#5_5').css('opacity', '1');", 15000);
		setTimeout("$('#5_6').css('opacity', '1');", 18000);
		setTimeout("$('#5_7').css('opacity', '1');", 21000);
	}
	else if(count == 5){
		setTimeout("$('#6_1').css('opacity', '1');", 3000);
		setTimeout("$('#6_2').css('opacity', '1');", 6000);
		setTimeout("$('#6_3').css('opacity', '1');", 9000);
	}
	else if(count == 6){
		setTimeout("$('#7_1').css('opacity', '1');", 3000);
		setTimeout("$('#7_2').css('opacity', '1');", 6000);
		setTimeout("$('#7_3').css('opacity', '1');", 9000);
		setTimeout("$('#7_4').css('opacity', '1');", 12000);
		setTimeout("$('#7_5').css('opacity', '1');", 15000);
	}
	else if(count == 7){
		setTimeout("$('#8_1').css('opacity', '1');", 3000);
		setTimeout("$('#8_2').css('opacity', '1');", 6000);
		setTimeout("$('#8_3').css('opacity', '1');", 9000);
		setTimeout("$('#8_4').css('opacity', '1');", 12000);
		setTimeout("$('#8_5').css('opacity', '1');", 15000);
	}
	else if(count == 8){
		setTimeout("$('#9_1').css('opacity', '1');", 3000);
		setTimeout("$('#9_2').css('opacity', '1');", 6000);
		setTimeout("$('#9_3').css('opacity', '1');", 9000);
	}
	else if(count == 9){
		setTimeout("$('#10_1').css('opacity', '1');", 3000);
		setTimeout("$('#10_2').css('opacity', '1');", 6000);
		setTimeout("$('#10_3').css('opacity', '1');", 9000);
		setTimeout("$('#10_4').css('opacity', '1');", 12000);
		setTimeout("$('#10_5').css('opacity', '1');", 15000);
		setTimeout("$('#10_6').css('opacity', '1');", 18000);
		setTimeout("$('#10_7').css('opacity', '1');", 21000);
	}
}



$("#bg").click(function(){
	if($('#' + (count + 1) +'_' + linecount[count]).css('opacity') != "1"){
		return;
	}
	else{
		if(mode == false){
			showQuiz();
		}
		else{
		}
		
	}
})

$(".line").click(function(){
	if($('#' + (count + 1) +'_' + linecount[count]).css('opacity') != "1"){
		return;
	}
	else{
		if(mode == false){
			showQuiz();
		}
		else{
			
		}
	}
})

$("#hint").html("本日已答" + count + "题，剩余" + (10 - count) + "题");


function submit(answerid){
	$.getJSON(server + 'answerquiz',{'qID': quizselect[count],'qAnswer': answerid}, function(ret){
		correct = ret["correct"];
		if(ret["right"] == 1 || ret["right"] == "1"){
			if(ret["awarded"] == 1 || ret["awarded"] == 0){
				awarded = true;
				link = ret["url"];
			}
			$("#alert").html("答对了！将捐献出1步~");
		}
		else{
			$("#alert").html("很遗憾答错了……正确答案应该是" + correct.toUpperCase());
		}
		showalert();
	setTimeout("hidealert();showanswer();", 4000);
	count++;
	$("#hint").html("本日已答" + count + "题，剩余" + (10 - count) + "题");
	})
}

function showQuiz(){
	$.getJSON(server + 'getquiz',{'qID': quizselect[count]}, function(ret){
			$("#mya").html(ret['a']);
			$("#myb").html(ret['b']);
			$("#myc").html(ret['c']);
			if(ret['d']){
				$("#myd").html(ret['d']);
			}
			else{
				$("#myd").html("以上皆不对");
			}
			$("#problem_word").html(ret['content']);
		}
	)
	for(var i = 0; i < linecount[count]; i++){
		$('#' + (count + 1) +'_' + (i + 1)).css('opacity',"0");
	}
	$('#bg').css('filter',"blur(10px)");
	$('#bg').css('opacity',"0.7");
	$("#choiceboard").css("opacity","1");
	$("#choiceboard").css("z-index","13");
	$("#problem_word").css("opacity","1");
	$("#problem").css("opacity","1");
}

function showanswer(){
	$("#next").css("opacity","1");
	$("#quit").css("opacity","1");
	$("#next").css("z-index","13");
	$("#quit").css("z-index","13");
}

function shownext(){
	$("#next").css("z-index","11");
	$("#quit").css("z-index","11");
	$("#next").css("opacity","0");
	$("#quit").css("opacity","0");
	$("#bg").css("opacity","0");
	setTimeout("shownext2();", 2000);
}

function shownext2(){
	$("#bg").attr("src", "img/"+ (count + 1) + ".png");
	$("#bg").css("opacity", "1");
	$("#bg").css('filter',"blur(0px)");
	$("#word" + (count)).css("display", "none");
	$("#word" + (count+1)).css("display", "block");
	showword();
}

function showalert(){
	$("#alert").css("display","block");
	$("#cover").css("display","block");
	$("#choiceboard").css("opacity","0");
	$("#choiceboard").css("z-index","11");
	$("#problem_word").css("opacity","0");
	$("#problem").css("opacity","0");
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
	if($('#next').css('opacity') != "1"){
		return;
	}
	if(count < 10){
		shownext();
	}
	else{
		showend();
	}
})

$("#quit").click(function(){
	if($('#quit').css('opacity') != "1"){
		return;
	}
	showquit();
})

$("#mya").click(function(){
	if($('#choiceboard').css('opacity') != "1"){
		return;
	}
	submit("a");
})

$("#myb").click(function(){
	if($('#choiceboard').css('opacity') != "1"){
		return;
	}
	submit("b");
})

$("#myc").click(function(){
	if($('#choiceboard').css('opacity') != "1"){
		return;
	}
	submit("c");
})

$("#myd").click(function(){
	if($('#choiceboard').css('opacity') != "1"){
		return;
	}
	submit("d");
})

function hideload(){
	$("#load").css("display", "none");
}

 $(document).ready(function(){
 		setTimeout("hideload();", 10);
 }); 