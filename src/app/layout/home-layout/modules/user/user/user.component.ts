import { Component } from '@angular/core';
import { MenuComponent } from '../../../includes/menu/menu.component';
 import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  imports:[MenuComponent, NgFor, NgIf,RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  item_list: any = [];
    constructor(private dialog: MatDialog) {}
     addItem(data: any = null) {
       this.dialog
         .open(AddNewUserComponent, {
           data: data,
           disableClose: true,
         })
         .afterClosed()
         .subscribe((res: any) => {
           console.log(res);
         });
     }
}
