//@lhz
define(["bin/core/naviPageView"], function(Base){

	var componentConfig = 
	[
		{
			title:"我的订单",
			img: "demoimg/homeimg/index-order.png",
			path:"ltt/order",
		},
		{
			title:"车辆管理",
			img: "demoimg/homeimg/account-car.png",
			path:"ltt/car2",
		},
		{
			title:"咨询活动",
			img: "demoimg/homeimg/account-news.png",
			path:"infactivity/infactivity",
		},
		{
			title:"我的卡券",
			img: "demoimg/homeimg/index-card.png",
			path:"account/page0",
		},
		{
			title:"关于我们",
			img: "demoimg/homeimg/account-about.png",
			path:"home/test",
		},
	];

    var Class = {};
    Class.events = {
    	//"click #naviLeft":"onLeft",
    	"click #goBack-img": "goBack",
    	"click #naviRight" : "goParkAround",
    	"click .item-span" : "goMenu",
    	"click #pleaseLogin-span" : "goLogin",
    	"click #pleaseLogin-img" : "goMyHomePage",
    	"click #zoomBig" : "zoomer",
    	"click #zoomSmall" : "zoomer",
    	"click #quit"  :  "quit",
    	"click .BMap_button" : "creatMarker",
    };
    /*quit*/
    Class.quit = function(){
    	var self = this;
    	if(bin.dataCenter.getUserName("username")!=null)
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
							v.close();
							self.$("#pleaseLogin-img").attr("src","demoimg/homeimg/account-photo.png");
							self.$("#pleaseLogin-span").css("display","block");
						}
					},					
					{text:"取消"},					
				]
			});
		}
		else
		{
			bin.hudManager.alert(
			{				
				message:{text:"您还没有登录,请先登录"},				
				buttons:[
					{
						text:"确定",
						onClick:function(v)
						{
							v.close();
						}
					},					
					{text:"取消"},					
				]
			});
		}
    }
	/*push  myMessage*/
	Class.onLeft = function()
	{
		this.$("#myMessage").animate({left:'0px'});
	}
	Class.goMyHomePage = function()
	{
		if(bin.dataCenter.getUserName("username")!=null){
			bin.naviController.push("account/index");
		}
		else 
		{
			bin.naviController.push("login/loginin");
		}
	}
	/*got to around park page*/
	Class.goParkAround = function()
	{
		bin.naviController.push("home/aroundPark.html");
	}
	/*message back*/
	Class.goBack = function()
	{
		this.$("#myMessage").animate({left:'-16rem'});
	}

	/*map zoomer*/

	Class.goMenu = function(e)
	{
		if(bin.dataCenter.getUserName("username")!=null)
		{
			var path = e.currentTarget.id;
			bin.naviController.push(path);
		}
		else
		{
			bin.naviController.push("login/loginin");
		}

	}
	Class.goLogin = function()
	{
		bin.naviController.push("login/loginin");
	}

	Class.onViewBack = function (backFrom,backData){
		// if((backFrom=="login/loginin")&&(backData.data==1))
		// {
		// 	if(bin.dataCenter.getUserName("username")!=null){  //login
		// 		this.$("#pleaseLogin-img").attr("src","demoimg/homeimg/user-icon.png");
		// 		this.$("#pleaseLogin-span").css("display","none");
		// 	}
		// 	else //unlogin
		// 	{
		// 		this.$("#pleaseLogin-img").attr("src","demoimg/homeimg/account-photo.png");
		// 		this.$("#pleaseLogin-span").css("display","block");
		// 	}
		// }
		// else 
		// {
			if(bin.dataCenter.getUserName("username")!=null){  //login
				this.$("#pleaseLogin-img").attr("src","demoimg/homeimg/user-icon.png");
				this.$("#pleaseLogin-span").css("display","none");
			}
			else //unlogin
			{
				this.$("#pleaseLogin-img").attr("src","demoimg/homeimg/account-photo.png");
				this.$("#pleaseLogin-span").css("display","block");
			}
		//}

	}
    Class.posGenHTML = function()
	{
		var self = this;
		if(bin.dataCenter.getUserName("username")!=null){  //login
			this.$("#pleaseLogin-img").attr("src","demoimg/homeimg/user-icon.png");
			this.$("#pleaseLogin-span").css("display","none");
		}
		else //unlogin
		{
			this.$("#pleaseLogin-img").attr("src","demoimg/homeimg/account-photo.png");
			this.$("#pleaseLogin-span").css("display","block");
		}


		/*map controller*/
		this.request(function(s, e)
		{
			bin.mapManager.require(function(error)
			{  	
				if(error)
				{
					return ;
				}
				s();
			});
		}, function()
	       {
	       		var map = new BMap.Map("home-baiduMap");
	        	map.centerAndZoom(new BMap.Point(106.53,29.59),16);
	        	/*zoomer*/
	        	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM});
	           	map.addControl(top_right_navigation); 

		       /*parking mark*/
		       var pt = new BMap.Point(106.53,29.59);
		       var myIcon = new BMap.Icon("demoimg/homeimg/red.png",new BMap.Size(50,57));
		       var marker2 = new BMap.Marker(pt,{icon:myIcon});
		       map.addOverlay(marker2);
	            
	       });


	

		/*我的订单，车辆管理，资讯活动，我的卡券，关于我们*/
		var com = this.$("#myMessage-item");
		for(var i = 0;i<componentConfig.length;++i) {
			com.append("<div id='myOrder' class='item'>"+
							"<div class='item-img' style='background:url("+componentConfig[i].img+") no-repeat center;background-size: 44%;' >"+
							"</div>"+
							"<span class='item-span' id='"+componentConfig[i].path+"''>"+componentConfig[i].title+"</span>"+
						"</div>");
		}
	}
	




    return Base.extend(Class);
});