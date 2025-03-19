import { Component } from '@angular/core';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { Editor } from 'ngx-editor';
import * as Global from "../../../../global"
@Component({
  selector: 'app-about-roadmap-info-card',
  imports: [ThumbnailComponent,FormsModule,ReactiveFormsModule,NgxEditorModule],
  templateUrl: './about-roadmap-info-card.component.html',
  styleUrl: './about-roadmap-info-card.component.scss'
})
export class AboutRoadmapInfoCardComponent {
  Global=Global
  formGroup!: FormGroup;
  editor!: Editor;
  html = '';
  isFirstCondition: boolean = true;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      email: [null, Validators.required],
      password: [null],
    });
  }
  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
