import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SideNavComponent} from './side-nav/side-nav.component';
@Component({
  selector: 'app-root',
  imports: [SideNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('NexLink');
}
