import { Component, OnInit } from '@angular/core';
import { CountdownService, Preferences } from '../../services/countdown.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

s
  displayTime = '00:00'; // Variable que muestra el tiempo
  TIMER: any; // Variable del setInterval
  minutes: number; // Minutos a mostrar
  seconds: number; // Segundos a mostrar
  preferences: Preferences; // Preferencias a utilizar para los tipos de tiempos
  typeTimeActived: string; // Indicador del tipo de tiempo utilizados

  constructor(public countdownService: CountdownService) {
    this.preferences = this.countdownService.getPreferences();
    this.minutes = this.preferences.workTime;
    this.seconds = 0;
    this.typeTimeActived = 'work';
    this.setDisplayTime();
  }

  ngOnInit(): void {
  }

  // Selector del tipo de tiempo (work, short, long)
  setTypeTime(typeTime: string): void {
    switch (typeTime){
      case 'work':
        this.minutes = this.preferences.workTime;
        break;
      case 'short':
        this.minutes = this.preferences.shortBreakTime;
        break;
      case 'long':
        this.minutes = this.preferences.longBreakTime;
        break;
      default:
        break;
    }

    this.seconds = 0;
    this.typeTimeActived = typeTime;
    this.setDisplayTime();

  }

  // Boton de start
  startCountdown(): void {
    console.log('Cuenta iniciada...');
    this.countdownService.countdownActived = true;
    console.log(this.countdownService.countdownActived);

    this.TIMER = setInterval(() => {
      if (this.seconds > 0){
        this.seconds--;
        this.setDisplayTime();
      } else if (this.seconds === 0){
        this.minutes--;
        this.seconds = 59;
        this.setDisplayTime();
      } else {
        console.log(`Error en contador. Minutos (${this.minutes}) y segundos (${this.seconds}) actuales`);
      }

      if (this.seconds === 0 && this.minutes === 0){
        clearInterval(this.TIMER);
      }

    }, 1000);

  }

  // Boton de stop
  stopCountdown(): void {
    console.log('Cuenta parada...');
    this.countdownService.countdownActived = false;
    clearInterval(this.TIMER);
  }

  // Boton de Reset
  resetCountdown(): void {
    console.log('Cuenta reseteada...');
    clearInterval(this.TIMER);
    this.minutes = 0;
    this.seconds = 10;
    this.setDisplayTime();
  }

  // Muestra el tiempo actualizado en el contador
  setDisplayTime(): void {
    this.displayTime = `${this.countdownService.twoDigit(this.minutes)}:${this.countdownService.twoDigit(this.seconds)}`;
  }



}
