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

/***********************************获取课程数据***********************************************************/
	var setCourse = {
		url:'http://study.163.com/webDev/couresByCategory.htm',
		//添加元素
		addElements:function(getdata){
			var _data = JSON.parse(getdata),li,div,img,h4,span,em,strong,h_div,h_img,h_i,h_em,h_span1,h_span2,h_p,elem;
			var pd = document.getElementsByClassName('m-pd')[0];
			var pl = document.getElementsByClassName('m-pl')[0];
			if(getComputedStyles(pd).display == 'block'){  //getComputeStyles()方法返回CSSStyleDeclaration对象，其中包含当前元素的所有计算的样式
				elem = pd;
			}else{
				elem = pl;
			}
			for(var i = 0;i <_data.list.length;i++){
				//创建hover前的节点，展示节点
				li = document.createElement('li');
				div = document.createElement('div');
				img = document.createElement('img');
				h4 = document.createElement('h4');
				span = document.createElement('span');
				em = document.createElement('em');
				strong = document.createElement('strong');
				//创建hover后的节点，展示节点
				h_div = document.createElement('div');
				_div = document.createElement('div');
				h_img = document.createElement('img');
				h_i = document.createElement('i');
				h_em = document.createElement('em');
				h_span1 = document.createElement('span');
				h_span2 = document.createElement('span');
				h_p = document.createElement('p');
				//设置展示节点属性和内容
				li.setAttribute('class','m-card');
				div.setAttribute('class','card');
				img.setAttribute('src',_data.list[i].middlePhotoUrl);
				img.setAttribute('alt',_data.list[i].name);
				h4.innerHTML = _data.list[i].name;
				span.innerHTML = _data.list[i].provider;
				em.innerHTML = _data.list[i].learnerCount;
				if(_data.list[i].price == 0){
					strong.innerHTML = '免费';
				}else{
					strong.innerHTML = '&yen;' + _data.list[i].price;
				}
				//设置隐藏节点属性和内容
				h_div.setAttribute('class','hover');
				h_i.setAttribute('class','p-title');
				h_p.setAttribute('class','description');
				h_img.setAttribute('src',_data.list[i].bigPhotoUrl);
				h_img.setAttribute('alt','_data.list[i].name');
				h_em.innerHTML = _data.list[i].name;
				h_em.innerHTML = _data.list[i].learnerCount;
				h_span1.innerHTML = '发布者：' + _data.list[i].provider;
				if(_data.list[i].categoryName == null){
					h_span2.innerHTML = '分类：无';
				}else{
					h_span2.innerHTML = '分类：' + _data.list[i].categoryName;
				}
				h_p.innerHTML = _data.list[i].description;
				elem.appendChild(li);   //把li标签连接到ul上
				li.appendChild(div);
				div.appendChild(img);
				div.appendChild(h4);
				div.appendChild(span);
				div.appendChild(em);
				div.appendChild(strong);
				li.appendChild(h_div);  //把hover的div连接到li标签上
				h_div.appendChild(_div);
				_div.appendChild(h_img);
				_div.appendChild(h_i);
				_div.appendChild(h_em);
				_div.appendChild(h_span1);
				_div.appendChild(h_span2);
				h_div.appendChild(h_p);
				(function(div,h_div){
					var handler1 = function(event){
						div.style.display = 'none';
						h_div.style.display = 'block';
					};
					var handler2 = function(event){
						h_div.style.display = 'none';
						div.style.display = 'block';
					} ;
					EventUtil.addHandler(div, "mouseover", handler1);
					EventUtil.addHandler(h_div, "mouseleave", handler2);
				})(div,h_div);
			}
			var list = elem.getElementsByClassName('m-card'),n=0; //从指定的elem中找m-card，速度比document快得多
			//固定定位布局课程列表
			if(list.length >= 20){
				for(var i = 0; i < 5; i++){
					for(var j = 0; j < 4; j++){
						list[n].style.left = j*240 + "px";
						list[n].style.top = i*245 + "px";
						n++;
						if(n>20) break;
					};
				}
			}
			else{
				for(var i = 0; i < 3; i++){
					for(var j = 0 ;j < 4; j++ ){
						list[n].style.left = j*240 + "px";
						list[n].style.top = i*245 + "px";
						n++;
						if(n>list.length) break;
					};
				}
			}
		}
	}
	//设置课程请求参数，但是不能够动态修改查询的个数，需要刷新
	function parameters(){
		function type(){ //筛选类型
			var pc = document.getElementById('product-design'),
				style = getComputedStyles(pc).display;
			if(style == 'block'){
				return 10; //10表示类型是产品设计
			}else{
				return 20; //20表示类型是编程语言
			}
		}
		function querySize(){ //每页返回数据个数
			var x = window.innerWidth;
			if(x <= 1205){
				return 15;
			}else{
				return 20;
			}
		}
		var data = {'pageNo':1,'psize':querySize(),'type':type()};
		return data;
	}
	get(setCourse.url,parameters(),setCourse.addElements); //调用get请求

	//实现产品设计和编程语言的点击切换
	var t_pc = document.getElementById('pc'),
		t_pl = document.getElementById('pl'),
		pc = document.getElementById("product-design"),
		pl = document.getElementById("programing-language"),
		handler3 = function(event){  //点击产品执行的操作
			removeClassName(t_pl,'active');
			addClassName(t_pc,'active');
			pc.style.display = 'block';
			pl.style.display = 'none';
			// pc.innerHTML = '';
			get(setCourse.url,parameters(),setCourse.addElements);
		},
		handler4 = function(event){  //点击编程语言执行的操作
			removeClassName(t_pc,'active');
			addClassName(t_pl,'active');
			pc.style.display = 'none';
			pl.style.display = 'block';
			pl.innerHTML = '';
			get(setCourse.url,parameters(),setCourse.addElements);
		};

	EventUtil.addHandler(t_pc, "click", handler3);  //点击产品设计
	EventUtil.addHandler(t_pl, "click", handler4);  //点击编程语言

	//分页选择
	function selectPage(){    //分页操作中编程语言不能按页请求，转换时也不能对应当前页(这个功能没做)
		var libtn = document.getElementsByClassName('l-btn')[0].getElementsByTagName('li'),elem;
		function estyle(){
			var pc = document.getElementById('product-design'),
				pl = document.getElementById('programing-language'),
				style = getComputedStyles(pc).display;
			if(style = 'block'){
				return pc;
			}else{
				return pl;
			}
		}
		for(var i = 0; i < libtn.length; i++){
			(function(i){
				if(i != 0 && i != libtn.length-1){

					var handler5 = function(event){  //点击分页按钮执行的操作
						for(var j = 0; j < libtn.length; j++){
							removeClassName(libtn[j],'checked');
						}
						var x = parameters(); //parameters()是一个函数，也可看做对象
						x.pageNo = i;        //parameters()返回的是一个对象，这里在动态修改pageNo参数，确定每页请求到的数据
						addClassName(libtn[i],'checked');
						elem = estyle();  //获得class确定当前显示的页面
						elem.innerHTML='';
						get(setCourse.url,x,setCourse.addElements); 
					}
					EventUtil.addHandler(libtn[i], "click", handler5);  //添加点击分页事件
				}
			})(i);
		}
	}
	selectPage();  //运行选择页面函数

