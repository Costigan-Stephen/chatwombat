import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  subscription: Subscription;
  contacts: Contact[] = [];
  searchterm: string;
  
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    //this.contactService.contactChangedEvent.subscribe((contacts) => this.contacts = contacts.slice());
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contact[]) => this.contacts = contactsList.slice());
  }

  search(value: string) {
    this.searchterm = value;
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }

}

