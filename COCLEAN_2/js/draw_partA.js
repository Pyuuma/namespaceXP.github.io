function draw_partA()
{
	total_hour = parseInt(total_time/60);
	$("#hello").html("Hi, COCLEAN已经守护您" + total_hour  + "小时");
	total_number = Math.floor(total_time/5);
	$("#statistic_number").html("&nbsp" +　total_number + "&nbsp");
	unit = document.createElement("div");
	unit.innerHTML = "m³。";
	unit.style.position = "absolute";
	unit.style.left = "100%";
	unit.style.bottom = 0;
	unit.style.fontSize = "0.67em";
	document.getElementById("statistic_number").appendChild(unit);
}