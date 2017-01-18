window.onload=function(){
/***************************************banner轮播图*****************************************************/
	var picture0=document.getElementById('picture0');
	var picture1=document.getElementById('picture1');
	var buttons=document.getElementById('buttons').getElementsByTagName('span');
	var index=1;
	var animated=false;
	var interval=3000;
	var timer;



	function showButton(){
		for(var i=0;i<buttons.length;i++){
			if(buttons[i].className=='on'){
				buttons[i].className='';
				break;
			}
		}
		buttons[index-1].className='on';
	}
	function animate(offset){
		animated=true;
		var newLeft=parseInt(picture1.style.left)+offset;
		var time=300;   //位移时间
		var interval=10;  //位移间隔时间
		var speed=offset/(time/interval);  //每次位移量
		function go(){
			if((speed<0&&parseInt(picture1.style.left)>newLeft)||(speed>0&&parseInt(picture1.style.left)<newLeft)){
				picture1.style.left=parseInt(picture1.style.left)+speed+'px';
				setTimeout(go,interval);
			}
			else{
				animated=false;
				picture1.style.left=newLeft+'px';
				if(newLeft>-1348){
					picture1.style.left=-4044+'px';
				}
				if(newLeft<-4044){
					picture1.style.left=-1348+'px';
				}
			}
		}
		go();
	}
	function play(){
		timer=setInterval(contin,interval);
	}
	function stop(){
		clearInterval(timer);
	}
	function contin(){
		if(index==3){
			index=1;
		}
		else{
			index+=1;
		}
		showButton();
		if(!animated){
			animate(-1348);
		}
	}
	for(var i=0;i<buttons.length;i++){
		buttons[i].onclick=function(){
			if(this.className=='on'){
				return;
			}
			var myIndex=parseInt(this.getAttribute('index'));
			var offset=-1348*(myIndex-index);

			if (!animated) {
				animate(offset);
			}
			index=myIndex;
			showButton();
		}
	}
	picture0.onmouseover=stop;
	picture1.onmouseover=play;
	play();

/*************************关闭顶部通知条，cookie实现************************本地获取不到，可能要服务器******************/
	//取节点
	var touBtn = document.getElementsByClassName("tou1-4")[0];
	var tou = document.getElementsByClassName("tou")[0];
	var toucookie,key;

	//跨浏览器事件
	var EventUtil = {
		addHandler: function(element, type, handler){
			if(element.addEventListener){
				element.addEventListener(type, handler, false);
			}else if(element.attachEvent){
				element.attachEvent("on" + type, handler);
			}else{
				element["on" + type] = handler;
			}
		},
		removeHandler: function(element, type, handler){
			if(element.removeEventListener){
				element.removeEventListener(type, handler, false);
			}else if(element.detachEvent){
				element.detachEvent("on" + type, handler);
			}else{
				element["on" + type] = null;
			}
		}
	};

	//点击头部关闭按钮执行函数
	var handler = function(){
		setCookie("toucookie","123",1000);
		// document.cookie = "key=123";
		console.log(getCookie("toucookie"));
		// checkCookie();
		tou.style.display = "none";

	};

	EventUtil.addHandler(touBtn, "click", handler);


	//创建cookie
	function setCookie(c_name,value,expiredays)
	{
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	}

	//得到cookie
	function getCookie(name)
	{
		if (document.cookie.length > 0) 
		{
			start = document.cookie.indexOf(name + "=");
			if(start != -1){
				start += name.length + 1;
				end = document.cookie.indexOf(";",start);
				if (end == -1) 
				{
					end = document.cookie.length;
				}
				return unescape(document.cookie.substring(start,end))
			}
		}
		return ""
	}

	//检测cookie
	function checkCookie()
	{
		toucookie = getCookie('toucookie')
		if (toucookie!=null && toucookie!="") 
		{
			alert('Welcome again' +toucookie+'!')
		}else{
			toucookie=prompt('Please enter your name:',"")
			if(toucookie!=null&&toucookie!=""){
				setCookie('toucookie',123,365)
			}
		}
	}


}