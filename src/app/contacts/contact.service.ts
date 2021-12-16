import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable, EventEmitter, Output} from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  @Output() contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  //HTTP_URL = environment.apiURL + "/contacts.json";

  HTTP_URL = environment.LOCALURL + "contacts";
  maxContactId: number;
  private contacts: Contact [] =[];
   //private contactsListClone: Contact [] =[];

   
  constructor(private HTTP: HttpClient) {
    this.contacts = MOCKCONTACTS;
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
    this.HTTP.get<Contact[]>(this.HTTP_URL)
      .subscribe((contactList: Contact[]) => {
        // console.log(contactList);
        this.contacts = contactList;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : 0);
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error) => { console.log(error); });
      // console.log(this.contacts);
  }

  getContacts(): Contact[]{ 
    if(!this.contacts)
      this.fetchContacts();
    return this.contacts.slice();
  }

  getContact(id: string): Contact{ 
    if(!this.contacts)
      this.fetchContacts();
    for (const contact of this.contacts)
      if (contact.id === id) return contact;
    return null;
  }

  deleteContact(contact: Contact): void {
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

  addContact(newContact: Contact): void {
    if (!newContact) return;

    // make sure id of the new Document is empty
    newContact.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });

    // add to database
    this.HTTP.post<{ 
      message: string, 
      newContact: Contact }>
      (this.HTTP_URL, newContact, { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.contacts.push(responseData.newContact);
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact): void {
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