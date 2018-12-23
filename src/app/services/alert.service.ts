import { Injectable } from '@angular/core';
import { Alert } from '../classes/alert';
import { Subject } from 'rxjs';
import { AlertType } from '../enums/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert: Subject<Alert> = new Subject();

  constructor() { }

  triggerAlert(message: string, type: AlertType = AlertType.Success): void {

  }

  triggerErrorAlert(message: string) {
    this.alert.next({text: message, type: AlertType.Danger});
  }
}
