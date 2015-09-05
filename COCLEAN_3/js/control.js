var device_list = document.getElementById("device_list");
var oldname;


function new_device(n){   //在页面上增加一个新的设备
	var left = document.createElement('div');
	var right = document.createElement('div');
	var device_div = document.createElement('div');
	var device_img = document.createElement('img');
	var device_name = document.createElement('div');
	var line = document.createElement('div');
	var device_indicator = document.createElement('div');
	var device_button = document.createElement('div');
	var change_img = document.createElement('img');
	var border = document.createElement('hr');
	//创建元素
	
	device_div.setAttribute('id', n);
	device_name.innerHTML = '个人健康呼吸系统(' + n.toString() + ')';
	device_name.setAttribute('id', device_name.innerHTML);
	device_button.setAttribute('class', 'button');
	line.setAttribute('class', 'line');
	device_name.setAttribute('class', 'name');
	device_img.setAttribute('class', 'img');
	device_div.setAttribute('class', 'devicediv');
	device_indicator.setAttribute('class', 'indicator');
	change_img.setAttribute('class', 'change_img');
	change_img.setAttribute('src', 'img/pencil.png');
	border.setAttribute('class', 'cut_line');
	border.setAttribute('size', 1);
	border.setAttribute('color', '#666666');
	
	device_div.appendChild(device_img);
	device_div.appendChild(device_name);
	device_div.appendChild(device_button);
	device_div.appendChild(line);
	device_div.appendChild(device_indicator);
	device_button.appendChild(change_img);
		
	
	device_div.appendChild(border);
	device_button.onclick = function(){
		var device_new_name = document.getElementById('device_new_name');
		$('#device_new_name').val(this.parentNode.childNodes[1].innerHTML);
		$('#change_div').css('display', 'block');
		$('#no_device_problem').css('display', 'none');
		$('#device_list').css('display', 'none');
		oldname = $('#device_new_name').val();   //记录旧名称
		device_new_name.focus();
		device_new_name.select();
	};
	device_list.appendChild(device_div);

}

function get_device_list(){
	
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
	$('#no_device_problem').css('display', 'block');
});

$('#change_go').click(function(){
	var new_name = $('#device_new_name').val();
	document.getElementById(oldname).innerHTML = new_name;
	document.getElementById(oldname).setAttribute('id', new_name);
	$('#no_device_problem').css('display', 'block');
	$('#change_div').css('display', 'none');
	$('#device_list').css('display', 'block');
});



new_device(1);
new_device(2);
new_device(3);