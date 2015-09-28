var window_height = document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight;
var window_width = document.all ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth;
var width = window_width / 100;
var height = window_height / 100;

var restaurant_name = "XP咸鱼馆";
var type = 0;    //当前页面显示的菜类型
var chosen = 0;


function set_search(){
	$('#curve').css("top", (8 * height).toString() + 'px');
	$('#search').css("height", (8 * height).toString() + 'px');
	$('#search').css("top", (8 * height).toString() + 'px');
	
	$('#search_input').css("width", (86 * width).toString() + 'px');
	$('#search_input').css("height", (3 * height).toString() + 'px');
	$('#search_input').css("border-radius", $("#search_input").height().toString() + 'px');
	$('#search_input').css("left", (($("#search").width() - $("#search_input").width())/2));
	$('#search_input').css("top", (($("#search").height() - $("#search_input").height())/2));
}


function set_type_list(){
	$('#type_list').css("height", (window_height - $("#header").height() - $("#search").height() - 2));
	$('#type_list').css("top", ($("#header").height() + $("#search").height()));
	$('#type_list').css("width", 23 * width);
	
	for(var i = 0; i < typelist.length; i++){
		var type_div = document.createElement('div');
		var type_name = document.createElement('div');
		var border = document.createElement('div');
		var type_name_id = 'type_name_' + i.toString();
		var type_id = 'type_' + i.toString();
		
		type_div.setAttribute('class', 'type_div');
		type_div.setAttribute('id', type_id);
		type_name.setAttribute('class', 'type_name');
		type_name.setAttribute('id', type_name_id);
		type_name.style.color = '#888888';
		type_div.style.height = (8 * height).toString() + 'px';
		type_name.innerHTML = typelist[i];
		border.style.height = '1px';
		border.style.width = '100%';
		border.style.backgroundColor = '#cdcdcd';
		
		type_div.appendChild(type_name);
		type_list.appendChild(type_div);
		type_list.appendChild(border);
	}
	
	$(".type_name").css("top",($(".type_div").height() - $(".type_name").height())/2);
	$(".type_name").css("left",($(".type_div").width() - $(".type_name").width())/2);
}

function set_sort_index(){
	$("#sort_index").css("width",($("#header").width() - $("#type_list").width() - 2));
	$("#sort_index").css("left", $("#type_list").width() + 2);
	$("#sort_index").css("top", $("#header").height() + $("#search").height());
	$("#sort_index").css("height", 4.5 * height);
	
	$("#sort_by_amount").css("width", $("#sort_index").width() / 3);
	$("#sort_by_price").css("width", $("#sort_index").width() / 3);
	$("#sort_by_evaluation").css("width", $("#sort_index").width() / 3);
	$("#line1").css("left", $("#sort_index").width() / 3);
	$("#line2").css("left", 2 * $("#sort_index").width() / 3);
	
	$("#sort_by_amount").css("height", $("#sort_index").height());
	$("#sort_by_price").css("height", $("#sort_index").height());
	$("#sort_by_evaluation").css("height", $("#sort_index").height());
	$("#line1").css("height", $("#sort_index").height());
	$("#line2").css("height", $("#sort_index").height());
	
	$("#sort_by_amount").css("line-height", $("#sort_index").height().toString() + 'px');
	$("#sort_by_price").css("line-height", $("#sort_index").height().toString() + 'px');
	$("#sort_by_evaluation").css("line-height", $("#sort_index").height().toString() + 'px');
}

function set_type_name(){
	$("#type_name").css("width",($("#header").width() - $("#type_list").width() - 2));
	$("#type_name").css("height", 3.5 * height);
	$("#type_name").css("line-height", $("#type_name").height().toString() + 'px');
	$("#type_name").css("font-size", 0.6 * $("#type_name").height());
	$("#type_name").css("text-indent", 0.4 * $("#type_name").height().toString() + 'px');
	$("#type_name").css("left", $("#type_list").width() + 2);
	$("#type_name").css("top", $("#header").height() + $("#search").height() + $("#sort_index").height());
	$("#type_name").html('' + typelist[type]);
}

