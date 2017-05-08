(function()
{
	var config = {};
	var TURN_ON  = true;
	var TURN_OFF = false;

	var CASE = function(api, on, data, options)
	{
		if(on)
		{
			if(typeof(options) === "string")
			{
				options = {method:options};
			}

			config[api] = {data:data, options:options};
		}
	}

	var NET_DATA_GENERATOR = function(generator)
	{
		config._netDataGenerator = generator;
	}

	
	define(
	[],
	function()
	{
		// Start your config here
		CASE("/api/byFunction", TURN_ON, function(netParams)
			{
				return "api/byFunction : Welcome to BIN"
			},"GET");

		CASE("/api/byData", TURN_ON, "api/byData : Welcome to BIN", {method:"GET", costTime:1000});

		CASE("/api/byFile", TURN_ON, "file!./netLocalDemo/test.json", "POST"); 
		//张悦 start   /////////////////////////////////////////////////////////

		CASE("/api/aroundPark",TURN_ON,[
										{name:"长安宁和停车场",parkID:"001",number_total:"500",number_blank:"123",position:"重庆市江北区建新东路50号",distance:"1.23km",type:"收费",price:"5元/小时",tel:"45625896"},
										{name:"世纪中环停车库",parkID:"002",number_total:"500",number_blank:"45",position:"观音桥步行街",distance:"1.23km",type:"收费",price:"5元/小时",tel:"45625896"},
										{name:"北岸世家停车库",parkID:"003",number_total:"500",number_blank:"64",position:"重庆市江北区鲤鱼池",distance:"1.23km",type:"收费",price:"5元/小时",tel:"45625896"},
										{name:"停车库",parkID:"004",number_total:"500",number_blank:"6",position:"江北区融景城",distance:"1.23km",type:"收费",price:"5元/小时",tel:"45625896"},
										{name:"春风绿树停车库",parkID:"005",number_total:"500",number_blank:"22",position:"重庆市江北区建新南路123号",distance:"1.23km",type:"收费",price:"5元/小时",tel:"45625896"},
										{name:"停车库",parkID:"006",number_total:"500",number_blank:"37",position:"重庆市江北区建新南路123号",distance:"1.23km",type:"收费",price:"5元/小时",tel:"45625896"},
										{name:"中信大厦停车库",parkID:"007",number_total:"500",number_blank:"2",position:"重庆市江北区建新南路123号",distance:"1.23km",type:"收费",price:"5元/小时",tel:"45625896"},
										{name:"世纪金源停车库",parkID:"008",number_total:"500",number_blank:"3",position:"重庆市江北区建新南路123号",distance:"1.23km",type:"收费",price:"5元/小时",tel:"45625896"},
										{name:"世纪中环停车库",parkID:"009",number_total:"500",number_blank:"25",position:"重庆市江北区建新南路123号",distance:"1.23km",type:"收费",price:"5元/小时",tel:"45625896"},
										{name:"长安宁和停车场",parkID:"010",number_total:"500",number_blank:"52",position:"重庆市江北区建新南路123号",distance:"1.23km",type:"收费",price:"5元/小时",tel:"45625896"},
										],"GET");

		CASE("/app/getComment",TURN_ON,[
								{name:"长安宁和停车场",parkID:"001",comment:[{userID:"15600562997",head_img:"",date:"2016-11-11",con:"车位充足，环境好"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"环境较好，服务到位"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"停车方便"}]},
								{name:"世纪中环停车库",parkID:"002",comment:[{userID:"15600562997",head_img:"",date:"2016-11-11",con:"车位充足，环境好"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"环境较好，服务到位"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"停车方便"}]},
								{name:"北岸世家停车库",parkID:"003",comment:[{userID:"15600562997",head_img:"",date:"2016-11-11",con:"车位充足，环境好"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"环境较好，服务到位"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"停车方便"}]},
								{name:"停车库",        parkID:"004",comment:[{userID:"15600562997",head_img:"",date:"2016-11-11",con:"车位充足，环境好"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"环境较好，服务到位"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"停车方便"}]},
								{name:"春风绿树停车库",parkID:"005",comment:[{userID:"15600562997",head_img:"",date:"2016-11-11",con:"车位充足，环境好"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"环境较好，服务到位"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"停车方便"}]},
								{name:"停车库",        parkID:"006",comment:[{userID:"15600562997",head_img:"",date:"2016-11-11",con:"车位充足，环境好"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"环境较好，服务到位"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"停车方便"}]},
								{name:"中信大厦停车库",parkID:"007",comment:[{userID:"15600562997",head_img:"",date:"2016-11-11",con:"车位充足，环境好"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"环境较好，服务到位"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"停车方便"}]},
								{name:"世纪金源停车库",parkID:"008",comment:[{userID:"15600562997",head_img:"",date:"2016-11-11",con:"车位充足，环境好"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"环境较好，服务到位"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"停车方便"}]},
								{name:"世纪中环停车库",parkID:"009",comment:[{userID:"15600562997",head_img:"",date:"2016-11-11",con:"车位充足，环境好"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"环境较好，服务到位"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"停车方便"}]},
								{name:"长安宁和停车场",parkID:"010",comment:[{userID:"15600562997",head_img:"",date:"2016-11-11",con:"车位充足，环境好"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"环境较好，服务到位"},{userID:"15600562997",head_img:"",date:"2016-11-11",con:"停车方便"}]},
								],"GET");


		//张悦 end  /////////////////////////////////////////////////////////
		//罗婷婷start   ////////////////////////////////////////////////////

		CASE("/app/getdata",TURN_ON,[
        	                       {number:"川E 45678",band:"奥迪A6"},
        	                       {number:"渝E 45678",band:"奥迪A6"},
        	                       {number:"川E 45678",band:"奥迪A6"},
        	                       {number:"川E 45678",band:"奔驰smart"},
        	                       {number:"渝E 45678",band:"奥迪A6"},
        	                       {number:"川E 45678",band:"逍客"},
        	                       {number:"川E 45678",band:"奥迪A6"},
        	                       {number:"渝E 45678",band:"奥迪A6"},
        	                       {number:"川E 45678",band:"奥迪A6"},
        	                       {number:"川E 45678",band:"奔驰smart"},
        	                       {number:"渝E 45678",band:"奥迪A6"},
        	                       ],
        	                       "GET");

        CASE("/app/getinfo",TURN_ON,[
        	                       {code:"TC123456",userID:"15600562997",parkID:"001",number:"川E 45678",pretime:"2015-11-22 19:30",time:"2",price:6.00,preprice:2.40,currentTime:"1:59:0",finsh:"交易完成"},
        	                       {code:"TC123456",userID:"18275569987",parkID:"002",number:"川E 45678",pretime:"2015-11-22 19:30",time:"2",price:6.00,preprice:2.40,currentTime:"1:1:0",finsh:"取消订单"}
        	                       ],
        	                       "GET");
       /* CASE("/app/getComment",TURN_ON,[{tel:"123456",date:"2015-11-27",comment:"环境较好，车位充足"},
        	{tel:"2344566",date:"2016-11-27",comment:"停车快速方便，服务到位"},
        	{tel:"123456",date:"2015-11-27",comment:"环境较好，车位充足"},
        	{tel:"123456",date:"2015-11-27",comment:"环境较好，车位充足"},
        	{tel:"123456",date:"2015-11-27",comment:"环境较好，车位充足"},
        	{tel:"123456",date:"2015-11-27",comment:"环境较好，车位充足"},
        	{tel:"123456",date:"2015-11-27",comment:"环境较好，车位充足"},
        	{tel:"123456",date:"2015-11-27",comment:"环境较好，车位充足"},
        	{tel:"123456",date:"2015-11-27",comment:"环境较好，车位充足v环境较好，车位充足环境较好，车位充足环境较好，车位充足环境较好，车位充足"},
        	],"GET");*/



        //罗婷婷end   /////////////////////////////////////////////////////////
        //肖思伟start   ///////////////////////////////////////////////////////
		CASE("/api/getData", TURN_ON, 
			[{
				title: "每人百元不封顶邀车主体验",
				date: "2015-11-22", 
				summary: "沉寂多年的“互联网+停车”行业如今有了新动向"
			},{
				title: "居民可通过“ETCP停车“APP......",
				date: "2015-11-15",
				summary:"官方微信等多种方式，领取百元停车劵，体验智能停车"
			},{
				title: "在各大商圈，停车难似乎更加成......",
				date: "2015-10-2",
				summary: "停车APP是如何解决停车难题、缓解停车"
			}], {method:"GET", costTime:0});

		CASE("/api/getCoupon", TURN_ON, 
			[{
				title: "百元停车劵码上领",
				image: "demoimg/newimg/pic.jpg", 
				summary: "居民可通过“ETCP停车”APP、官方微信等多种方式，领取百元停车劵。",
			}], {method:"GET", costTime:0});

		CASE("/api/getPage", TURN_ON, 
			[{
				name: "停车易代金劵",
				money: 8, 
				date: "2015-12-30",
				state:"未使用",
			},
			{
				name: "停车易代金劵",
				money: 8, 
				date: "2015-12-30",
				state:"未使用",
			},
			{
				name: "停车易代金劵",
				money: 8, 
				date: "2015-12-30",
				state:"已过期",
			}], {method:"GET"});

		


		//肖思伟end   /////////////////////////////////////////////////////////
		CASE("/api/refreshList", TURN_ON, function(netParams)
			{	
				var ret = 
				{
					
				};

				if(netParams.data.page === 0)
				{
					ret.total = parseInt(Math.random()*60);
				}

				ret.data = [];

				var images = ["http://blog.chinaunix.net/attachment/201404/1/26651460_1396326596UZGH.jpg"
        ,"http://blog.chinaunix.net/attachment/201404/1/26651460_1396326599GZ3U.jpg"
        ,"http://blog.chinaunix.net/attachment/201404/1/26651460_1396326608lY8C.jpg"
        ,"http://blog.chinaunix.net/attachment/201404/1/26651460_1396326626Q1rv.jpg"
        ,"http://img.ruanman.net/files/2014/05/103341335.jpg"
        ,"http://img5.imgtn.bdimg.com/it/u=1751735675,2912360032&fm=21&gp=0.jpg"
        ,"http://i2.sinaimg.cn/gm/2014/0917/U10751P115DT20140917110436.png"
        ,"http://blog.chinaunix.net/attachment/201404/1/26651460_1396326638Uopp.jpg"
        ,"http://blog.chinaunix.net/attachment/201404/1/26651460_13963266245gUx.jpg"
        ,"http://blog.chinaunix.net/attachment/201404/1/26651460_13963266108x09.jpg"
        ,"http://blog.chinaunix.net/attachment/201404/1/26651460_1396326611Tpn9.jpg"];
				
				for(var i=0,i_sz=netParams.data.pageSize; i<i_sz; ++i)
				{
					ret.data.push({label:"Hello "+i, icon:images[parseInt(Math.random()*1000)%images.length]});
				}

				return ret;
			});
		
		return config;
	});
}());