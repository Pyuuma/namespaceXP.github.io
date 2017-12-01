function submit(){
	$("#quizpage").css("z-index","1");
	$("#quizpage").css("opacity","0");
	$("#nextpage").css("opacity","1");
	$("#nextpage").css("z-index","2");
}

$("#next").click(function(){
	$("#quizpage").css("z-index","2");
	$("#quizpage").css("opacity","1");
	$("#nextpage").css("opacity","0");
	$("#nextpage").css("z-index","1");
})

$("#mya").click(function(){
	submit();
})

$("#myb").click(function(){
	submit();
})

$("#myc").click(function(){
	submit();
})

$("#myd").click(function(){
	submit();
})

