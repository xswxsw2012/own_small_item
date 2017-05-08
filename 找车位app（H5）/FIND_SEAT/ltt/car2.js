define(["ltt/client","bin/common/listView"],function(client,ListView){
	var Class = {};
	Class.events = {
      "click #switch":"onSwitch",
      "click .car-cancel":"cancelfun",
      "click #addcar":"turnto"
	}
	// Class.onSwitch = function (evet){
	// 	bin.hudManager.showStatus("")
	// }

	Class.onRight = function(){
		var text = this.$("#naviBar").attr("naviRight");
		if(text == "text:编辑"){
			setTimeout("",1000);
		this.setRightText("完成");
		this.$("#naviBar").attr("naviRight","text:完成");
		this.$(".car-item").css("margin-left","0rem");
	 }
	   else{
	   // 	var cancelobj = this.$(".car-item");
	   // for(var i=0;i<cancelobj.length;i++){
	   // 	   if(cancelobj.eq(i).attr("cancel")=="yes"){
	   // 	   	  cancelobj.eq(i).css("display","none");
	   // 	   }
	   // }
	   	this.setRightText("编辑");
		this.$("#naviBar").attr("naviRight","text:编辑");
		this.$(".car-item").css("margin-left","-3rem");
		this.$("#listView").scrollTop = 0;
	   }

	}

	Class.cancelfun = function(event){
		// $(event.currentTarget).parent().css("margin-left","-3rem").css("background-color","grey");
		// $(event.currentTarget).parent().attr("cancel","yes");
		$(event.currentTarget).parent().css("display","none");

         // this.$(".car-item").css("margin-left","-3rem").css("background-color","grey");
	}

	Class.turnto = function(){
		bin.naviController.push("ltt/addcar");
	}


	var ItemProvider = ListView.TemplateItemProvider.extend({
		 createItemView:function(listView,i,data){
		 	var v =ListView.TemplateItemProvider.prototype.createItemView.call(this, listView, i, data);
		     return v;
		 }
	});

	Class.posGenHTML = function (){
		var self =this;
		self.setRightVisible(false);
		this._listView = new ListView(
				{elem:this.$("#listView"), 
				itemProvider:new ItemProvider({template:this.$html("#template-item")}), 
				dataProvider:new ListView.DataProvider(
					{
                     loadAPI:function(params,success,error){
                     	client.getData({},function(data1){
                     		if(data1.data.length==0){
                     			var carimg = "<img id='nocar' src='demoimg/userimg/car.png'>"
                     			self.$("#listView").append(carimg);
                     			self.$("#listView").append("<span id='cartxt'>目前还没有添加车辆</span>");
                     		}
                             else{
                     		var ret = {code:200,data:{}};
                     		var data = ret.data;

                     		if(params.page ==0){
                     			data.total =1;
                     		}

                     		data.data = [];
                     		for(var i=0;i<data1.data.length;++i){
                     			data.data.push(data1.data[i]);
                     		}
                     		success(ret);
                     		self.setRightVisible(true);}
                     	}
                    )}
  
				}
					)
			});
	}
	return bin.ui.NaviPageView.extend(Class);
})

