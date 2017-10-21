/* import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AgendaComponent } from './features/agenda/containers/agenda/agenda.component';
import { NewComponent } from './features/news/components/new/new.component';
import { JobComponent } from './features/jobs/components/job/job.component';

import { EventsService } from './features/agenda/services/events.service';


describe('AppComponent', () => {
  beforeEach(async(() => {
  // fake AgendaService for test purposes
  const EventsServiceFake = {
      collection : [
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
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AgendaComponent,
        NewComponent,
        JobComponent
      ],
      providers: [ {provide: EventsService, useValue: EventsServiceFake} ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
 */
