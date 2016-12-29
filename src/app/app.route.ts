
import { Routes } from '@angular/router';
import { SearchPage } from './search/search.component';
import { AdvancedSearch } from './advancedSearch/advancedSearch.component';
export const routes: Routes = [
  { path: 'search',  component: SearchPage },
  { path: 'advanced',  component: AdvancedSearch }
];
