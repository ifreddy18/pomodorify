import { Component, OnInit } from '@angular/core';
import { CountdownService, Preferences } from '../../services/countdown.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  preferences: Preferences;

  constructor(
    public countdownService: CountdownService
  ) {
     this.preferences = this.countdownService.getPreferences();
  }

  ngOnInit(): void {
  }

  saveSettings(preferences: Preferences): void {
    this.countdownService.savePreferences(preferences);
  }

}
