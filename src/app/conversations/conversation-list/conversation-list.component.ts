import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/chat/chat.service';
import { Conversation } from '../conversation.model';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {
  conversations : Conversation[];
  currentUser: string;
  subscription: Subscription;
  
  constructor(
    private route:Router, 
    private conversationService: ConversationService, 
    private chatService : ChatService) { 
      
      this.subscription = this.conversationService.contactListChangedEvent.subscribe((contactsList: Conversation[]) => this.conversations = contactsList.slice());
      
    }

  ngOnInit(): void {
    this.currentUser = this.chatService.getUserId();
      this.conversations = this.conversationService.findConversations(this.currentUser);
    console.log(this.conversations);
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }

}
