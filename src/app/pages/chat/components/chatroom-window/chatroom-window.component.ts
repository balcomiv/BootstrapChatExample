import { Component, OnInit, OnDestroy, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChatroomService } from 'src/app/services/chatroom.service';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, OnDestroy, AfterViewChecked {
  chatroom: Observable<any>;
  messages: Observable<any>;

  private subscriptions: Subscription[] = [];

  @ViewChild('scrollContainer') private scrollContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private chatroomService: ChatroomService,
    private el: ElementRef
  ) { 
    this.subscriptions.push(
      this.chatroomService.selectedChatroom.subscribe(chatroom => {
        this.chatroom = chatroom;
      }),
      this.chatroomService.selectedChatroomMessages.subscribe(messages => {
        this.messages = messages;
      })
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe((params) => {
        const chatRoomId = params.get('id');
        this.chatroomService.changeChatroom.next(chatRoomId);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      const nativeEl = this.scrollContainer.nativeElement; 
      nativeEl.scrollTop = nativeEl.scrollHeight;
    }
  }
}
