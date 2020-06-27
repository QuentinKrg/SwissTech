import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalsMentionsComponent } from './legals-mentions.component';

describe('LegalsMentionsComponent', () => {
  let component: LegalsMentionsComponent;
  let fixture: ComponentFixture<LegalsMentionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalsMentionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalsMentionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
