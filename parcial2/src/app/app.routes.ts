import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'explorador' },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  {
    path: 'explorador',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/explorer/explorer').then(m => m.Explorer),
  },
  { path: '**', redirectTo: 'explorador' },
];
