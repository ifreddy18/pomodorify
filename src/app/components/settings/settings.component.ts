import { Component, OnInit } from '@angular/core';
import { CountdownService, Preferences } from '../../services/countdown.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  forma: FormGroup;
  preferences: Preferences;

  constructor(
    public countdownService: CountdownService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.preferences = this.countdownService.getPreferences();
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  get workTimeInvalid(): boolean {
    return this.forma.get('workTime').invalid && this.forma.get('workTime').touched;
  }

  get shortBreakTimeInvalid(): boolean {
    return this.forma.get('shortBreakTime').invalid && this.forma.get('shortBreakTime').touched;
  }

  get longBreakTimeInvalid(): boolean {
    return this.forma.get('longBreakTime').invalid && this.forma.get('longBreakTime').touched;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      workTime: [this.preferences.workTime, [Validators.required, Validators.min(1)]],
      shortBreakTime: [this.preferences.shortBreakTime, [Validators.required, Validators.min(1)]],
      longBreakTime: [this.preferences.longBreakTime, [Validators.required, Validators.min(1)]]
    });
  }

  saveSettings(): void {
    console.log('Submit disparado');

    if (this.forma.valid){
      this.preferences.workTime = this.forma.get('workTime').value;
      this.preferences.shortBreakTime = this.forma.get('shortBreakTime').value;
      this.preferences.longBreakTime = this.forma.get('longBreakTime').value;
      this.countdownService.savePreferences(this.preferences);
      this.back();
    } else {
      Object.values( this.forma.controls ).forEach( control => {
        if (control instanceof FormGroup){
          Object.values( control.controls ).forEach( controlSon => controlSon.markAsTouched());
        } else {
          control.markAsTouched();
        }
        console.log(control);
      });
    }

  }

  resetSettings(): void {
    this.forma.setValue({
      workTime: this.countdownService.preferenciasDefault.workTime,
      shortBreakTime: this.countdownService.preferenciasDefault.shortBreakTime,
      longBreakTime: this.countdownService.preferenciasDefault.longBreakTime
    });
  }

  back(): void {
    this.router.navigate(['/home']);
  }

}
