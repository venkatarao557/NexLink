import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SideNavComponent} from './side-nav/side-nav.component';
@Component({
  selector: 'app-root',
  imports: [SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title = signal('NexLink');
}
