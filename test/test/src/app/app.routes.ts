import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'folder/inbox', pathMatch: 'full',},
  {path: 'folder/:id', loadComponent: () => import('./folder/folder.page').then((m) => m.FolderPage),},
  {path: 'loder', loadComponent: () => import('./pages/loder/loder.page').then( m => m.LoderPage)},
  {path: 'test',loadComponent: () => import('./pages/test/test.page').then( m => m.TestPage)},
  {path: 'home',loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)},
];
