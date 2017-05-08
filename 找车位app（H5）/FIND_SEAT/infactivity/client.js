define([],function(){
	var Class = {};

	Class.getData = function(data, success, error)
	{
		bin.netManager.doAPI({
			api:"/api/getData",
			data:data,
			success:success,
			type:"GET",
			error:error,
			option:{loading:true}
		})
	}

	Class.getCoupon = function(data,success,error)
	{
		bin.netManager.doAPI({
			api:"/api/getCoupon",
			data:data,
			success:success,
			type:"GET",
			error:error,
			option:{loading:true}
		})
	}


	return Class; 
})