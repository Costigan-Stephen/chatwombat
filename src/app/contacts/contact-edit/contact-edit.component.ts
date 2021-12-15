import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { URLSearchParams, QueryEncoder } from '@angular/http';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  contact?: Contact; 
  originalContact?: Contact; 
  groupContacts: Contact[] = [];

  id: string;
  contactAdded: boolean; // to show errors/successes when appropriate
  contactSelf: boolean;
  editMode: boolean = false;

  selectedContact: Contact;
  
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { }

  
  ngOnInit(): void {
    this.contactSelf = null;
    this.contactAdded = null;
    
    this.route.url.subscribe((params: Params) => {
      var str = this.router.url;
      this.id = str.replace(/\D/g, "");
      console.log("Route: " + this.route);
      console.log("Params: " + JSON.stringify(params));
      console.log("ID: "+this.id);
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact)
        return;

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      if (this.contact?.group && this.contact?.group?.length > 0) 
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group)); 
    });
  }

  onRemoveItem(index: number): void {
    if (index < 0 || index >= this.groupContacts.length)
      return;
    this.groupContacts.splice(index, 1);
  }

  onSubmit(form: NgForm): void{    
    const value = form.value;
    const newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, this.groupContacts);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['chat/added']);
  }

  isInvalidContact(newContact: Contact) {
    this.contactSelf = false;
    this.contactAdded = false;

    if (!newContact) // new contact is empty
      return true;
    
    if (this.contact && newContact.id === this.contact.id) {
      this.contactSelf = true;
      return true;
    }
    
    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id)
        return true;
    }
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
      this.contactAdded = false;
      return;
    }
    this.groupContacts.push(selectedContact);
    this.contactAdded = true;
  }

}
