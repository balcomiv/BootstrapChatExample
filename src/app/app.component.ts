import { Component, OnInit } from '@angular/core';
import { Alert } from './classes/alert';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn: boolean = false;
  alerts: Array<Alert> = [];

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.authService.currentUser.pipe().subscribe(currentUser => {
      this.loggedIn = (currentUser) ? true : false;
    });
  }

  ngOnInit() {
    this.alertService.alert.subscribe(alert => {
      this.alerts.push(alert);
    });
  }
}
