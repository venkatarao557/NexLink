import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'maintenance', 
    pathMatch: 'full' 
  },

  // 1. Maintenance Dashboard Overview
  { 
    path: 'maintenance', 
    loadComponent: () => import('./maintenance/maintenance.component')
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

  // 3. Fallback / Wildcard for 404s
  { 
    path: '**', 
    redirectTo: 'maintenance' 
  }
];