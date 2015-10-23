


var restaurant_name = "XP咸鱼馆";
var chosen_list = new Array;
var chosen = 0;  //总共选菜数
var chosen_type = 0;   //目前选中的菜类型
var dishlist = new Array; 
var typelist = new Array;
var orderlist = new Array;   //目前的点菜单
var commentlist = new Array;

Array.prototype.remove=function(dx) 
{ 
    if(isNaN(dx)||dx>this.length){return false;} 
    for(var i=0,n=0;i<this.length;i++) 
    { 
        if(this[i]!=this[dx]) 
        { 
            this[n++]=this[i];
        } 
    } 
    this.length -= 1; 
} 

function get_dish_list(dishtype){   //传入类型的ID
	$('#dish_list').html("");
	$.getJSON("http://namespaceXP.github.io/yajia/js/dishlist_type.json", function(json){
		for(var i = 0; i < json.dishes.length; i++){
			dishlist[i] = init_dish(json.dishes[i].name, json.dishes[i].id, json.dishes[i].score, json.dishes[i].price, json.dishes[i].img, json.dishes[i].sell);
		}
		set_dish_list();
	})
}


function get_type_list(){
	$.getJSON("http://namespaceXP.github.io/yajia/js/dishtypes.json", function(json){
		for(var i = 0; i < json.types.length; i++){
			typelist[i] = init_type(json.types[i].name, json.types[i].id);
		}
		set_type_list();
		set_type_name();
	})
}

function set_dish_view(dishid){   //根据菜的ID显示详细信息
	var border_height = 6;
	set_show_dish_info();
	
	$("#show_dish_introduction_div").css("top", (border_height * width + $("#show_dish_picture").height() + $("#show_dish_info").height()).toString() + 'px');
	$("#show_dish_introduction_div").css("height", (19 * width).toString() + 'px');
	
	$("#show_dish_comment_div").css("top", (2 * border_height * width + $("#show_dish_picture").height() + $("#show_dish_info").height() + $("#show_dish_introduction_div").height()).toString() + 'px');
		
}

function set_show_dish_comment(){
	commentlist = [];
	$.getJSON("http://namespaceXP.github.io/yajia/js/dishcomment_id.json", function(json){
		for(var i = 0; i < json.comment_list.length; i++){
			commentlist[i] = init_comment(json.comment_list[i].User_id, json.comment_list[i].date, json.comment_list[i].score, json.comment_list[i].content);
		}
	})
}

function set_show_dish_info(){
	var name_font = 5;
	var name_top = 2;
	var stars_top = 9;
	var price_top = 13;
 	$("#show_dish_info").css("top", $("#show_dish_picture").height().toString() + 'px');
	$("#show_dish_info").css("height", (19 * width).toString() + 'px');
	$("#show_dish_name").css("font-size", (name_font * width).toString() + 'px');
	$("#show_dish_name").css("height", (name_font * width).toString() + 'px');
	$("#show_dish_name").css("top", (name_top * width).toString() + 'px');
	
	$("#show_dish_rank0").css("top", (stars_top * width).toString() + 'px');
	
	$("#show_dish_price").css("font-size", (name_font * width).toString() + 'px');
	$("#show_dish_price").css("height", (name_font * width).toString() + 'px');
	$("#show_dish_price").css("bottom", (1 * width).toString() + 'px');
	
	$("#add_order_amount").css("height", 6 * width.toString() + 'px');
	$("#minus_order_amount").css("height", 6 * width.toString() + 'px');
	$("#add_order_amount").css("bottom",'0px');
	$("#minus_order_amount").css("bottom",'0px');
	$("#add_order_amount").css("right", 4 * width.toString() + 'px');
	$("#minus_order_amount").css("right", 18 * width.toString() + 'px');
	$("#show_dish_order_amount").css("width",(8 * width).toString() + 'px');
	$("#show_dish_order_amount").css("right", (4 * width + $("#minus_order_amount").height()).toString() + 'px');
	$("#show_dish_order_amount").css("font-size", (name_font * width).toString() + 'px');
}

