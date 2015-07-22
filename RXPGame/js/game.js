var timer = 20;
var bltimer = -1;
var timeCount = 0  // 循环检测
var maxbltimer = 50;
var maxbullnum = 4;
var gamestart = 0;
var interTimer = -1;  //控制动画用
var endTimer = -1;    //控制结局动画用
var level = 0;    //当前关卡
var totalLevel = 14;  //总共关卡
var mapStartX = 120;
var mapstartY = 70;     //画布左上角坐标
var blockType = 3;
var gaming = 0;    //是否正在游戏
var fail = 0;   //失败次数
var sentenceTime = 130;    //台词的时间间隔 单位为timer
var moveDirection = 1;  //障碍物圆心移动方向
var current = 0, x = 0;   //播放文字动画用变量
var mainCycle;   //主循环
var tempMap = new Array;
for(var i = 0; i < 10; i++){
	tempMap[i] = new Array;
}
var tempBullets;     //存储用
var leftArrow, rightArrow, upArrow, downArrow;
var gameBoard = document.getElementById('gameBoard');
var gameStart = document.getElementById('gameStart');
var gameHelp = document.getElementById('gameHelp');
var gameAbout = document.getElementById('gameAbout');
var gameQuit = document.getElementById('gameQuit');
var gameInformation = document.getElementById('gameInformation');
var gameLines = document.getElementById('gameLines');
var mapCanvas = document.getElementById('mapCanvas');
var blow = document.getElementById('blow');
var cursur2 = document.getElementById('cursor2');
var gold = document.getElementById('gold');
var shoot = document.getElementById('shoot');
var deathBGM = document.getElementById('Death');
var BGM = document.getElementById('BGM');
var gamer = new Object();    //游戏角色
var Yellow = new Object();    //配角小黄
var Pink = new Object();    //女主
var Lines = new Array;
var block = new Array;
for(var i = 0; i < totalLevel; i++){
	block[i] = new Array;
}
var bulle = new Array; 
var map = new Array;
for(var i = 0; i < totalLevel; i++){
	map[i] = new Array;
	for(var j = 0; j < 10; j++){
		map[i][j] = new Array;
		for(var k = 0; k < 15; k++)
			map[i][j][k] = 0;
	}
}
gamer.init = new Array;    //每关的初始位置
var startword = new Array;
startword = ['小红，我爱你。','你是我温暖的手套，','冰冷的啤酒，','带着阳光气息的衬衫，','日复一日的梦想。'] 

leftArrow = rightArrow = upArrow = downArrow = false;             
gamer.x = gamer.y = 100;   
gamer.len = 20;
gamer.speed = 2;
gamer.gold = 0;    //金币数
gamer.bullet = -1;   //子弹数 -1代表没♂枪 其余值代表已经射♂出子弹数
gamer.death = function(){   //游戏结束
	fail++;
	gaming = 0;
	clearInterval(mainCycle);
	mapCanvas.style.display = 'none';
	gameInformation.style.display = 'none';
	gameLines.innerHTML = '按Z键继续游戏';
	BGM.pause();
	deathBGM.play();
	gameBoard.style.backgroundColor = '#111111';
	gameWords.innerHTML = '<h4>不……我还没有找到你……</h4>'
	gameWords.style.display = 'block';
	returnMapAndBullets();
	for(var bl in block[level]){
		var nowbl = block[level][bl];
		nowbl.display = true;
	} 
	gamer.gold = 0;  
	if(gamer.bullet != -1){
		gameInformation.innerHTML = '<h4>Level: ' + level + ' Failed: ' + fail + '子弹数：' + (maxbullnum - gamer.bullet) + '</h4>';
	}
}
gamer.check = function(){    //换关
	var row1 = Math.floor(this.x / 30);
	var row2 = Math.floor((this.x + this.len) / 30);
	var col1 = Math.floor(this.y / 30);
	var col2 = Math.floor((this.y + this.len) / 30);
	var row = Math.floor((this.x + this.len / 2) / 30);
	var col = Math.floor((this.y + this.len / 2) / 30);
	
	
	
	if(map[level][col][row] == 3){  //拿金币
			map[level][col][row] = 0;
			gamer.gold++; 
			gold.play();
	}

	
	if(map[level][col][row] == 4){  //拿枪
			map[level][col][row] = 0;
			gamer.bullet = 0; 
			gameLines.innerHTML = '<h4>得到一把枪。按WASD可分别向上下左右开枪。</h4>';
			gameInformation.innerHTML = '<h4>Level: ' + (level + 1) + ' Failed: ' + fail + '子弹数：' + (maxbullnum - gamer.bullet) + '</h4>';
			setTimeout('getStronger()', 3000);    //延时显示
	}
	
	if(map[level][col1][row1] == 2 &&
		map[level][col2][row1] == 2 &&
		map[level][col1][row2] == 2 &&
		map[level][col2][row2] == 2 && gamer.gold >= gamer.init[level].Au){  //完全处于过关区域内
			if(level < totalLevel - 1){
				interTimer = timeCount;    //记录过关时间并触发过关事件
			}
			else{
				endTimer = timeCount;
				level++;
			}
	}
	
	if(upArrow){
		col1--;
		col2--;
	}
	else if(downArrow){
		col1++;
		col2++;
	}
	else if(leftArrow){
		row1--;
		row2--;
	}
	else if(rightArrow){
		row1++;
		row2++;
	}
	
	if(col1 >= 0 && col2 >= 0 && col1 < 10 && col2 < 10 && row1 >= 0 && row2 >= 0 && row1 < 15 && row2 < 15 && 
		map[level][col1][row1] == 5 &&
		map[level][col2][row1] == 5 &&
		map[level][col1][row2] == 5 &&
		map[level][col2][row2] == 5){  //撞墙
			//此处应有音效 
		blow.play();
		map[level][col2][row2] = 6;    
	}
}
gamer.move = function(){  //判断是否撞墙并移动
	if(leftArrow){
		this.row1 = Math.floor((this.x - this.speed) / 30);
		this.col1 = Math.floor(this.y / 30);
		this.col2 = Math.floor((this.y + this.len) / 30);
		if(map[level][this.col1][this.row1] != 1 && map[level][this.col2][this.row1] != 1 &&
		   map[level][this.col1][this.row1] != 5 && map[level][this.col2][this.row1] != 5){
			this.x = this.x - this.speed;
		}
	}
	if(upArrow){
		this.row1 = Math.floor(this.x / 30);
		this.row2 = Math.floor((this.x + this.len) / 30);
		this.col1 = Math.floor((this.y - this.speed) / 30);
		if(map[level][this.col1][this.row1] != 1 && map[level][this.col1][this.row2] != 1 &&
		   map[level][this.col1][this.row1] != 5 && map[level][this.col1][this.row2] != 5){
			this.y = this.y - this.speed;
		}
	}
	if(rightArrow){
		this.row2 = Math.floor((this.x + this.speed + this.len) / 30);
		this.col1 = Math.floor(this.y / 30);
		this.col2 = Math.floor((this.y + this.len) / 30);
		if(map[level][this.col1][this.row2] != 1 && map[level][this.col2][this.row2] != 1 &&
		   map[level][this.col1][this.row2] != 5 && map[level][this.col2][this.row2] != 5){
			this.x = this.x + this.speed;
		}
	}
	if(downArrow){
		this.row1 = Math.floor(this.x / 30);
		this.row2 = Math.floor((this.x + this.len) / 30);
		this.col2 = Math.floor((this.y + this.speed + this.len) / 30);
		if(map[level][this.col2][this.row1] != 1 && map[level][this.col2][this.row2] != 1 &&
		   map[level][this.col2][this.row1] != 5 && map[level][this.col2][this.row2] != 5){
			this.y = this.y + this.speed;
		}
	}
}

