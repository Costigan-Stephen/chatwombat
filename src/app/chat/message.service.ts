import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Observer, Subject } from 'rxjs';

import {MOCKMESSAGES} from './MOCKMESSAGES';
import { Chat } from './chat.model';
import { Contact } from '../contacts/contact.model';
import { ContactService } from '../contacts/contact.service';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  @Output() messageChangedEvent: EventEmitter<Chat[]> = new EventEmitter<Chat[]>();
  messageListChangedEvent = new Subject<Chat[]>();

  contacts: Contact [] =[];
  //HTTP_URL  = environment.apiURL + "/messages.json";
  HTTP_URL = environment.LOCALURL + "messages";

  messages: Chat [] = [];

  constructor(private HTTP: HttpClient, private contactService: ContactService) { 
    this.HTTP.get<Chat[]>(this.HTTP_URL)
      .subscribe((messagesList: Chat[]) => {
        this.messages = messagesList;
        this.messages.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : 0);
        this.messageListChangedEvent.next(this.messages.slice());
      },
      (error: any) => { console.log(error); });
    this.contacts = this.contactService.getContacts();
      //console.log(this.messages);
    // this.fetchPost();
    // this.messageListChangedEvent.next(this.messages.slice());
  }

  fetchPost(){
    this.HTTP.get<Chat[]>(this.HTTP_URL)
    .subscribe((messagesList: Chat[]) => {
      this.messages = messagesList;
      this.messages.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : 0);
    },
    (error: any) => { console.log(error); });
  }

  getMessages(): Chat[] { 
    return this.messages.slice();
  }

  getMessage(id: string): Chat{ 
    if(!this.messages)
      this.messages = this.getMessages();
    for (const message of this.messages){
      if (message.id === id) return message;
    }
    return null;
  }

  getSender(id: string): Chat{ 
    for (const message of this.messages){
      if (message.id === id) return message;
    }
    return null;
  }

  deleteMessage(message: Chat): void {
    if (!message) return;

    const position = this.messages.indexOf(message);
    if (position < 0) return;
    
    this.HTTP.delete(this.HTTP_URL +'/' + message.id)
      .subscribe(
        () => {
          this.messages.splice(position, 1);
          this.messageListChangedEvent.next(this.messages.slice());
        }
      );
  }

  addMessage(message: Chat): void {
    if (!message.msgText || !message.subject) 
      return;

      // make sure id of the new Document is empty
      message.id = '';

     const headers = new HttpHeaders({
       'Content-Type': 'application/json'
      });
 
     // add to database
     this.HTTP.post<{ 
       text: string, 
       newMessage: Chat }>
       (this.HTTP_URL, message, { headers: headers })
       .subscribe(
         (responseData) => {
           // add new document to documents
           this.messages.push(responseData.newMessage);
           this.messageListChangedEvent.next(this.messages.slice());
         }
       );
  }
}