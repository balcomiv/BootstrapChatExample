import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

//  https://stackblitz.com/edit/example-angular-material-reactive-form-update-on-blur
//  https://medium.com/front-end-hacking/reactive-forms-and-form-validation-with-angular-fdcbcf98e1e8

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  private returnUrl: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    // private: loadingService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { 
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      // email: ['', [Validators.required, Validators.email]],
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
        // updateOn: 'blur'
      }),
      // password: ['', [Validators.required, Validators.minLength(8)]],
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)],
        // updateOn: 'blur'
      }),
    });
  }

  isFieldInvalid(name: string) {
    const control: AbstractControl = this.loginForm.controls[name];

    // console.log(`name: ${name}, errors: ${control.errors}, pristine: ${control.pristine}`);

    if (control.errors && !control.pristine) {
      return true;
    }
    return false;
  }

  submit(): void {
    if (this.loginForm.invalid) {
      // console.log("Errors", this.loginForm.get('email').errors);
      let errors = [];
      Object.keys(this.loginForm.controls).forEach(key => {
        errors.push({
          control: key,
          error: this.loginForm.get(key).errors
        });
      });

      errors.forEach(err => {
        console.log(err)
        // this.alertService.triggerErrorAlert(err);
      });
    }

    if (this.loginForm.valid) {
      //  this.loadingService.isLoading.next(true);
      const {email, password} = this.loginForm.value;
      console.log(`Email: ${email}, Password: ${password}`);

      this.subscriptions.push(
        this.auth.login(email, password).subscribe(success => {
          if (success) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            alert('Failed login attempt!')
          }
          // this.loadingService.next(false);
        })
      );
    } else {
      // // const failedLoginAlert = new Alert {'Invalid login form', AlertType.Danger};
      //   this.loadingService.isLoading.next(false);
      //   this.alertService.alert.next(failedLoginAlert);
      alert("Invalid email/password combination");
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
