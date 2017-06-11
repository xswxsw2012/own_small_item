define(["bin/core/naviPageView","start/client","bin/common/listView","bin/core/view"], function(Base,Client,ListView,View){
	Class = {};
	var kind = []; //用于存储菜品的类型
	var totalMenu = 0; //点菜的总数
	var order = 0;
	var itemVary = []; //存放菜品种类
	var viewData = [];

	//收集页面需要送达下一页的数据
	viewData.push({});
	viewData[0].src="images/client1.jpg";
	viewData[0].name="阿国是糖";
	viewData[0].menus=[];
	
	Class.events = {
		"click #add":"add",
		"click #dec":"dec",
		"click .menu-li":"menuMove",
		"click .menu-sure":"jump"
	}

	Class.add = function(e)
	{

		var node = $(e.currentTarget).parent().children("#num");
		let number = node.val();
		if (parseInt(number) >= 0 && parseInt(number) < 100) {
			if ($(e.currentTarget).parent().children("#dec").is(':hidden')) {
				$(e.currentTarget).parent().children("#dec,#num").show();
			}
			node.val(parseInt(number)+1);
			totalMenu++;
			$("#count").html(totalMenu);
		}

		if(totalMenu > 0){
			$(".menu-sure").css({"background-color":"#f24436","color":"#FFFFFF"});
		}
	}

	Class.dec = function(e)
	{
		var node = $(e.currentTarget).parent().children("#num");
		let number = node.val();
		if (parseInt(number) > 0) {
			node.val(parseInt(number)-1);
			totalMenu--;
			$("#count").html(totalMenu);
		} else {
			$(e.currentTarget).parent().children("#dec").hide();
			$(e.currentTarget).parent().children("#num").hide();
		}

		if (totalMenu == 0) {
			$(".menu-sure").css({"background-color":"#6b635e","color":"#8f8e8e"});
		}
		
	}

	Class.menuMove = function(event)
	{
		$(".img").removeClass("backColor");
		$(".text").removeClass("color");
		$(event.currentTarget).children(".menuPic").children(".img").addClass("backColor");
		$(event.currentTarget).children(".text").addClass("color");

		var itemH = $(".get-item").height();
		var typeH = $(".menu-type").height();

		var vary = $(event.currentTarget).children(".text").text();
		var triTop = 0;
		var conY = 0;
		switch (vary)
		{
			case '主菜':
				triTop = 1.3653;
				break;
			case '热菜':
				triTop = 4.75;
				// conY = itemH*itemVary[0];
				break;
			case '凉菜':
				triTop = 8.1347;
				break;
			case '汤品':
				triTop = 11.5194;
				break;
			case '点心':
				triTop = 14.9041;
				break;
			default:
				triTop = 1.3653;
		}
		$(".triangle").css({'top':triTop+'rem'});
		// $(".bin-refresh-view-content").parent().css({'transform':'translate(0px,'+(-conY)+'px)'});
	}

	var ItemProvider = ListView.TemplateItemProvider.extend({
		createItemView:function(listView,i,data){
			var v = ListView.TemplateItemProvider.prototype.createItemView.call(this,listView,i,data);
			//调整页面显示
			if (data.id == 1) {
				v.$(".menu-type").html(kind[order][1]);
				order++;
			} else {
				v.$(".menu-type").hide();
			}

			var rand = Math.floor(Math.random()*5);
			v.$("#show-num").html(rand);

			v.$("#dec,#num").hide();

			return v;
		}
	});

	Class.posGenHTML = function()
	{
        this._listView = new ListView(
        {
          elem:this.$("#meilinf"),
          itemProvider:new ItemProvider({template:this.$html("#itemTem")}),
          dataProvider:new ListView.DataProvider(
          {
            loadAPI:function(params,success,error){
              Client.getMenu({},function(data1){
              	var _data = eval(data1.data); //把json字符串转换成json对象
              	console.log(_data);
              	//从json数据中取出菜品类型，并保存
              	for (var m = 0; m <_data.length; ++m) {
              		let _dataO = _data[m];
              		kind.push([]);
              		kind[m][0] = _dataO.id;
              		kind[m][1] = _dataO.name;
              	}
              	
              	var itemData = [];
              	for (var j = 0; j < _data.length; ++j) {
              		itemData.push(_data[j].items);
              	}

                var ret = {code:200,data:{}};
                var data = ret.data;

                if(params.page == 0){
                  data.total = 6;
                  data.pageSize = 20;
                }

                data.data = [];
                for(var i = 0; i < itemData.length; ++i){
                	for (var k = 0; k < itemData[i].length; ++k) {
                		data.data.push(itemData[i][k]);
                	} 
                	itemVary[i] = itemData[i].length;    
                }
                success(ret);
              })
            }
          })
        });
	}

	Class.jump = function()
	{
		//跳转前收集相关数据
		var getItems = $(".get-item");
		getItems.each(function(i,dom){
			let unmItem = $(this).children(".icon").children("#num").val();
			if (parseInt(unmItem) > 0) {
				viewData[0].menus.push({});
				var len = viewData[0].menus.length,
			    	name = $(this).children(".item-name").text(),
			    	price = $(this).children(".price").children(".item-price").text(),
			   		unit = $(this).children(".price").children(".item-unit").text(),
			    	number = $(this).children(".icon").children("#num").val();
				viewData[0].menus[len-1].name=name;
				viewData[0].menus[len-1].price=price;
				viewData[0].menus[len-1].unit=unit;
				viewData[0].menus[len-1].number=number;
			}
		});
		console.log(viewData);
		//页面跳转
		bin.naviController.push("start/ordered", viewData);
	}

	return Base.extend(Class);
});