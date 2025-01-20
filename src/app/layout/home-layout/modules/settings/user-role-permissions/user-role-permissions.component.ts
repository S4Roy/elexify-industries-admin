import { Component } from '@angular/core';
//import { MenuComponent } from '../../../../includes/menu/menu.component';
import { NgFor, NgIf } from '@angular/common';
//import { NewFaqCategoryComponent } from './new-faq-category/new-faq-category.component';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { NewUserRolePermissionsComponent } from './new-user-role-permissions/new-user-role-permissions.component';

@Component({
  selector: 'app-user-role-permissions',
  imports: [MenuComponent, NgFor, NgIf],
  templateUrl: './user-role-permissions.component.html',
  styleUrl: './user-role-permissions.component.scss'
})
export class UserRolePermissionsComponent {
  item_list: any = [];
    constructor(private dialog: MatDialog) {}
    addItem(data: any = null) {
      this.dialog
        .open(NewUserRolePermissionsComponent, {
          data: data,
          disableClose: true,
        })
        .afterClosed()
        .subscribe((res: any) => {
          console.log(res);
        });
    }
}
