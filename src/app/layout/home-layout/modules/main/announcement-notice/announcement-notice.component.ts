import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-announcement-notice',
  imports: [NgFor],
  templateUrl: './announcement-notice.component.html',
  styleUrl: './announcement-notice.component.scss'
})
export class AnnouncementNoticeComponent {
  @Input() dashboard: boolean = false;
  items = [
    {
      image: 'https://images.unsplash.com/photo-1580489667171-0a26572f5521?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      announcement: 'Announcement | 19 Nov, 2024',
      title: 'AISATS DEL receives the Best Station award at the 2023 GHI...',
      views: '2,914',
    },
    {
      image: 'https://images.unsplash.com/photo-1544367522-031605a3b095?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      announcement: 'Announcement | 19 Nov, 2024',
      title: 'AISATS DEL receives the Best Station award at the 2023 GHI...',
      views: '2,914',
    },
  ]




}
