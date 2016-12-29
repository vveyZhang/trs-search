import {Component,Input,OnInit} from  "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {SearchServer} from "./search.server";
import {CheckRoute} from "./../check-route.server";
@Component({
  selector:'app-search',
  templateUrl:"./search.component.html",
  providers:[SearchServer]
})
export class SearchPage implements OnInit{
  keyWord:string;
  total=0;
  spendTime=0;
  constructor(private routeServer:CheckRoute,private server:SearchServer,private route :ActivatedRoute,private router :Router){
    this.server.keyWordChange.subscribe(
        key=>this.keyWord=key
    )
  }
  ngOnInit(){
    this.routeServer.watchPath.emit(true);
  }
  getInfor(infor){
    this.total=infor.total;
    this.spendTime=infor.spendTime;
  }
}
