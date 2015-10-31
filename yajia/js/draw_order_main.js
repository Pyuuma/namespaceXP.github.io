


var restaurant_name = "XP咸鱼馆";
var chosen_list = new Array;
var chosen = 0;  //总共选菜数
var chosen_type = 0;   //目前选中的菜类型
var dishlist = new Array; 
var typelist = new Array;
var orderlist = new Array;   //目前的点菜单
var commentlist = new Array;
var hotlist = new Array;
var searchlist = new Array;
var border_height = 6;
var now_dish = -1;    //当前正在查看的菜肴

Array.prototype.remove=function(dx) 
{ 
    if(isNaN(dx)|| dx>this.length){return false;} 
    for(var i=0,n=0;i<this.length;i++) 
    { 
        if(this[i]!=this[dx]) 
        { 
            this[n++]=this[i];
        } 
    } 
    this.length -= 1; 
} 

$("#sort_by_amount").click(function(){
	$('#show_line').css('left', "0");
	dishlist.sort(function(a, b){return a.number > b.number? -1:1});
	set_dish_list();
});

$("#sort_by_price").click(function(){
	$('#show_line').css('left', "33.3333%");
	dishlist.sort(function(a, b){return a.price < b.price? -1:1});
	set_dish_list();
});

$("#sort_by_evaluation").click(function(){
	$('#show_line').css('left', "66.6666%");
	dishlist.sort(function(a, b){return a.rank > b.rank? -1:1});
	set_dish_list();
});

function get_dish_list(dishtype){   //传入类型的ID
	dishlist = [];
	$('#dish_list').html("");
	$.getJSON("http://namespaceXP.github.io/yajia/js/dishlist_type.json", function(json){
		for(var i = 0; i < json.dishes.length; i++){
			dishlist[i] = init_dish(json.dishes[i].name, json.dishes[i].id, json.dishes[i].score, json.dishes[i].price, json.dishes[i].img, json.dishes[i].sell);
		}
		dishlist.sort(function(a, b){return a.number > b.number? -1:1});
		set_dish_list();
	})
}

function get_search_list(keynode){   //传入类型的ID
	$('#dish_list').html("");
	searchlist = [];
	$.getJSON("http://namespaceXP.github.io/yajia/js/dishlist_search.json", function(json){
		for(var i = 0; i < json.dishes.length; i++){
			dishlist[i] = init_dish(json.dishes[i].name, json.dishes[i].id, json.dishes[i].score, json.dishes[i].price, json.dishes[i].img, json.dishes[i].sell);
		}
		set_dish_list();
	})
}

$('#back').click(function(){
	$('#dish_view').css('left', '100%');
	$('body').css('overflow-y', 'hidden');
});

$('#search_go').click(function(){
	get_search_list();
});

$('#search_back').click(function(){
	hide_search();
	get_type_list();
	get_dish_list();
	$('#type_name').html(typelist[0].name);
});


$('#add_order_amount').click(function(){
	
	for(i = 0; i < orderlist.length; i++){    //在目前订单中寻找菜
		if(orderlist[i].id == dishlist[now_dish].id){
			break;
		}
	}
	if(i == orderlist.length){
		orderlist[i] = init_order(dishlist[now_dish].name, dishlist[now_dish].id, dishlist[now_dish].rank, dishlist[now_dish].price, 1);
	}
	else{
		orderlist[i].number++;
	}
});

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
	set_show_dish_info(dishid);
	set_show_dish_introduction(dishid);
	set_show_dish_comment(dishid);
	$("#show_dish_comment_div").css("top", (2 * border_height * width).toString() + 'px');
	$("#blank").css("top", ((2 * border_height) * width ).toString() + 'px');
	$("#back").css("height", (4.8 * width).toString() + 'px');
}

