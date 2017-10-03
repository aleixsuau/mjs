import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  onMenuClick: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitToggle() {
    this.onMenuClick.emit();
  }

}
