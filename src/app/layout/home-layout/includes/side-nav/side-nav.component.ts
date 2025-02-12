import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { isImage } from '../../../../global';

@Component({
  selector: 'app-side-nav',
  imports: [NgIf, NgFor, MatIconModule, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  @Input() isNavOpen: boolean = true;
  itemList: any = [
    {
      title: 'Main',
      description: 'Manage your page',
      menuItems: [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          url: '/admin/dashboard',
          exact: true,
        },
        {
          label: 'Pages',
          icon: 'web',
          url: '/pages',
          childMenuItems: [
            {
              label: 'Home',
              url: '/pages/home',
              exact: true,
            },
            {
              label: 'About',
              url: '/pages/about',
              exact: true,
            },
            {
              label: 'Our Services',
              url: '/pages/our-services',
              exact: true,
            },
          ],
        },
        {
          label: 'Service Management',
          icon: 'format_list_bulleted',
          url: '/services',
        },
        {
          label: 'Media Management',
          icon: 'format_list_bulleted',
          image_path:'assets/sidebar_icon/media_management.svg',
          url: '/services',
        },
        {
          label: 'Enquiry Management',
          icon: 'contacts',
          image_path:'assets/sidebar_icon/enquery_management.svg',
          url: '/main/enquiry',
        },
        {
          label: 'Career Management',
          icon: 'format_list_bulleted',
          image_path:'assets/sidebar_icon/career_managment.svg',
          url: '/services',
        },
        {
          label: 'Clientele',
          icon: 'format_list_bulleted',
          image_path:'assets/sidebar_icon/clientele.svg',
          url: '/services',
        },
        {
          label: 'Awards',
          icon: 'format_list_bulleted',
          image_path:'assets/sidebar_icon/award-updated-icon.svg',
          url: '/services',
        }

      ],
    },
    {
      title: 'Others',
      description: 'Manage your details',
      menuItems: [
        {
          label: 'Settings',
          icon: 'settings',
          image_path:'assets/sidebar_icon/settings.svg',
          url: '/settings',
        },
        {
          label: 'User',
          icon: 'contacts',
          image_path:'assets/sidebar_icon/users.svg',
          url: '/user',
        },
      ],
    },
  ];
}