function set_type_list(){
	for(var i = 0; i < typelist.length; i++){
		var type_div = document.createElement('div');
		var type_name = document.createElement('div');
		var border = document.createElement('div');		
		type_div.setAttribute('class', 'type_div');
		type_div.setAttribute('id', typelist[i].id);
		type_name.setAttribute('class', 'type_name');
		type_name.style.color = '#888888';
		type_div.style.height = (8 * height).toString() + 'px';
		type_name.innerHTML = typelist[i].name;
		border.style.height = '1px';
		border.style.width = '100%';
		border.style.backgroundColor = '#cdcdcd';
		if(i == chosen_type){
			type_div.style.backgroundColor = "#ffffff";
		}
		
		type_div.onclick = function(){   //切换菜类型
			var chosen_div = document.getElementById(dishlist[chosen_type].id);
			
			chosen_div.style.backgroundColor = "#eeeeee";
			for(i = 0; i < typelist.length; i++){
				if(typelist[i].id == this.id){
					chosen_type = i;
					break;
				}
			}
			this.style.backgroundColor = "#ffffff";
			set_type_name();
			get_dish_list();
		}
		
		type_div.appendChild(type_name);
		type_list.appendChild(type_div);
		type_list.appendChild(border);
	}
	
	$(".type_name").css("top",($(".type_div").height() - $(".type_name").height())/2);
	$(".type_name").css("left",($(".type_div").width() - $(".type_name").width())/2);
}

function set_sort_index(){
	$("#sort_index").css("width",($("#header").width() - $("#type_list").width()));
	$("#sort_index").css("left", $("#type_list").width());
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
	$("#type_name").css("line-height", $("#type_name").height().toString() + 'px');
	$("#type_name").css("font-size", 0.6 * $("#type_name").height());
	$("#type_name").css("text-indent", 0.4 * $("#type_name").height().toString() + 'px');
	$("#type_name").html('' + typelist[chosen_type].name);
}

function set_footer(){
	$("#ordered").css("line-height", $("#ordered").height().toString() + 'px');
	$("#ordered").html("已选(" + chosen + ')');
	$("#ordered").css("text-indent", 2 * height.toString() + 'px');
	$("#order_go").css("line-height", $("#order_go").height().toString() + 'px');
}

function set_dish_list_style(){
	$('#dish_list').css("height", (window_height - $("#header").height() - $("#sort_index").height() - $("#search").height()- $("#ordered").height() - $("#type_name").height()));
	$('#dish_list').css("top", ($("#header").height() + $("#search").height() + $("#sort_index").height() + $("#type_name").height() - 3));
	$('#dish_list').css("left", $("#type_list").width());
	$('#dish_list').css("width", ($("#header").width() - $("#type_list").width()));
}

