import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the components from your features folder
import { RexManagementDashboardComponent } from './components/dashboard/rex-management-dashboard.component';
import { RexEditorComponent } from './components/editor/rex-editor.component';

const routes: Routes = [
  {
    // The default path for the REX module (e.g., /rex)
    path: '',
    component: RexManagementDashboardComponent
  },
  {
    // Workflow: Create a new REX
    path: 'create',
    component: RexEditorComponent,
    data: { mode: 'create', title: 'New Request for Export' }
  },
  {
    // Workflow: Import an external REX
    path: 'load',
    component: RexEditorComponent,
    data: { mode: 'load', title: 'Load External REX' }
  },
  {
    // Workflow: Hand over a REX to another party
    path: 'transfer/:id',
    component: RexEditorComponent,
    data: { mode: 'transfer', title: 'Transfer REX' }
  },
  {
    // Workflow: Edit/Amend an existing REX
    // The :id parameter allows us to fetch the record from SQL Server
    path: 'amend/:id',
    component: RexEditorComponent,
    data: { mode: 'amend', title: 'Amend REX' }
  },
  {
    // Workflow: View logs or archive (can reuse editor in read-only mode if desired)
    path: 'view/:id',
    component: RexEditorComponent,
    data: { mode: 'view', title: 'View REX Details' }
  },
  // Redirect any invalid sub-paths back to the dashboard
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RexManagementRoutingModule { }