define([],function(){
	var Class = {};
	var money = 0;
	Class.events = {
		"click .cows":"choosefun",
		"click .mm":"choose",
		"click #inputmoney":"inputfun",
		"click #check":"checkfun",
		"click #no":"cancel",
		"click #btn":"pushData"
	}
	Class.inputfun = function(){
         this.$("#mask").css("display","block"); 
	}
	Class.checkfun = function(){
		var money = this.$("#money").val();
         this.$("#inputmoney").text(money+"元");
         this.$("#mask").css("display","none"); 
	}

	Class.cancel = function(){
		 this.$("#mask").css("display","none"); 
	}
	Class.choose = function(event){
		
  	this.$(".mm").attr("src","demoimg/homeimg/choose.png");
     $(event.currentTarget).attr("src","demoimg/homeimg/choose1.png");
    
  }

   Class.pushData = function(){
   	    bin.naviController.pop(1,money);
   	    money=0;
   }

	Class.choosefun = function(event){
	   this.$(".cows").siblings().removeClass("chosecow");
	   this.$(event.currentTarget).siblings().attr("class","cows");
       this.$(event.currentTarget).attr("class","changebot");
       this.$(event.currentTarget).addClass("chosecow");
       money = parseInt($(event.currentTarget).text());
        
	}
	return bin.ui.NaviPageView.extend(Class);
})