initBlock = function(posX, posY, Btype){    //初始化障碍物
	 var ret = new Object();
	 ret.type = Btype;
	 ret.size = 6;  // 障碍物半径
	 ret.radius = 0;    //旋转型障碍物转动半径
	 ret.x = posX;    //左上角坐标
	 ret.y = posY;    //左上角坐标
	 ret.centerX = 0;   //转轴
	 ret.centerY = 0;   //转轴
	 ret.speed = 4;   //对于旋转型障碍物为角速度
	 ret.direction = 0;  //方向
	 ret.display = true;
	 
	 ret.remove = function(){
		 ret.display = false;
	 };
	 
	 ret.move = function(){
		if(this.type == 1){
			var row1 = Math.floor((this.x - this.size) / 30);
			var row2 = Math.floor((this.x + this.size) / 30);
			var col1 = Math.floor((this.y - this.size) / 30);
			var col2 = Math.floor((this.y + this.size) / 30);
			if(this.direction == 1){   //上下左右运动
				if(map[level][col1][row1] != 1 && map[level][col1][row2] != 1){
					this.y -= this.speed;
				}
				else{
					this.direction = 2;
				}
			}
			
			else if(this.direction == 2){
				if(map[level][col2][row1] != 1 && map[level][col2][row2] != 1){
					this.y += this.speed;
				}
				else{
					this.direction = 1;
				}
			}
			
			else if(this.direction == 3){
				if(map[level][col2][row1] != 1 && map[level][col1][row1] != 1){
					this.x -= this.speed;
				}
				else{
					this.direction = 4;
				}
			}
			
			else if(this.direction == 4){
				if(map[level][col2][row2] != 1 && map[level][col1][row2] != 1){
					this.x += this.speed;
				}
				else{
					this.direction = 3;
				}
			}
		}
		else if(this.type == 2){   //转动
			var O = this.speed * timer * Math.PI / 180000;    // speed 度/秒
			var O1 = Math.atan((this.x - this.centerX )/(this.y - this.centerY)); 
			if(this.y < this.centerY){
				O1 += Math.PI;
			}
			if(this.direction == 5){   //逆时针
				this.x = this.centerX + this.radius * Math.sin(O1 + O);
				this.y = this.centerY + this.radius * Math.cos(O1 + O);
			}
			else if(this.direction == 6){   //顺时针
				this.x = this.centerX + this.radius * Math.sin(O1 - O);
				this.y = this.centerY + this.radius * Math.cos(O1 - O);
			}
		}
	 };  //障碍物计算移动到位置
	 
	 ret.check = function(){
		var dis0 = Math.sqrt((gamer.x + gamer.len / 2 - this.x) * (gamer.x + gamer.len / 2 - this.x) + (gamer.y  + gamer.len / 2 - this.y) * (gamer.y + gamer.len / 2 - this.y));
		var O = Math.asin((gamer.y  + gamer.len / 2 - this.y) / dis0);
		var tempX = (dis0 - this.size) * Math.cos(O);
		var tempY = (dis0 - this.size) * Math.sin(O);
		
		if ((Math.abs(tempX) < gamer.len / 2) && (Math.abs(tempY) < gamer.len / 2) && this.display == true){
				gamer.death();
			}
	 };   //检测是否碰撞
	 
	 return ret;
 }
 
