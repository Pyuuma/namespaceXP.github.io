
function draw_partC()
{
	var temprature_evaluation = "";
	if(temprature_number < 18)
	{
		temprature_evaluation = "偏冷";
		$("#temprature_dividing").css("color","#3d81c4");
		$("#temprature_evaluation").css("background-color","#3d81c4");
	}
	else if(temprature_number <= 27)
	{
		temprature_evaluation = "健康";
		$("#temprature_dividing").css("color","#3dc454");
		$("#temprature_evaluation").css("background-color","#3dc454");
	}
	else
	{
		temprature_evaluation = "偏热";
		$("#temprature_dividing").css("color","#bfc43d");
		$("#temprature_evaluation").css("background-color","#bfc43d");
	}
	$("#temprature_number").html(temprature_number);
	$("#temprature_evaluation").html(temprature_evaluation);
	var PM_evaluation = "";
	if(PM_evaluation < 35)
	{
		PM_evaluation = "健康";
		$("#PM_dividing").css("color","#3dc454");
		$("#PM_evaluation").css("background-color","#3dc454");
	}
	else if(temprature_evaluation <= 75)
	{
		PM_evaluation = "良好";
		$("#PM_dividing").css("color","#bfc43d");
		$("#PM_evaluation").css("background-color","#bfc43d");
	}
	else
	{
		PM_evaluation = "污染";
		$("#PM_dividing").css("color","#c43d3d");
		$("#PM_evaluation").css("background-color","#c43d3d");
	}
	$("#PM_number").html(PM_number);
	$("#PM_evaluation").html(PM_evaluation);
	var humidity_evaluation = "";
	if(humidity_evaluation < 30)
	{
		humidity_evaluation = "干燥";
		$("#humidity_dividing").css("color","#bfc43d");
		$("#humidity_evaluation").css("background-color","#bfc43d");
	}
	else if(humidity_evaluation <= 60)
	{
		humidity_evaluation = "健康";
		$("#humidity_dividing").css("color","#3dc454");
		$("#humidity_evaluation").css("background-color","#3dc454");
	}
	else
	{
		humidity_evaluation = "潮湿";
		$("#humidity_dividing").css("color","#3d81c4");
		$("#humidity_evaluation").css("background-color","#3d81c4");
	}
	$("#humidity_number").html(humidity_number);
	$("#humidity_evaluation").html(humidity_evaluation);
}