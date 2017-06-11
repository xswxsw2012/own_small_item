define([],function(){
	var Class = {};

	Class.getInf = function(success)
	{
		bin.netManager.doAPI({
			api:"/api/dog",
			success:success,
			type:"POST",
			data:{a:10,b:"Hello"}
			//error:error,
			//option:{loading:true}
		})
	}

	Class.getMenu = function(data, success, error)
	{
		bin.netManager.doAPI({
			api:"/api/getMenu",
			data:data,
			success:success,
			type:"GET",
			error:error,
			option:{loading:false}
		})
	}

	return Class;
})