initBullet = function(posX, posY, dir){    //初始化子弹
	 var ret = new Object();
	 ret.type = 3;
	 ret.size = 2;  // 障碍物半径
	 ret.x = posX;    //中心坐标
	 ret.y = posY;    //中心坐标
	 ret.speed = 6;   //对于旋转型障碍物为角速度
	 ret.direction = dir;  //方向
	 ret.display = true;
	 
	 ret.remove = function(){
		 ret.display = false;
	 };
	 
	 ret.move = function(){
		if(this.type == 3){
			var row1 = Math.floor((this.x - this.size) / 30);
			var row2 = Math.floor((this.x + this.size) / 30);
			var col1 = Math.floor((this.y - this.size) / 30);
			var col2 = Math.floor((this.y + this.size) / 30);
			if(this.direction == 1){   //上下左右运动
				if(map[level][col1][row1] != 1 && map[level][col1][row2] != 1){
					this.y -= this.speed;
				}
				else{
					this.remove();
				}
			}
			
			else if(this.direction == 2){
				if(map[level][col2][row1] != 1 && map[level][col2][row2] != 1){
					this.y += this.speed;
				}
				else{
					this.remove();
				}
			}
			
			else if(this.direction == 3){
				if(map[level][col2][row1] != 1 && map[level][col1][row1] != 1){
					this.x -= this.speed;
				}
				else{
					this.remove();
				}
			}
			
			else if(this.direction == 4){
				if(map[level][col2][row2] != 1 && map[level][col1][row2] != 1){
					this.x += this.speed;
				}
				else{
					this.remove();
				}
			}
		}
	 };  //障碍物计算移动到位置
	 
	 ret.check = function(){
		for(var bl in block[level]){
			var nowbl = block[level][bl];
			var dis0 = Math.sqrt((nowbl.x - this.x) * (nowbl.x - this.x) + (nowbl.y - this.y) * (nowbl.y - this.y));
			
			if ((dis0 < nowbl.size + this.size) && this.display == true && nowbl.display == true){
					nowbl.remove();
					this.remove();
				}
		}
	 };   //检测是否碰撞
	 
	 return ret;
 }
 
initBlock1 = function(x, y, dir, siz, sped){    //第一类障碍物
	 var ret = initBlock(x, y, 1);
	 ret.direction = dir;
	 ret.size = siz;
	 ret.speed = sped;
	 return ret;
 }
  
initBlock2 = function(cenx, ceny, r, dir, siz, sped, arg){   //第二类障碍物
	 var radarg = arg * Math.PI / 180;
	 var ret = initBlock(cenx + r * Math.sin(radarg), ceny - r * Math.cos(radarg), 2);
	 ret.direction = dir;
	 ret.size = siz;
	 ret.speed = sped;
	 ret.centerX = cenx;
	 ret.centerY = ceny;
	 ret.radius = r;
	 return ret;
 }

document.onkeydown = function keyDown(e){  
	var keycode = e.which;  
	if(keycode == 37){
		leftArrow = true;
	}
	else if(keycode == 38){
		upArrow = true;
	}
	else if(keycode == 39){
		rightArrow = true;
	}
	else if(keycode == 40){
		downArrow = true;
	}
	else if(keycode == 87){
		if(gamer.bullet >= 0 && gamer.bullet < maxbullnum && bltimer == -1){
			bulle.push(initBullet(gamer.x + gamer.len / 2, gamer.y, 1));
			gamer.bullet++;
	
			if(gamer.bullet != -1){
				shoot.play();
				gameInformation.innerHTML = '<h4>Level: ' + (level + 1) + ' Failed: ' + fail + '子弹数：' + (maxbullnum - gamer.bullet) + '</h4>';
			}
			bltimer = 0;
		}
	}
	else if(keycode == 65){
		if(gamer.bullet >= 0 && gamer.bullet < maxbullnum && bltimer == -1){
			bulle.push(initBullet(gamer.x, gamer.y + gamer.len / 2, 3));
			gamer.bullet++;
			if(gamer.bullet != -1){
				shoot.play();
				gameInformation.innerHTML = '<h4>Level: ' + (level + 1) + ' Failed: ' + fail + '子弹数：' + (maxbullnum - gamer.bullet) + '</h4>';
			}
			bltimer = 0;
		}
	}
	else if(keycode == 83){
		if(gamer.bullet >= 0 && gamer.bullet < maxbullnum && bltimer == -1){
			bulle.push(initBullet(gamer.x + gamer.len / 2, gamer.y + gamer.len, 2));
			gamer.bullet++;
			if(endTimer != -1){
				gamer.bullet--;
				KillRedEnding();
			}
			else if(gamer.bullet != -1){
				shoot.play();
				gameInformation.innerHTML = '<h4>Level: ' + (level + 1) + ' Failed: ' + fail + '子弹数：' + (maxbullnum - gamer.bullet) + '</h4>';
			}
			bltimer = 0;
		}
	}
	else if(keycode == 68){
		if(gamer.bullet >= 0 && gamer.bullet < maxbullnum && bltimer == -1){
			bulle.push(initBullet(gamer.x + gamer.len, gamer.y + gamer.len / 2, 4));
			gamer.bullet++;
			if(endTimer != -1){
				gamer.bullet--;
				KillYellowEnding();
			}
			else if(gamer.bullet != -1){
				shoot.play();
				gameInformation.innerHTML = '<h4>Level: ' + (level + 1) + ' Failed: ' + fail + '子弹数：' + (maxbullnum - gamer.bullet) + '</h4>';
			}
			bltimer = 0;
		}
	}
	else if(keycode == 90 && gaming == 0){   //重新开始游戏 
		BGM.play();
		afterwords();
		gameLines.innerHTML = '<h4>' + Lines[level] + '</h4>';
	}
	else if(keycode == 76){   //重新开始游戏 
		if(endTimer != -1){
			if((maxbullnum - gamer.bullet) > 0){
				NoKillEnding();
			}
			else{
				leaveEnding();
			}
	
		}
	}
	else if(keycode == 82 && endTimer != -1){   //重新开始游戏
		location.reload();
	}
}

document.onkeyup = function keyUp(e){  
	var keycode = e.which;  
	if(keycode == 37){
		leftArrow = false;
	}
	else if(keycode == 38){
		upArrow = false;
	}
	else if(keycode == 39){
		rightArrow = false;
	}
	else if(keycode == 40){
		downArrow = false;
	}
}
 
window.onresize = function(){     //自适应
	gameBoard.style.left = ((window.innerWidth - 720)/ 2).toString() + 'px';
	gameBoard.style.top = ((window.innerHeight - 510)/ 2).toString() + 'px';
}


