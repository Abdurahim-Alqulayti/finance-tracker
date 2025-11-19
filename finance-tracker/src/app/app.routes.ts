import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
  },
  {
    path: 'add-transaction',
    loadComponent: () => import('./pages/add-transaction/add-transaction.page').then(m => m.AddTransactionPage)
  },
  {
    path: 'transactions',
    loadComponent: () => import('./pages/transactions/transactions.page').then(m => m.TransactionsPage)
  },
  {
    path: 'statistics',
    loadComponent: () => import('./pages/statistics/statistics.page').then(m => m.StatisticsPage)
  },
];
