import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalInfosComponent } from './edit-personal-infos.component';

describe('EditPersonalInfosComponent', () => {
  let component: EditPersonalInfosComponent;
  let fixture: ComponentFixture<EditPersonalInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonalInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonalInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
