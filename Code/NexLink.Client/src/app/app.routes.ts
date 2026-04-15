import { Routes } from '@angular/router';
import { MaintenanceDetailComponent } from './features/maintenance/components/maintenance-detail/maintenance-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'maintenance',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    title: 'NexLink - Dashboard'
  },

  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings.component')
      .then(m => m.SettingsComponent),
    title: 'NexLink - Settings'
  },

  {
    path: 'maintenance',
    loadComponent: () => import('./features/maintenance/maintenance.component')
      .then(m => m.MaintenanceComponent),
    title: 'NexLink - System Maintenance'
  },

  {
    path: 'data-manager/:tableName',
    loadComponent: () => import('./features/maintenance-data-manager/maintenance-data-manager.component')
      .then(m => m.MaintenanceDataManagerComponent),
    title: 'NexLink - Data Manager'
  },

  {
    path: 'maintenance/:tableName',
    component: MaintenanceDetailComponent,
    title: 'NexLink - Maintenance Details'
  },

  {
    path: '**',
    redirectTo: 'maintenance'
  }
];