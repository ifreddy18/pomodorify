import { Injectable } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  preferenciasDefault: Preferences = {
    workTime: 1,
    shortBreakTime: 5,
    longBreakTime: 20,
    // autoShortBreak: false,
    // displayAlarm: true
  };

  // Indica si el temporizador esta activo
  countdownActived = false;


  constructor() {
  }

  // Regresa las preferencias de ajustes
  getPreferences(): Preferences {
    if (localStorage.getItem('preferences') != null){
      return JSON.parse(localStorage.getItem('preferences'));
    } else {
      return this.preferenciasDefault;
    }
  }

  // Salva las preferencias de los ajustes
  savePreferences(preferences: Preferences): void {
    localStorage.setItem('preferences', JSON.stringify(preferences));
  }

  // Agrega un zero al inicio si el numero solo tiene un digito
  twoDigit(num: number): string|number{
    const numberLength = num.toString().length;
    if (numberLength === 1){
      return '0' + num;
    } else {
      return num;
    }
  }

}

export interface Preferences{
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  // autoShortBreak: boolean;
  // displayAlarm: boolean;
}
