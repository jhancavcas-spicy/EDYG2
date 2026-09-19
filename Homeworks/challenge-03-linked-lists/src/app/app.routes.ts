import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LinkedListPageComponent } from './pages/linked-list-page/linked-list-page.component';
import { DoublyLinkedListPageComponent } from './pages/doubly-linked-list-page/doubly-linked-list-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'linked-list', component: LinkedListPageComponent },
  { path: 'doubly-linked-list', component: DoublyLinkedListPageComponent },
  { path: '**', redirectTo: '' }
];
