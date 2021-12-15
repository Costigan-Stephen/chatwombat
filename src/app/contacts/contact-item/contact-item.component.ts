import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/chat/chat.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  messageSender: string;
  constructor(private chatService: ChatService, private route:Router) { 
    
  }

  ngOnInit(): void {
    this.messageSender = this.chatService.getUserId();
  }

  navContact(userID: string){
    this.route.navigate(['/chat/contacts/', userID]);
  }

}
