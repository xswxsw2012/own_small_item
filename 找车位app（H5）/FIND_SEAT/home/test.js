//@lhz
define(["bin/core/naviPageView"], function(Base){


    var Class = {};
    Class.events = {
    	"change #inputTel": "change",
		"change #inputCode": "change",
		"click #1" : "changeBorder",
		"click #2" : "changeBorder",
		"click #3" : "changeBorder",
		"click #4" : "changeBorder",
		"click #5" : "changeBorder",
		"click #6" : "changeBorder",
    };

    Class.changeBorder = function(e){
    	var self=this;
    	var id= e.currentTarget.id;
    	for(var i=1;i<7;i++){
    		self.$("#"+i).attr("class","icon1");
    	}
    	this.$("#"+id).attr("class","icon2");
    }

    Class.posGenHTML = function()
	{
		var self = this;
		self.$("#inputTel").on("input",function(){
			var inputTel = self.$("#inputTel").val().length;
			if(inputTel==11)
			{
				self.$("#getCode").css("background","#019A66");
			}
			else {
				self.$("#getCode").css("background","#61BC9D");
			}
		});

		self.$("#inputCode").on("input",function(){
			var inputTel01 = self.$("#inputTel").val().length;
			var inputCode  = self.$("#inputCode").val().length;
			if(inputCode==6&&inputTel01==11)
			{
				self.$("#login").css("background","#019A66");
			}
			else {
				self.$("#login").css("background","#61BC9D");
			}
		});










	}
	

    return Base.extend(Class);
});