function set_show_dish_comment(dishid){
	var star_height = 3;
	var height = 0;
	var comment_div_height = 14;
	var show_dish_comments = document.getElementById("show_dish_comments");
	commentlist = [];
	show_dish_comments.innerHTML = '';
	$.getJSON("http://namespaceXP.github.io/yajia/js/dishcomment_id.json", function(json){
		for(var i = 0; i < json.comment_list.length; i++){
			commentlist[i] = init_comment(json.comment_list[i].User_id, json.comment_list[i].date, json.comment_list[i].score, json.comment_list[i].content);
		}
				
		for(var i = 0; i < commentlist.length; i++){
			var comment_dish_stars = new Array;  //五颗星
			var comment_div = document.createElement("div");
			var comment_id = document.createElement("div");
			var comment_content = document.createElement("div");
			var comment_date = document.createElement("div");
			var comment_rank = document.createElement("div");
			var curve = document.createElement('hr');
			
			curve.size = 1;
			curve.bottom = 0;
			curve.width = '100%';
			curve.style.position = 'absolute';
			curve.style.bottom = '0px';
			comment_div.setAttribute("id", 'comment_' + i.toString());
			comment_div.setAttribute("class", 'comment_div');
			comment_rank.setAttribute("class", 'comment_rank');
			comment_date.setAttribute("class", 'comment_date');
			comment_id.setAttribute("class", 'comment_id');
			comment_content.setAttribute("class", 'comment_content');
			
			comment_id.innerHTML = commentlist[i].id;
			comment_date.innerHTML = commentlist[i].date;
			comment_content.innerHTML = commentlist[i].content;
			
			comment_div.style.height = (14 * width).toString() + 'px';
			$(".comment_rank").css("height", (star_height * width).toString() + 'px');
			
			for(var j = 0; j < 5; j++){  //星级
				comment_dish_stars[j] =  document.createElement('img');
				comment_dish_stars[j].setAttribute('class', 'dish_stars');
				comment_dish_stars[j].style.position = 'relative';
				comment_dish_stars[j].style.height = (star_height * width).toString() + 'px';
				comment_rank.appendChild(comment_dish_stars[j]);
				if(j < commentlist[i].score - 0.75){
					comment_dish_stars[j].src = 'icons/star_yellow.png';
				}
				else if(j > commentlist[i].score - 0.75 && j < commentlist[i].score + 0.25){
					comment_dish_stars[j].src = 'icons/star_half.png';
				}
				else{
					comment_dish_stars[j].src = 'icons/star_grey.png';
				}
			}
			comment_div.appendChild(comment_rank);
			comment_div.appendChild(comment_date);
			comment_div.appendChild(comment_id);
			comment_div.appendChild(comment_content);
			comment_div.appendChild(curve);
			show_dish_comments.appendChild(comment_div);
		}
		$(".comment_rank").css('top', (1 * width).toString() + 'px');
		$(".comment_date").css('top', (1 * width).toString() + '0px');
		$(".comment_date").css('left', (30 * width).toString() + 'px');
		$(".comment_id").css('right', (5 * width).toString() + 'px');
		$(".comment_id").css('top', (1 * width).toString() + 'px');
		$(".comment_content").css('top', (5 * width).toString() + 'px');
		
		
	})
	$("#blank").css("top",(3).toString() + 'px');
}

function set_show_dish_introduction(dishid){
	$("#show_dish_introduction_div").css("top", (border_height * width).toString() + 'px');
	$("#show_dish_introduction_div").css("height", (24 * width).toString() + 'px');
	$("#show_dish_introduction_div").css("height", (24 * width).toString() + 'px');
	$("#blank").css("height", (9 * height).toString() + 'px');
	$(".show_title").css("font-size", (4 * width).toString() + 'px');
}

function set_show_dish_info(dishid){
	var name_font = 5;
	var name_top = 2;
	var sell_top = 3.5;
	var stars_top = 9;
	var price_top = 13;
	
	$("#show_dish_name").html(dishlist[dishid].name);
	$("#show_dish_price").html('￥' + dishlist[dishid].price);
	$("#show_dish_sale_amount").html('月售'+ dishlist[dishid].number + '份');
	$("#show_dish_info").css("height", (23 * width).toString() + 'px');
	$("#show_dish_name").css("font-size", (name_font * width).toString() + 'px');
	$("#show_dish_name").css("height", (name_font * width).toString() + 'px');
	$("#show_dish_name").css("top", (name_top * width).toString() + 'px');
	$("#show_dish_sale_amount").css("top", (sell_top * width).toString() + 'px');
	$("#show_dish_sale_amount").css("left", (25 * width).toString() + 'px');
	
	$("#show_dish_rank0").css("top", (stars_top * width).toString() + 'px');
	
	$("#show_dish_price").css("font-size", (name_font * width).toString() + 'px');
	$("#show_dish_price").css("height", (name_font * width).toString() + 'px');
	$("#show_dish_price").css("bottom", (3 * width).toString() + 'px');
	
	$("#add_order_amount").css("height", 6 * width.toString() + 'px');
	$("#minus_order_amount").css("height", 6 * width.toString() + 'px');
	$("#add_order_amount").css("bottom",(3 * width).toString() + 'px');
	$("#minus_order_amount").css("bottom", (3 * width).toString() + 'px');
	$("#add_order_amount").css("right", 4 * width.toString() + 'px');
	$("#minus_order_amount").css("right", 18 * width.toString() + 'px');
	$("#show_dish_order_amount").css("width",(8 * width).toString() + 'px');
	$("#show_dish_order_amount").css("right", (4 * width + $("#minus_order_amount").height()).toString() + 'px');
	$("#show_dish_order_amount").css("font-size", (name_font * width).toString() + 'px');
	$("#show_dish_order_amount").css("bottom", (3 * width).toString() + 'px');
	
	for(var j = 0; j < 5; j++){  //星级
		var star = document.getElementById('star' + (1 + j));
		if(j < dishlist[dishid].rank - 0.75){
			star.src = 'icons/star_yellow.png';
		}
		else if(j > dishlist[dishid].rank -0.75 && j < dishlist[dishid].rank + 0.25){
			star.src = 'icons/star_half.png';
		}
		else{
			star.src = 'icons/star_grey.png';
		}
	}
}

