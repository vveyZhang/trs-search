import {Component,OnInit} from "@angular/core";
import {CheckRoute} from "./../check-route.server";
var $=require('jquery')
@Component({
  selector:'my-advanced',
  templateUrl:'./advancedSearch.component.html'
})
export  class AdvancedSearch{
  screenTime={
    select:"全部时间",
    option:["全部时间","最近一个星期","最近一个月","最近一年"],
    show:false
  }
  screenFormat={
    select:"所有网页格式和文档",
    option:["所有网页格式和文档","仅文本","仅标题"],
    show:false
  }
  screenRadio={
    select:"",
    option:["网页的任何地方","仅网页的标题中","仅网页的内容中"]
  }

  screenNumber=10;
  constructor(private routeServer:CheckRoute){
    this.routeServer.watchPath.emit(false);
  }
  selectClick(){
    this.screenFormat.show=false;
    this.screenTime.show=false;
  }
  selectListClick($event,obj){
    if($event.stopPropagation){
      $event.stopPropagation();
    }else{
      $event.cancelBubble=true;
    }
    obj.show=!obj.show;
    if(obj==this.screenFormat){
      this.screenTime.show=false;
    }else{
      this.screenFormat.show=false;
    }
}

  selectFormat(format){
    this.screenFormat.select=format;
  }
  selectTime(time){
    this.screenTime.select=time;
  }
  selectRadio(radio){
    this.screenRadio.select=radio;
  }
  screenNumberAdd(){
    this.screenNumber+=10;
  }
  screenNumberSubtract(){
    this.screenNumber-=10;
    this.screenNumber=this.screenNumber<=0?10:this.screenNumber;
  }
}
