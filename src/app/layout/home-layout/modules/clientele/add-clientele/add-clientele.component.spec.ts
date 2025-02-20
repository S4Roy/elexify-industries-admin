/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddClienteleComponent } from './add-clientele.component';

describe('AddClienteleComponent', () => {
  let component: AddClienteleComponent;
  let fixture: ComponentFixture<AddClienteleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClienteleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClienteleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
