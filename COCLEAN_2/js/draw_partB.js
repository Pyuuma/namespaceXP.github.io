function draw_partB()
{
	var sum = 0;
	var new_data = new Array;
	for(var i = 0; i < 48; i++)
	{
		new_data[i] = 0;
	}
	var useful_data_number = 0;
	for(var i = 0; i < 96; i ++)
	{
		sum += data[i];
		if (data[i] != 0)
		{
			useful_data_number++;
		}
		new_data[Math.floor(i/2)] += data[i];
	}
	//取15分钟数据点的平均值
	for(var i = 0; i < 48; i++)
	{
		new_data[i] = parseInt(new_data[i]/2);
	}
	average = parseInt(sum/useful_data_number);
	$("#chart_average").html("今日均值:"+average);
	var date = new Date();
	this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var current_time = this.hour +　":" + this.minute;
	$("#chart_time").html("更新时间:"+current_time);
	var max = Math.max.apply(null, new_data);
	var min = max;
	for(var i = 0; i < 48; i++)
	{
		if(new_data[i] < min && new_data[i] != 0)
		{
			min = new_data[i];
		}
	}
	var pillar_position = ($("#chart").width() - $("#amount_line").width())/48;
	var pillar_width = ($("#chart").width() - $("#amount_line").width())/52;
	var pillar_height = $("#chart").height()/300;
	var min_height = $("#chart").height() * 0.1;
	for(var i = 0; i < 48; i++)
	{
		$("#pillar"+i).css("left",i * pillar_position);
		$("#pillar"+i).css("width", pillar_width);
		if(new_data[i]!=0)
		{
			$("#pillar"+i).css("height", (new_data[i]) * pillar_height);
		}
		if(new_data[i]<35)
		{
			$("#pillar"+i).css("background-color","#3dc454");
		}
		else if(new_data[i] <= 75)
		{
			$("#pillar"+i).css("background-color","#bfc43d");
		}
		else
		{
			$("#pillar"+i).css("background-color","#c43d3d");
		}
	}
	for(var i = 1; i <= 4; i++)
	{
		$("#time_line"+i).css("left", (12*i - 2)*pillar_position);
		$("#time_line"+i).css("width", 2*pillar_position);
	}
}