gameStart.onmousemove = gameHelp.onmousemove = gameAbout.onmousemove = gameQuit.onmousemove = moveTo;
gameStart.onmouseleave = gameHelp.onmouseleave = gameAbout.onmouseleave = gameQuit.onmouseleave = leaveFrom;

gameStart.onclick = function(){
	var name = document.getElementById('name');
	
	name.style.display = 'none';
	gameStart.style.display = 'none';
	gameHelp.style.display = 'none';
	gameAbout.style.display = 'none';
	gameQuit.style.display = 'none';
	
	setTimeout("startwords()", 1000);  

}

gameHelp.onclick = function(){
	var name = document.getElementById('name');
	gameWords.style.lineHeight = '60px';
	gameWords.innerHTML = '<br>帮助<br>你是一个恋爱中的小方块。为了寻找你的挚爱，你踏上了漫漫旅程。方向键上下左右移动，到达粉色区域（小粉的颜色）。注意避开<font color="red">障碍物。</font><br><div id = "back" style = "position: absolute; width: 100px; height: 60px; left:290px">返回</div>';
	gameWords.style.display = 'block';
	gameWords.style.opacity = 1;
	name.style.display = 'none';
	gameStart.style.display = 'none';
	gameHelp.style.display = 'none';
	gameAbout.style.display = 'none';
	gameQuit.style.display = 'none';
	
	var gameBack = document.getElementById('back');
	gameBack.onclick = function(){
		setgameBoard();
	}
	gameBack.onmousemove = moveTo;
	gameBack.onmouseleave = leaveFrom;
}

gameAbout.onclick = function(){	
	gameWords.innerHTML = '<br>关于<br><br>这是一个由RP和XP一起做的奇怪的小游戏。或许还会更新，毕竟这游戏的扩展性还是很屌的。<div id = "back" style = "position: absolute; width: 100px; height: 60px; left:290px"><br>返回</div>';
	var name = document.getElementById('name');
	gameWords.style.lineHeight = '60px';
	gameWords.style.display = 'block';
	gameWords.style.opacity = 1;
	name.style.display = 'none';
	gameStart.style.display = 'none';
	gameHelp.style.display = 'none';
	gameAbout.style.display = 'none';
	gameQuit.style.display = 'none';
	
	var gameBack = document.getElementById('back');
	gameBack.onclick = function(){
		setgameBoard();
	}
	gameBack.onmousemove = moveTo;
	gameBack.onmouseleave = leaveFrom;
}

gameQuit.onclick = function(){ 
	window.close(); 
}

function moveCenter(min, max, moveSpeed){    //移动障碍物圆心{
	for(var bl in block[level]){
		var nowbl = block[level][bl];
		if(nowbl.display == true && nowbl.type == 2){
			if(moveDirection == 1 && nowbl.centerY <= max){
				nowbl.centerY += moveSpeed;
				nowbl.y += moveSpeed;
			}
			else if(moveDirection == 1 && nowbl.centerY > max){
				nowbl.centerY -= moveSpeed;
				nowbl.y -= moveSpeed;
				moveDirection = -1;
			}
			else if(moveDirection == -1 && nowbl.centerY >= min){
				nowbl.centerY -= moveSpeed;
				nowbl.y -= moveSpeed;
			}
			else if(moveDirection == -1 && nowbl.centerY < min){
				nowbl.centerY += moveSpeed;
				nowbl.y += moveSpeed;
				moveDirection = 1;
			}
		}
	} 
}

 function moveCenterforLevel(){   //针对具体关卡进行障碍物圆心移动
	 if(level == 9){
		 moveCenter(75,225,0.5);
	 }
 }
 
 
function nextLevel(){   //进入下一关
	level++;
	gamer.x = gamer.init[level].x * 30;
	gamer.y = gamer.init[level].y * 30;
	gameLines.innerHTML = '<h4>' + Lines[level] + '</h4>';
	if(gamer.bullet != -1){
		gameInformation.innerHTML = '<h4>Level: ' + (level + 1) + ' Failed: ' + fail + '子弹数：' + (maxbullnum - gamer.bullet) + '</h4>';
	}
	else{
		gameInformation.innerHTML = '<h4>Level: ' + (level + 1) + ' Failed: ' + fail +'</h4>';
	}				
	leftArrow = rightArrow = upArrow = downArrow = false;
	copyMapAndBullets();
	gamer.gold = 0;
 }
 
function getStronger(){    
	gameLines.innerHTML = '<h4>我变得更加强大。</h4>'
}

function init(){   //初始化函数
	
	gameBoard.style.left = ((window.innerWidth - 720)/ 2).toString() + 'px';
	gameBoard.style.top = ((window.innerHeight - 510)/ 2).toString() + 'px';
	gameWords.style.lineHeight = '450px';
	gameWords.innerHTML = '<h2>A RP & XP Production</h2>';
	gameWords.style.display = 'block';
	setTimeout('openWords()', 1000);     //开场文字
}

function interlude(){   //过场动画
	gameWords.style.opacity = 0;
	mapCanvas.style.display = 'none';
	gameBoard.style.backgroundColor = '#111111';
	gameLines.style.display = 'none';
	gameInformation.style.display = 'none';
	gameWords.innerHTML = '<h4>小红，我来了。</h4>';
	gameWords.style.display = 'block';
	gameWords.style.opacity = 1;
}

function closeInterlude(){   //关闭过场动画
	mapCanvas.style.display = 'block';
	gameLines.style.display = 'block';
	gameInformation.style.display = 'block';
	gameWords.innerHTML = '';
	setTimeout(setGameAfterInterclude(), 4000);
}

function setGameAfterInterclude(){         //过场动画结束后重启游戏界面
	gameWords.style.display = 'none';
	if(level == 13){    //第13关的黑屏
		gameBoard.style.backgroundColor = '#111111';
		mapCanvas.style.backgroundColor = '#111111';
	}
	else{
		gameBoard.style.backgroundColor = '#00008B';
		mapCanvas.style.backgroundColor = '#00008B';
	}
}



