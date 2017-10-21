/* import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AgendaComponent } from './agenda.component';

import { AgendaService } from './agenda.service';


describe('AgendaComponent', () => {
  let fixture: ComponentFixture<AgendaComponent>;
  let component: AgendaComponent;
  let debugElement: DebugElement;
  let nativeElement: any;
  let AgendaServiceFake: AgendaService;

  beforeEach(async(() => {
    // fake AgendaService for test purposes
    AgendaServiceFake = {
      agenda : [
          {
              title: 'item1 title',
              description: 'item1 description',
              date: '01/08',
              time: '18:00'
          },
          {
              title: 'item2 title',
              description: 'item2 description',
              date: '01/09',
              time: '18:00'
          }
      ],
      getAgenda: function() {
          return this.agenda;
      }
    };
    TestBed.configureTestingModule({
      declarations: [ AgendaComponent ],
      providers: [ {provide: AgendaService, useValue: AgendaServiceFake} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a div tag', () => {
    // debugElement.query(By.css('<div>'));
    // nativeElement.querySelectorAll('p')
    expect(component).toBeTruthy();
  });
});
 */