function set_type_list(){
	$('#show_line').css('left', "0");
	$('#type_list').html('');
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
			var chosen_div = document.getElementById(typelist[chosen_type].id);
			
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
	$('#dish_list').html(""); 
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
		dish_div.index = i;
		
		dish_div.onclick = function(){
			set_dish_view(this.index);
			now_dish = this.index;
			$('#dish_view').css('left', '0px');
			$('body').css('overflow-y', 'scroll');
		}
		
		dish_div.ontouchstart = dish_div.onmouseover = function(){
			this.style.backgroundColor = '#cccccc';
		}
		
		dish_div.ontouchend = dish_div.onmouseleave = function(){
			this.style.backgroundColor = 'transparent';
		}
		
		dish_div.style.height = (16 * height).toString() + 'px';
		dish_div.style.width =  $("#dish_list").width().toString() + 'px';
		//dish_div.style.top = (i * parseInt(dish_div.style.height)).toString() + 'px';
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
		
		for(var k = 0; k < orderlist.length; k++){
			if(orderlist[k].id == dish_div.id){
				break;
			}
		}

		if(k < orderlist.length){
			dish_chosen.innerHTML = orderlist[k].number;
		}
		else{
			dish_chosen.innerHTML = 0;
			dish_minus.style.display = 'none';
			dish_chosen.style.display = 'none';
		}
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
		if(i < dishlist.length - 1){
			dish_div.appendChild(border);
		}
		dish_list.appendChild(dish_div);
	}
}