function reset(){   //重置一切
	leftArrow = rightArrow = upArrow = downArrow = false;             
	gamer.x = gamer.y = 100;   
	gamer.gold = 0;    //金币数
	gamer.bullet = -1;   //子弹数 -1代表没♂枪 其余值代表已经射♂出子弹数	
	bltimer = -1;
	timeCount = 0  // 循环检测
	maxbltimer = 50;
	maxbullnum = 2;
	gamestart = 0;
	interTimer = -1;  //控制动画用
	endTimer = -1;    //控制结局动画用
	level = 0;    //当前关卡
	gaming = 0;    //是否正在游戏
	fail = 0;   //失败次数
	current = 0;
	x = 0;   //播放文字动画用变量
}

function openWords(){
	gameWords.style.opacity = 0.9;
	setTimeout('closeWords()', 2500);     //关闭开场文字
}

function closeWords(){
	gameWords.style.opacity = 0;
	setTimeout('setgameBoard()', 2300);    //显示主界面
}

function setgameBoard(){          //打开游戏面板
	var name = document.getElementById('name');
	gameWords.style.lineHeight = '450px';
	gameWords.style.display = 'none';
	name.style.display = 'block';
	gameStart.style.display = 'block';
	gameHelp.style.display = 'block';
	gameAbout.style.display = 'block';
	gameQuit.style.display = 'block';	
}

function moveTo(){             //鼠标移过主菜单
	if(typeof(this.style) != "undefined"){
		this.style.color = '#66ccff';
		this.style.cursor = 'pointer';
		cursor2.play();
	}
}

function leaveFrom(){             //鼠标移走主菜单
	if(typeof(this.style) != "undefined"){
		this.style.color = '#ffffff';
		this.style.cursor = 'default';
	}
}

function KillRedEnding(){   //结局1
	mapCanvas.style.display	= 'none';
	mapCanvas.style.backgroundColor	= '#00008B';
	gameLines.style.display = 'none';
	gameInformation.style.display = 'none';
	gameWords.style.display = 'block';
	gameWords.style.lineHeight = '60px';
	gameWords.style.fontsize = '120%';
	gameWords.innerHTML = '枪声。鲜血。尖叫。<br>你开枪杀掉了小红，你深爱却伤你最深的人。<br>既然得不到，毁了又怎样？<br>你任凭小黄愤怒的捶打着你。<br>对你而言，一切，都无所谓了。<br> 达成结局【憎恶者】<br>按R回到游戏菜单';
	clearInterval(mainCycle);
}

function KillYellowEnding(){    //结局2
	mapCanvas.style.display	= 'none';
	mapCanvas.style.backgroundColor	= '#00008B';
	gameLines.style.display = 'none';
	gameInformation.style.display = 'none';
	gameWords.style.display = 'block'
	gameWords.style.lineHeight = '60px';
	gameWords.style.fontsize = '120%';
	gameWords.innerHTML = '枪声。鲜血。尖叫。<br>你开枪杀掉了小黄，抢走你心上人的人。<br>你任凭小红愤怒的捶打着你。<br>对你而言，一切，都无所谓了。<br> 达成结局【嫉妒者】。<br>按R回到游戏菜单';
	clearInterval(mainCycle);
}

function leaveEnding(){   //结局3
	mapCanvas.style.display	= 'none';
	mapCanvas.style.backgroundColor	= '#00008B';
	gameLines.style.display = 'none';
	gameInformation.style.display = 'none';
	gameWords.style.display = 'block'
	gameWords.style.lineHeight = '60px';
	gameWords.style.fontsize = '120%';
	gameWords.innerHTML = '<br>你无奈的走开了。<br>唉，算了。<br>你相信，总有一天，你会把小红给你的温暖，转移到另一个人的胸膛。<br> 达成结局【离开者】<br>按R回到游戏菜单';
	clearInterval(mainCycle);
}

function NoKillEnding(){    //结局4
	mapCanvas.style.display	= 'none';
	mapCanvas.style.backgroundColor	= '#00008B';
	gameLines.style.display = 'none';
	gameInformation.style.display = 'none';
	gameWords.style.display = 'block'
	gameWords.style.lineHeight = '60px';
	gameWords.style.fontsize = '120%';
	gameWords.innerHTML = '你放下了枪，慢慢走开了。<br>既不能相濡以沫，便不妨相忘江湖。<br>你相信，总有一天，你会把小红给你的温暖，转移到另一个人的胸膛。<br> 达成真·结局【爱情转移】<br>按R回到游戏菜单';
	clearInterval(mainCycle);
}


function firstLevelAction(){   //开场时的对话
	if(50 <= timeCount && timeCount <= 150)
	{
		var sentence = '"我得赶紧走了。"'
		gameLines.style.color = '#FFFF00';
		gameLines.innerHTML = sentence.substring(0, Math.floor(9 * (timeCount - 20) / 100));
	}
	else if( timeCount > 150 && timeCount < 300){
		gameLines.innerHTML = '';
	}
	else if(timeCount >= 300 && timeCount <= 450)
	{
		gameLines.style.color = '#fcfcfc';
		gameLines.innerHTML = '这是谁？小红在哪里？';
	}
	else if(timeCount >= 500 && timeCount <= 650)
	{
		gameLines.style.color = '#fcfcfc';
		gameLines.innerHTML = '我得找到小红。';
	}
	
}

function copyMapAndBullets(){              //拷贝地图
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 15; j++){
			tempMap[i][j] = map[level][i][j];
		}
	}
	tempBullets = gamer.bullet;
};  

function returnMapAndBullets(){           //把拷贝的地图复原
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 15; j++){
			map[level][i][j] = tempMap[i][j];
		}
	}
	gamer.bullet = tempBullets;
}

