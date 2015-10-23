function createEvaluation(i)
{
	var dish_evaluation = document.createElement("div");
	var dish_evaluations = document.getElementById("evaluate_dishes");
	dish_evaluations.appendChild(dish_evaluation);
	dish_evaluation.style.position = "absolute";
	dish_evaluation.style.width = "100%";
	dish_evaluation.style.top = (i - 1)*100 + "px";
	var dish_img = document.createElement("img");
	dish_img.setAttribute("class","dish_img");
	dish_img.src = "img/1.png";
	dish_evaluation.appendChild(dish_img);
	var evaluation_input = document.createElement("input");
	evaluation_input.setAttribute("class","evaluation_input");
	dish_evaluation.appendChild(evaluation_input);
	createStars(i,dish_evaluation);
	createStarsSettings(i);
}

window.onload = function()
{
	$("#evaluate_dishes").css("top",15*height + $("#evaluation_text").height() + 100 +"px");
	createEvaluation(1);
	createEvaluation(2);
	createEvaluation(3);
	$("#check_order").css("font-size",(4 * width).toString() + 'px');
	$("#check_order").css("width",(20 * height).toString() + 'px');
}