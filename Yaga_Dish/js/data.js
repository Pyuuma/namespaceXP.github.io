var typelist = new Array;
var dishlist = new Array;

function init_dish(dname, id, rank, price, image){
	var dish = new Object();
	dish.name = dname;
	dish.id = id;
	dish.rank = rank;
	dish.price = price;
	dish.image = image;
	return dish;
}
typelist = ['经典小吃','经典美食','金牌咖喱','意大利面'];

dishlist = [
	init_dish('炸薯条', 233, 5, 15, 2),
	init_dish('炸油条', 666, 4, 6, 3),
	init_dish('爆浆鸡排', 748, 5, 15, 4),
	init_dish('轰炸大鱿鱼', 999, 5, 15, 1),
	init_dish('骨肉相连', 111, 5, 2, 1)
];