define(["ltt/client","bin/common/listView","bin/core/naviPageView"],function(client,ListView,Base){

	var Class ={};
    Class.events = {
    	"click #cancel":"cancel",
    	"click #commit":"write",
        "click .commentitem":"commentfun"
    }
    
    Class.commentfun = function(){
        bin.naviController.push("ltt/write");
    }
    Class.cancel = function(event){
        if($(event.currentTarget).text()=="取消订单"){
               bin.hudManager.alert({
        message:{text:"确定取消该订单?"},
        buttons:[
        {
            text:"确定",
            onClick:function(alertView){
                 $(event.currentTarget).parent().parent().css("background-color","#cacaca");
                 $(event.currentTarget).parent().siblings("#timecount").children("#currentTime").text("0");
                 $(event.currentTarget).text("已取消");
                 alertView.close();
            }

        },
        {
            text:"取消"
        },
        ]

     }) 
        }
   
    }

    // Class.onRemove = function()
    //     {
    //         this._refreshView.remove();
    //     }

    // Class.write = function(event){
    // }
     
    var ItemProvider = ListView.TemplateItemProvider.extend({
		 createItemView:function(listView,i,data){
		 	var v =ListView.TemplateItemProvider.prototype.createItemView.call(this, listView, i, data);
            var timecount = function(){ 
            var sum=0;
            var time = (v.$("#currentTime").text()).split(":");
            for(var i=0;i<time.length;i++){
                time[i]=parseInt(time[i]);
                sum=sum+time[i];
            }
             if(sum>0){
                if(time[2]>0){
                time[2]=time[2]-1;
             }
                if(time[2]==0){
                     time[2]=60;
                     time[1]=time[1]-1;
                }
                if(time[1]==-1){
                    time[1]=60+time[1];
                    time[0]=time[0]-1;
                }
                v.$("#currentTime").text(time[0]+":"+time[1]+":"+time[2]);
               
                 var tm=setTimeout(timecount,1000);
             }
            
            }
            timecount();


            if(v.$("#cancel").text()=="交易完成"){
                v.$("#timeimg").css("background-image", "url('demoimg/orderimg/Write.png')");
                v.$("p").remove("#currentTime");
                v.$("#timein").text("评价").addClass("commentitem");
                v.$("#timecount").css("padding-left","7rem");

            }
		    return v;
		 }
	});


    Class.posGenHTML = function (){
       

         // Base.prototype.genHTML.call(this);
        this._listView = new ListView(
                {elem:this.$("#listView"), 
                itemProvider:new ItemProvider({template:this.$html("#template-item")}), 
                dataProvider:new ListView.DataProvider(
                    {
                     loadAPI:function(params,success,error){
                        client.getInfo({},function(data1){
                            var ret = {code:200,data:{}};
                            var data = ret.data;

                            if(params.page ==0){
                                data.total =3;
                                data.pageSize = 20;
                            }

                            data.data = [];
                            for(var i=0;i<data1.data.length;++i){
                                data.data.push(data1.data[i]);
                            }
                            success(ret);
                        }
                    )
                       
                    }
                }
                    )
            });
    	    
    	
    }
    // Class.asyncPosGenHTML = function()
    // {
    //      var self = this;
    //     var tm ;  
    // }




	return bin.ui.NaviPageView.extend(Class);
})