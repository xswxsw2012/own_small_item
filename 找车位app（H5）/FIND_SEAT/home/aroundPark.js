define(["bin/common/listView", "bin/core/view","home/client"],
	function(ListView,View,Client)
	{
		var Class = {};
	
		var ItemProvider = ListView.TemplateItemProvider.extend(
			{
				createItemView:function(listView,i,data){
					var v = ListView.TemplateItemProvider.prototype.createItemView.call(this,listView,i,data);
					v.$("#aPark-introduction").on("click",function(){
						bin.naviController.push("home/aroundPark-detail",{data:data});
					});
					return v;
				}
	
			});
	
		Class.posGenHTML = function()
		{
			this._listView = new ListView(
				{elem:this.$("#bin-page-content"), 
				itemProvider:new ItemProvider({template:this.$html("#aPark-items")}), 
				dataProvider:new ListView.DataProvider(
				{
					loadAPI:function(params,success,error)
					{
						Client.getData({},function(data){
							var ret = {code:200,data:{}};
							var data01 = ret.data;
							if(params.page === 0){
								data01.total = 20;
							}
							data01.data = [];

							var len = data.data.length;
							for(var i=0;i<len;++i){
								data01.data.push(data.data[i]);
							}
							success(ret);
						})
					}
				})});  

		}

	return bin.ui.NaviPageView.extend(Class);
})