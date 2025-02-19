import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterCardComponent } from '../../../includes/router-card/router-card.component';

@Component({
  selector: 'app-faqs',
  imports: [NgFor, RouterModule, RouterCardComponent],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss',
})
export class FaqsComponent {
  faq_nav_list: any = [
    {
      label: 'FAQ Category',
      description: '4 Category Added',
      router_path: '/settings/faq/category',
    },
    {
      label: 'Questions',
      description: '4 Questions Added',
      router_path: '/settings/faq/questions',
    },
  ];
}
