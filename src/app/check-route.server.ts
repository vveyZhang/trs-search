import {Injectable,EventEmitter} from "@angular/core"

@Injectable()
export class CheckRoute{
  watchPath=new EventEmitter();
}
