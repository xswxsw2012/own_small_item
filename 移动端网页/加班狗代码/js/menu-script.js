var customers = [
	{
		name: '阿国是糖',
		pic: 'images/client1.jpg',
		menus: [
			{
				menu: "蒙面耗儿鱼",
				price: '￥238',
				count: 1
			},
			{
				menu: "李子坝梁山鸡",
				price: '￥238',
				count: 1
			}
		]
	},
	{
		name: '小小小红帽子',
		pic: 'images/client2.jpg',
		menus: [
			{
				menu: "蒙面耗儿鱼",
				price: '￥238',
				count: 2
			},
			{
				menu: "李子坝梁山鸡",
				price: '￥238',
				count: 5
			}
		]
	}
];
Vue.component('modal-dialog',{
	template: '#dialog-template',
	props:['show'],
	methods:{
		close:function(){
			this.show = false
		}
	}
})
new Vue({
	el: 'body',
	data: {
		items: customers,
		show: false,
		dialogClass: 'dialogClass'
	},
	computed: {
		icount:function(){
			var number = this.items;
			var icount = 0;
			for(var i = 0; i<number.length; i++){
				for(var j=0;j<number[i].menus.length;j++){
					icount += number[i].menus[j].count;
				}
			}
			return icount;
		}
	},
	methods: {
		reduce:function(outindex,index){
			var number = this.items;
			if(number[outindex].menus[index].count == 0){
				return false;
			}else{
				number[outindex].menus[index].count --;
			}
		},
		add:function(outindex,index){
			var number = this.items;
			if(number[outindex].menus[index].count == 10){
				return false;
			}else{
				number[outindex].menus[index].count ++;
			}
		},
		openDialog: function(){
			this.show = true,
			this.dialogClass='dialoginfo'
		},
		closeDialog: function(){
			this.show = false,
			this.dialogClass='dialogClass'
		},
		sureDialog: function(){
			
		}
	}
})
