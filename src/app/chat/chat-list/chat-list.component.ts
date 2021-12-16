import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chat } from '../chat.model';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})

export class ChatListComponent implements OnInit {
  subscription: Subscription;
  messages: Chat[] = [];
  constructor(private chatService: ChatService) {
    this.messages = this.chatService.getMessages();
    this.subscription = this.chatService.messageChangedEvent.subscribe((messageList: Chat[])=> this.messages = messageList);
    //setTimeout(() => { this.ngOnInit() }, 1);
  }

  ngOnInit(): void {
    this.messages = this.chatService.getMessages();
    this.subscription = this.chatService.messageChangedEvent.subscribe((messageList: Chat[])=> this.messages = messageList);
    setTimeout(() => { this.ngOnInit() }, 2);
  }

  onAddMessage(message: Chat) {
    this.chatService.addMessage(message);
  }

  ngOnDestroy(): void { this.subscription?.unsubscribe(); }
}
