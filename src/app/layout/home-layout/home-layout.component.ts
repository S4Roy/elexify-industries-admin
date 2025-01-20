import { Component } from '@angular/core';
import { HeaderComponent } from './includes/header/header.component';
import { SideNavComponent } from './includes/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { NavService } from '../../core/services/nav.service';
import { BreadcumsComponent } from './includes/breadcums/breadcums.component';
import { HelpersService } from '../../core/services/helpers.service';

@Component({
  selector: 'app-home-layout',
  imports: [HeaderComponent, SideNavComponent, RouterModule, BreadcumsComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
})
export class HomeLayoutComponent {
  isNavOpen: boolean = false;
  pagesOutlet: boolean = false;
  breadcrumbs: any = [];
  constructor(private navService: NavService, private helperService: HelpersService) { }
  ngOnInit() {
    this.navService.isNavOpen().subscribe((boolean: boolean) => {
      this.isNavOpen = boolean;
    });
    this.helperService.breadcrumbs$.subscribe((res: any) => {
      this.breadcrumbs = res;
      this.pagesOutlet = this.breadcrumbs.some((item: any) => item?.label === "Pages");

    });
  }
  toggleSideNav(toggleSate: any) {
    this.navService.updateNav(!toggleSate);
  }
}
