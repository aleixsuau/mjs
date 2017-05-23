import { Component, OnInit } from '@angular/core';

import { AgendaService, AgendaItem } from './agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  agenda: AgendaItem[];

  constructor(private agendaService: AgendaService) { }

  ngOnInit() {
    this.agenda = this.agendaService.getAgenda();
  }

}
