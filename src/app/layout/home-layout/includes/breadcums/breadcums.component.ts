import { JsonPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HelpersService } from '../../../../core/services/helpers.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavService } from 'app/core/services/nav.service';
import { EventsService } from 'app/core/services/event.service';

@Component({
  selector: 'app-breadcums',
  imports: [NgFor, RouterModule, NgIf, MatIconModule, MatButtonModule],
  templateUrl: './breadcums.component.html',
  styleUrl: './breadcums.component.scss',
})
export class BreadcumsComponent {
  breadcrumbs: any = [];
  showAddBtn: boolean = false;
  settingsOutlet: boolean = false;
  usersOutlet: boolean = false;
  pageTitle: any = null;
  constructor(
    private helperService: HelpersService,
    public navService: NavService,
    public eventsService: EventsService
  ) {
    this.eventsService.showAddBtn$.subscribe((status) => {
      this.showAddBtn = status;
    });
    this.helperService.pageTitle$.subscribe((title: any) => {
      this.pageTitle = title;
    });
    this.helperService.breadcrumbs$.subscribe((res: any) => {
      this.breadcrumbs = res;
      this.settingsOutlet = this.breadcrumbs.some(
        (item: any) => item?.label === 'Settings'
      );
      this.usersOutlet = this.breadcrumbs.some(
        (item: any) => item?.label === 'Users'
      );
    });
  }
  upderHeaderVisibility() {
    this.navService.upderHeaderVisibility(!this.navService.headerOpen);
  }
}
