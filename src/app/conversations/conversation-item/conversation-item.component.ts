import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/chat/chat.service';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Conversation } from '../conversation.model';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.scss']
})
export class ConversationItemComponent implements OnInit {
  contacts: Contact[];
  allcontacts: Contact[];
  @Input() conversation: Conversation;
  messageSender: string;
  constructor(
    private conversationService: ConversationService, 
    private chatService: ChatService, 
    private contactService: ContactService, 
    private route:Router) 
    { 
      
    }

  ngOnInit(): void {
    this.messageSender = this.chatService.getUserId();
    this.allcontacts = this.contactService.getContacts();
      this.contacts = [];
      for(let conv of this.conversation.contacts){
        for (const contact of this.allcontacts){
          if (contact.id === conv) 
            this.contacts.push(contact);
        }
      }
  }

  navContact(userID: string){
    this.route.navigate(['/chat/', userID]);
  }

}
