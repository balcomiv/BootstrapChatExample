import { Component, OnInit } from '@angular/core';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit {
  chatrooms: Observable<any>;

  constructor(
    private chatRoomService: ChatroomService
  ) { 
    this.chatrooms = this.chatRoomService.chatrooms;
  }

  ngOnInit() {
  }

}
