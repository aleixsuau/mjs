import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FooterComponent } from './footer.component';

// SUITE
fdescribe('FooterComponent', () => {
  // Suite's vars
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;

  // BEFOREEACH: Executed before each spec (resets the TestBed)
  beforeEach(() => {
    // TESTBED: Generates an Angular testing module (@NgModule) and
    // configures it with the environment needed (components, services...)
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
      // OTHER: imports, providers... Not needed in this case.
    });
  });

  beforeEach(() => {
    // DEBUGGING EXPLANATION (Karma window, Inspector > Source > Ctrl + P > breakpoints)

    // FIXTURE: Instantiates the element and returns the component's fixture,
    // a handle on the test environment surrounding the created component that contains the component & debugElement
    fixture = TestBed.createComponent(FooterComponent);

    // COMPONENT: component instance itself (class and its methods)
    component = fixture.componentInstance;
    // console.info('component: ', component);
    // DEBUG ELEMENT: a handle on the component's DOM element to work with it (query...)
    debugElement = fixture.debugElement;
    // console.info('debugElement: ', debugElement);
    // ELEMENT: DOM Element naked
    element = debugElement.nativeElement;
    console.info('element: ', element, element.style);
  });

  // >>>> COMPONENT TESTING
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain textBase', () => {
    expect(component.textBase).toBe('All rights all right');
    expect(component.textBase).toContain('All rights all right');
    expect(component.textBase).toEqual('All rights all right');
  });

  it('should have the correct year', () => {
    // DETECCHANGES: triggers data binding and propagates the data to the DOM element.
    fixture.detectChanges();

    const yearTest = new Date().getFullYear();
    expect(component.year).toEqual(yearTest);
  });

  it('should contain year in the textBase', () => {
    fixture.detectChanges();
    expect(component.footerText).toContain(component.year);
  });

  // >>>> DOM/VIEW TESTING
  it('should contain year in the view', () => {
    fixture.detectChanges();
    const paragraph = debugElement.query(By.css('p')).nativeElement.textContent;
    expect(paragraph).toContain(component.year);
  });

  it('should contain textBase in the view', () => {
    fixture.detectChanges();
    const paragraph = debugElement.query(By.css('p')).nativeElement.textContent;
    expect(paragraph).toContain(component.textBase);
  });

  it('should hide the footerText', () => {
    fixture.detectChanges();

    const editButton = debugElement.query(By.css('#button'));
    editButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const paragraph = debugElement.query(By.css('p'));

    expect(paragraph).toBeNull();
  });

});
