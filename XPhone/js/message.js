var messagelist;

$(document).ready(function(){
	getMainMessageList();
});

function getMainMessageList(){
	$.getJSON("http://namespaceXP.github.io/XPhone/messages.json", function(json){
		for(var i = 0; i < json.messages.length; i++){
			
		}
	});
}

