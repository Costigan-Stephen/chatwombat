import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Observer, Subject } from 'rxjs';

import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Conversation } from './conversation.model';
import { Contact } from '../contacts/contact.model';
import { ContactService } from '../contacts/contact.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  @Output() contactSelectedEvent: EventEmitter<Conversation> = new EventEmitter<Conversation>();
  @Output() contactChangedEvent: EventEmitter<Conversation[]> = new EventEmitter<Conversation[]>();
  contactListChangedEvent = new Subject<Conversation[]>();
  //HTTP_URL = environment.apiURL + "/contacts.json";

  HTTP_URL = environment.LOCALURL + "conversations";
  maxContactId: number;
  private contacts: Conversation [] =[];
   //private contactsListClone: Contact [] =[];

   
  constructor(private HTTP: HttpClient) {
    //this.contacts = MOCKCONTACTS;
      // this.contacts = MOCKCONTACTS;
      // this.maxContactId = this.getMaxId();
      this.fetchContacts();
   }

   getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId)
        maxId = currentId; 
    }
    return maxId;
  }

  fetchContacts(){
    this.HTTP.get<Conversation[]>(this.HTTP_URL)
      .subscribe((contactList: Conversation[]) => {
        console.log(contactList);
        this.contacts = contactList;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : 0);
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error) => { console.log(error); });
      console.log(this.contacts);
  }

  getContacts(): Conversation[]{ 
    if(!this.contacts)
      this.fetchContacts();
    return this.contacts.slice();
  }

  getContact(id: string): Conversation{ 
    if(!this.contacts)
      this.fetchContacts();
    for (const contact of this.contacts)
      if (contact.id === id) return contact;
    return null;
  }

  deleteContact(contact: Conversation): void {
    if ( !contact ) return; 

    const position = this.contacts.indexOf(contact);
    if ( position < 0 ) return; 

    this.HTTP.delete(this.HTTP_URL + '/' + contact.id)
      .subscribe(
        () => {
          this.contacts.splice(position, 1);
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  addContact(newContact: Conversation): void {
    if (!newContact) return;

    // make sure id of the new Document is empty
    newContact.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });

    // add to database
    this.HTTP.post<{ 
      message: string, 
      newContact: Conversation }>
      (this.HTTP_URL, newContact, { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.contacts.push(responseData.newContact);
          this.contactListChangedEvent.next(this.contacts.slice());
          console.log("Convo:" + responseData.newContact);
        }
      );
  }

  updateContact(originalContact: Conversation, newContact: Conversation): void {
    if (!originalContact || !newContact) return;
    
    const position = this.contacts.indexOf(originalContact);
    if (position < 0) return;
    
    newContact.id = originalContact.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.HTTP.put( this.HTTP_URL + "/" + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        () => {
          this.contacts[position] = newContact;
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

}
