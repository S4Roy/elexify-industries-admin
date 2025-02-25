import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouterCardComponent } from '../../../includes/router-card/router-card.component';

@Component({
  selector: 'app-settings',
  imports: [NgFor, RouterModule, RouterCardComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  nav_list: any = [
    {
      label: 'Frequently Ask Questions',
      description: 'Manage Data',
      router_path: '/settings/faq',
    },
    {
      label: 'User Role & Permissions',
      description: 'Manage Role & Permissions',
      router_path: '/settings/user-role-permissions',
      icon: 'assets/user-vector.png',
    },
    {
      label: 'Terms & Conditions',
      description: 'Add Terms & Conditions',
      router_path: '/settings/terms-conditions',
      icon: 'assets/list-outline.png',
    },
    {
      label: 'Privacy & Policies',
      description: 'Add Privacy & Policies',
      router_path: '/settings/privacy-policies',
      icon: 'assets/list-outline.png',
    },
    {
      label: 'FAQ Category',
      description: 'Manage Category',
      router_path: '/settings/faq/category',
    },
    {
      label: 'Site Info',
      description: 'Manage Site Info',
      router_path: '/settings/site-info',
    },
  ];
}
