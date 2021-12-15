import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {

  selectedContact: Contact;
  
  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.contactService.contactSelectedEvent
    .subscribe( 
      (contact: Contact) => { this.selectedContact = contact; } 
    );
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedContact = params['id'];
      }
    )
  }

}
