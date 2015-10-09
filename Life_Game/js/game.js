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
	var temp;
	row = $('#input_size').val();
	timer = $('#input_speed').val();
	pr = $('#input_pr').val();
	if(check_valid_input()){
		alert('输入不合法，请重新输入生物密度!');
	}
	temp = map_width % row;
	len = (map_width - temp) / row;
	if(temp >= row / 2){
		len++;
	}
	map_width = len * row;
	init_map(row);   //初始化地图

	mapCanvas.style.width = (map_width).toString() + 'px';
	mapCanvas.style.height = (map_width).toString() + 'px';
	mapCanvas.setAttribute('width', map_width);
	mapCanvas.setAttribute('height', map_width);
	mapCanvas.style.left = ((window.innerWidth - map_width) / 2).toString() + 'px';
	mapCanvas.style.top = ((window.innerHeight - map_width) / 2).toString() + 'px';
	mapCanvas.style.display = 'block';  //地图布局
	$('#envolve').css('top', (window.innerHeight - $('#envolve').height()) / 2 - 70);
	$('#auto_envolve').css('top', (window.innerHeight - $('#envolve').height()) / 2);
	$('#stop_envolve').css('top', (window.innerHeight - $('#envolve').height()) / 2 + 70);
	$('#envolve').css('right', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#auto_envolve').css('right', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#stop_envolve').css('right', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#count').css('left', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#count').width() / 2);
	$('#count').css('top', window.innerHeight / 3);
	$('#new_envolve').html("卷土重来");
	$('#envolve').css('display', 'block');
	$('#auto_envolve').css('display', 'block');
	$('#stop_envolve').css('display', 'block');
	$('#count').css('display', 'block');
}

function initialize(){
	mapCanvas.style.display = 'none';
	$('#envolve').css('display', 'none');
	$('#new_envolve').html("开始霸业");
	cnt = 0;
	$('#count').html('您的霸业已延续了' + cnt.toString() +'代');
	$('#auto_envolve').css('display', 'none');
	$('#stop_envolve').css('display', 'none');
	$('#count').css('display', 'none');
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
	alert(1);
	clearInterval(mainCycle);
	autoflag = false;
	initialize();
	init();
	draw_map();
};

window.onresize = function(){   //保证布局
	mapCanvas.style.width = (map_width).toString() + 'px';
	mapCanvas.style.height = (map_width).toString() + 'px';
	mapCanvas.setAttribute('width', map_width);
	mapCanvas.setAttribute('height', map_width);
	mapCanvas.style.left = ((window.innerWidth - map_width) / 2).toString() + 'px';
	mapCanvas.style.top = ((window.innerHeight - map_width) / 2).toString() + 'px';
	$('#envolve').css('top', (window.innerHeight - $('#envolve').height()) / 2 - 70);
	$('#auto_envolve').css('top', (window.innerHeight - $('#envolve').height()) / 2);
	$('#stop_envolve').css('top', (window.innerHeight - $('#envolve').height()) / 2 + 70);
	$('#envolve').css('right', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#auto_envolve').css('right', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#stop_envolve').css('right', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#envolve').width() / 2);
	$('#count').css('left', (window.innerWidth - $('#mapCanvas').width()) / 4 - $('#count').width() / 2);
	$('#count').css('top', window.innerHeight / 3);
	//draw_map();
}

function get_next_generation(){     //得到下一代
	var temp;
	
	for(var i = 0; i < row; i++){
		for(var j = 0; j < row; j++){
			temp = 0;
			if(i > 0){
				temp = temp + map[i - 1][j];
				if(j > 0){
					temp = temp + map[i - 1][j - 1];
				}
			}
			if(j > 0){
				temp = temp + map[i][j - 1];
				if(i < row - 1){
					temp = temp + map[i + 1][j - 1];
				}
			}
			if(i < row - 1){
				temp = temp + map[i + 1][j];
				if(j < row - 1){
					temp = temp + map[i + 1][j + 1];
				}
			}
			if(j < row - 1){
				temp = temp + map[i][j + 1];
				if(i > 0){
					temp = temp + map[i - 1][j + 1];
				}
			}
			if(temp == 2){
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
			if(map[i][j] != 0){
				context.fillStyle = "#ffff00";
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
		mainCycle = setInterval('envolve()', timer); 
	}
});



$('#stop_envolve').click(function(){
	clearInterval(mainCycle);
	autoflag = false;
});

initialize();
