import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../chat/chat.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  conversations : Chat[];
  currentUser: string = "0";
  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  settings(){
    this.route.navigate(['/chat/contacts/', this.currentUser]);
  }
}
