define(["bin/core/naviPageView","application/dataCenter.js"], function(Base,DataCenter){

    var Class = {};
    var self = this;
    var wait = 20;
    var processing = false;

    Class.events = 
    {
    	"click .pic" : "picBtn",
        "click .sureBtn" : "sureBtn",
        "click .proving" : "provBtn",
    }

    Class.posGenHTML = function()
    {
        var self = this;

        self.$(".phonetest").on("input", function(){   //填写手机号码，验证码框变色
            var username = self.$(".phonetest").val();
            if(username.length == 11){
                self.$(".sureBtn").css("background-color","#019a66");
                // bin.dataCenter.setUserName(username);    //把手机号码保存到本地                self.$(".sureBtn").css("background-color","#60c9a3");
            }else{
                self.$(".sureBtn").css("background-color","#60c9a3");
            }
        });


        self.$(".sureInput").on("input", function(){    //填写验证码，登录框变色
            if((self.$(".sureInput").val().length == 6)&&(self.$(".phonetest").val().length == 11)){ 
                self.$(".proving").css("background-color","#019a66");
                // alert(self.$(".proving").attr("background-color"));
            }else{
                self.$(".proving").css("background-color","#60c9a3");
            }
        });

    }

    Class.picBtn = function(){
        if(self.$(".pic span").is(".background")){
            self.$(".pic span").removeClass("background");
        }else{
            self.$(".pic span").addClass("background");
        }    
    }

    Class.sureBtn = function()   //定时器功能
    {

    // //设置cookie

    // //发送验证码时添加cookie
    // function addCookie(name,value,expiresHours){ 
    //     var cookieString=name+"="+escape(value); 
    //     //判断是否设置过期时间,0代表关闭浏览器时失效
    //     if(expiresHours>0){ 
    //         var date=new Date(); 
    //         date.setTime(date.getTime()+expiresHours*1000); 
    //         cookieString=cookieString+";expires=" + date.toUTCString(); 
    //     } 
    //         document.cookie=cookieString; 
    // } 
    // //修改cookie的值
    // function editCookie(name,value,expiresHours){ 
    //     var cookieString=name+"="+escape(value); 
    //     if(expiresHours>0){ 
    //       var date=new Date(); 
    //       date.setTime(date.getTime()+expiresHours*1000); //单位是毫秒
    //       cookieString=cookieString+";expires=" + date.toGMTString(); 
    //     } 
    //       document.cookie=cookieString; 
    // } 
    // //根据名字获取cookie的值
    // function getCookieValue(name){ 
    //       var strCookie=document.cookie; 
    //       var arrCookie=strCookie.split("; "); 
    //       for(var i=0;i<arrCookie.length;i++){ 
    //         var arr=arrCookie[i].split("="); 
    //         if(arr[0]==name){
    //           return unescape(arr[1]);
    //           break;
    //         }
    //       } 
           
    // }


        if(!(self.$(".phonetest").val().length == 11)) return;
        if(processing) return;
        // bin.dataCenter.time(this);
         time(self); 
         // addCookie("secondsremained",60,60);//添加cookie记录,有效时间60s
         // v = getCookieValue("secondsremained")?getCookieValue("secondsremained"):0 ;
        // if(v == 0){
        //     // addCookie("secondsremained",60,60);//添加cookie记录,有效时间60s
        //     time(self);      //启动定时器
        // }
        



        function time(e){
            // wait = getCookieValue("secondsremained");
            if(wait == 0){
                e.$(".sureBtn").css("background-color","#019a66");
                e.$(".sureBtn").attr("value","获取验证码");
                e.$(".sureBtn").attr("disabled",false);
                // processing = false;
                wait = 20;
            }else{
                e.$(".sureBtn").attr("disabled",true);
                e.$(".sureBtn").css("background-color","gray");
                e.$(".sureBtn").attr("value","重新发送（" + wait + "）");
                wait--;
                // editCookie("secondsremained",wait,wait+1);
                // processing = true;
                setTimeout(function(){  //等一秒再执行time（）函数
                    time(e)
                },1000)
            }
        }
       



    }

    Class.provBtn = function()
    {
        
       if((self.$(".sureInput").val() == "123456")&&(self.$(".phonetest").val().length == 11))
       {
            username = self.$(".phonetest").val();
            bin.dataCenter.setUserName(username); //验证码正确保存手机号码
            // bin.dataCenter.setUserName();
            bin.hudManager.showStatus("登陆成功！");
            bin.naviController.pop(1,{data:1});
           // bin.naviController.push("home/index");
            // alert(bin.dataCenter.getUserNameL());
       }
       if((self.$(".phonetest").val().length == 11)&&(self.$(".sureInput").val() !== "123456"))
       {
            bin.hudManager.showStatus("验证码错误");
       }
       if((self.$(".phonetest").val().length !== 11)&&(self.$(".sureInput").val() !== "123456"))
       {
            bin.hudManager.showStatus("手机号码和验证码错误");
       }
    }

    Class.onLeft = function(){
        bin.naviController.pop();
    }

 

    return Base.extend(Class);
})