function set_dish_list(){   
	set_dish_list_style();

	for(var i = 0; i < dishlist.length; i++){
		chosen_list[i] = 0;
		var dish_stars = new Array;  //五颗星
		var dish_div = document.createElement('div');
		var dish_name = document.createElement('div');
		var dish_chosen = document.createElement('div');   //点了几盘
		var dish_price = document.createElement('div');
		var dish_number = document.createElement('div');
		var dish_rank = document.createElement('div');
		var border = document.createElement('div');
		var dish_image = document.createElement('img');
		var dish_add = document.createElement('img');
		var dish_minus = document.createElement('img');

		dish_div.setAttribute('class', 'dish_div');
		dish_chosen.setAttribute('class', 'dish_chosen');
		dish_add.setAttribute('class', 'dish_button');
		dish_minus.setAttribute('class', 'dish_button');
		dish_name.setAttribute('class', 'dish_name');
		dish_price.setAttribute('class', 'dish_price');
		dish_number.setAttribute('class', 'dish_number');
		dish_rank.setAttribute('class', 'dish_rank');
		dish_image.setAttribute('class', 'dish_image');
		border.setAttribute('class', 'line2');
		dish_div.setAttribute('id', dishlist[i].id);
		
		dish_div.onclick = function(){
		
		}
		
		dish_div.ontouchstart = dish_div.onmouseover = function(){
			this.style.backgroundColor = '#cccccc';
		}
		
		dish_div.ontouchend = dish_div.onmouseleave = function(){
			this.style.backgroundColor = 'transparent';
		}
		
		dish_div.style.height = (16 * height).toString() + 'px';
		dish_div.style.width =  $("#dish_list").width().toString() + 'px';
		dish_div.style.top = (i * parseInt(dish_div.style.height)).toString() + 'px';
		dish_image.style.height =  (0.55 * parseInt(dish_div.style.height)).toString() + 'px';
		dish_image.style.width = dish_image.style.height;
		dish_image.src = "img/small_img/" + dishlist[i].img;
		dish_image.style.top =  ((parseInt(dish_div.style.height) - parseInt(dish_image.style.height)) / 2).toString() + 'px';
		dish_image.style.left = dish_image.style.top;
		dish_name.style.left = (parseInt(dish_image.style.height) + 2 * parseInt(dish_image.style.left)).toString() + 'px';
		dish_name.style.top = dish_image.style.top;
		dish_price.style.top = dish_image.style.top;
		dish_price.style.right = dish_image.style.top;
		dish_rank.style.left = dish_name.style.left;
		dish_rank.style.top = (7.5 * height).toString() + 'px';
		dish_rank.style.height = (2.2 * height).toString() + 'px';
		dish_rank.style.width = (5 * parseInt(dish_rank.style.height) + 5).toString() + 'px';
		dish_number.style.left = dish_name.style.left;
		dish_number.style.bottom = dish_image.style.top;
		border.style.width = dish_div.style.width;
		border.style.bottom = 0;
		border.style.backgroundColor = '#cdcdcd';
		dish_add.src = 'icons/add_order_amount.png';
		dish_minus.src = 'icons/minus_order_amount.png';
		dish_add.style.bottom = (2 * height).toString() + 'px';
		dish_minus.style.bottom = dish_add.style.bottom;
		dish_add.style.height = (3.2 * height).toString() + 'px';
		dish_minus.style.height = dish_add.style.height;
		dish_minus.style.display = 'none';
		dish_chosen.style.display = 'none';
		dish_add.style.right = dish_price.style.right;
		dish_minus.style.right = (parseInt(dish_price.style.right) + 2.5 * parseInt(dish_add.style.height)).toString() + 'px';
		dish_chosen.style.width =(parseInt(dish_minus.style.right) - parseInt(dish_add.style.right) - parseInt(dish_add.style.height)).toString() + 'px';
		dish_chosen.style.right = (parseInt(dish_price.style.right) + parseInt(dish_add.style.height)).toString() + 'px';
		dish_chosen.style.height = dish_add.style.height;
		dish_chosen.style.fontSize = 0.8 * parseInt(dish_add.style.height) + 'px';
		dish_chosen.style.lineHeight = dish_chosen.style.height;
		dish_chosen.style.bottom = dish_add.style.bottom;
		
		dish_div.name = dishlist[i].name;
		dish_div.price  = dishlist[i].price;
		dish_div.rank = dishlist[i].rank;
		
		
		dish_name.innerHTML = dish_div.name;
		dish_price.innerHTML = '￥' + dishlist[i].price;
		dish_chosen.innerHTML = 0;
		dish_number.innerHTML = '月售' + dishlist[i].number + '份';
		
		
		
		for(var j = 0; j < 5; j++){  //星级
			dish_stars[j] =  document.createElement('img');
			dish_stars[j].setAttribute('class', 'dish_stars');
			dish_stars[j].style.position = 'relative';
			dish_stars[j].style.height = dish_rank.style.height;
			dish_rank.appendChild(dish_stars[j]);
			if(j < dishlist[i].rank - 0.75){
				dish_stars[j].src = 'icons/star_yellow.png';
			}
			else if(j > dishlist[i].rank -0.75 && j < dishlist[i].rank + 0.25){
				dish_stars[j].src = 'icons/star_half.png';
			}
			else{
				dish_stars[j].src = 'icons/star_grey.png';
			}
		}
		
		
		dish_add.onclick = function(e){
			var i;
			e.stopPropagation();
			var this_chosen = parseInt(this.parentNode.childNodes[3].innerHTML);   //本菜被点的量
			this.parentNode.childNodes[3].innerHTML = (this_chosen + 1).toString();
			if(this_chosen == 0){
				this.parentNode.childNodes[3].style.display = 'block';
				this.parentNode.childNodes[7].style.display = 'block';
				for(i = 0; i < orderlist.length; i++){    //在目前订单中寻找菜
					if(orderlist[i].id == this.parentNode.id){
						break;
					}
				}
				if(i == orderlist.length){
					orderlist[i] = init_order(this.parentNode.name, this.parentNode.id, this.parentNode.rank, this.parentNode.price, 1);
				}
				else{
					orderlist[i].number++;
				}
			}
			else{
				if(0 == orderlist.length){
					orderlist[0] = init_order(this.parentNode.name, this.parentNode.id, this.parentNode.rank, this.parentNode.price, 1);
				}
				for(i = 0; i < orderlist.length; i++){    //在目前订单中寻找菜
					if(orderlist[i].id == this.parentNode.id){
						break;
					}
				}
				if(i == orderlist.length){
					orderlist[i] = init_order(this.parentNode.name, this.parentNode.id, this.parentNode.rank, this.parentNode.price, 1);
				}
				else{
					orderlist[i].number++;
				}
			}
			chosen++;
			$("#ordered").html("已选(" + chosen + ')');
		}
		
		dish_minus.onclick = function(e){
			e.stopPropagation();
			var this_chosen = parseInt(this.parentNode.childNodes[3].innerHTML);   //本菜被点的量
			if(this_chosen > 0){
				this.parentNode.childNodes[3].innerHTML = (this_chosen - 1).toString();
				for(i = 0; i < orderlist.length; i++){    //在目前订单中寻找菜
					if(orderlist[i].id = this.parentNode.id){
						break;
					}
				}
				orderlist[i].number--;
			}
			if(this_chosen == 1){
				this.parentNode.childNodes[3].style.display = 'none';
				this.parentNode.childNodes[7].style.display = 'none';
				
				for(i = 0; i < orderlist.length; i++){    //在目前订单中寻找菜
					if(orderlist[i].id = this.parentNode.id){
						break;
					}
				}
				orderlist.remove(i);
			}
			chosen--;
			$("#ordered").html("已选(" + chosen + ')');
		}
		
		dish_div.appendChild(dish_name);
		dish_div.appendChild(dish_price);
		dish_div.appendChild(dish_number);
		dish_div.appendChild(dish_chosen);
		dish_div.appendChild(dish_rank);
		dish_div.appendChild(dish_image);
		dish_div.appendChild(dish_add);
		dish_div.appendChild(dish_minus);
		dish_div.appendChild(border);
		dish_list.appendChild(dish_div);
	}
}

