import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { UserInfo } from 'firebase';
import { User } from '../interfaces/user';

//  https://croppola.com/
//  https://www.pexels.com/photo/animal-insect-smoking-funny-2876/

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<User | null>;
  currentUserSnapshot: User | null;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) { 
      this.currentUser = this.afAuth.authState.pipe(
        switchMap((userInfo: UserInfo) => {
          if (userInfo) {
            return this.afStore.doc<User>(`users/${userInfo.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      )
      
      this.currentUser.subscribe(user => this.currentUserSnapshot = user);
  }

  signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const fireBaseUser = userCredential.user;
        const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${fireBaseUser.uid}`);
        const updatedUser: User = {
          id: fireBaseUser.uid,
          email: fireBaseUser.email,
          firstName,
          lastName,
          photoUrl: 'https://firebasestorage.googleapis.com/v0/b/fir-example-3be24.appspot.com/o/animal-edited-funny-2876%20Cropped.jpg?alt=media&token=3d215d64-9144-46d2-8d63-5bd0c00dfa48',
          quote: `Life is like a box of chocolates, you never know what your're gonna get!`,
          bio: 'Bio is under construction...'
        };

        userRef.set(updatedUser);
        return true;
      })
      .catch((err) => false)
    );
  }

  login(email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => true)
      .catch((err) => false)
    );
  }

  logout(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      alert('Logged out succesfully');
    });
  }
}
