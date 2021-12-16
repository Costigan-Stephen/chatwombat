import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggedout',
  templateUrl: './loggedout.component.html',
  styleUrls: ['./loggedout.component.scss']
})
export class LoggedoutComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  signup() {

  }

  login() {
    this.route.navigate(['/chat/']);
  }
}
