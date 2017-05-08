define([],function(){
	var Class = {};
	Class.getData = function(data,success,error){
			bin.netManager.doAPI({
			data:data,
			success:success,
			error: error,
			api:"/api/aroundPark",
			type:"GET",
			option:{loading:true}
		})
	}
	return Class;
})