function main(){    //主循环
	BGM.play();
	if(0 <= timeCount && timeCount <= 650){
		firstLevelAction();
	}
	else if(interTimer != -1){
		if(timeCount <= interTimer + 70){
			interlude();
		}
		if(timeCount == interTimer + 70){
			interTimer = -1;
			closeInterlude();
			nextLevel();
		}
		
	}
	else if(endTimer != -1){
		ending();
	}
	else{
		gamer.check();   //检查是否过关
		gamer.move();
	}
	
	moveCenterforLevel();
	
	for(var bl in bulle){
		var nowbl = bulle[bl];
		if(nowbl.display == true){
			nowbl.check();	
		}
	}   //检测子弹是否碰撞
	for(var bl in block[level]){
		var nowbl = block[level][bl];
		if(nowbl.display == true){
			nowbl.check();	
		}
	}   //检测是否碰撞
	draw();
	for(var bl in bulle){
		var nowbl = bulle[bl];
		nowbl.move();
	}   
	for(var bl in block[level]){
		var nowbl = block[level][bl];
		nowbl.move();	
	} 	
	if(bltimer > -1){
		if(bltimer > maxbltimer){
			bltimer = -1;
		}
		else{
			bltimer++;
		}
	}
	
	timeCount++;
}

function ending(){   //结局
	gamer.x = 2 * 30;
	gamer.y = 2 * 30;
	var name = document.getElementById('name');
	mapCanvas.style.backgroundColor = 'FFFFFF';
	if(timeCount < endTimer + 40){
		gameBoard.style.backgroundColor = '#111111';
		mapCanvas.style.display = 'none';
		gameInformation.style.display = 'none';
		gameLines.style.display = 'none';
		name.style.display = 'none';
		
		var context = mapCanvas.getContext('2d');
	}
	if(timeCount == endTimer + 40){
		mapCanvas.style.display = 'block';
		gameInformation.style.display = 'block';
		gameLines.innerHTML = '';
		gameLines.style.display = 'block';
		gameLines.innerHTML = '小红！';
	}
	else if(timeCount == endTimer + sentenceTime){
		gameLines.innerHTML = '之前碰到的那个人？';
	}
	else if(timeCount == endTimer + sentenceTime * 2){
		gameLines.innerHTML = '小红，你怎么和他在一起？';
	}
	else if(timeCount == endTimer + sentenceTime * 3){
		gameLines.style.color = '#ffaaaa';
		gameLines.innerHTML = '你怎么又来了？';
	}
	else if(timeCount == endTimer + sentenceTime * 4){
		gameLines.style.color = '#ffff00';
		gameLines.innerHTML = '请不要再纠缠她了，先生。';
	}
	else if(timeCount == endTimer + sentenceTime * 5){
		gameLines.style.color = '#fcfcfc';
		gameLines.innerHTML = '我为了找你费了好大劲！';
	}
	else if(timeCount == endTimer + sentenceTime * 6){
		gameLines.innerHTML = '一路上有好多圆形的东西往我身上撞！！';
	}
	else if(timeCount == endTimer + sentenceTime * 7){
		gameLines.style.color = '#ffaaaa';
		gameLines.innerHTML = '……你的妄想症又犯了么。';
	}
	else if(timeCount == endTimer + sentenceTime * 8){
		gameLines.innerHTML = '小蓝，我们已经分手一个月了。';
	}
	else if(timeCount == endTimer + sentenceTime * 9){
		gameLines.innerHTML = '放过我吧。';
	}
	else if(timeCount == endTimer + sentenceTime * 10){
		gameLines.style.color = '#fcfcfc';
		gameLines.innerHTML = '不，这不是真的。';
	}
	else if(timeCount == endTimer + sentenceTime * 11){
		gameLines.style.color = '#ffaaaa';
		gameLines.innerHTML = '这是真的。';
	}
	else if(timeCount == endTimer + sentenceTime * 12){
		gameLines.style.color = '#fcfcfc';
		gameLines.innerHTML = '你明白我有多爱你！';
	}
	else if(timeCount == endTimer + sentenceTime * 13){
		gameLines.style.color = '#ffaaaa';
		gameLines.innerHTML = '我明白你有多爱我。';
	}
	else if(timeCount == endTimer + sentenceTime * 14){
		gameLines.innerHTML = '但也请你明白，我已经不爱你了。';
	}
	else if(timeCount == endTimer + sentenceTime * 15){
		gameLines.innerHTML = '你只会生活在自己的世界。';
	}
	else if(timeCount == endTimer + sentenceTime * 16){
		gameLines.innerHTML = '沉溺于自己的幻想。';
	}
	else if(timeCount == endTimer + sentenceTime * 17){
		gameLines.style.color = '#ffff00';
		gameLines.innerHTML = '别和他多说了。我们走吧。';
	}
	else if(timeCount == endTimer + sentenceTime * 18){
		gameLines.style.color = '#fcfcfc';
		gameLines.innerHTML = '之前的一切…是幻想？小红…不是我的了？';
	}
	else if(timeCount == endTimer + sentenceTime * 19){
		gameLines.innerHTML = '不。';
	}
	else if(timeCount == endTimer + sentenceTime * 20){
		gameLines.style.fontWeight = 'bold';
		gameLines.style.fontsize = '250%';
		gameLines.innerHTML = '不!!';
	}
	else if(timeCount == endTimer + sentenceTime * 21){
		if(gamer.bullet != -1 && maxbullnum - gamer.bullet > 0){
			gameLines.innerHTML = '我的枪还有子弹。';
		}
		else{
			gameLines.innerHTML = '可我……又能怎样呢？';
		}
	}
	else if(timeCount == endTimer + sentenceTime * 22){
		if(gamer.bullet != -1 && maxbullnum - gamer.bullet > 0){
			gameLines.innerHTML = '只要一发子弹，就可以……';
		}
	}
	else if(timeCount == endTimer + sentenceTime * 23 ){
		if(gamer.bullet != -1 && maxbullnum - gamer.bullet > 0){
			gameLines.innerHTML = '做出选择吧。开枪，或者按L键离开。';
		}
		else{
			gameLines.innerHTML = '按L键离开这里。'
		}
	}
}    //结局

