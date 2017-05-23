import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AgendaComponent } from './agenda/agenda.component';
import { NewsComponent } from './news/news.component';
import { WorkComponent } from './work/work.component';

import { AgendaService } from './agenda/agenda.service';


describe('AppComponent', () => {
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
      declarations: [
        AppComponent,
        AgendaComponent,
        NewsComponent,
        WorkComponent
      ],
      providers: [ {provide: AgendaService, useValue: AgendaServiceFake} ]
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
