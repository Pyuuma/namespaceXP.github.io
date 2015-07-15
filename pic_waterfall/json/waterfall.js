var waterfall = document.getElementById('waterfall');
var body = document.getElementById('body');
var Modal = document.getElementById("Modal");
var close = document.getElementById("close");
var comment = document.getElementById("comment");

var col;
var openFlag = 0;    //是否开启遮罩

body.style.height = '1200px';
comment.page = 0;

waterfall.colmns = 4;      //默认4列
waterfall.maxRow = 4;     //每列最多几张图
waterfall.elementWidth = 250;   //每个元素的宽度
waterfall.elements = 0;     //元素个数
waterfall.max;     //最多元素个数
waterfall.rowheight = new Array;   //每一列的数目
waterfall.width = waterfall.colmns * (waterfall.elementWidth + 40) - 20;
waterfall.style.position = 'absolute';
waterfall.style.left = ((0.95 * window.innerWidth - waterfall.width) / 2).toString() + 'px';


for(var i = 0; i < waterfall.colmns; i++)
	waterfall.rowheight[i] = 0;

close.onclick = function(){
	var cover =  document.getElementById("cover");
	openFlag = 0;
	cover.style.display = 'none';
	Modal.style.display = 'none';
}

waterfall.addElements = function(arg){
	col = waterfall.elements % waterfall.colmns;
	div = document.createElement("div");
	var img = document.createElement("img");
	img.src = arguments[0];
	

	div.style.position = 'absolute'; 
	div.style.left = (col * (waterfall.elementWidth + 40)).toString() + 'px';
	div.style.width = (waterfall.elementWidth + 20).toString() + 'px';
	div.style.height = (waterfall.elementWidth * 3 / 2 + 20).toString() + 'px';
	div.style.top = (waterfall.rowheight[col]).toString() + 'px';
	div.style.backgroundColor = '#fafafa';
	
	waterfall.rowheight[col] = 40 + waterfall.rowheight[col] + waterfall.elementWidth * 3 / 2;
	
	img.width = waterfall.elementWidth; 
	img.height = waterfall.elementWidth * 3 / 2;
	img.style.position = 'absolute'; 
	img.style.top = '10px';
	img.style.left = '10px';
	div.style.cursor = "pointer";
	img.onerror = function(){
		this.src = 'icons/error.jpg'
		};
	
	img.onclick = function(){
		var bigImg = document.getElementById('img');
		var line = document.createElement("div");
		var cover =  document.getElementById("cover");
		img.serial = waterfall.elements;
		
		comment.innerHTML = '<h1>Comments: </h1>';   //清空评论区
		line.className = 'line';
		
		comment.appendChild(line);
		
		$.getJSON("http://localhost/json/imgSources.js", function(json){
		for(var i = 0; i < 4; i++){
				if(i < json.pics[img.serial].comment.length){
					var temp = document.createElement("div");
					var line2 = document.createElement("div");
					
					line2.className = 'line';
					temp.style.position = 'relative';
					temp.style.left = '15px';
					temp2.style.top = '3px';
					temp.innerHTML = '<h3>' + json.pics[img.serial].comment[i].name + ':</h3>';
					comment.appendChild(temp);
				
					var temp2 = document.createElement("div");
					temp2.style.position = 'relative';
					temp2.style.left = '25px';
					temp2.style.top = '-5px';
					temp2.style.fontSize = '14pt';
					temp2.innerHTML = json.pics[img.serial].comment[i].content;
					comment.appendChild(temp2);
					comment.appendChild(line2);
				}
			}
		});
		
		bigImg.src = img.src;
		bigImg.width = bigImg.naturalWidth;
		bigImg.height = bigImg.naturalHeight;
		bigImg.style.position = 'absolute';
		Modal.appendChild(bigImg);
		bigImg.style.left = '40px';
		bigImg.style.top = '40px';
		bigImg.style.zIndex = 2046;
		if(bigImg.height > 600){
			bigImg.width = bigImg.width * 600 / bigImg.height;
			bigImg.height = 600;
		}
		Modal.style.height = (bigImg.height + 80).toString() + 'px';
		Modal.style.width = (bigImg.width + 425).toString() + 'px';
		comment.style.height = Modal.style.height;
		Modal.style.left = ((window.innerWidth -  parseInt(Modal.style.width)) / 2).toString() + 'px';
		Modal.style.top = ((window.innerHeight -  parseInt(Modal.style.height)) / 2).toString() + 'px';
		
		openFlag = 1;
		cover.style.display = 'block';
		Modal.style.display = 'block';
		
	}
	
	img.onmouseover = function(){
		
		img.style.cursor = 'hand';
	}
	
	waterfall.appendChild(div);
	div.appendChild(img);
	
	waterfall.elements = waterfall.elements + 1;
	
	if(parseInt(body.style.height.substring(0, body.style.height.length - 2)) < waterfall.rowheight[col]){
		body.style.height = (waterfall.rowheight[col] + 20).toString() + 'px';
	}
	
};

window.onresize = function(){     
	
	waterfall.style.left = ((0.95 * window.innerWidth - waterfall.width) / 2).toString() + 'px';
	while(0){
		waterfall.style.left = ((0.95 * document.body.clientWidth - waterfall.width) / 2).toString() + 'px';
		waterfall.colmns = waterfall.colmns - 1; 
	}
}


$.getJSON("http://localhost/json/imgSources.js", function(json){
  for(var i = 0; i < waterfall.colmns * waterfall.maxRow; i++){
	  waterfall.addElements('pic/'+json.pics[i].path);
  }
  waterfall.max = json.pics.length;
});




window.onscroll = function () {
	if (waterfall.elements < waterfall.max && getScrollTop()+getClientHeight()== getScrollHeight()){
		$.getJSON("http://localhost/json/imgSources.js", function(json){
			for(var i = 0; i < 8; i++){
				if(waterfall.elements < waterfall.max){
					waterfall.addElements('pic/'+json.pics[waterfall.elements].path);
				}
			}
		});
	}
}


document.body.onmousewheel = function(){
	if(openFlag){
		event.preventDefault();
	}
}


function getScrollTop(){
    var scrollTop = 0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    }
    else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}



function getClientHeight(){
    var clientHeight=0;
    if(document.body.clientHeight&&document.documentElement.clientHeight){
        var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;        
    }
    else{
        var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;    
    }
    return clientHeight;
}


function getScrollHeight(){
    return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
}


 
Modal.style.display = 'none';
Modal.style.backgroundColor = 'black';



waterfall.addElements('pic/');
waterfall.addElements('pic/');
waterfall.addElements('pic/');
waterfall.addElements('pic/');

waterfall.addElements('pic/');

waterfall.addElements('pic/');

waterfall.addElements('pic/');


