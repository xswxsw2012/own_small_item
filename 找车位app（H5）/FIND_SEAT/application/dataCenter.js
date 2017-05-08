define(
["bin/core/dataCenter"],
function(DataCenter)
{
	var Class = {};
	// var wait=20;
	Class.setUserName = function(data)
	{
		this.setUserValue("username", data);
	}
	Class.getUserName = function()
	{
		var username = this.getUserValue("username");
		return username;
	}

	Class.setCouponNum = function(data)
	{
		this.setUserValue("couponnum", data);
	}
	Class.getCouponNum = function()
	{
		var couponnum = this.getUserValue("couponnum");
		return couponnum;
	}

	Class.setUserNameL = function(data)
	{
		this.setUserValue("usernameL", data);
	}
	Class.getUserNameL = function()
	{
		var usernameL = this.getUserValue("usernameL");
		return usernameL;
	}

	// Class.time = function(e){
			
 //            // wait = getCookieValue("secondsremained");
 //            if(wait == 0){
 //                e.$(".sureBtn").css("background-color","#019a66");
 //                e.$(".sureBtn").attr("value","获取验证码");
 //                processing = false;
 //                wait = 20;
 //            }else{
 //            	e.$(".sureBtn").attr("disabled",true);
 //                e.$(".sureBtn").css("background-color","gray");
 //                e.$(".sureBtn").attr("value","重新发送（" + wait + "）");
 //                wait--;
 //                // editCookie("secondsremained",wait,wait+1);
 //                processing = true;
 //                setTimeout(function(){  //等一秒再执行time（）函数
 //                    bin.dataCenter.time(e)
 //                },1000)
 //            }
        

	// }
	
	return DataCenter.extend(Class);
});