function set_preview(){
	var blank_height = 10;
	$('#preview_list').css("width", (100 * width).toString() + 'px');
	if(orderlist.length == 0){
		$('#preview_list').html('您的订单空空如也, 快去点菜吧~');
		$('#preview_list').css("height", (blank_height * height).toString() + 'px');
		$('#preview_list').css("line-height", (blank_height * height).toString() + 'px');
		$('#preview_list').css("font-size", (4 * width).toString() + 'px');
		return;
	}
	$('#preview_list').html('');
	$('#preview_list').css("height", ((orderlist.length * 7 + blank_height) * height).toString() + 'px');
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
		dish_div.setAttribute('id', 'preview_' + orderlist[i].id);
		
		
		dish_div.style.height = (7 * height).toString() + 'px';
		dish_div.style.width =  $("#preview_list").width().toString() + 'px';
		//dish_div.style.top = (i * parseInt(dish_div.style.height)).toString() + 'px';

		dish_name.style.fontSize = (0.33 * parseInt(dish_div.style.height)).toString() + 'px';
		dish_name.style.lineHeight = dish_div.style.height;
		dish_name.style.textIndent = dish_name.style.fontSize;
		
		dish_price.style.fontSize = (0.33 * parseInt(dish_div.style.height)).toString() + 'px';
		dish_price.style.lineHeight = dish_div.style.height;
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
		
		dish_div.name = orderlist[i].name;
		dish_div.price  = orderlist[i].price;
		dish_div.rank = orderlist[i].rank;
		dish_div.dishid = orderlist[i].id;
		
		
		dish_add.onclick = function(){
			var this_chosen = parseInt(this.parentNode.childNodes[2].innerHTML);   //本菜被点的量
			this.parentNode.childNodes[2].innerHTML = (this_chosen + 1).toString();
			if(this_chosen == 0){
				for(i = 0; i < orderlist.length; i++){    //在目前订单中寻找菜
					if(orderlist[i].id == this.parentNode.dishid){
						break;
					}
				}
				if(i == orderlist.length){
					orderlist[i] = init_order(this.parentNode.name, this.parentNode.dishid, this.parentNode.rank, this.parentNode.price, 1);
				}
				else{
					orderlist[i].number++;
				}
			}
			else{
				if(0 == orderlist.length){
					orderlist[0] = init_order(this.parentNode.name, this.parentNode.dishid, this.parentNode.rank, this.parentNode.price, 1);
				}
				for(i = 0; i < orderlist.length; i++){    //在目前订单中寻找菜
					if(orderlist[i].id == this.parentNode.dishid){
						break;
					}
				}
				if(i == orderlist.length){
					orderlist[i] = init_order(this.parentNode.name, this.parentNode.dishid, this.parentNode.rank, this.parentNode.price, 1);
				}
				else{
					orderlist[i].number++;
				}
			}
			chosen++;
			$("#ordered").html("已选(" + chosen + ')');
		}
		
		dish_minus.onclick = function(){
			var this_chosen = parseInt(this.parentNode.childNodes[2].innerHTML);   //本菜被点的量
			if(this_chosen > 0){
				this.parentNode.childNodes[2].innerHTML = (this_chosen - 1).toString();
				for(i = 0; i < orderlist.length; i++){    //在目前订单中寻找菜
					if(orderlist[i].id = this.parentNode.dishid){
						break;
					}
				}
				orderlist[i].number--;
			}
			if(this_chosen == 1){
				this.parentNode.style.left = '100%';
				this.parentNode.parentNode.removeChild(this.parentNode);
				
				for(i = 0; i < orderlist.length; i++){    //在目前订单中寻找菜
					if(orderlist[i].id = this.parentNode.dishid){
						break;
					}
				}
				orderlist.remove(i);

				$('#preview_list').css("height", ((orderlist.length * 7 + blank_height) * height).toString() + 'px');
				if(orderlist.length == 0){
					$('#preview_list').html('您的订单空空如也, 快去点菜吧~');
					$('#preview_list').css("height", (blank_height * height).toString() + 'px');
					$('#preview_list').css("line-height", (blank_height * height).toString() + 'px');
					$('#preview_list').css("font-size", (4 * width).toString() + 'px');
				}
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

function hide_preview(){
		$('#preview_list').css("height", '0px');
}

function set_correctable(){
	var blank_height = 16;
	$('#correctable_list').html('');
	if(orderlist.length * 7 + blank_height < 80){
		$('#correctable_list').css("height", ((orderlist.length * 7 + blank_height) * height).toString() + 'px');
	}
	else{
		$('#correctable_list').css("height", (80* height).toString() + 'px');
	}
	$('#correctable_list').css("width", ($("#header").width() - $("#type_list").width() - 2));
	
	$('#correctable_list').css("bottom", (100 * height - $('#correctable_list').height()) / 2);
	$('#correctable_list').css("left", (100 * width - $('#correctable_list').width()) / 2);
	
	$('#continue_order').css("left", $('#correctable_list').css("left"));
	$('#continue_order').css("line-height", $('#continue_order').css("height"));
	$('#continue_order').css("font-size", 2.6 * height);
	$('#continue_order').css("bottom", $('#correctable_list').css("bottom"));
	
	$('#order_now').css("right", $('#correctable_list').css("left"));
	$('#order_now').css("line-height", $('#continue_order').css("height"));
	$('#order_now').css("font-size", 2.6 * height);
	$('#order_now').css("bottom", $('#correctable_list').css("bottom"));
	
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
		dish_div.setAttribute('id', "correctable" + dishlist[i].id);
		
		
		dish_div.style.height = (7 * height).toString() + 'px';
		dish_div.style.width =  $("#dish_list").width().toString() + 'px';
		//dish_div.style.top = (i * parseInt(dish_div.style.height)).toString() + 'px';

		dish_name.style.fontSize = (0.33 * parseInt(dish_div.style.height)).toString() + 'px';
		dish_name.style.lineHeight = dish_name.style.height = dish_div.style.height;
		dish_name.style.textIndent = dish_name.style.fontSize;
		
		dish_price.style.fontSize = (0.33 * parseInt(dish_div.style.height)).toString() + 'px';
		dish_price.style.lineHeight = dish_price.style.height = dish_div.style.height;
		dish_price.style.left = (35 * width).toString() + 'px';
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
		dish_div.dishid = orderlist[i].id;
		
		dish_add.onclick = function(){
			var this_chosen = parseInt(this.parentNode.childNodes[2].innerHTML);   //本菜被点的量
			this.parentNode.childNodes[2].innerHTML = (this_chosen + 1).toString();
			if(this_chosen == 0){
				for(i = 0; i < orderlist.length; i++){    //在目前订单中寻找菜
					if(orderlist[i].id == this.parentNode.dishid){
						break;
					}
				}
				if(i == orderlist.length){
					orderlist[i] = init_order(this.parentNode.name, this.parentNode.dishid, this.parentNode.rank, this.parentNode.price, 1);
				}
				else{
					orderlist[i].number++;
				}
			}
			else{
				if(0 == orderlist.length){
					orderlist[0] = init_order(this.parentNode.name, this.parentNode.dishid, this.parentNode.rank, this.parentNode.price, 1);
				}
				for(i = 0; i < orderlist.length; i++){    //在目前订单中寻找菜
					if(orderlist[i].id == this.parentNode.dishid){
						break;
					}
				}
				if(i == orderlist.length){
					orderlist[i] = init_order(this.parentNode.name, this.parentNode.dishid, this.parentNode.rank, this.parentNode.price, 1);
				}
				else{
					orderlist[i].number++;
				}
			}
			chosen++;
			$("#ordered").html("已选(" + chosen + ')');
		}
		
		dish_minus.onclick = function(){
			var this_chosen = parseInt(this.parentNode.childNodes[2].innerHTML);   //本菜被点的量
			if(this_chosen > 0){
				this.parentNode.childNodes[2].innerHTML = (this_chosen - 1).toString();
				for(i = 0; i < orderlist.length; i++){    //在目前订单中寻找菜
					if(orderlist[i].id = this.parentNode.dishid){
						break;
					}
				}
				orderlist[i].number--;
			}
			if(this_chosen == 1){
				this.parentNode.style.left = '100%';
				this.parentNode.parentNode.removeChild(this.parentNode);
				
				for(i = 0; i < orderlist.length; i++){    //在目前订单中寻找菜
					if(orderlist[i].id = this.parentNode.dishid){
						break;
					}
				}
				orderlist.remove(i);
				$('#correctable_list').css("height", ((orderlist.length * 7 + blank_height) * height).toString() + 'px');
				if(orderlist.length == 0){
					$('#cover').css('display', 'none');
					$('#order_ready').css('display', 'none');
					set_dish_list();
				}
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

function show_search(){
	get_hot_search();
	$('#search_view').css('z-index', 5);
	$('#search_view').css('left', '0px');
}

function hide_search(){
	$('#search_view').css('z-index', 4);
	$('#search_view').css('left', '100%');
}

function set_search(){
	$('#search_go').css('line-height', $('#search_go').height() + 'px');
	$('#search_go').css('font-size', (0.5 * $('#search_go').height()) + 'px');
}

function get_hot_search(){
	$('#hot_search_list').html("");
	hotlist = [];
	$.getJSON("http://namespaceXP.github.io/yajia/js/hot_search.json", function(json){
		for(var i = 0; i < json.keywords.length; i++){
			hotlist[i] = keywords[i].name;
		}
		set_hot_search_list();
	})
}

function set_hot_search_list(){
	var hot_search_list = document.getElementById("hot_search_list");
	for(var i = 0; i < hotlist.length; i++){
		var search_div = document.createElement('div');
		search_div.innerHTML = hotlist[i];
		hot_search_list.appendChild(search_div);
	}
};

$('#search_button').click(function(){
	show_search();
});


$('#ordered').click(function(){
	if($('#cover').css('display') == 'none'){
		$('#cover').css('display', 'block');
		set_preview();
	}
	else{
		$('#cover').css('display', 'none');
		hide_preview();
		set_dish_list();
	}
});

$('#order_go').click(function(){
	if($('#cover').css('display') == 'none'){
		if(orderlist.length > 0){
			$('#cover').css('display', 'block');
			$('#order_go').css('z-index', 2);
			$('#ordered').css('z-index', 2);
			$('#order_ready').css('display', 'block');
			set_correctable();
		}
		else{
			alert("您还没有点餐呢~");
		}
	}
	else{
		$('#cover').css('display', 'none');
		$('#order_ready').css('display', 'none');
		set_dish_list();
	}
});

$('#cover').click(function(){
	this.style.display = 'none';
	hide_preview();
	$('#order_ready').css('display', 'none');
	set_dish_list();
	$('#order_go').css('z-index', 5);
	$('#ordered').css('z-index', 5);
});

$('#continue_order').click(function(){
	$('#cover').css('display', 'none');
	$('#order_ready').css('display', 'none');
	set_dish_list();
});

$('#order_now').click(function(){
	alert("请编写支付界面代码");
});



