define(["bin/core/naviPageView"], function(Base)
{
	var Class = {};
	var money;

	Class.events = 
	{
		"click #gocoupon" : "goCoupon",
		"click .moneyput" : "moneyPut",
		"click #carmag"   : "carMag",
		"click .out"      : "outBtn",
	}

	Class.posGenHTML = function(){
		this.$(".namePhone").html(bin.dataCenter.getUserName());

		var moneytext =  this.$(".moneyleft").html();
		var moneysp = [];
		var moneysp1 = [];
		moneysp = moneytext.split("");
		for(var i=0; i<moneysp.length; ++i)
		{
			if(i>4&&i<moneysp.length-1)
			{
				moneysp1.push(moneysp[i]);
			}
			
		}
		money = Number(moneysp1.join(""));
	}

	Class.goCoupon = function()
	{
		bin.naviController.push("account/page0",{});
	}

	Class.moneyPut = function()
	{
		bin.naviController.push("ltt/deposit",{});
	}

	Class.carMag = function()
	{
		bin.naviController.push("ltt/car2",{});
	}

	Class.outBtn = function()
	{
		bin.hudManager.alert(
		{				
			message:{text:"确定退出登录?"},				
			buttons:[
				{
					text:"确定",
					onClick:function(v)
					{
						bin.dataCenter.setUserName();
						bin.naviController.popTo("home/index",{});
						// window.location.reload();
						v.close();
						//bin.hudManager.showStatus("您选择了确定");
					}
				},					
				{text:"取消"},					
			]
		});
	}


	Class.onViewBack = function(backFrom, backData)
		{
			var self = this;
			console.log(backData);
			if(typeof(backData) == "undefined")
			{
				self.$(".moneyleft").html("账户余额："+money.toFixed(2)+"元");
			}else{
				money += Number(backData);
				self.$(".moneyleft").html("账户余额："+money.toFixed(2)+"元");
			}
			
		}



	return Base.extend(Class);
})