function startwords(){  //游戏开始时的文字
	gameWords.style.opacity = 0.9;
	gameWords.style.display = 'block';
	
	var m = startword[current];  
	gameWords.innerHTML = m.substring(0, x++);  
    
	if (x == m.length) {  
		x = 0;  
		current++;  
		if (current > startword.length - 1) {     //播放完毕
			setTimeout("afterwords()", 1200);    
			return;
		}  
		setTimeout("startwords()", 1200);  
    }  
	else {  
		setTimeout("startwords()", 200);  
	}	  
}
 
function afterwords(){   //播放完开场文字后
	gameWords.style.display = 'none';
	mapCanvas.style.display = 'block';
	gameLines.style.display = 'block';
	gameInformation.style.display = 'block';
	if(gamer.bullet != -1){
				gameInformation.innerHTML = '<h4>Level: ' + (level + 1) + ' Failed: ' + fail + '子弹数：' + (maxbullnum - gamer.bullet) + '</h4>';
	}
	else{
		gameInformation.innerHTML = '<h4>Level: ' + (level + 1) + ' Failed: ' + fail +'</h4>' 
	}
	gameBoard.style.backgroundColor = '#00008B';
	
	copyMapAndBullets();
	
	gamer.x = gamer.init[level].x * 30;
	gamer.y = gamer.init[level].y * 30;
	
	mainCycle = window.setInterval("main()", timer);    //开启主循环
	gaming = 1;
	mapCanvas.style.opacity = 1;
}


gamer.init = [{x:3, y:5, Au: 0},{x:9,y: 1, Au:0}, {x:4, y:2, Au:12},{x:2,y: 2, Au:0},{x:4, y:4, Au:1},{x:3, y:5, Au:0},{x:6, y:2, Au:1},{x:2,y: 4, Au:0},{x:2, y:2, Au:0},{x:1, y:2, Au:0},{x:1, y:2, Au:0},{x:4, y:1, Au:0},{x:6, y:1, Au:0},{x:10, y:6, Au:0}]   //玩家每一关的初始状况与需要达到的金币数
Lines = ['不管你在哪，我要找到你。','虽撞南墙不回头。','我想要积累财富，给你幸福的生活。','我对你的爱兜兜转转，终究不渝。','我想要变得强大，给你安稳的怀抱。','路上的一切阻碍，都无法阻拦我。','更多的财富。', '你是那么的完美。', '不管经历多少曲折。', '不管遇到多少磨难。', '我都会毫不迟疑奔向你的方向。','你的中分发型，分外妩媚。','你的眼波流转，如此动人。','你的美丽身影，引我前行。']
 
block[0] = [
	initBlock1(220, 170, 1, 6, 2),
	//initBlock2(260, 160, 30, 5, 6, 90, 0)
];

