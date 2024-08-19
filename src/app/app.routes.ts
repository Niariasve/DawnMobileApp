import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'registrar',
    loadComponent: () => import('./registrar/registrar.page').then( m => m.RegistrarPage)
  },
];
