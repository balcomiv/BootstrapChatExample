import { Component, OnInit } from '@angular/core';
import { ChatroomService } from 'src/app/services/chatroom.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  newMessageText: string = "";

  constructor(
    private chatroomService: ChatroomService
  ) { }

  ngOnInit() {
  }

  submit(message: string) {
    console.log('New message', message);

    this.chatroomService.createMessage(message);
    
    //  reset input
    this.newMessageText = "";
  }
}
