define([],function(){
	var Class = {};
	var time;
	var holdtime;
	Class.events = {
		"click .preimg":"dofun"
	};

	Class.dofun =function(event){
       if(event.currentTarget.id=="selectTime"){
       	  bin.hudManager.datePicker({pickTime:true,onPick:function(date){
       	  	 var year = date.getFullYear();
       	  	 var month = date.getMonth()+1;
       	  	 var day = date.getDate();

       	  	 var hour = date.getHours();
       	  	 var minute = date.getMinutes();
       	  	 var second = date.getSeconds();

       	  	 bin.hudManager.alertInfo(year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second);
       	  	 time = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;

       	  }
       	});
       }

       else if(event.currentTarget.id=="inputTime"){
             bin.hudManager.select({
             	options:[{text:"1小时",value:"1"},{text:"2小时",value:"2"},{text:"3小时",value:"3"}],
             	current:"A",
             	callback:function(data){
                      holdtime = data.value;
             	}
             });
       }
	}
	Class.posGenHTML = function(){
        this.$("#order").on("click",function(){
        bin.naviController.push("ltt/pay",{"timevalue":time,"holdvalue":holdtime});
	});
	}
	
	return bin.ui.NaviPageView.extend(Class);
})
