define([],function(){
	var Class ={};
	var pushData01;
	Class.onViewPush = function(pushFrom,pushData){
		pushData01 = pushData.data;
		console.log("这里是write接收的数据"+pushData);
	}


	Class.onRight = function()
	{	

		var comment = this.$("#write").val();
		var mydate = new Date();
		var date_str = "" + mydate.getFullYear()+"-"+(mydate.getMonth()+1)+"-"+mydate.getDate();
		var data = {comment:{con:comment,date:date_str,head_img:"",userID:"123456",},park_con:pushData01};
		//console.log("witeadfadsfasdf:"+this._pushData);
		bin.naviController.push("ltt/comment",{data:data});
	}


	// Class.goComment = function(){

	// 	bin.naviController.push("ltt/comment",{data:this._pushData.data});
	// }
	return bin.ui.NaviPageView.extend(Class);
})