function set_preview(){
	$('#preview_list').html('');
	$('#preview_list').css("height", (window_height - $("#header").height() - $("#sort_index").height() - $("#search").height()- $("#ordered").height() - $("#type_name").height()));
	$('#preview_list').css("top", ($("#header").height() + $("#search").height() + $("#sort_index").height() + $("#type_name").height()));
	$('#preview_list').css("left", $("#type_list").width() + 2);
	$('#preview_list').css("width", ($("#header").width() - $("#type_list").width() - 2));
	for(var i = 0; i < orderlist.length; i++){
		chosen_list[i] = 0;
		var dish_div = document.createElement('div');
		var dish_name = document.createElement('div');
		var dish_chosen = document.createElement('div');   //点了几盘
		var dish_price = document.createElement('div');
		var border = document.createElement('div');
		var dish_add = document.createElement('img');
		var dish_minus = document.createElement('img');

		dish_div.setAttribute('class', 'dish_div');
		dish_chosen.setAttribute('class', 'dish_chosen');
		dish_add.setAttribute('class', 'dish_button');
		dish_minus.setAttribute('class', 'dish_button');
		dish_name.setAttribute('class', 'dish_name');
		dish_price.setAttribute('class', 'dish_price');
		border.setAttribute('class', 'line2');
		dish_div.setAttribute('id', dishlist[i].id);
		
		
		dish_div.style.height = (7 * height).toString() + 'px';
		dish_div.style.width =  $("#dish_list").width().toString() + 'px';
		dish_div.style.top = (i * parseInt(dish_div.style.height)).toString() + 'px';

		dish_name.style.fontSize = (0.33 * parseInt(dish_div.style.height)).toString() + 'px';
		dish_name.style.top = dish_name.style.fontSize;
		dish_name.style.textIndent = dish_name.style.fontSize;
		
		dish_price.style.fontSize = (0.33 * parseInt(dish_div.style.height)).toString() + 'px';
		dish_price.style.top = dish_name.style.fontSize;
		dish_price.style.left = (45 * width).toString() + 'px';
		border.style.width = dish_div.style.width;
		border.style.bottom = 0;
		border.style.backgroundColor = '#cdcdcd';
		border.style.width = '95%';
		border.style.left = '2.5%';
		
		dish_add.src = 'icons/add_order_amount.png';
		dish_minus.src = 'icons/minus_order_amount.png';
		dish_add.style.bottom = (2 * height).toString() + 'px';
		dish_minus.style.bottom = dish_add.style.bottom;
		dish_add.style.height = (3.2 * height).toString() + 'px';
		dish_minus.style.height = dish_add.style.height;
		dish_add.style.right = dish_minus.style.bottom;
		dish_minus.style.right = (parseInt(dish_add.style.right) + 2.5 * parseInt(dish_add.style.height)).toString() + 'px';
		dish_chosen.style.width =(parseInt(dish_minus.style.right) - parseInt(dish_add.style.right) - parseInt(dish_add.style.height)).toString() + 'px';
		dish_chosen.style.right = (parseInt(dish_add.style.right) + parseInt(dish_add.style.height)).toString() + 'px';
		dish_chosen.style.height = dish_add.style.height;
		dish_chosen.style.fontSize = 0.8 * parseInt(dish_add.style.height) + 'px';
		dish_chosen.style.lineHeight = dish_chosen.style.height;
		dish_chosen.style.bottom = dish_add.style.bottom;
		
		dish_name.innerHTML = orderlist[i].name;
		dish_price.innerHTML = '￥' + orderlist[i].price;
		dish_chosen.innerHTML = orderlist[i].number;
		
		
		dish_add.onclick = function(){
			var this_chosen = parseInt(this.parentNode.childNodes[3].innerHTML);   //本菜被点的量
			this.parentNode.childNodes[3].innerHTML = (this_chosen + 1).toString();
			if(this_chosen == 0){
				this.parentNode.childNodes[3].style.display = 'block';
				this.parentNode.childNodes[7].style.display = 'block';
			}
			chosen++;
			$("#ordered").html("已选(" + chosen + ')');
		}
		
		dish_minus.onclick = function(){
			var this_chosen = parseInt(this.parentNode.childNodes[3].innerHTML);   //本菜被点的量
			if(this_chosen > 0){
				this.parentNode.childNodes[3].innerHTML = (this_chosen - 1).toString();
			}
			if(this_chosen == 1){
				this.parentNode.childNodes[3].style.display = 'none';
				this.parentNode.childNodes[7].style.display = 'none';
			}
			chosen--;
			$("#ordered").html("已选(" + chosen + ')');
		}		
		dish_div.appendChild(dish_name);
		dish_div.appendChild(dish_price);
		dish_div.appendChild(dish_chosen);
		dish_div.appendChild(dish_add);
		dish_div.appendChild(dish_minus);
		dish_div.appendChild(border);
		preview_list.appendChild(dish_div);
	
	}
};

