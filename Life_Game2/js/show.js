var window_width = (document.all ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth);
var window_height = (document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight);
var map_width = 640;  //地图大概大小
var row = 1;
var len = map_width / row;
var mainCycle;   //主循环变量
var mapCanvas = document.getElementById('mapCanvas');
var new_envolve = document.getElementById('new_envolve');
var cnt = 0;
var autoflag;
var timer, i, j;

function init(){   //初始化游戏
	var temp;
	autoflag = false;
	cnt = 0;
	clearInterval(mainCycle);
	row = $('#input_size').val();
	timer = $('#input_speed').val();
	pr = $('#input_pr').val();
	$('#count').html('鼠标点击可筑城，开始您的霸业吧！');
	if(check_valid_input(pr, row, timer)){
		alert('输入不合法，请重新输入!');
	}
	temp = map_width % row;
	len = (map_width - temp) / row;
	if(temp >= row / 2){
		len++;
	}
	map_width = len * row;
	init_map(row, pr);   //初始化地图
	set_mapCanvas();
}

window.onload = function(){	
	set_mapCanvas();
};

function set_mapCanvas(){
	mapCanvas.style.width = (map_width).toString() + 'px';
	mapCanvas.style.height = (map_width).toString() + 'px';
	mapCanvas.setAttribute('width', map_width);
	mapCanvas.setAttribute('height', map_width);
	mapCanvas.style.left = ((window_width - map_width) / 2).toString() + 'px';
	mapCanvas.style.top = ((window_height - map_width) / 2).toString() + 'px';
	$('#control_board').css('top', (window_height - $('#control_board').height()) / 2 - 40);
	$('#control_board').css('left', (window_width - $('#mapCanvas').width()) / 4 - $('#control_board').width() / 2);
	$('#count').css('top',(window_height + $('#control_board').height()) / 2);
	$('#count').css('left', $('#control_board').css('left'));
	$('#envolve').css('top', (window_height - $('#envolve').height()) / 2 - 70);
	$('#auto_envolve').css('top', (window_height - $('#envolve').height()) / 2);
	$('#stop_envolve').css('top', (window_height - $('#envolve').height()) / 2 + 70);
	$('#envolve').css('right', (window_width - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#auto_envolve').css('right', (window_width - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#stop_envolve').css('right', (window_width - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#envolve').css('display', 'block');
}

new_envolve.onclick = function(){
	init();
	draw_map();
};

window.onresize = function(){   //保证布局
	window_width = (document.all ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth);
	window_height = (document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight);
	set_mapCanvas();
	draw_map();
};

function draw_map(){   //画地图
	var context = mapCanvas.getContext('2d');
	for(var i = 0; i < row; i++){
		for(var j = 0; j < row; j++){
			if(map[i][j] == 1){
				context.fillStyle = "#ffff00";
			}
			else if(map[i][j] == -1){
				context.fillStyle = "#0000ff";
			}
			else{
				context.fillStyle = "#666666";
			}
			context.fillRect(len * j, len * i, len, len);
		}
	}
}

function envolve(){    //进行演化
	cnt++;
	$('#count').html('您的霸业已延续了' + cnt.toString() +'代');
	autoflag = calculate_next_generation();
	if(!autoflag){
		clearInterval(mainCycle);
	}
	draw_map();
}

$('#envolve').click(envolve);

$('#auto_envolve').click(function(){
	if(autoflag === false){
		autoflag = true;
		mainCycle = setInterval(envolve, 1000 / timer); 
	}
});

mapCanvas.onclick = function(e){
	if(len != 640){
  	 	var r = Math.floor((e.clientX - parseInt(this.style.left) - 2) / len);
		var c = Math.floor((e.clientY - parseInt(this.style.top) - 2) / len);
		if(!set_wall(r, c)){
			alert('此处已有生灵，不宜筑城！');
		}
		draw_map();
	}  
};

$('#stop_envolve').click(function(){
	clearInterval(mainCycle);
	autoflag = false;
});


