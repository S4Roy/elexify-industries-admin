import { Component } from '@angular/core';
import { NewFaqQuestionComponent } from './new-faq-question/new-faq-question.component';
import { MatDialog } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { MenuComponent } from '../../../../includes/menu/menu.component';

@Component({
  selector: 'app-faq-questions',
  imports: [NgIf,NgFor,MenuComponent],
  templateUrl: './faq-questions.component.html',
  styleUrl: './faq-questions.component.scss'
})
export class FaqQuestionsComponent {
item_list: any = [];
  constructor(private dialog: MatDialog) {}
  addItem(data: any = null) {
    this.dialog
      .open(NewFaqQuestionComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        
      });
  }
}

