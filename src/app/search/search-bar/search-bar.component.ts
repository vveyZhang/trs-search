import {Component,OnInit,Input,Output,AfterViewInit} from "@angular/core";
import {Http} from "@angular/http";
import { Router, ActivatedRoute} from '@angular/router';
import {Observable} from "rxjs/Observable"
import {SearchServer} from "../search.server"

let $=require('jquery');
@Component({
  selector:"search-bar",
  templateUrl:"./search-bar.component.html"
})
export class SearchBar  implements OnInit{
  keyWord:string;
  hotsUrl='./app/data/hot.json';
  searchWord:string;
  hotsKey=[];
  his=false;
  hisList;
  tips=false;
  inputFocus=false;
  hisSelect=null;
  constructor(private http:Http,private route :ActivatedRoute,private sever:SearchServer){

    this.hisList=this.getHis();
    this.sever.keyWordChange.subscribe(
      key=>{
        this.keyWord=key;
        this.searchWord=this.keyWord;
        this.putHis(this.keyWord);
      }
    )

  }
  ngOnInit(){
    this.getHotsKey().subscribe(
      json=>{
        for(let i=0;i<5;i++){
          this.hotsKey.push(json[i])
        }
      }
    )
    //判断input是否失焦
    var searchBar=this;
    $('body').click(function(e){
      var e=event||e;
      if ( e && e.stopPropagation ){
        e.stopPropagation();
      }else{
        e.cancelBubble = true;
      }
      if($(e.target).parents('.search-input').length==0){
        searchBar.inputFocus=false;
        searchBar.his=false;
        searchBar.tips=false;
        searchBar.hisSelect=null;
      }
    });
  }
  onInput(){
    this.inputFocus=true;
    if(this.searchWord==""||this.searchWord==undefined)this.his=true;
  }
  searchTip($event){
    this.his=true;
    //console.log($event.keyCode)
    this.inputFocus=true;
    if($event.keyCode==38){
      //第一次按上
      if(this.hisSelect==null){
        this.hisSelect=this.hisList[this.hisList.length-1];
        this.searchWord=this.hisSelect;
        return;
      }

      let index=this.hisList.indexOf(this.hisSelect);
      if(index==0){
        this.hisSelect=null;
        this.searchWord="";
        return;
      }
      this.hisSelect=this.hisList[index-1];
      this.searchWord=this.hisSelect;
    }
    if($event.keyCode==40){
      //第一次按下
      if(this.hisSelect==null){
        this.hisSelect=this.hisList[0];
        this.searchWord=this.hisSelect;
        return;
      }

      let index=this.hisList.indexOf(this.hisSelect);
      index++;
      if(index==this.hisList.length){
        this.hisSelect=null;
        this.searchWord="";
        return;
      }
      this.hisSelect=this.hisList[index];
      this.searchWord=this.hisSelect;
    }
  }
  hideTipsAll(){
    this.inputFocus=false;
    this.his=false;
  }
  getHotsKey(){
    return this.http.get(this.hotsUrl).map(json=>json.json()).catch(error=>error)
  }
  //点击搜索按钮改变关键词-检索
  changeKey() {
    if (this.searchWord == "" || this.searchWord == undefined) {
      alert('请输入有效内容');
      return;
    }
    this.putHis(this.searchWord);
    this.hisList = this.getHis();
    this.inputFocus = false;
    this.his = false;
    this.tips = false;
    this.hisSelect = null;
    window.location.href=window.location.origin+"/#/search?searchWord="+this.searchWord;
  }
  //加入历史搜索
  putHis(key){
    key=encodeURI(key)
    if(key==""||key==undefined)return;
    if(localStorage['his']==undefined||localStorage['his']==""){
      localStorage['his']=key;
      return;
    }
    let hisArray=localStorage['his'].split(",");
    if(hisArray.indexOf(key)!=-1){
      hisArray.splice(hisArray.indexOf(key),1);
      let newHis=key+","+hisArray.join(',');
      localStorage['his']=newHis;
      return;
    }
    localStorage['his']=key+","+localStorage['his'];
  }
  //获取历史搜索
  getHis(){
    if(localStorage['his']==undefined||localStorage['his']==""){
      return [];
    }
    const hisArray=localStorage['his'].split(",");
    if(hisArray[hisArray.length-1]=="")hisArray.pop();
    let allHis=[];
    for(var i=0;i<hisArray.length;i++){
      allHis.push(decodeURI(hisArray[i]))
    }
    return allHis;
  }
  //清楚历史搜索
  deleteHis(){
    localStorage.clear();
    this.hisList=this.getHis();
  }
}
