import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor() { }

  playAlarm(): void {
    const audio = new Audio();
    audio.src = '../../../assets/sounds/alarm-clock.mp3';
    audio.load();
    audio.play();
  }
}
