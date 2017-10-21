import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  textBase = 'All rights all right';
  hideTextBase: boolean;
  footerText: string;
  year: number;

  constructor() { }

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.footerText =  `${this.textBase}: ${this.year}`;
  }

}
