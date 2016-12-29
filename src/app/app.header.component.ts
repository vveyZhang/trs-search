import {Component,OnInit,Input,Output} from "@angular/core";
import { Router,ActivatedRoute} from '@angular/router';
import {CheckRoute} from "./check-route.server"
@Component({
  selector:'app-header',
  templateUrl:'./header.component.html'
})
export class HeaderComponent{
  isSearch=true;
  constructor(private checkRoute:CheckRoute){
    this.checkRoute.watchPath.subscribe(isSearch=>this.isSearch=isSearch);
  }
}
