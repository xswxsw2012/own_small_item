define([],function(){
	var Class = {};
	Class.getData= function(data,success,error){
		bin.netManager.doAPI({
			api:"/app/getdata",
			data:data,
			success:success,
			type:"GET",
			error:error,
			option:{loading:true}
		})
	}


	Class.getInfo = function(data,success,error){
		bin.netManager.doAPI({
			api:"/app/getinfo",
			data:data,
			success:success,
			type:"GET",
			error:error,
			option:{loading:false}
		})
	}

	Class.getComment = function(data,success,error){
		bin.netManager.doAPI({
			api:"/app/getComment",
			data:data,
			success:success,
			type:"GET",
			error:error,
		})
		}

	return Class;
})
