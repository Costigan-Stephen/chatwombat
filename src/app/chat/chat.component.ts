import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  currentSender = '101';

  @ViewChild('messageText', { static: true }) messageText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Chat>();
  

  constructor(private chatService: ChatService, private router:Router) { }

  ngOnInit(): void {
  }

  onSendMessage() {
    if(this.messageText.nativeElement.value){
      const id = new Date().getTime().toString();
      var str = this.router.url;
      const convoid = str.replace(/\D/g, "");
      const newMessage = new Chat(
        id, 
        "chatwombat", 
        this.messageText.nativeElement.value, 
        this.currentSender,
        convoid
      );
      this.chatService.addMessage(newMessage);
      this.onClear();
    }
  }

  onClear() {
    this.messageText.nativeElement.value = '';
  }

}
