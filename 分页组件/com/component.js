var pager = {
	props: {
		pagerData:{
			type:Object,
			default:function(){
				return{
					data:[],
					rows:[],
					page:{}
				}
			}
		},
		prevHtml: String,
		nextHtml: String
	},
	template: '<div class="form-group">\
				   <table class="table table-responsive table-striped">\
			   		   <tr>\
					        <th v-for="item in pagerData.rows">{{item}}</th>\
				       </tr>\
				       <tr v-for="dataItem in pagerData.data">\
					        <td v-for="item in dataItem">{{item}}</td>\
				       </tr>\
			       </table>\
			       <nav class="zpagenav">\
					   <span class="form-inline">\
						   <select class="form-control" v-model="pageRows" v-on:change="showPage(pageCurrent,$event)" number>\
							   <option v-for="item in pagerData.page.arrPageRows" v-bind:value="item">{{item}}</option>\
						   </select>\
					   </span>\
                       <ul class="page-ul">\
                           <li class="btn" v-bind:key="index" v-for="(item,index) in pageList" v-bind:class ="item.class" v-on:click.stop="showPage(item.pageLi,$event,true)" v-html="item.html">\
                           </li>\
                       </ul>\
                       <span class="form-inline">\
					       前往 <input class="form-control" style="width:60px;text-align: center;" type="text" v-model="pageCurrent" v-on:keyup.enter="showPage(mypageCurrent,$event,true)"> 页\
				       </span>\
                   </nav>\
			  </div> ',
	data:function(){                                            //子组件中需要变动的数据，交互需要
		return{
			mypageRows:10,                                     //每页显示10条数据，子组件数据声明初始化
			mypageCurrent:1,                                   //当前页码第一页，子组件数据声明初始化
		}
	},
    mounted: function () {
        this.pagerData.rows = testData[0];
    },
	computed:{
  	                                                           //分页大小 获取的时候显示父级传入的，子组件要修改父组件的值需要通过绑定和监听函数
		pageRows:{                                            //读取和设置pageRows，值必须为函数
			get:function(){                                   //读取分页大小,来自pager
				return this.pagerData.page.pageRows;
			},
			set:function(value){                              //设置分页大小
				this.mypageRows = value;
			}
		},
		pageCurrent:{                                         //读取和设置当前页面，值必须为函数
			get:function(){                                   //读取当前页面
				return this.pagerData.page.pageCurrent;
			},
			set:function(value){                              //设置当前页面
				this.mypageCurrent = value;
			}
		},
		pageList: function () {                               //整个pageList的表现形式有3种，需要分情况讨论。
            var _this = this, pageList = [];                  //定义pageList
            let totalPage = this.pagerData.page.totalPage;    //计算页面总数
            let pageCurrent = _this.pagerData.page.pageCurrent;                      //初始pageCurrent为1
            let prevHtml = _this.prevHtml ? _this.prevHtml : '&lt;';                 //转意字符<
            let nextHtml = _this.nextHtml ? _this.nextHtml : '&gt;';                 //转意字符>
            let pageSize = _this.pageSize ? _this.pageSize : this.pagerData.page.pageSize;//

            let hasPrev = pageCurrent > 1;                                          //当前页面大于1就会出现向前图标<
            let hasNext = pageCurrent < totalPage;                                  //当前页面小于总页面数就会出现向后图标>
            
            pageList.push({                                                         //上一页，设置页面符号<页面的样式和内容
                class: hasPrev ? '' : 'disabled',                                   //向前图标<出现就不加样式，否则添加不可点击样式
                pageLi: hasPrev ? pageCurrent - 1 : pageCurrent,                    //如果向前图标<出现则页面可以减，否则页面不可以减
                html: prevHtml                                                      //向前图标转意字符<
            });

            pageList.push({                                                         //首页，设置第1页页面的样式和内容
                class: pageCurrent == 1 ? 'active' : '',                            //如果当前页面为第1页，则添加active样式，否则不添加任何样式
                pageLi: 1,                                                          //页面选择1
                html: 1
            });

            var p1 = pageSize - 2;                                                  //显示pageLi的个数
            var start, end;                                                         //判断需要加...的情况
            if (pageCurrent >= p1 && pageCurrent < totalPage - p1 + 1) { 
                start = pageCurrent - 1;                                            //开始的页面start为选择的页面减1
                pageList.push({                                                     //在开始的页面start前面放置省略号...
                    class: 'dot',
                    pageLi: pageCurrent,
                    html: '...'
                });
            } 
            else if( pageCurrent >= totalPage - p1 + 1){
            	start = totalPage - p1 + 1;
            	pageList.push({                                                     //在开始的页面start前面放置省略号...
                    class: 'dot',
                    pageLi: pageCurrent,
                    html: '...'
                });
            }
            else {                                                                 //其他情况开始的页面start为2
                start = 2;
            }

            var p2 = parseInt(pageCurrent) + 1;                                    //紧接着page后的页面加1,分三种情况讨论。
            if ( p2 < p1 ) {    
            	end = p1;
            } 
            else if ( p2 >= p1 && p2 < totalPage - p1 + 2 ) {  
                end = p2;                                                         //紧接着page后的end为p2
            } 
            else {                                                                //其他情况end为页面总数减1
                end = totalPage - 1;
            }
                                                                                 //页码列表，设置start到end页面li的样式和内容
            for (var i = start; i <= end; i++) {                                 //设置start到end页面li的样式和内容
                pageList.push({
                    class: pageCurrent == i ? 'active' : '',
                    pageLi: i,
                    html: i
                });
            }


            if (end < totalPage - 1 && pageCurrent < totalPage - p1 + 1) {       //设置end小于页面总数减1的情况，end后一个页面li的内容和样式
                                                                                 //后置省略号，设置end小于页面总数减1的情况，end后一个页面li的内容和样式
                pageList.push({
                    class: 'dot',
                    pageLi: pageCurrent,
                    html: '...'
                });
            }
                                                                                 //尾页，设置省略号...后一个页面li的样式和内容
            if (totalPage > 1) {                                                 //设置省略号...后一个页面li的样式和内容
                pageList.push({
                    class: pageCurrent == totalPage ? 'active' : '',
                    pageLi: totalPage,
                    html: totalPage
                });
            }
                                                                                //下一页，设置最后一个li为符号>的样式和内容
            pageList.push({                                                     //设置最后一个li为符号>的样式和内容
                class: hasNext ? '' : 'disabled',
                pageLi: hasNext ? pageCurrent + 1 : pageCurrent,
                html: nextHtml
            });
            return pageList;
        }
	},
	methods:{
		                                                                      //要显示的页面
		showPage: function(pageIndex,$event){                                 //$event用于在内联语句中访问原生DOM事件
			if (pageIndex > 0) {
				if (pageIndex > this.pagerData.page.totalPage) {              //选择的页面大于总的页面就选最后的页面
					pageIndex = this.page.totalPage;
				}
				this.$emit('show-page',{pageCurrent:pageIndex,pageRows:this.mypageRows});//触发showPage事件，传递第几页和页面大小	
			}
		}
	}
}