var map = [];
var temp_map = [];
var row;

function check_valid_input(pr, row, timer){
	if(isNaN(pr)|| pr >=1 || pr <= 0 || isNaN(row) || row > 200 || row < 4 ||  isNaN(timer) || timer < 1){
		return true;
	}
	else{
		return false;
	}
}  //检查是否正确

function init_map(row, pr){
	for(i = 0; i < row; i++){
		map[i] = [];
		temp_map[i] = [];
		for(j = 0; j < row; j++){
			map[i][j] = Math.round(Math.random() / (2 - 2 * pr));
		}
	}
	map[Math.round(Math.random() * (row - 1))][Math.round(Math.random() * (row - 1))] = 1;
}  //初始化地图
 
function calculate_next_generation(){     //得到下一代
	for(i = 0; i < row; i++){
		for(j = 0; j < row; j++){
			var temp = count_neighbour(i, j);
			if(map[i][j] == -1){
				temp_map[i][j] = -1;
			}
			else if(temp == 2){
				temp_map[i][j] = map[i][j];
			}
			else if(temp == 3){
				temp_map[i][j] = 1;
			}
			else{
				temp_map[i][j] = 0;
			}
		}
	}
	var flag = false;
	for(i = 0; i < row; i++){
		for(j = 0; j < row; j++){
			if(!flag && map[i][j] != temp_map[i][j]){
				flag = true;
			}
			map[i][j] = temp_map[i][j];
		}
	}
	return flag;
}

function count_neighbour(i, j){   //计算map[i][j]周围的数量
	var temp = 0;
	if(i > 0){
		if(map[i - 1][j] == 1){
			temp = temp + 1;
		}
		if(i > 1){
			if(map[i - 2][j] == 1){
				temp = temp + 1;
			}
		}
	}
	if(j > 0){
		if(map[i][j - 1] == 1){
			temp = temp + 1;
		}
		if(j > 1){
			if(map[i][j - 2] == 1){
				temp = temp + 1;
			}
		}
	}
	if(i < row - 1){
		if(map[i + 1][j] == 1){
			temp = temp + 1;
		}
		if(i < row - 2){
			if(map[i + 2][j] == 1){
			temp = temp + 1;
			}
		}
	}
	if(j < row - 1){
		temp = temp + map[i][j + 1];
		if(j < row - 2){
			temp = temp + map[i][j + 2];
		}
	}	
	return temp;	
}

function set_wall(r, c){
	if(map[c][r] == 1){
		return false;
	}
	else{
		map[c][r] = -1;
		return true;
	}
}





