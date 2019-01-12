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
        // this.loadingService.isLoading.next();
      }),
      this.chatroomService.selectedChatroomMessages.subscribe(messages => {
        this.messages = messages;
        console.log(`Messages: `, messages);
        
      })
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe((params) => {
        console.log(`param id ${params.get('id')}`, params);
        const chatRoomId = params.get('id');
        this.chatroomService.changeChatroom.next(chatRoomId);
      })
    );

    // this.scrollToBottom();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngAfterViewChecked() {
    console.log(`===> After View Checked`);
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      const nativeEl = this.scrollContainer.nativeElement;
      console.log(`scrollHeight: ${nativeEl.scrollHeight}`);
      
      nativeEl.scrollTop = nativeEl.scrollHeight;
    }
    //   #list  [scrollTop]="list.scrollHeight"
  }

  /*

  //  TODO: replace with firebase data
  dummyData = [
    {
      message: 'Message one, dsjfkdsjf sdjf ksf.',
      createDt: new Date(),
      sender: {
        firstName: 'Steve',
        lastName: 'Smith',
        photoUrl: 'http://via.placeholder.com/50x50',
      }
    },
    {
      message: 'Meassage two, slfdjsdf  dsjf lsjdflj.',
      createDt: new Date(),
      sender: {
        firstName: 'Bob',
        lastName: 'Anderson',
        photoUrl: 'http://via.placeholder.com/50x50',
      }
    },
    {
      message: 'Message three, skdjfsaljf sdkfj s dskjflsf.',
      createDt: new Date(),
      sender: {
        firstName: 'Sally',
        lastName: 'Jones',
        photoUrl: 'http://via.placeholder.com/50x50',
      }
    }
  ];
  */

}
