var firstX = 0;  //第一关动画

function draw(){
	var context = mapCanvas.getContext('2d');
	
	if(level == 13){   //黑屏关卡
		context.fillRect(0,0,mapCanvas.width,mapCanvas.height);
		context.fillStyle = "#ffcccc";
		context.fillRect(30 * 3 + mapStartX, 30 * 2 + mapstartY, 20,20);
	}
	else if(endTimer != -1 && timeCount >= endTimer + 40){    //结局关卡 
		for(var i = 0; i < 6; i++){
			for(var j = 0; j < 15; j++){
				if((i + j) % 2 == 0){
					context.fillStyle = "#dddddd";
				}
				else{
					context.fillStyle = "white";
				}
				context.fillRect(30 * j + mapStartX, 30 * i + mapstartY, 30,30);
			}
		}
	}
	
	else {
		for(var i = 0; i < 10; i++){
			for(var j = 0; j < 15; j++){
				if(map[level][i][j] == 0 || map[level][i][j] == 3 || map[level][i][j] == 4 || map[level][i][j] == 6 || map[level][i][j] == 7){   //画地板
					if((i + j) % 2 == 0){
						context.fillStyle = "#dddddd";
					}
					else{
						context.fillStyle = "white";
					}
					context.fillRect(30 * j + mapStartX, 30 * i + mapstartY, 30,30);
					if(map[level][i][j] == 7)    //假障碍物
					{
						context.fillStyle="#111111";
						context.beginPath();
						context.arc(30 * j + mapStartX + 15, 30 * i + mapstartY + 15, 6, 0, Math.PI*2, true);
						context.closePath();
						context.fill();    //画障碍物
				
						context.fillStyle="#FF0000";
						context.beginPath();
						context.arc(30 * j + mapStartX + 15, 30 * i + mapstartY + 15, 5, 0, Math.PI*2, true);
						context.closePath();
						context.fill();    //描边
					}
				}
				
				else if(map[level][i][j] == 2){    
					context.fillStyle = "#ffaaaa";
					context.fillRect(30 * j + mapStartX, 30 * i + mapstartY, 30,30);
				}
				else if(map[level][i][j] == 1 || map[level][i][j] == 5){
					context.fillStyle = gameBoard.style.backgroundColor;   //边界
					context.fillRect(30 * j + mapStartX, 30 * i + mapstartY, 30,30);
					
					if(j + 1 < map[level][i].length && (map[level][i][j + 1] != 1) && (map[level][i][j + 1] != 5)){
						context.fillStyle = "#111111";
						context.lineWidth = 3;  
						context.beginPath(); 
						context.moveTo(30 * (j + 1) + mapStartX - 1.5, 30 * i + mapstartY - 1.5);
						context.lineTo(30 * (j + 1) + mapStartX - 1.5, 30 * (i + 1) + mapstartY + 1.5);
						context.stroke();//画线
						
					}
					if(j > 1 && (map[level][i][j - 1] != 1 && map[level][i][j - 1] != 5)){
						context.fillStyle = "#111111";
						context.lineWidth = 3;  
						context.beginPath(); 
						context.moveTo(30 * j + mapStartX - 0.5, 30 * i + mapstartY - 1.5);
						context.lineTo(30 * j + mapStartX - 0.5, 30 * (i + 1) + mapstartY + 1.5);
						context.stroke();//画线
						
					}
					if(i + 1 < map[level].length && (map[level][i + 1][j] != 1 && map[level][i + 1][j] != 5)){
						context.fillStyle = "#111111";
						context.lineWidth = 3;  
						context.beginPath(); 
						context.moveTo(30 * j + mapStartX - 1.5, 30 * (i + 1) + mapstartY - 1.5);
						context.lineTo(30 * (j + 1) + mapStartX + 1.5, 30 * (i + 1) + mapstartY - 1.5);
						context.stroke();//画线;
					}
					if(i > 1  && (map[level][i - 1][j] != 1 && map[level][i - 1][j] != 5)){
						context.fillStyle = "#111111";
						context.lineWidth = 3;  
						context.beginPath(); 
						context.moveTo(30 * j + mapStartX - 1.5, 30 * i + mapstartY - 1.5);
						context.lineTo(30 * (j + 1) + mapStartX + 0.5, 30 * i + mapstartY - 1.5);
						context.stroke();//画线
					}   //边界
				}
				if(map[level][i][j] == 3){
					context.fillStyle="rgb(0,0,0)";
					context.beginPath();
					context.arc(j * 30 + 15 + mapStartX, i * 30 + 15 + mapstartY, 5, 0, Math.PI*2, true);
					context.closePath();
					context.fill();    //画金币的边边
					
					context.fillStyle="rgb(254,228,1)";
					context.beginPath();
					context.arc(j * 30 + 15 + mapStartX, i * 30 + 15 + mapstartY, 4, 0, Math.PI*2, true);
					context.closePath();
					context.fill();    //画金币
				}
				if(map[level][i][j] == 4){
					var img=new Image();
					img.src="img/gun.png";
					context.drawImage(img,j * 30 + mapStartX, i * 30 + mapstartY);
				}
			}
		}
	}
	
	for(var bl in block[level]){
		var nowbl = block[level][bl];
		if(nowbl.display == true){			
			context.fillStyle="#111111";
			context.beginPath();
			context.arc(nowbl.x + mapStartX, nowbl.y + mapstartY, nowbl.size, 0, Math.PI*2, true);
			context.closePath();
			context.fill();    //画障碍物
			
			context.fillStyle="#FF0000";
			context.beginPath();
			context.arc(nowbl.x + mapStartX, nowbl.y + mapstartY, nowbl.size - 1, 0, Math.PI*2, true);
			context.closePath();
			context.fill();    //描边
		}
	}
	
	
	for(var bl in bulle){
		var nowbl = bulle[bl];
		if(nowbl.display == true){			
			context.fillStyle="#111111";
			context.beginPath();
			context.arc(nowbl.x + mapStartX, nowbl.y + mapstartY, nowbl.size, 0, Math.PI*2, true);
			context.closePath();
			context.fill();    //画障碍物
			
			context.fillStyle="#66CCFF";
			context.beginPath();
			context.arc(nowbl.x + mapStartX, nowbl.y + mapstartY, nowbl.size - 1, 0, Math.PI*2, true);
			context.closePath();
			context.fill();    //描边
		}
	}
	
	if(timeCount <= 300){   //第一关的动画
		firstLevelAn();
	}

	//drawPlayer();

	if(endTimer != -1 && timeCount >= endTimer + 40){
		endLevelAn();            //结局动画
	}
	drawPlayer();
}

