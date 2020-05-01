import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoginInfosComponent } from './edit-login-infos.component';

describe('EditLoginInfosComponent', () => {
  let component: EditLoginInfosComponent;
  let fixture: ComponentFixture<EditLoginInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLoginInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLoginInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
