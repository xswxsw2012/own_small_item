define(["bin/core/pageView","bin/common/tabView","infactivity/client","bin/common/listView"], 
	function(Base, TabView, Client,ListView)
	{

    var Class = {};
    Class.events = 
    {
      "click .coupon" : "couponBtn",
      "click .header-clear" : "clearBtn",
      
      "click .topprev" : "prevBack",
    }

    var ItemProvider = ListView.TemplateItemProvider.extend({
      createItemView:function(listView, i, data){
        var v=ListView.TemplateItemProvider.prototype.createItemView.call(this,listView,i,data);

        return v;
      }
    }); 

    Class.posGenHTML = function()
    {
      var self = this;    //页面中的this

    	this._tabView = new TabView(
    	{
    		elem: this.$("#intab-View"),
    		items: ["1", "2"],
    		current: "2",
    		tabBarID: "tabitem",
    		swipeID: "swipeitem",
    		activeStyle:"header-item-active",
    		deactiveStyle:"header-item-deactive",
    		onChange:function(view,item)
    		{
          self._item = item; //item表示当前页面，赋值给页面this
    		}
    	});

      this._listView1 = new ListView(
        {
          elem:this.$("#information"),
          itemProvider:new ItemProvider({template:this.$html("#itemTem")}),
          dataProvider:new ListView.DataProvider(
          {
            loadAPI:function(params,success,error){
              Client.getData({},function(data1){
                var ret = {code:200,data:{}};
                var data = ret.data;

                if(params.page == 0){
                  data.total = 3;
                  data.pageSize = 20;
                }

                data.data = [];
                for(var i=0; i<data1.data.length;++i){
                  data.data.push(data1.data[i]);
                }
                success(ret);
              })
            }
          })
        });

      this._listView2 = new ListView(
        {
          elem:this.$("#actDiv"),
          itemProvider:new ItemProvider({template:this.$html("#couponTem")}),
          dataProvider:new ListView.DataProvider(
          {
            loadAPI:function(params,success,error){
              Client.getCoupon({},function(data1){
                var ret = {code:200,data:{}};
                var data = ret.data;

                if(params.page == 0){
                  data.total = 1;
                  data.pageSize = 20;
                }

                data.data = [];
                for(var i=0; i<data1.data.length;++i){
                  data.data.push(data1.data[i]);
                }
                success(ret);
              })
            }
          })
        });
    }

   

    Class.couponBtn = function()
    {
      bin.naviController.push("infactivity/redpaper");
    } 

    Class.clearBtn = function()
    {
      if(this._item == 2){
        self.$("#actDiv").remove();
      }else
      {
        this.$(".information").remove();
      }
    }

    Class.prevBack = function(){
      bin.naviController.pop(1,{});
    }

    return Base.extend(Class);
});