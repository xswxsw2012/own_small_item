define([],function(){
  var Class ={};
  Class.events = {
  	"click .choose":"choosefun",
  }

 Class.onViewPush = function(pushfrom,pushdata){
 	   this.$("#time").text("预约时间："+pushdata.timevalue);
 	   this.$("#timeval").text(pushdata.holdvalue);
 }
  Class.choosefun = function(event){
  	this.$(".choose").attr("src","demoimg/homeimg/choose.png");
     $(event.currentTarget).attr("src","demoimg/homeimg/choose1.png");
  }
  return bin.ui.NaviPageView.extend(Class);
})