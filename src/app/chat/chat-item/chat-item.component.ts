import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Chat } from '../chat.model';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {
  @Input() message: Chat;
  currentUser: string;

  messageSender: string;
  imagesrc: string;

  constructor(private contactService: ContactService, private chatService: ChatService) {
    this.currentUser = chatService.getUserId();
  }

  ngOnInit(): void {
    const contact: Contact = this.contactService.getContact(this.message.sender);
     this.messageSender = contact?.name;
     this.imagesrc = contact?.imageUrl;
  }

}
