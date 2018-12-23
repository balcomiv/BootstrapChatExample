import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  chatrooms: Observable<any>;
  changeChatroom: BehaviorSubject<string | null> = new BehaviorSubject(null); // Oddly, nexted from chat window component
  selectedChatroom: Observable<any>;
  selectedChatroomMessages: Observable<any>;

  constructor(
    private afStore: AngularFirestore,
    private authService: AuthService
    // private loadingService: LoadingService
  ) { 
    this.selectedChatroom = this.changeChatroom.pipe(
      switchMap(chatroomId => {
        console.log(`chatroomService: id ${chatroomId}`);
        if (chatroomId) {
           // this.loadingService.next(true);
           return afStore.doc(`chatrooms/${chatroomId}`).valueChanges();
        }
        return of(null);
      })
    );

    this.selectedChatroomMessages = this.changeChatroom.pipe(
      switchMap(chatroomId => {
        console.log(`chatroomService: id ${chatroomId}`);
        if (chatroomId) {
           // this.loadingService.next(true);
           return afStore.collection(`chatrooms/${chatroomId}/messages`, ref => {
             return ref.orderBy('createDt', 'asc').limit(100);
           }).valueChanges();
        }
        return of(null);
      })
    );

    this.chatrooms = afStore.collection('chatrooms').valueChanges();
  }

  createMessage(text: string): void {
    const chatroomId = this.changeChatroom.value;
    const message = {
      message: text,
      createDt: new Date(),
      sender: this.authService.currentUserSnapshot
    };

    this.afStore.collection(`chatrooms/${chatroomId}/messages`).add(message);
  }
}
