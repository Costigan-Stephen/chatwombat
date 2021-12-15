import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';

// --------- Pipes
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import { ImagePipe } from './contacts/image.pipe'

// --------- Menu
import { MenuComponent } from './menu/menu.component';

// --------- Chat
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ChatItemComponent } from './chat/chat-item/chat-item.component';
import { ChatNewComponent } from './chat/chat-new/chat-new.component';

// DIRECTIVES
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';

// --------- Contacts
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { LoggedinComponent } from './loggedin/loggedin.component';
import { LoggedoutComponent } from './loggedout/loggedout.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { ContactSuccessComponent } from './contacts/contact-success/success.component';




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
    ContactListComponent,
    ContactsFilterPipe,
    HomeComponent,
    ImagePipe,
    LoggedinComponent,
    LoggedoutComponent,
    FooterComponent,
    RegisterComponent,
    ChatNewComponent,
    ContactSuccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DndModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
