import {Component,ElementRef,Input,Output,OnChanges,SimpleChanges,EventEmitter} from "@angular/core";
import {Http,URLSearchParams} from "@angular/http";
import {SearchServer} from "../search.server"
import {ActivatedRoute} from "@angular/router"
const $=require("jquery");
@Component({
  selector:"search-list",
  templateUrl:"./search-list.html"
})
export class SearchList{
  pagesUrl:string="";
  constructor(private route:ActivatedRoute,public server:SearchServer){
    this.server.getSearchContent.subscribe(data=>this.renderList(data.page));
    this.server.searchError.subscribe(()=>this.showError())
    this.route.queryParams.subscribe(params=>{
      this.pagesUrl="/#/search?";
      for(let param in params){
        if(param!="pageNumber"){
          if(param=="searchWord")this.pagesUrl+=param+"="+params[param]+"&";
          this.pagesUrl+=param+"="+params[param]+"&";
        }

      }
      this.pagesUrl=this.pagesUrl+"pageNumber=";
    })
  }
  listContent=[];
  //当前显示页数
  currentPage;
  nextPage;
  perPage;
  pageNumber;
  contentError=false;
  currentArray=[];
  nowPage;
  //总共页面
  totalPage:number;

  @Output() basicInfor=new EventEmitter();
  renderList(data){
    this.listContent=data.content;
    this.renderPage(data);
    this.basicInfor.emit({
      spendTime:data.spendTime,
      total:data.total
    })
  }
  showError(){
    this.contentError=true;
  }
  renderPage(data){
    this.contentError=false;
    this.currentArray=[];
    this.totalPage=data.totalPages;
    this.pageNumber=data.pageNumber;
    if(data.totalPages<=10){
      this.currentPage=data.totalPages;
      this.nowPage=0;
      for(let i=1;i<=this.currentPage;i++){
        this.currentArray.push(i)
      }
    }else{
      this.nowPage=parseInt(this.pageNumber/10+"");
      if( this.pageNumber%10==0)this.nowPage=this.nowPage-1;
      this.currentPage=this.nowPage*10+10<=this.totalPage?this.nowPage*10+10:this.totalPage;
      for(var i=this.nowPage*10+1;i<this.currentPage+1;i++){
        this.currentArray.push(i)
      }
    }
    this.perPage=this.pageNumber==1?1:this.pageNumber-1;
    this.nextPage=this.totalPage==this.pageNumber?this.pageNumber:this.pageNumber+1;
  }
  pageClick(){
    $('html,body').animate({"scrollTop":85},300)
  }
}
