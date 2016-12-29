import {Component,Injectable,EventEmitter} from'@angular/core';
import {Observable} from "rxjs/observable";
import {Http,URLSearchParams} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
@Injectable()
export class SearchServer{
  //观察关键词变化
  keyWordChange=new EventEmitter();
  //监听检索内容变化
  getSearchContent=new EventEmitter();
  searchError=new EventEmitter();
  keyWord;
  //检索参数
  params;
  constructor(private http:Http,private route:ActivatedRoute){
    this.route.queryParams.subscribe(
        params=>{
          let url="http://192.168.200.42:8080/isearch/front/search.jhtml";
          this.params=new URLSearchParams();
          this.params.set("code","9a24340625374a57ab7011e26c417c77");
        for (var param in params){
          this.params.set(param,params[param])
        }
        if(!params['pageSize']){
          this.params.set("pageSize","10")
        }
        if(!params['pageNumber']){
          this.params.set("pageNumber",1)
        }
          this.keyWord=params['searchWord'];
          if(this.keyWord=="undefined"){
            this.keyWord="";
          }
        this.http.get(url,{ search: this.params }).subscribe(
            json=>{
              this.keyWordChange.emit(this.keyWord);
              if(json.json().page.content.length==0){
                this.searchError.emit();
                return;
              }
              this.getSearchContent.emit(json.json());

            },
            error=>{
              this.keyWordChange.emit(this.keyWord);
              this.searchError.emit();
              console.log(error);
            }
        )
      }
    )
  }

}
