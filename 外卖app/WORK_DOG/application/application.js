define(
["bin/core/spaApplication", "application/dataCenter", "css!application/css/demo.css"],
function(Base, DataCenter)
{
	var Application = {};

	Application.init = function()
	{
		Base.prototype.init.call(this);
	}

	Application.run = function()
	{
		bin.naviController.startWith("start/index", null, {onPushed:function()
		{
			$("#windowLoading").remove();
		}});
	}

	return Base.extend(Application);
});