function set_footer(){
	$("#ordered").css("width",(60 * width));
	$("#ordered").css("height", 4 * height);	
	$("#ordered").css("line-height", $("#ordered").height().toString() + 'px');
	$("#ordered").css("left", $("#type_list").width() + 2);
	$("#ordered").css("bottom", 0);
	$("#ordered").html("已选(" + chosen + ')');
	
	$("#order_go").css("height", 4 * height);
	$("#order_go").css("line-height", $("#order_go").height().toString() + 'px');
	$("#order_go").css("width",($("#header").width() - $("#type_list").width() - $("#ordered").width() - 2));
	$("#order_go").css("right", 0);
	$("#order_go").css("bottom", 0);
	
}

function set_dish_list(){
	$('#dish_list').css("height", (window_height - $("#header").height() - $("#sort_index").height() - $("#search").height()- $("#ordered").height() - $("#type_name").height()));
	$('#dish_list').css("top", ($("#header").height() + $("#search").height() + $("#sort_index").height() + $("#type_name").height()));
	$('#dish_list').css("left", $("#type_list").width() + 2);
	$('#dish_list').css("width", ($("#header").width() - $("#type_list").width() - 2));
	
	for(var i = 0; i < dishlist.length; i++){
		var dish_div = document.createElement('div');
		var dish_name = document.createElement('div');
		var dish_dollar = document.createElement('div');  //只是为了搞出能对齐的￥符号
		var dish_price = document.createElement('div');
		var dish_number = document.createElement('div');
		var dish_rank = document.createElement('div');
		var border = document.createElement('div');
		var dish_image = document.createElement('img');
		var dish_add = document.createElement('img');
		var dish_minus = document.createElement('img');

		dish_div.setAttribute('class', 'dish_div');
		dish_name.setAttribute('class', 'dish_name');
		dish_price.setAttribute('class', 'dish_price');
		dish_number.setAttribute('class', 'dish_number');
		dish_rank.setAttribute('class', 'dish_rank');
		dish_image.setAttribute('class', 'dish_image');
		border.setAttribute('class', 'line2');
		dish_div.setAttribute('id', dishlist[i].id);
		
		
		dish_div.style.height = (16 * height).toString() + 'px';
		dish_div.style.width =  $("#dish_list").width().toString() + 'px';
		dish_div.style.top = (i * parseInt(dish_div.style.height)).toString() + 'px';
		dish_image.style.height =  (0.6 * parseInt(dish_div.style.height)).toString() + 'px';
		dish_image.style.width = dish_image.style.height;
		dish_image.style.top =  ((parseInt(dish_div.style.height) - parseInt(dish_image.style.height)) / 2).toString() + 'px';
		dish_image.style.left = dish_image.style.top;
		dish_name.style.left = (parseInt(dish_image.style.height) + 2 * parseInt(dish_image.style.left)).toString() + 'px';
		dish_name.style.top = dish_image.style.top;
		dish_price.style.top = dish_image.style.top;
		dish_price.style.right = dish_image.style.top;
		dish_dollar.style.bottom = dish_image.style.top;
		border.style.width = dish_div.style.width;
		border.style.bottom = 0;
		border.style.backgroundColor = '#cdcdcd';
		
		dish_name.innerHTML = dishlist[i].name;
		dish_price.innerHTML = '￥' + dishlist[i].price;
		
		dish_div.appendChild(dish_name);
		dish_div.appendChild(dish_price);
		dish_div.appendChild(dish_number);
		dish_div.appendChild(dish_rank);
		dish_div.appendChild(dish_image);
		dish_div.appendChild(dish_add);
		dish_div.appendChild(dish_minus);
		dish_div.appendChild(border);
		dish_list.appendChild(dish_div);
	}
	$('.dollar').css('right', $('.dish_name').width())
}

set_search();
set_type_list();
set_sort_index();
set_type_name();
set_footer();
set_dish_list();