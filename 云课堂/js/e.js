window.onload=function(){
	//banner轮播图
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
}