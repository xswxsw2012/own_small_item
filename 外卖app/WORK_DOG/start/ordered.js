define(["bin/core/naviPageView","bin/core/view","bin/common/alertView"],function(Base,View,alertView){
	Class = {};
	var data = {};
	var total = 0;

	Class.events = {
		"click .sub":"sub",
		"click .plus":"plus",
		"click .pre":"pre"
	}

	Class.vmMethod_showAlert = function()
	{
		var onClick = function(alertView,title){
			if (title == "确认") {
				bin.naviController.push("start/wait");
				alertView.close();
			} else {
				alertView.close();
			}
		}

		bin.hudManager.alert(
		{
			message:{text:"确定让厨房开始制作菜品了吗？"},
			buttons:
			[
				{text:"确认",color:"red",onClick:onClick},
				{text:"取消",color:"red",onClick:onClick}
			]
		});
	}

	Class.pre = function(){
		bin.naviController.pop();
	}

	Class.plus = function(e)
	{
		var node = $(e.currentTarget).parent().children("#newNum");
		var number = node.val();
		if (parseInt(number) >= 0 && parseInt(number) < 100) {
			node.val(parseInt(number)+1);
			total++;
			$("#amount").html(total);
		}
	}

	Class.sub = function(e)
	{
		var node = $(e.currentTarget).parent().children("#newNum");
		var number = node.val();
		if (parseInt(number) > 0 ) {
			node.val(parseInt(number)-1);
			total--;
			$("#amount").html(total);
		}
	}

	Class.asyncPosGenHTML = function()
	{
		console.log(data);
		var divItem = $('<div class="item"></div>'),
		    divHead = $('<div class="head"><span class="head-img"></span><span class="head-name">'+data[0].name+'</span></div>');
		$("#food").append(divItem);
		$(".item").append(divHead);
		for (let i = 0; i < data[0].menus.length; ++i) {
			let divContent = $('<div class="cont" id="cont"></div>'),
				divName = $('<div class="name">'+data[0].menus[i].name+'</div>'),
				divPrice = $('<div class="price"><span class="prix">'+data[0].menus[i].price+'</span><span class="unit">'+data[0].menus[i].unit+'</span><div>'),
				divIcon = $('<div class="icon"><span id="sub" class="sub">'+'</span><input class="newNum" id="newNum" value='+data[0].menus[i].number+'>'+'<span id="plus" class="plus"></span></div>');
			$("#food").append(divContent);
			$("#cont").append(divName);
			$("#cont").append(divPrice);
			$("#cont").append(divIcon);
			total += parseInt(data[0].menus[i].number);
		}
		$("#amount").html(total);
		$(".head-img").css({'background-image':'url('+data[0].src+')'});
		$(".cont:first").css({"height":+1.92*data[0].menus.length+"rem"});
	}

	Class.onViewPush = function(pushFrom, pushData, queryParams)
	{
		data = pushData;
	}

	return Base.extend(Class);
});