function drawPlayer(){
	var context = mapCanvas.getContext('2d');
	context.fillStyle = "#66ccff";
	context.fillRect(gamer.x + mapStartX, gamer.y + mapstartY, gamer.len, gamer.len);
	context.fillStyle = "#111111";
	context.lineWidth = 2;  
	context.beginPath(); 
	context.moveTo(gamer.x + mapStartX, gamer.y + mapstartY);
	context.lineTo(gamer.x + mapStartX + gamer.len, gamer.y + mapstartY);
	context.lineTo(gamer.x + mapStartX + gamer.len, gamer.y + mapstartY + gamer.len);
	context.lineTo(gamer.x + mapStartX, gamer.y + mapstartY + gamer.len);
	context.lineTo(gamer.x + mapStartX, gamer.y + mapstartY);
	context.stroke();//  画玩家
}


function firstLevelAn(){
	var context = mapCanvas.getContext('2d');
	context.fillStyle="#FFFF00";
	context.fillRect(30 * (2 + timeCount / 30) + mapStartX, 30 * 4 + mapstartY, 20, 20);
}

function endLevelAn(){
	var context = mapCanvas.getContext('2d');
	if(timeCount >= endTimer + 40 && timeCount < endTimer + sentenceTime * 20){
		context.fillStyle="#FFFF00";
		context.fillRect(30 * 5 + mapStartX, 30 * 2 + mapstartY, 20, 20);
		context.fillStyle="#ffbbbb";
		context.fillRect(30 * 5 + mapStartX, 30 * 2 + 20 + mapstartY, 20, 20);
	}

	else if (timeCount >= endTimer + sentenceTime * 20 + 10){
		context.fillStyle="#FFFF00";
		context.fillRect(30 * 5 + 22 + mapStartX, 30 * 2 + mapstartY, 20, 20);
		context.fillStyle="#ffbbbb";
		context.fillRect(30 * 5  + mapStartX, 30 * 2 + 20 + mapstartY, 20, 20);
		gamer.x = 5 * 30;
	}
}
