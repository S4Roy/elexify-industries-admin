import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserRolePermissionsComponent } from './new-user-role-permissions.component';

describe('NewUserRolePermissionsComponent', () => {
  let component: NewUserRolePermissionsComponent;
  let fixture: ComponentFixture<NewUserRolePermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserRolePermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserRolePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
