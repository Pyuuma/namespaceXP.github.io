
function draw_partA()
{
	total_hour = parseInt(total_time/60);
	$("#hello").html("Hi,"+ name + "!COCLEAN已经守护您" + total_hour  + "小时");
	total_number = Math.floor(total_time/5);
	$("#statistic_number").html(total_number + "m³");
}