import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { ExerciseOne } from './pages/exercise-one/exercise-one';
import { ExerciseTwo } from './pages/exercise-two/exercise-two';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'exercise-one', component: ExerciseOne, canActivate: [authGuard] },
  { path: 'exercise-two', component: ExerciseTwo, canActivate: [authGuard] },
  { path: '**', component: NotFound },
];
