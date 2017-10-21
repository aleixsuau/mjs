/* import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AgendaPreviewComponent } from './agenda-preview.component';

import { EventsService } from '../../services/events.service';


describe('AgendaPreviewComponent', () => {
  let fixture: ComponentFixture<AgendaPreviewComponent>;
  let component: AgendaPreviewComponent;
  let debugElement: DebugElement;
  let nativeElement: any;
  let EventsServiceFake: EventsService;

  beforeEach(async(() => {
    // fake EventsService for test purposes
    EventsServiceFake = {
      collection: [
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
      read: function() {
          return this.agenda;
      },
      store: ''
    };
    TestBed.configureTestingModule({
      declarations: [ AgendaPreviewComponent ],
      providers: [ {provide: EventsService, useValue: EventsServiceFake} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaPreviewComponent);
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
