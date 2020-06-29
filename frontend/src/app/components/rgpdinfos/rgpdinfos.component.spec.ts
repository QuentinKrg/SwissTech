import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RGPDInfosComponent } from './rgpdinfos.component';

describe('RGPDInfosComponent', () => {
  let component: RGPDInfosComponent;
  let fixture: ComponentFixture<RGPDInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RGPDInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RGPDInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
