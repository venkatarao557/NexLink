import { Routes } from '@angular/router';
import { MaintenanceDetailComponent } from './features/maintenance/components/maintenance-detail/maintenance-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'maintenance',
    pathMatch: 'full'
  },

  // 1. Maintenance Dashboard Overview
  {
    path: 'maintenance',
    loadComponent: () => import('./features/maintenance/maintenance.component')
      .then(m => m.MaintenanceComponent),
    title: 'NexLink - System Maintenance'
  },

  // 2. Data Manager (Specific Table View)
  // Changed path to 'data-manager' to match your Sidebar routerLinks
  {
    path: 'data-manager/:tableName',
    loadComponent: () => import('./data-manager/data-manager.component')
      .then(m => m.DataManagerComponent),
    title: 'NexLink - Data Manager'
  },

  {
    path: 'maintenance/:tableName',
    component: MaintenanceDetailComponent,
    title: 'NexLink - Maintenance Details'
  },
  // 3. Fallback / Wildcard for 404s
  {
    path: '**',
    redirectTo: 'maintenance'
  }
];