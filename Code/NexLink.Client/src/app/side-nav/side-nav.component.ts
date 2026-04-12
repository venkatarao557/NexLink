import { Component, inject, signal, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion'; // Important for the menu
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MaintenanceService, MaintenanceTable } from '../services/nexlink-maintenance.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    AsyncPipe,
  ]
})
export class SideNavComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  // Grouped tables for the Maintenance sub-menu
  //geoTables = ['Countries', 'Ports', 'Establishments'];
  //commodityTables = ['CommodityTypes', 'AHECC_Codes'];
  // 1. Inject the service
  private maintenanceService = inject(MaintenanceService);

  // 2. Define the signal that the HTML is looking for
  managementTables = signal<MaintenanceTable[]>([]);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // Helper for the breadcrumb/header
  get currentRouteTitle(): string {
    // You could expand this with a service to track the current page title
    return 'Overview';
  }

  ngOnInit(): void {
    this.maintenanceService.getAvailableTables().subscribe({
      next: (tables) => { this.managementTables.set(tables) },
      error: (err) => {
        console.log('SideNav component failed to load NexLink tables:', err)
      }
    })
  }

}