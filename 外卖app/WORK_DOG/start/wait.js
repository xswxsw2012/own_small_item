define(["bin/core/naviPageView","bin/core/view",],function(Base,View){
	Class = {};

	Class.vmMethod_goOrder = function()
	{
		bin.naviController.push("start/index");
	}

	return Base.extend(Class);
});