import {Component,Input,OnChanges,SimpleChanges} from "@angular/core";
@Component({
  selector:"default-item",
  template:`<div class="m-list-item" [style.marginTop]="marginTop">
  <div class="title clearfix">
    <div class="tag lf" >{{news.type}}</div>
    <a href="{{news.url}}" [innerHTML]="news.title"></a>
  </div>
  <div class="desc">
    <p [innerHTML]="news.content"></p>
  </div>
  <div class="link">
    <a href="{{news.url}}">{{news.url}}</a>
  </div>
</div>`
})
export class DefaultItem implements OnChanges{
  marginTop;
  @Input() index;
  @Input() news;
  constructor(){

  }
  ngOnChanges(change:SimpleChanges){
    if(this.index==0){
      this.marginTop=0
    }else{
      this.marginTop=25
    }
  }
}
