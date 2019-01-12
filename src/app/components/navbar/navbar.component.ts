import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }
        
  onLogout() {
    this.authService.logout();
  }
}
