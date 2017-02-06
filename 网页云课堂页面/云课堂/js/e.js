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

/************************************部分公用函数**********************************************************************/

	//添加类名，如果类名存在，则不添加
	function addClassName(node,name){
		var arr = node.className.split('');
		if(node.className == ''){
			node.className = name;
		}else if(arr.indexOf(name) == -1){  //indexOf()返回-1表示要检索的字符串值没有出现
			node.className += ' ' + name;
		}
	}

	//删除类名，为了防止类名相同
	function removeClassName(node,name){
		var arr = [];
		if(node.className != ''){
			arr = node.className.split(' ');
			var _index = arr.indexOf(name); //找到name的位置
			if(_index != -1){
				arr.splice(_index,1);  //从index处开始删除元素
				node.className = arr.join(' ');
			}
		}
	}

	//设置参数格式(get方法中常用于向服务器查询某些信息，添加在URL的末尾，将信息发送给服务器)
	function serialize (data) {
		if(!data) return '';
		var pairs = [];
		for(var name in data){
			if(!data.hasOwnProperty(name)) continue;
			if(typeof data[name] == 'function') continue;
			var value = data[name].toString();
			name = encodeURIComponent(name);//查询字符串中每个参数的名称和值必须使用encodeURIComponent()进行编码
			value = encodeURIComponent(value);
			pairs.push(name + '=' + value);
		}
		return pairs.join('&'); //所有名-值对必须由和号(&)分隔
	}

	//封装get方法
	function get(url,data,callback){
		var xhr = new XMLHttpRequest();
		data = (data == ''&&data == ' ')?' ':data; //不太明白
		xhr.onreadystatechange = function(){ //在调用open()之前指定onreadystatechange事件处理程序确保跨浏览器兼容性
			if(xhr.readyState == 4){ //4表示已经接收到全部响应数据
				if(xhr.status >= 200 && xhr.status < 300||xhr.status == 304){//响应的HTTP状态，304表示请求的资源没有被修改，可以使用浏览器中缓存的版本,响应也是有效的
					callback(xhr.responseText); //作为响应主体被返回的文本
				}else{
					alert('Request was unsuccessfull:' + xhr.status);
				}
			}
		}
		if (data != ' ') {
			url += '?' + serialize(data); //在URL后加查询字符串
		}else {
			url += '?';
		}
		xhr.open('get',url,true); //true表示异步请求
		xhr.send(null);
	}

}