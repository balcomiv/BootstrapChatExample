import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    // private: loadingService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    // private alertService: AlertService
  ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  submit(): void {
    if (this.signupForm.valid) {
      //  this.loadingService.isLoading.next(true);
      const {firstName, lastName, email, password} = this.signupForm.value;
      console.log(`FirstName: ${firstName}, LastName: ${lastName}, Email: ${email}, Password: ${password}`);

      this.subscriptions.push(
        this.auth.signup(firstName, lastName, email, password).subscribe(success => {
          if (success) {
            this.router.navigateByUrl('/chat');
          } else {
            alert("Failed signup attempt!");
          }
          // this.loadingService.next(false);
        })
      );
    } else {
      // // const failedLoginAlert = new Alert {'Invalid login form', AlertType.Danger};
      //   this.loadingService.isLoading.next(false);
      //   this.alertService.alert.next(failedLoginAlert);
      alert("Form Invalid!");
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }
}
