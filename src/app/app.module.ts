import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ChatComponent } from './chat/chat.component';
import { MenuComponent } from './menu/menu.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ChatItemComponent } from './chat/chat-item/chat-item.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ChatComponent,
    MenuComponent,
    ChatListComponent,
    ChatItemComponent,
    ContactDetailComponent,
    ContactEditComponent,
    ContactItemComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
