import { Component, OnInit } from '@angular/core';
import { CountdownService } from '../../../services/countdown.service';

@Component({
  selector: 'app-navbar',
  template: `

    <nav class="navbar navbar-dark bg-dark shadow">

      <div class="container-fluid">

        <span class="navbar-brand mb-0 h1"
            style="cursor: pointer; outline: none;"
            [routerLink]="['home']">
            <i class="fa fa-stopwatch"></i> Pomodorify
        </span>

          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link"
                  routerLinkActive="linkActive"
                  [routerLink]="['settings']"
                  [ngClass]="{'disabledLink':countdownService.countdownActived}">
                  <i class="fa fa-cog"></i> Settings
              </a>
            </li>
          </ul>

      </div>

    </nav>

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
