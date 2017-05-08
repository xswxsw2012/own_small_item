define(
	["bin/core/naviPageView"],
	function(Base)
	{
		var Class = {};
		Class.events = {
			"click #goback" : "goback",
			"click #comment" : "goComment",
			"click #appoint" : "goAppoint",
		}

		Class.goAppoint = function()
		{
			bin.naviController.push("ltt/predate");
		}
		Class.onViewPush = function(pushFrom, pushData)
		{
			this._pushData = pushData;
		}
		Class.goComment = function(){

			bin.naviController.push("ltt/comment",{data:this._pushData.data});
		}
		//这个是用于传递数据的，pushFrom是旧页面的数据，pushData是新页面的数据
		Class.posGenHTML = function()
		{

			this.$html(".bin-page-content",
			"<div class='header'>"+
    			"<div class='goback-comment'>"+
    				"<div id='goback' class='goback'><img src='demoimg/homeimg/jt.png'/></div>"+
    				"<div id='comment' class='comment'><img src='demoimg/parkimg/review.png'/></div>"+
    			"</div>"+
    			"<div class='title'>"+this._pushData.data.name+"</div>"+
    		"</div>"+
    	"<div class='detail-body'>"+
				"<div class='parkingSpace'>"+""+
    				"<div class='parkingSpace-total'><span class='total-num'>"+this._pushData.data.number_total+"</span><span class='total-tit'>总车位</span></div>"+
    				"<div class='parkingSpace-line'></div>"+
    				"<div class='parking-blank'><span class='blank-num'>"+this._pushData.data.number_blank+"</span><span class='blank-tit'>空车位</span></div>"+
    			"</div>"+
    			"<div class='detail-introduction'>"+
    				"<div class='detail-item'><span class='detail-tit'>类型</span><span class='detail-con'>"+this._pushData.data.type+"</span></div>"+
    				"<div class='detail-item'><span class='detail-tit'>价格</span><span class='detail-con'>"+this._pushData.data.price+"</span></div>"+
    				"<div class='detail-item'><span class='detail-tit'>位置</span><span class='detail-con'>"+this._pushData.data.position+"</span></div>"+
    				"<div class='detail-item'><span class='detail-tit'>电话</span><span class='detail-con'>"+this._pushData.data.tel+"</span></div>"+
    			"</div>"+
    		"</div>");
		}

		Class.goback = function(){
			bin.naviController.pop();
		}


		return Base.extend(Class);
	}
);
