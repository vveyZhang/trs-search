import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {routes} from "./app.route"
import { AppComponent } from './app.component';
import { HeaderComponent } from './app.header.component';
import { FooterComponent } from './app.footer.component';
import { SearchPage } from './search/search.component';
import { SearchBar } from './search/search-bar/search-bar.component';
import { SearchList } from './search/search-list/search-list.component';
import {DefaultItem} from './search/search-list/default-item';
import {XxgkItem} from './search/search-list/xxgk-item';
import { AdvancedSearch } from './advancedSearch/advancedSearch.component';
@NgModule({
  declarations: [
    AppComponent,HeaderComponent,SearchPage,SearchBar,SearchList,DefaultItem,FooterComponent,AdvancedSearch
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes,{useHash:true})
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
