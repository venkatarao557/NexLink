import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface RexActivity {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-rex-management',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './rex-management-dashboard.component.html',
  styleUrls: ['./rex-management-dashboard.component.scss']
})
export class RexManagementDashboardComponent {

  // These IDs MUST match the 'path' defined in your rex-management-routing.module.ts
  activities: RexActivity[] = [
    { 
      id: 'create', 
      title: 'Create REX', 
      description: 'Start a new Request for Export from scratch.', 
      icon: 'add_box', 
      color: '#2e7d32' 
    },
    { 
      id: 'load', 
      title: 'Load REX', 
      description: 'Import a REX from an external exporter system.', 
      icon: 'file_download', 
      color: '#1565c0' 
    },
    { 
      id: 'transfer', 
      title: 'Transfer REX', 
      description: 'Hand over a REX to another system or party.', 
      icon: 'file_upload', 
      color: '#7b1fa2' 
    },
    { 
      id: 'amend', 
      title: 'Amend REX', 
      description: 'Modify an existing lodgment for re-submission.', 
      icon: 'edit_note', 
      color: '#f57c00' 
    },
    { 
      id: 'submit', 
      title: 'Submit REX', 
      description: 'Validate and lodge the final data to NEXDOC.', 
      icon: 'send', 
      color: '#00838f' 
    },
    { 
      id: 'cancel', 
      title: 'Cancel REX', 
      description: 'Withdraw or terminate an active request.', 
      icon: 'block', 
      color: '#c62828' 
    },
    { 
      id: 'logs', 
      title: 'REX Logs', 
      description: 'View communication logs and audit trails.', 
      icon: 'history_edu', 
      color: '#455a64' 
    },
    { 
      id: 'archive', 
      title: 'Archive', 
      description: 'Access authorized and historical certificates.', 
      icon: 'inventory_2', 
      color: '#5d4037' 
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Handles navigation when an activity card is clicked.
   * Uses relative navigation to ensure it works within the lazy-loaded 'rex' path.
   */
  onActivityClick(id: string) {
    // If we are currently at '/rex', this will navigate to '/rex/create', '/rex/load', etc.
    // For 'amend' or 'transfer', you would typically navigate to a list first 
    // or pass a specific ID (e.g., this.router.navigate(['amend', someId], { relativeTo: this.route }))
    
    if (id === 'amend' || id === 'transfer' || id === 'view') {
      // Temporary: Navigate to a placeholder ID '0' if no list is implemented yet
      // Otherwise, navigate to the base activity path
      this.router.navigate([id, '0'], { relativeTo: this.route });
    } else {
      this.router.navigate([id], { relativeTo: this.route });
    }
  }
}