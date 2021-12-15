import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {
  filteredContactList: Contact[];

  transform(contactList: Contact[], filter: string): Contact[] {
    let filteredContactList: Contact[] = [];
    if (filter && filter.length > 0) {
      filteredContactList = contactList.filter(
        (contactList: Contact) => contactList.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    if (filteredContactList.length < 1) {
      return contactList;
    }
    return filteredContactList;
  }

}
