import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfosComponent } from './contact-infos.component';

describe('ContactInfosComponent', () => {
  let component: ContactInfosComponent;
  let fixture: ComponentFixture<ContactInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
