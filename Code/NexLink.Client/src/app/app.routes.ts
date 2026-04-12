import { Routes } from '@angular/router';
import { DashboardComponent } from '../app/dashboard/dashboard.component'; 
import { SettingsComponent } from '../app/settings/settings.component';

export const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    title: 'NexLink - Dashboard' 
  },
  { 
    path: 'settings', 
    component: SettingsComponent, 
    title: 'NexLink - Settings' 
  },
];