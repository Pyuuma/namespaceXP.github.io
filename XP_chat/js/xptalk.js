var msgBoard = document.getElementById('messageboard');          
var inBoard = document.getElementById('inputboard');
var usrBoard = document.getElementById('userboard');
var usrInput = document.getElementById('userinput');
var prpt =  document.getElementById('prompt');
var inpt = document.getElementById('input');
var send =  document.getElementById('send');

msgBoard.style.width = ( 0.9 * window.innerWidth - 215).toString() + 'px';
msgBoard.style.height = (window.innerHeight - 350).toString() + 'px';
usrBoard.style.height = (window.innerHeight - 340).toString() + 'px';
usrInput.style.height = (window.innerHeight - 395).toString() + 'px';
inpt.style.width = ( 0.9 * window.innerWidth - 15).toString() + 'px';
prpt.style.left = ((window.innerWidth - 160)/ 2).toString() + 'px';
prpt.style.top = ((window.innerHeight - 40) / 2).toString() + 'px';
prpt.style.display = 'none';
prpt.style.opacity = 0.5;


window.onresize = function(){
	msgBoard.style.width = ( 0.9 * window.innerWidth - 215).toString() + 'px';
	msgBoard.style.height = (window.innerHeight - 350).toString() + 'px';
	usrBoard.style.height = (window.innerHeight - 340).toString() + 'px';
	usrInput.style.height = (window.innerHeight - 395).toString() + 'px';
	inpt.style.width = ( 0.9 * window.innerWidth - 15).toString() + 'px';	
	prpt.style.left = ((window.innerWidth - 160)/ 2).toString() + 'px';
	prpt.style.top = ((window.innerHeight - 40) / 2).toString() + 'px';
}

/**********************************窗口布局*********************************/

var myFirebaseRef = new Firebase("https://xptalk.firebaseio.com/");
var usersRef = myFirebaseRef.child('users');
var messageRef = myFirebaseRef.child('messages');
var myDate = new Date(); 
var stringDate = myDate.toLocaleString();
var username;     //本地用户名
var flag = 0;     //防止某些代码重复执行
var path;    //记录本用户名存储地址 便于删除
var userList = new Array;     //存储用户列表的数组
var messageList; 

//myFirebaseRef.set(null);


usersRef.once("value", function(snapshot) {         //初始化用户信息
	snapshot.forEach(function(data) {
		var namesaved = data.val().name;
		userList.push(namesaved);
	});
	while(true){
		username = prompt("请输入您的昵称","XP同学");
		if(username == null || username == ""){
			alert("昵称不能为空！");
		}
		else if($.inArray(username, userList) == -1){
			alert("欢迎 【" + username + "】 来到 XP的聊天室！祝你在这里找到真爱！");      //输入昵称
			path = (usersRef.push({name:username})).toString();
			userList.push(username);
			setUserBoard();
			flag = 1;
			break;                           
		}
		else {
			alert("昵称已被使用！");
		}
	}		
});

usersRef.on("child_removed", function(snapshot) {    //用户退出房间
	var namedeleted = snapshot.val().name;
	var index = $.inArray(namedeleted, userList);
	for(var i = index; i < userList.length - 1; i++){
		userList[i] = userList[i + 1];
	}
	userList.length--;
	setUserBoard();
	
	prpt.innerHTML = namedeleted +' 离开了聊天室~'
	prpt.style.display = 'block';
	prpt.style.opacity = 0.5;
	setTimeout('closeprpt()', 3000);    //动画效果
});   

usersRef.on("child_added", function(snapshot) {    //用户进入房间
	if(flag == 1){
	var nameadded = snapshot.val().name;
	userList.push(nameadded);
	setUserBoard();
	prpt.innerHTML = nameadded +' 加入了聊天室~'
	prpt.style.display = 'block';
	prpt.style.opacity = 0.5;
	setTimeout('closeprpt()', 3000);    //动画效果
	}
});

function closeprpt(){   
	prpt.style.opacity = 0;
}
 
function setUserBoard(){     //布置用户列表
	usrInput.innerHTML = '';
	for(var i = 0; i < userList.length; i++){
		usrInput.innerHTML = usrInput.innerHTML + '<p><strong>' + userList[i] + '</strong></p>';
	}
}
 
window.onunload = function(){     //关闭窗口
	var myNameRef = new Firebase(path);
	myNameRef.remove();             //退出
	alert('1');
}
 
send.onclick = function(){    //发送信息
	messageRef.push({name:username, content: inpt.value, date:stringDate});
	inpt.value = ''; 
}


 messageRef.limitToLast(15).on("child_added", function (snapshot) {   //加载聊天记录
	 
    var data = snapshot.val();
    var username = data.name;
    var message = data.content;
	var date = data.date;
	    
    msgBoard.innerHTML = msgBoard.innerHTML + '<h4>'+ username +'  '+ date + '</h4>' + '<p>' + message + '</p>';
	msgBoard.scrollTop = msgBoard.scrollHeight;
  });

