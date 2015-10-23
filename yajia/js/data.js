

var orderlist = new Array;

function init_dish(dname, id, rank, price, image, number){
	var dish = new Object();
	dish.name = dname;
	dish.id = id;
	dish.rank = rank;
	dish.price = price;
	dish.image = image;
	dish.number = number;
	return dish;
}

function init_type(name, id){
	var type = new Object();
	type.name = name;
	type.id = id;
	return type;
}


function init_order(dname, id, rank, price, image, number){
	var dish = new Object();
	dish.name = dname;
	dish.id = id;
	dish.price = price;
	dish.number = number;
	return dish;
}



dishlist = [
	init_dish('炸薯条', 233, 3.5, 15, 2,35),
	init_dish('炸油条', 666, 4, 6, 3,34),
	init_dish('爆浆鸡排', 748, 5, 15, 4,92),
	init_dish('轰炸大鱿鱼', 999, 5, 15, 1,233),
	init_dish('骨肉相连', 111, 5, 2, 1, 0)
];