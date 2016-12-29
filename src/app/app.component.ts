import {Component} from '@angular/core';
import {CheckRoute} from "./check-route.server";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[CheckRoute]
})
export class AppComponent {

}