/*************************************点击播放视频和关闭视频******************************************/
	var cvideo = document.getElementsByClassName('content5-3-3')[0],
		pvideo = document.getElementsByClassName('g-pop')[0],
		closev = document.getElementById('v-close'),

		handler6 = function(event){
			pvideo.style.display = 'block';
		},
		handler7 = function(event){
			pvideo.style.display = "none";
			video.pause();  //暂停视频
		}

		EventUtil.addHandler(cvideo, "click", handler6);  //添加点击播放视频的事件 
		EventUtil.addHandler(closev, "click", handler7);  //添加关闭视频的事件


/*************************************右侧最热排行*****************************************************************/
	var topCourse = {
		url:'http://study.163.com/webDev/hotcouresByCategory.htm',
		addElements:function(getdata){
			var _data = JSON.parse(getdata),div,li,img,a,span;
			var ul = document.getElementById('t-list');
			for(var i = 0; i < _data.length; i++){
				li = document.createElement('li');
				img = document.createElement('img');
				a = document.createElement('a');   //创建标签s
				span = document.createElement('span');
				img.setAttribute('src',_data[i].smallPhotoUrl);
				a.innerHTML = _data[i].name;  //给标签添加内容
				span.innerHTML = _data[i].learnerCount;
				ul.appendChild(li);
				li.appendChild(img);
				li.appendChild(a);
				li.appendChild(span);
			}
		}
	}
	get(topCourse.url,'',topCourse.addElements);  //给右侧最热排行请求数据

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
					// console.log(xhr.responseText);
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

	//获取原有样式，getComputedStyles()方法返回CSSStyleDeclaration对象，其中包含当前元素的所有计算的样式
	function getComputedStyles(element){
		if(window.getComputedStyle){
			return window.getComputedStyle(element);  //火狐浏览器
		}else{
			return element.currentStyle;   //IE浏览器
		}
	}
}