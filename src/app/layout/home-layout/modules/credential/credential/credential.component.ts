import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterCardComponent } from '../../../includes/router-card/router-card.component';

@Component({
  selector: 'app-credential',
  imports: [NgFor, RouterModule, RouterCardComponent],
  templateUrl: './credential.component.html',
  styleUrl: './credential.component.scss',
})
export class CredentialComponent {
  item_list: any = [
    {
      label: 'Credentials',
      description: 'Manage Credentials',
      router_path: '/credentials/list',
      icon: 'assets/sidebar_icon/credentials.png',
    },
    {
      label: 'Credentials Category',
      description: 'Manage Category',
      router_path: '/credentials/category',
      icon: 'assets/sidebar_icon/category.png',
    },
    {
      label: 'Credentials Certificates',
      description: 'Manage Certificates',
      router_path: '/credentials/certificates',
      icon: 'assets/sidebar_icon/certificates.png',
    },
  ];
}
