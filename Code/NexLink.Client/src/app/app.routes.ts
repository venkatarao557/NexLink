import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // Now redirects directly to REX Management instead of the old dashboard
    redirectTo: 'rex', 
    pathMatch: 'full'
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings.component')
      .then(m => m.SettingsComponent),
    title: 'NexLink - Settings'
  },
  // --- PRIMARY REX MANAGEMENT FEATURE ---
  {
    path: 'rex',
    loadChildren: () => import('./features/rex-management/rex-management-routing.module')
      .then(m => m.RexManagementRoutingModule),
    title: 'NexLink - REX Management'
  },
  // ---------------------------------------
  {
    path: 'export-certificates',
    loadComponent: () => import('./features/cert-management/cert-management.component')
      .then(m => m.CertManagementComponent),
    title: 'NexLink - Certificate Management'
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
    loadComponent: () => import('./features/maintenance/components/maintenance-detail/maintenance-detail.component')
      .then(m => m.MaintenanceDetailComponent),
    title: 'NexLink - Maintenance Details'
  },
  // Wildcard redirected to 'rex' to ensure the user stays within the valid workflow
  {
    path: '**',
    redirectTo: 'rex'
  }
];