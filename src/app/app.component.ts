import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  navEmitter: string = 'chat';  //starting layout
  title = 'ChatWombat';

  viewSelect(navEmitter: string) {
    this.navEmitter = navEmitter;
  }
}
