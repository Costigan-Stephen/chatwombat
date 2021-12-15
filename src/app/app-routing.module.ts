import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ContactItemComponent } from "./contacts/contact-item/contact-item.component";
import { ContactListComponent } from "./contacts/contact-list/contact-list.component";
import { AuthGuard } from './auth-guard.service';
import { ContactEditComponent } from "./contacts/contact-edit/contact-edit.component";
import { ContactDetailComponent } from "./contacts/contact-detail/contact-detail.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { ChatComponent } from "./chat/chat.component";
import { HomeComponent } from "./home/home.component";
import { ChatListComponent } from "./chat/chat-list/chat-list.component";
import { LoggedinComponent } from './loggedin/loggedin.component';
import { LoggedoutComponent } from './loggedout/loggedout.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
    //{path: '', component: DocumentsComponent },
    //{ path: '', redirectTo: '/chat', pathMatch: 'full' },
    {path: 'chat', component: LoggedinComponent, children:[
      {path: 'newchat',   component: ChatListComponent },
      {path: ':id',       component: ChatListComponent },
    ]},

    {path: 'contacts',    component: ContactsComponent, children: [
      {path: 'new',       component: ContactEditComponent },
      {path: ':id',       component: ContactDetailComponent },
      {path: ':id/edit',  component: ContactEditComponent }
    ]},
  
    {path: 'register', component: RegisterComponent },
    {path: '**', component: HomeComponent },
  ];

@NgModule ({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}