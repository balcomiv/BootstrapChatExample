import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/interfaces/user';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  currentUser: User;
  userId: string;
  uploadPercent: number = 0;

  uploadPercentage: Observable<number>;
  downloadUrl: Observable<string>;

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private afStorage: AngularFireStorage,
    private afStore: AngularFirestore,
    private location: Location
  ) { }

  ngOnInit() {
    this.subscriptions.push(

      this.authService.currentUser.subscribe(user => this.currentUser = user),

      this.route.paramMap.subscribe(params => this.userId = params.get('userId'))
    );
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `${file.name}_${this.currentUser.id}`;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    //  observe percentage changes
    this.uploadPercentage = task.percentageChanges();

    this.subscriptions.push(

      //  See https://stackoverflow.com/questions/51664844/upload-image-ref-url-save-in-firestore?rq=1
      //  observe percentage changes
      // task.percentageChanges().subscribe(percentage => {
      //   if (percentage < 100) {
      //     //  Do something with loading (would be cool to have a loading bar)
      //   } else {
      //     this.uploadPercent = percentage;
      //   }
      // }),

      //  get notified when download url is available
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadUrl = fileRef.getDownloadURL();
        })
      ).subscribe()
    );
  }

  save() {
    let photo;

    if (this.downloadUrl) {
      this.downloadUrl.pipe(take(1))
      .subscribe(url => {
        photo = (url) ? url : this.currentUser.photoUrl;

        const user = Object.assign({}, this.currentUser, {photoUrl: photo});
        const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.id}`);
    
        //  Fix Me -- The firestore promises/observables need error handling
        userRef.set(user);
        alert('Your profile was successfully updated!');
        this.location.back();
      });
    } else {
      const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${this.currentUser.id}`);
    
        //  Fix Me -- The firestore promises/observables need error handling
        userRef.set(this.currentUser);
        alert('Your profile was successfully updated!');
        this.location.back();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
