import { Component, OnInit } from '@angular/core';
import { CountdownService } from '../../../services/countdown.service';

@Component({
  selector: 'app-navbar',
  template: `
    <div id="navbar">
      <h1>Pomodorify</h1>

      <ul>
          <!-- <li>
              <a routerLinkActive="linkActive" [routerLink]="['home']">Timer</a>
          </li> -->
          <li>
              <a routerLinkActive="linkActive"
                [routerLink]="['settings']"
                [ngClass]="{'disabledLink':countdownService.countdownActived}">Settings</a>
          </li>
      </ul>
    </div>
  `,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public countdownService: CountdownService
  ) { 

  }

  ngOnInit(): void {
  }

}
