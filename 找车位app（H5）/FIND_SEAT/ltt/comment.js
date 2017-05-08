define(["ltt/client","bin/common/listView"],function(client,ListView){

	var Class = {};

	var ItemProvider = ListView.TemplateItemProvider.extend({
		 createItemView:function(listView,i,data){
		 	var v =ListView.TemplateItemProvider.prototype.createItemView.call(this, listView, i, data);
		     return v;
		 }
	});

	var pushFrom01;

	Class.onViewPush = function(pushFrom, pushData)
	{
			pushFrom01 = pushFrom;

		    if(pushFrom=="ltt/write")
		    {
		    	this._pushData = pushData.data;
				this.$("#name").text(pushData.data.park_con.data.name);
				this.$("#location").text(pushData.data.park_con.data.position);
				this.$("#type").text("类型:"+pushData.data.park_con.data.type);
				this.$("#stime").text("标准:"+pushData.data.park_con.data.price);
				this.$("#stopnum").text("总车位:"+pushData.data.park_con.data.number_total);
				//this.$("#listViewPre").append(con_html);
		    }
		    else 
		    {
				this._pushData = pushData;
				this.$("#name").text(pushData.data.name);
				this.$("#location").text(pushData.data.position);
				this.$("#type").text("类型:"+pushData.data.type);
				this.$("#stime").text("标准:"+pushData.data.price);
				this.$("#stopnum").text("总车位:"+pushData.data.number_total);
			}



	}
	Class.onLeft = function(){
		var self = this;
		var mydate = new Date();
		var date_str = "" + mydate.getFullYear()+"-"+(mydate.getMonth()+1)+"-"+mydate.getDate();
		var data;
		if(pushFrom01=="ltt/write")
		{
			data = {comment:{con:comment,date:date_str,head_img:"",userID:"123456",},
			name:self._pushData.park_con.data.name,
			type:self._pushData.park_con.data.type,
			price:self._pushData.park_con.data.price,
			number_total:self._pushData.park_con.data.number_total,
			number_blank:self._pushData.park_con.data.number_blank,
			tel:self._pushData.park_con.data.tel,
			position:self._pushData.park_con.data.position,};
		}
		else{
			data = {comment:{con:comment,date:date_str,head_img:"",userID:"123456",},
			name:self._pushData.data.name,
			type:self._pushData.data.type,
			price:self._pushData.data.price,
			number_total:self._pushData.park.data.number_total,
			number_blank:self._pushData.park.data.number_blank,
			tel:self._pushData.park.data.tel,
			position:self._pushData.park.data.position,};
		}
		bin.naviController.push("home/aroundPark-detail",{data:data});
	}

	/*go to write*/
	Class.onRight = function(){
		console.log("这个是传到write页面的数据："+this._pushData);
		bin.naviController.push("ltt/write",{data:this._pushData});
	}

	Class.posGenHTML = function(){
		var self = this;

		this._listView = new ListView(
				{elem:this.$("#listView"), 
				itemProvider:new ItemProvider({template:this.$html("#template-item2")}), 
				dataProvider:new ListView.DataProvider(
					{
                     loadAPI:function(params,success,error){
                     	client.getComment({},function(data1){
                     		var ret = {code:200,data:{}};
                     		var data = ret.data;

                     		if(params.page ==0){
                     			data.total =2;
                     		}
                     		data.data = [];
                     		console.log("data1:"+data1);
                     		if(pushFrom01=="ltt/write")
			    			{
			                    data.data.push(self._pushData.comment);
			                    for(var i=0;i<data1.data.length;++i){
		                     		if(self._pushData.park_con.data.name==data1.data[i].name)
		                     		{
			                     		for(var j=0;j<data1.data[i].comment.length;++j){
			                     			data.data.push(data1.data[i].comment[j]);
			                     		}
		                     		}
	                     		}
			               	}
			               	else{
	                     		for(var i=0;i<data1.data.length;++i){
		                     		if(self._pushData.data.name==data1.data[i].name)
		                     		{
			                     		for(var j=0;j<data1.data[i].comment.length;++j){
			                     			data.data.push(data1.data[i].comment[j]);
			                     		}
		                     		}
	                     		}
                     		}
                     		//console.log(ret);

                     		success(ret);
                     	}
                     	
                    )}
  
				}
					)
			});
	}
	return bin.ui.NaviPageView.extend(Class);
})
