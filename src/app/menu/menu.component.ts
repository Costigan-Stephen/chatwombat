import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chat } from '../chat/chat.model';
import { ChatService } from '../chat/chat.service';
import { ContactService } from '../contacts/contact.service';
import { Conversation } from '../conversations/conversation.model';
import { ConversationService } from '../conversations/conversation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  conversations : Conversation[];
  currentUser: string;
  subscription: Subscription;
  constructor( private route:Router, contactService: ChatService ) {
    this.currentUser = contactService.getUserId();
  }

  ngOnInit(): void {
      

  }

  settings(){
    this.route.navigate(['/chat/contacts/', this.currentUser]);
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
