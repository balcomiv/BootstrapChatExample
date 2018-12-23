import { Component, OnInit, Input, ElementRef, AfterViewChecked, Renderer2 } from '@angular/core';
import { Message } from 'src/app/classes/message';
import { Sender } from 'src/app/classes/sender';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  //  Fix Me -- Clean this up. Only temp use
  sender: Sender = new Sender(
    {
      firstName: 'firstName', 
      lastName: 'lastName', 
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/fir-example-3be24.appspot.com/o/animal-edited-funny-2876%20Cropped.jpg?alt=media&token=3d215d64-9144-46d2-8d63-5bd0c00dfa48'
    });

  @Input() set message(val: Message) {
    if (val) {
      this._message = val;
      if (!val.sender) {
        this._message.sender = this.sender;
      }
    } else {
      this._message = null;
    }
    console.log(`Messages`, val);
    
  }
  get message() {
    return this._message;
  }

  private _message: Message;

  constructor() { }

  ngOnInit() {
  }
}