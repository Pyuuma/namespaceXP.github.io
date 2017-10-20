$(document).ready(function(){
	mytime();
	setInterval(function() {mytime()},60000);
});

var myAuto = document.getElementById('myaudio');

var config = {
  syncURL: "https://wd3142915294flcvux.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

function mytime(){
	ref.on("value", function(snapshot) {
	    if(snapshot.val().messageboard == 1){
			$("#bg").attr("src","img/reciever_calling.jpg");
			myAuto.play();
			$("#bg").click(function(){
				ref.set({
					"messageboard":0
				});
			})
	    }
		else{
			$("#bg").attr("src","img/reciever.jpg");
			myAuto.pause();
			$("#bg").click(function(){
				
			})
		}
	});
}

