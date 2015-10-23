

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

function init_type(dname, id){
	var type = new Object();
	type.name = dname;
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

