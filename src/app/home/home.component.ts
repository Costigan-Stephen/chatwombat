import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedin: true;
  constructor() { }

  ngOnInit(): void {
  }

}
