var device_list_div = document.getElementById("device_list");
var oldname;
var chosen = 0;

function clear(){
	device_list_div.innerHTML = '';
}

function set_device(){   //显示设备列表
	for(var i = 0; i < device_list.length; i++){
	var left_shadow = document.createElement('div');
	var right_shadow = document.createElement('div');
	var device_div = document.createElement('div');
	var device_img = document.createElement('img');
	var device_name = document.createElement('div');
	var line = document.createElement('div');
	var device_indicator = document.createElement('div');
	var device_button = document.createElement('img');
	var border = document.createElement('hr');
	//创建元素
	
	device_div.setAttribute('id', i);
	left_shadow.setAttribute('class', 'left_shadow');
	right_shadow.setAttribute('class', 'right_shadow');
	left_shadow.style.display = 'none';
	right_shadow.style.display = 'none';
	device_name.innerHTML = device_list[i].name;
	device_name.setAttribute('id', device_name.innerHTML);
	device_button.setAttribute('class', 'button');
	line.setAttribute('class', 'line');
	device_name.setAttribute('class', 'name');
	if(i != chosen){
		device_name.style.color = '#777777';
		device_img.setAttribute('src', 'img/offline.png');
		device_indicator.style.backgroundColor = '#777777';
	
	}
	else{
		device_name.style.color = '#ffffff';
		device_img.setAttribute('src', 'img/online.png');
		device_indicator.style.backgroundColor = '#44bbff';
		left_shadow.style.display = 'block';
	}
	device_img.setAttribute('class', 'img');
	device_div.setAttribute('class', 'devicediv');
	device_indicator.setAttribute('class', 'indicator');
	device_button.setAttribute('src', 'img/button_grey.png');

	border.setAttribute('class', 'cut_line');
	border.setAttribute('size', 1);
	border.setAttribute('color', '#666666');
	
	device_div.appendChild(left_shadow);
	device_div.appendChild(right_shadow);
	device_div.appendChild(device_img);
	device_div.appendChild(device_name);
	device_div.appendChild(device_button);
	device_div.appendChild(line);
	device_div.appendChild(device_indicator);
		
	
	device_div.appendChild(border);
	device_button.onclick = function(){
		var device_new_name = document.getElementById('device_new_name');
		chosen = parseInt(this.parentNode.getAttribute('id'));
		$('#device_new_name').val(this.parentNode.childNodes[3].innerHTML);
		$('#change_div').css('display', 'block');
		$('#no_device_problem').css('display', 'none');
		$('#device_list').css('display', 'none');
		$('#footer').css('display', 'none');
		oldname = $('#device_new_name').val();   //记录旧名称
		device_new_name.focus();
		device_new_name.select();
	};

	device_button.onmousedown = function(){
		this.parentNode.childNodes[1].style.display = 'block';
		this.setAttribute('src', 'img/button_white.png');
	};
	
	device_button.onmouseup = device_button.onmouseleave = function(){
		this.parentNode.childNodes[1].style.display = 'none';
		this.setAttribute('src', 'img/button_grey.png');
	};
	
		device_list_div.appendChild(device_div);
	}	
}


$('#change_cancel').mouseover(function(){
	this.style.backgroundColor = '#66ccff';
});

$('#change_cancel').mouseleave(function(){
	this.style.backgroundColor = 'transparent';
});

$('#change_go').mouseover(function(){
	this.style.backgroundColor = '#66ccff';
});

$('#change_go').mouseleave(function(){
	this.style.backgroundColor = 'transparent';
});


$('#delete').click(function(){
	$('#device_new_name').val('');
	$('#device_new_name').focus();
});



$('#change_cancel').click(function(){
	$('#change_div').css('display', 'none');
	$('#device_list').css('display', 'block');
	$('#footer').css('display', 'block');
	$('#no_device_problem').css('display', 'block');
	clear();
	set_device();
});

$('#change_go').click(function(){
	var new_name = $('#device_new_name').val();
	document.getElementById(oldname).innerHTML = new_name;
	document.getElementById(oldname).setAttribute('id', new_name);
	device_list[chosen].name = new_name;
	$('#no_device_problem').css('display', 'block');
	$('#footer').css('display', 'block');
	$('#change_div').css('display', 'none');
	device_list_div.style.display = 'block';
	set_device_name(oldname, new_name);
	clear();
	set_device();
});
/*
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(){   //监听
        if (window.orientation === 180 || window.orientation === 0) { 
            alert('竖屏状态！');
        } 
        if (window.orientation === 90 || window.orientation === -90 ){ 
            alert('横屏状态！');
        }  
}, false); 
*/


function set_device_list(arg1, arg2){    //修改远端的名称
	return;
}


set_device();

/*
new_device(1);
new_device(2);
new_device(3);
new_device(4);
new_device(5);
new_device(6);
new_device(7);
*/