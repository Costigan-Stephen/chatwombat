import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ContactService } from 'src/app/contacts/contact.service';
import { environment } from 'src/environments/environment';

import { Contact } from '../../contacts/contact.model';
import { Conversation } from '../conversation.model';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-chat-new',
  templateUrl: './chat-new.component.html',
  styleUrls: ['./chat-new.component.scss']
})
export class ChatNewComponent implements OnInit {
  @Output() contactSelectedEvent: EventEmitter<Conversation> = new EventEmitter<Conversation>();
  @Output() contactChangedEvent: EventEmitter<Conversation[]> = new EventEmitter<Conversation[]>();
  contactListChangedEvent = new Subject<Conversation[]>();
  subscription: Subscription;
  HTTP_URL = environment.LOCALURL + "conversation";
  maxContactId: number;
  private conversations: Conversation [] =[];
  groupContacts: Contact[] = [];
  groupItems: string[] = [];
  contacts: Contact[] = [];
  contact?: Contact; 

  id: string;
  contactAdded: boolean; // to show errors/successes when appropriate
  contactSelf: boolean;
  editMode: boolean = false;

  selectedContact: string;
  
  constructor(
    private contactService: ContactService,
    private conversationService: ConversationService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.contacts = this.contactService.getContacts();
    //this.contactService.contactChangedEvent.subscribe((contacts) => this.contacts = contacts.slice());
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contact[]) => this.contacts = contactsList.slice());
    }

  
  ngOnInit(): void {
    this.contactSelf = null;
    this.contactAdded = null;
    
    this.route.url.subscribe(() => {
      var str = this.router.url;
      this.id = str.replace(/\D/g, "");
      // console.log("Route: " + this.route);
      // console.log("Params: " + JSON.stringify(params));
      // console.log("ID: "+this.id);
    });
  }

  onRemoveItem(index: number): void {
    if (index < 0 || index >= this.groupContacts.length)
      return;
    this.groupContacts.splice(index, 1);
  }

  onSubmit(form: NgForm): void{    
    const value = form.value;
    const newContact = new Conversation(value.id, this.groupItems);
    console.log(newContact);
    this.conversationService.addContact(newContact);
    this.router.navigate(['chat/added']);
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;

    this.groupItems.push(selectedContact.id);
    this.groupContacts.push(selectedContact);
    this.contactAdded = true;
  }
}
