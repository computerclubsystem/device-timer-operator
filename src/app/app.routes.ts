import { Routes } from '@angular/router';

// import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    // component: LoginComponent,
    loadComponent: () => import('./login/login.component').then(x => x.LoginComponent),
  },
];