function set_correctable(){
	$('#correctable_list').html('');
	$('#correctable_list').css("height", (window_height - $("#header").height() - $("#sort_index").height() - $("#search").height()- $("#ordered").height() - $("#type_name").height()));
	$('#correctable_list').css("width", ($("#header").width() - $("#type_list").width() - 2));
	
	$('#correctable_list').css("top", (100 * height - $('#correctable_list').height()) / 2);
	$('#correctable_list').css("left", (100 * width - $('#correctable_list').width()) / 2);
	for(var i = 0; i < dishlist.length; i++){
		chosen_list[i] = 0;
		var dish_div = document.createElement('div');
		var dish_name = document.createElement('div');
		var dish_chosen = document.createElement('div');   //点了几盘
		var dish_price = document.createElement('div');
		var border = document.createElement('div');
		var dish_add = document.createElement('img');
		var dish_minus = document.createElement('img');

		dish_div.setAttribute('class', 'dish_div');
		dish_chosen.setAttribute('class', 'dish_chosen');
		dish_add.setAttribute('class', 'dish_button');
		dish_minus.setAttribute('class', 'dish_button');
		dish_name.setAttribute('class', 'dish_name');
		dish_price.setAttribute('class', 'dish_price');
		border.setAttribute('class', 'line2');
		dish_div.setAttribute('id', dishlist[i].id);
		
		
		dish_div.style.height = (7 * height).toString() + 'px';
		dish_div.style.width =  $("#dish_list").width().toString() + 'px';
		dish_div.style.top = (i * parseInt(dish_div.style.height)).toString() + 'px';

		dish_name.style.fontSize = (0.33 * parseInt(dish_div.style.height)).toString() + 'px';
		dish_name.style.top = dish_name.style.fontSize;
		dish_name.style.textIndent = dish_name.style.fontSize;
		
		dish_price.style.fontSize = (0.33 * parseInt(dish_div.style.height)).toString() + 'px';
		dish_price.style.top = dish_name.style.fontSize;
		dish_price.style.left = (45 * width).toString() + 'px';
		border.style.width = dish_div.style.width;
		border.style.bottom = 0;
		border.style.backgroundColor = '#cdcdcd';
		border.style.width = '95%';
		border.style.left = '2.5%';
		
		dish_add.src = 'icons/add_order_amount.png';
		dish_minus.src = 'icons/minus_order_amount.png';
		dish_add.style.bottom = (2 * height).toString() + 'px';
		dish_minus.style.bottom = dish_add.style.bottom;
		dish_add.style.height = (3.2 * height).toString() + 'px';
		dish_minus.style.height = dish_add.style.height;
		dish_add.style.right = dish_minus.style.bottom;
		dish_minus.style.right = (parseInt(dish_add.style.right) + 2.5 * parseInt(dish_add.style.height)).toString() + 'px';
		dish_chosen.style.width =(parseInt(dish_minus.style.right) - parseInt(dish_add.style.right) - parseInt(dish_add.style.height)).toString() + 'px';
		dish_chosen.style.right = (parseInt(dish_add.style.right) + parseInt(dish_add.style.height)).toString() + 'px';
		dish_chosen.style.height = dish_add.style.height;
		dish_chosen.style.fontSize = 0.8 * parseInt(dish_add.style.height) + 'px';
		dish_chosen.style.lineHeight = dish_chosen.style.height;
		dish_chosen.style.bottom = dish_add.style.bottom;
		
		dish_name.innerHTML = dishlist[i].name;
		dish_price.innerHTML = '￥' + dishlist[i].price;
		dish_chosen.innerHTML = 0;
		
		dish_div.onclick = function(){
			alert(1);
		}
		
		dish_add.onclick = function(){
			var this_chosen = parseInt(this.parentNode.childNodes[3].innerHTML);   //本菜被点的量
			this.parentNode.childNodes[3].innerHTML = (this_chosen + 1).toString();
			if(this_chosen == 0){
				this.parentNode.childNodes[3].style.display = 'block';
				this.parentNode.childNodes[7].style.display = 'block';
			}
			chosen++;
			$("#ordered").html("已选(" + chosen + ')');
		}
		
		dish_minus.onclick = function(){
			var this_chosen = parseInt(this.parentNode.childNodes[3].innerHTML);   //本菜被点的量
			if(this_chosen > 0){
				this.parentNode.childNodes[3].innerHTML = (this_chosen - 1).toString();
			}
			if(this_chosen == 1){
				this.parentNode.childNodes[3].style.display = 'none';
				this.parentNode.childNodes[7].style.display = 'none';
			}
			chosen--;
			$("#ordered").html("已选(" + chosen + ')');
		}
		
		dish_div.appendChild(dish_name);
		dish_div.appendChild(dish_price);
		dish_div.appendChild(dish_chosen);
		dish_div.appendChild(dish_add);
		dish_div.appendChild(dish_minus);
		dish_div.appendChild(border);
		correctable_list.appendChild(dish_div);
	}
}

$('#ordered').click(function(){
	if($('#cover').css('display') == 'none'){
		$('#cover').css('display', 'block');
		set_preview();
		$('#preview_list').css('display', 'block');
	}
	else{
		$('#cover').css('display', 'none');
		$('#preview_list').css('display', 'none');
	}
});

$('#order_go').click(function(){
	if($('#cover').css('display') == 'none'){
		$('#cover').css('display', 'block');
		$('#order_go').css('z-index', 2);
		$('#ordered').css('z-index', 2);
		set_correctable();
		$('#correctable_list').css('display', 'block');
	}
	else{
		$('#cover').css('display', 'none');
		$('#correctable_list').css('display', 'none');
	}
});


$('#cover').click(function(){
	this.style.display = 'none';
	$('#preview_list').css('display', 'none');
	$('#correctable_list').css('display', 'none');
	$('#order_go').css('z-index', 5);
	$('#ordered').css('z-index', 5);
});



