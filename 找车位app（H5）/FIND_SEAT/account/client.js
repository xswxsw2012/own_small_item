define([],function(){
	var Class = {};

	Class.getPage = function(data,success,error)
	{
		bin.netManager.doAPI({
			api:"/api/getPage",
			data:data,
			success:success,
			type:"GET",
			error:error,
			// option:{loading:true}
		})
	}

	return Class;
})