map[0] = [                //1代表墙壁  0代表平地  2代表终点  3代表有金币  4代表有枪  5代表暗道  6代表被打开的暗道 7代表假障碍物
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,2,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

block[1] = [];

map[1] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,5,5,5,1,0,0,0,0,0,1,1,1,1,1],
	[1,5,1,5,1,0,0,0,0,0,1,1,1,1,1],
	[1,5,1,5,1,0,0,0,0,0,1,1,1,1,1],
	[1,5,1,5,5,5,1,1,1,1,1,1,1,1,1],
	[1,5,1,5,1,1,1,1,1,1,1,1,1,1,1],
	[1,5,1,5,1,0,0,0,0,0,1,1,1,1,1],
	[1,5,1,1,1,0,0,0,0,0,1,1,1,1,1],
	[1,5,5,5,5,0,0,0,0,2,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

block[2] = [
	initBlock2(195, 135, 60, 5, 6, 90, 0),
	initBlock2(195, 135, 60, 5, 6, 90, 90),
	initBlock2(195, 135, 60, 5, 6, 90, 180),
	initBlock2(195, 135, 60, 5, 6, 90, 270),
	initBlock2(195, 135, 30, 6, 6, 90, 0),
	initBlock2(195, 135, 30, 6, 6, 90, 180),
];

map[2] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,2,3,0,3,0,1,1,1,1,1,1],
	[1,1,1,1,3,0,3,0,3,1,1,1,1,1,1],
	[1,1,1,1,0,3,0,3,0,1,1,1,1,1,1],
	[1,1,1,1,3,0,3,0,3,1,1,1,1,1,1],
	[1,1,1,1,0,3,0,3,0,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

block[3] = [
	initBlock2(225, 135, 60, 5, 6, 90, 0),
	initBlock2(225, 135, 60, 5, 6, 90, 40),
	initBlock2(225, 135, 60, 5, 6, 90, 80),
	initBlock2(225, 135, 60, 5, 6, 90, 120),
	initBlock2(225, 135, 60, 5, 6, 90, 160),
	initBlock2(225, 135, 60, 5, 6, 90, 200),
	initBlock2(225, 135, 60, 5, 6, 90, 240),
	initBlock2(225, 135, 60, 5, 6, 90, 280),
	initBlock1(105, 135, 2, 6, 5),
	initBlock1(345, 135, 2, 6, 5),
];

map[3] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,0,0,1,0,0,0,0,0,1,0,0,1,1],
	[1,1,0,0,1,0,0,0,0,0,1,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,2,1,1],
	[1,1,0,0,1,0,0,0,0,0,1,0,0,1,1],
	[1,1,0,0,1,0,0,0,0,0,1,0,0,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

block[4] = [
	initBlock1(375, 75, 1, 6, 3.2),
];

map[4] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,3,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
	[1,1,1,1,2,0,0,0,0,0,0,0,0,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,4,0,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

block[5] = [
	initBlock1(200, 170, 1, 6, 2),
	initBlock1(235, 170, 1, 6, 2),
	//initBlock2(260, 160, 30, 5, 6, 90, 0)
];

map[5] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,2,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

block[6] = [
	initBlock1(165, 75, 1, 6, 0),
	initBlock1(135, 105, 1, 6, 0),
	initBlock1(225, 75, 1, 6, 0),
	initBlock1(195, 105, 1, 6, 0),
	initBlock1(165, 135, 1, 6, 0),
	initBlock1(135, 165, 1, 6, 0),
	initBlock1(255, 105, 1, 6, 0),
	initBlock1(225, 135, 1, 6, 0),
	initBlock1(195, 165, 1, 6, 0),
	initBlock1(165, 195, 1, 6, 0),
	initBlock1(255, 165, 1, 6, 0),
	initBlock1(225, 195, 1, 6, 0),
	//initBlock2(260, 160, 30, 5, 6, 90, 0)
];

map[6] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,0,0,2,0,0,1,1,1,1,1,1],
	[1,1,1,1,0,0,0,0,0,1,1,1,1,1,1],
	[1,1,1,1,0,0,3,0,0,1,1,1,1,1,1],
	[1,1,1,1,0,0,0,0,0,1,1,1,1,1,1],
	[1,1,1,1,0,0,0,0,0,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

block[7] = [
	initBlock2(225, 135, 60, 5, 6, 90, 0),
	initBlock2(225, 135, 60, 5, 6, 90, 40),
	initBlock2(225, 135, 60, 5, 6, 90, 80),
	initBlock2(225, 135, 60, 5, 6, 90, 120),
	initBlock2(225, 135, 60, 5, 6, 90, 160),
	initBlock2(225, 135, 60, 5, 6, 90, 200),
	initBlock2(225, 135, 60, 5, 6, 90, 240),
	initBlock2(225, 135, 60, 5, 6, 90, 280),
	initBlock2(225, 135, 60, 5, 6, 90, 320),
	//initBlock2(260, 160, 30, 5, 6, 90, 0)
];

map[7] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,2,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

block[8] = [];

map[8] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,5,1,1,5,5,5,5,5,5,1],
	[1,1,5,1,1,5,1,1,5,1,1,1,1,5,1],
	[1,1,5,5,1,5,1,1,5,1,1,1,1,5,1],
	[1,1,1,5,1,5,1,1,5,1,1,5,5,5,1],
	[1,1,1,5,5,5,5,5,5,5,1,5,1,5,1],
	[1,1,1,1,1,1,5,1,1,1,1,2,1,5,1],
	[1,1,1,1,1,1,5,5,5,5,5,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];


block[9] = [
	initBlock1(195, 92, 3, 6, 3),
	initBlock1(195, 58, 3, 6, 3),
	initBlock1(195, 242, 3, 6, 3),
	initBlock1(195, 208, 3, 6, 3),
	
	initBlock2(285, 75, 40, 5, 6, 60, 0),
	initBlock2(285, 75, 40, 5, 6, 60, 40),
	initBlock2(285, 75, 40, 5, 6, 60, 80),
	initBlock2(285, 75, 40, 5, 6, 60, 120),
	initBlock2(285, 75, 40, 5, 6, 60, 160),
	initBlock2(285, 75, 40, 5, 6, 60, 200),
	initBlock2(285, 75, 40, 5, 6, 60, 240),

];

map[9] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,1,1,1,1,1,0,0,0,1,1,1,1],
	[1,1,1,1,1,1,1,1,0,0,0,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,2,0,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

block[10] = [
	initBlock1(195, 92, 3, 6, 3),
	initBlock1(195, 58, 3, 6, 3),
	initBlock1(195, 242, 3, 6, 3),
	initBlock1(195, 208, 3, 6, 3),
	initBlock1(255, 170, 3, 6, 0),
	initBlock1(315, 170, 3, 6, 0),
	];

map[10] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,7,0,1,1,1,1],
	[1,1,1,1,1,1,1,1,0,7,0,1,1,1,1],
	[1,1,1,1,1,1,1,1,0,7,0,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,7,0,1,1,1,1],
	[1,2,0,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

block[11] = [
	initBlock1(255, 165, 3, 6, 0),
	initBlock1(285, 165, 3, 6, 0),
	initBlock1(315, 165, 3, 6, 0),
	initBlock1(195, 165, 3, 6, 0),
	initBlock1(165, 165, 3, 6, 0),
	initBlock1(135, 165, 3, 6, 0),
	
	initBlock1(255, 195, 3, 6, 0),
	initBlock1(285, 195, 3, 6, 0),
	initBlock1(315, 195, 3, 6, 0),
	initBlock1(195, 195, 3, 6, 0),
	initBlock1(165, 195, 3, 6, 0),
	initBlock1(135, 195, 3, 6, 0),
	
	initBlock1(255, 135, 3, 6, 0),
	initBlock1(285, 135, 3, 6, 0),
	initBlock1(315, 135, 3, 6, 0),
	initBlock1(195, 135, 3, 6, 0),
	initBlock1(165, 135, 3, 6, 0),
	initBlock1(135, 135, 3, 6, 0),
	
	initBlock1(255, 105, 3, 6, 0),
	initBlock1(285, 105, 3, 6, 0),
	initBlock1(315, 105, 3, 6, 0),
	initBlock1(195, 105, 3, 6, 0),
	initBlock1(165, 105, 3, 6, 0),
	initBlock1(135, 105, 3, 6, 0),
	];

map[11] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,1,0,0,0,7,0,0,0,1,1,1,1],
	[1,1,1,1,0,0,0,7,0,0,0,1,1,1,1],
	[1,1,1,1,0,0,0,7,0,0,0,1,1,1,1],
	[1,1,1,1,0,0,0,7,0,0,0,1,1,1,1],
	[1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,1,0,0,0,0,0,0,2,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

block[12] = [
	initBlock1(185, 100, 3, 6, 6),
	initBlock1(215, 134, 3, 6, 6),
	initBlock1(245, 168, 3, 6, 6),
	initBlock1(275, 202, 3, 6, 6),	
	];

map[12] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,0,2,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];


block[13] = [
	];

map[13] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,2,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];


block[14] = [
	
	];

map[14] = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];



init();
