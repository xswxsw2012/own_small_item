define(["bin/core/pageView"], function(Base){

	var Class = {};
	var self = this;

	Class.events = 
	{
		"click .close-imgbtn" : "closeBtn",
		"click .red-get" : "getBtn",
	}

	Class.closeBtn = function()
	{
		bin.naviController.pop(1);
	}

	Class.getBtn = function()
	{
		self.$(".get-span i").removeClass("get-img");
		self.$(".get-span i").addClass("get-img-out");
	}

	return Base.extend(Class);
});