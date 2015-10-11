
(function(){
	'use strict';
	
	describe('Check if input is valid', function(){
		it('should get the right assertion', function(){
			assert.equal(false, check_valid_input(0.5, 50, 50));
			assert.equal(false, check_valid_input(0.0001, 50, 50));
			assert.equal(false, check_valid_input(0.9999, 50, 50));
			assert.equal(true, check_valid_input(0.0000, 50, 50));
			assert.equal(true, check_valid_input(1.0001, 50, 50));
			assert.equal(false, check_valid_input(0.5, 5, 50));
			assert.equal(false, check_valid_input(0.5, 199, 50));
			assert.equal(true, check_valid_input(0.5, 2, 50));
			assert.equal(true, check_valid_input(0.5, 201, 50));
			assert.equal(false, check_valid_input(0.5, 50, 1.0001));
			assert.equal(true, check_valid_input(0.5, 50, 0.9999));
			assert.equal(true, check_valid_input('sos', 50, 50));
			assert.equal(true, check_valid_input(0.5, 'fff', 50));
			assert.equal(true, check_valid_input(0.5, 50, 'ccc'));
			assert.equal(true, check_valid_input('sos', 'fff', 50));
			assert.equal(true, check_valid_input('sos', 50, 'ccc'));
			assert.equal(true, check_valid_input(0.5, 'fff', 'ccc'));
			assert.equal(true, check_valid_input('sos', 'fff', 'ccc'));
		});
	});
})();


(function(){
	'use strict';
	
	describe('Check if map is correctly initalized', function(){
		it('map should include only 0 and 1', function(){
			for(var row = 5; row < 200; row += 5){
				init_map(row, 0.6);
				for(var i = 0; i < row; i++){
					for(j = 0; j < row; j++){
						assert.equal(true , map[i][j] == 1 || map[i][j] == 0);
					}
				}
			}
		});
	});
})();

(function(){
	'use strict';
	
	describe('Check if count is correct', function(){
		it('should get the right count result', function(){
			row = 7;
			map = [[0, 0, 0, 0, 0, 0, 1],
				    [0, 0, 0, 0, 0, 0, 1],
				    [1, 1, 1, 1, 1, 0, 0],
					[0, 0, 0, 1, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 1, 0],
					[0, 0, 1, 0, 0, 0, 0],
			]
			assert.equal(2,  count_neighbour(2, 0));
			assert.equal(3,  count_neighbour(2, 1));
			assert.equal(4, count_neighbour(2, 3));
			assert.equal(0, count_neighbour(6, 2));
			assert.equal(0, count_neighbour(5, 5));
			assert.equal(1 , count_neighbour(0, 6));
		});
	});
})();


(function(){
	'use strict';
	
	describe('Check if envolvement is correct', function(){
		it('should get the correct envolvement', function(){
			row = 7;
			map = [[0, 0, 0, 0, 0, 0, 1],
				    [0, 0, 0, 0, 0, 0, 0],
				    [0, 1, 1, 1, 1, 0, 0],
					[0, 0, 0, 1, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 1, 0],
					[0, 0, 1, 0, 0, 0, 0],
			]
			calculate_next_generation();
			assert.equal(1 , map[2][1]);
			assert.equal(1 , map[2][2]);
			assert.equal(0 , map[2][3]);
			assert.equal(1 , map[2][4]);
			assert.equal(0 , map[0][0]);
			assert.equal(0 , map[6][2]);
			assert.equal(0 , map[5][5]);
			assert.equal(0 , map[0][6]);
		});
		
		it('should judge if the envolvement has stopped', function(){
			row = 7;
			map = [[0, 0, 0, 0, 0, 0, 1],
				    [0, 0, 0, 0, 0, 0, 0],
				    [0, 1, 1, 1, 1, 0, 0],
					[0, 0, 0, 1, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 1, 0],
					[0, 0, 1, 0, 0, 0, 0],
			]
			assert.equal(true, calculate_next_generation());
			assert.equal(true, calculate_next_generation());
			assert.equal(true, calculate_next_generation());
			assert.equal(false, calculate_next_generation());
		});
	});
})();