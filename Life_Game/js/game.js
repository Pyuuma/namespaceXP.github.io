var map = new Array;
var start = false;
var map_width = 640;  //地图大概大小
var row = 1;
var len = map_width / row;
var pr = 0.5;
var mainCycle;   //主循环变量
var temp_map = new Array;
var mapCanvas = document.getElementById('mapCanvas');
var new_envolve = document.getElementById('new_envolve');
var cnt = 0;
var autoflag = false;
var timer;

function check_valid_input(){
	if(isNaN(pr)|| pr >=1 || pr < 0 || isNaN(row) || row > 200 || row < 4 ||  isNaN(timer) || timer < 1){
		return 1;
	}
	else{
		return 0;
	}
}

function init(){   //初始化函数
	$('#count').html('鼠标点击可筑城，开始您的霸业吧！');
	cnt = 0;
	var temp;
	row = $('#input_size').val();
	timer = $('#input_speed').val();
	pr = $('#input_pr').val();
	if(check_valid_input()){
		alert('输入不合法，请重新输入!');
	}
	temp = map_width % row;
	len = (map_width - temp) / row;
	if(temp >= row / 2){
		len++;
	}
	map_width = len * row;
	init_map(row);   //初始化地图
	set_mapCanvas();
}
window.onload = function(){	
	mapCanvas.style.left = ((window.innerWidth - map_width) / 2).toString() + 'px';
	mapCanvas.style.top = ((window.innerHeight - map_width) / 2).toString() + 'px';
	$('#control_board').css('top', (window.innerHeight - $('#control_board').height()) / 2 - 40);
	$('#control_board').css('left', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#control_board').width() / 2);
	$('#count').css('top',(window.innerHeight + $('#control_board').height()) / 2);
	$('#count').css('left', $('#control_board').css('left'));
	$('#envolve').css('top', (window.innerHeight - $('#envolve').height()) / 2 - 70);
	$('#auto_envolve').css('top', (window.innerHeight - $('#envolve').height()) / 2);
	$('#stop_envolve').css('top', (window.innerHeight - $('#envolve').height()) / 2 + 70);
	$('#envolve').css('right', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#auto_envolve').css('right', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#stop_envolve').css('right', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
}

function set_mapCanvas(){
	mapCanvas.style.width = (map_width).toString() + 'px';
	mapCanvas.style.height = (map_width).toString() + 'px';
	mapCanvas.setAttribute('width', map_width);
	mapCanvas.setAttribute('height', map_width);
	$('#control_board').css('top', (window.innerHeight - $('#control_board').height()) / 2 - 40);
	$('#control_board').css('left', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#control_board').width() / 2);
	$('#count').css('top',(window.innerHeight + $('#control_board').height()) / 2);
	$('#count').css('left', $('#control_board').css('left'));
	$('#envolve').css('top', (window.innerHeight - $('#envolve').height()) / 2 - 70);
	$('#auto_envolve').css('top', (window.innerHeight - $('#envolve').height()) / 2);
	$('#stop_envolve').css('top', (window.innerHeight - $('#envolve').height()) / 2 + 70);
	$('#envolve').css('right', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#auto_envolve').css('right', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#stop_envolve').css('right', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#envolve').css('display', 'block');
}

function init_map(len){
	for(var i = 0; i < len; i++){
		map[i] = new Array;
		temp_map[i] = new Array;
		for(var j = 0; j < len; j++){
			map[i][j] = Math.round(Math.random() / (2 - 2 * pr));
		}
	}
	map[Math.round(Math.random() * (row - 1))][Math.round(Math.random() * (row - 1))] = 1;
}

new_envolve.onclick = function(){
	clearInterval(mainCycle);
	autoflag = false;
	init();
	draw_map();
};

window.onresize = function(){   //保证布局
	set_mapCanvas();
	draw_map();
}

function get_next_generation(){     //得到下一代
	var temp;
	
	for(var i = 0; i < row; i++){
		for(var j = 0; j < row; j++){
			temp = 0;
			if(i > 0){
				if(map[i - 1][j] == 1){
					temp = temp + 1;
				}
				if(i > 1){
					if(map[i - 2][j] == 1){
						temp = temp + 1;
					}
				}
			}
			if(j > 0){
				if(map[i][j - 1] == 1){
					temp = temp + 1;
				}
				if(j > 1){
					if(map[i][j - 2] == 1){
						temp = temp + 1;
					}
				}
			}
			if(i < row - 1){
				if(map[i + 1][j] == 1){
					temp = temp + 1;
				}
				if(i < row - 2){
					if(map[i + 2][j] == 1){
						temp = temp + 1;
					}
				}
			}
			if(j < row - 1){
				temp = temp + map[i][j + 1];
				if(j < row - 2){
					temp = temp + map[i][j + 2];
				}
			}
			
			if(map[i][j] == -1){
				temp_map[i][j] = -1;
			}
			else if(temp == 2){
				temp_map[i][j] = map[i][j];
			}
			else if(temp == 3){
				temp_map[i][j] = 1;
			}
			else{
				temp_map[i][j] = 0;
			}
		}
	}
	var flag = true;
	for(var i = 0; i < row; i++){
		for(var j = 0; j < row; j++){
			if(flag && map[i][j] != temp_map[i][j]){
				flag = false;
			}
			map[i][j] = temp_map[i][j];
		}
	}
	if(flag){
		clearInterval(mainCycle); 
		autoflag = false;
		alert('您的霸业走到了尽头！');
	}
}


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
	get_next_generation();
	draw_map();
}

$('#envolve').click(envolve);

$('#auto_envolve').click(function(){
	if(autoflag == false){
		autoflag = true;
		mainCycle = setInterval('envolve()', 1000 / timer); 
	}
});

mapCanvas.onclick = function(e){
	if(len != 640){
  	 	var r = Math.floor((e.clientX - parseInt(this.style.left) - 2) / len);
		var c = Math.floor((e.clientY - parseInt(this.style.top) - 2) / len);
		if(map[c][r] == 1){
			alert('此处已有生灵，不宜筑城！');
		}
		else{
		map[c][r] = -1;
		}
		draw_map();
	}  
}


$('#stop_envolve').click(function(){
	clearInterval(mainCycle);
	autoflag = false;
});

