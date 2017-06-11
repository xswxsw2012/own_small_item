(function()
{
	var config = {};
	var TURN_ON  = true;
	var TURN_OFF = false;

	var CASE = function(api, on, data, options)
	{
		if(on)
		{
			if(typeof(options) === "string")
			{
				options = {method:options};
			}

			config[api] = {data:data, options:options};
		}
	}

	var NET_DATA_GENERATOR = function(generator)
	{
		config._netDataGenerator = generator;
	}

	
	define(
	[],
	function()
	{
		
		CASE("/api/getMenu", TURN_ON, "file!./data/groups.json", "GET"); 
		
		
		return config;
	});
}());