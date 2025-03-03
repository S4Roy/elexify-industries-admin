import { Component, Input } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { isImage } from '../../../../global';

@Component({
  selector: 'app-side-nav',
  imports: [NgIf, NgFor, MatIconModule, RouterModule, NgClass],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  constructor(private router: Router) {}
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
              label: 'About Us',
              url: '/pages/about',
              exact: true,
            },
            {
              label: 'Why ANCTPL?',
              url: '/pages/why-anctpl',
              exact: true,
            },
            {
              label: 'Services',
              url: '/pages/service',
              exact: true,
            },
            {
              label: 'FAQs',
              url: '/pages/faq',
              exact: true,
            },
            {
              label: 'Awards',
              url: '/pages/awards',
              exact: true,
            },
            {
              label: 'News & Events',
              url: '/pages/news_event',
              exact: true,
            },
            {
              label: 'Success Stories',
              url: '/pages/success_story',
              exact: true,
            },
            {
              label: 'Gallery',
              url: '/pages/gallery',
              exact: true,
            },
            {
              label: 'Career',
              url: '/pages/career',
              exact: true,
            },
            {
              label: 'Tender',
              url: '/pages/tender',
              exact: true,
            },
            {
              label: 'Clientele',
              url: '/pages/clientele',
              exact: true,
            },
            ,
            {
              label: 'Contact Us',
              url: '/pages/contact_us',
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
          image_path: 'assets/sidebar_icon/media_management.svg',
          url: '/media',
        },
        {
          label: 'Enquiry Management',
          icon: 'contacts',
          image_path: 'assets/sidebar_icon/enquery_management.svg',
          url: '/enquiry',
        },
        {
          label: 'Career Management',
          icon: 'format_list_bulleted',
          image_path: 'assets/sidebar_icon/career_managment.svg',
          url: '/career',
        },
        {
          label: 'Clientele',
          icon: 'format_list_bulleted',
          image_path: 'assets/sidebar_icon/clientele.svg',
          url: '/clientele',
        },
        {
          label: 'Awards',
          icon: 'format_list_bulleted',
          image_path: 'assets/sidebar_icon/award-updated-icon.svg',
          url: '/awards',
        },
        {
          label: 'News & Events',
          icon: 'format_list_bulleted',
          image_path: 'assets/sidebar_icon/award-updated-icon.svg',
          url: '/newsevent',
        },
        {
          label: 'Tender',
          icon: 'format_list_bulleted',
          image_path: 'assets/sidebar_icon/award-updated-icon.svg',
          url: '/tender',
        },
        {
          label: 'Success Stories',
          icon: 'format_list_bulleted',
          image_path: 'assets/sidebar_icon/award-updated-icon.svg',
          url: '/success-stories',
        },
        {
          label: 'Teams',
          icon: 'contacts',
          image_path: 'assets/sidebar_icon/users.svg',
          url: '/teams',
        },
      ],
    },
    {
      title: 'Others',
      description: 'Manage your details',
      menuItems: [
        {
          label: 'Settings',
          icon: 'settings',
          image_path: 'assets/sidebar_icon/settings.svg',
          url: '/settings',
        },
        {
          label: 'User',
          icon: 'contacts',
          image_path: 'assets/sidebar_icon/users.svg',
          url: '/user',
        },
      ],
    },
  ];
  isActiveChild() {
    let isPage = this.router.url.startsWith('/pages');
    return isPage;
  }
}
