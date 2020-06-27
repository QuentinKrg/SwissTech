import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-infos',
  templateUrl: './contact-infos.component.html',
  styleUrls: ['./contact-infos.component.css']
})
export class ContactInfosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0,0);
  }

}
