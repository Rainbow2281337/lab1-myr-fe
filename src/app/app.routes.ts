import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './not-found/page-not-found/page-not-found.component';
import { RegComponent } from './reg/reg/reg.component';

export const routes: Routes = [
  { path: 'reg', component: RegComponent },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./auth/auth/auth.component').then((m) => m.AuthComponent),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./auth/forget-password/forget-password.component').then(
            (m) => m.ForgetPasswordComponent
          ),
      },
    ],
  },
  {
    path: 'main',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./main/main/main.component').then((m) => m.MainComponent),
      },
      {
        path: 'post/:id',
        loadComponent: () =>
          import('./main/post-list/post-details/post-details.component').then(
            (m) => m.PostDetailsComponent
          ),
      },
    ],
  },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
