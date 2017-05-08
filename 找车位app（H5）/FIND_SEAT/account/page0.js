define(["bin/core/naviPageView","account/client","bin/common/listView"], 
	function(Base, Client, ListView)
	{
		var Class = {};
		
		var ItemProvider = ListView.TemplateItemProvider.extend({
			createItemView:function(listView, i, data){
				var v=ListView.TemplateItemProvider.prototype.createItemView.call(this,listView,i,data);
				
				return v;
			}
		}); 

		Class.posGenHTML = function(){
			this._listView = new ListView(
				{
					elem:this.$("#listView"),
					itemProvider:new ItemProvider({template:this.$html("#template-item")}),
					dataProvider:new ListView.DataProvider(
					{
						loadAPI:function(params,success,error){
							Client.getPage({},function(data1){
								var ret = {code:200,data:{}};
								var data = ret.data;

								if(params.page == 0){
									data.total = 3;
									data.pageSize = 20;
								}

								data.data = []; //让data是一个数组
								// bin.dataCenter.setCouponNum(data1.data.length); //把劵数量存储到本地
								// alert(bin.dataCenter.getCouponNum());
								for(var i=0; i<data1.data.length;++i){
									data.data.push(data1.data[i]);
								}
								success(ret);
							})
						}
					})
				});

		}


		return Base.extend(Class);
	}
)