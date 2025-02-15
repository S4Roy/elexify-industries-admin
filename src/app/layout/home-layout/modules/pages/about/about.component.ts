import { Component } from '@angular/core';
import { InfoCardComponent } from '../../../includes/info-card/info-card.component';
import { AboutRoadmapInfoCardComponent } from '../../../includes/about-roadmap-info-card/about-roadmap-info-card.component'
import { TaggedSectionComponent } from '../../../includes/tagged-section/tagged-section.component';
import { ThumbnailComponent } from '../../../includes/thumbnail/thumbnail.component';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PartnersComponent } from '../../../includes/master/partners/partners.component';

@Component({
  selector: 'app-about',
  // imports: [InfoCardComponent,TaggedSectionComponent,MatIconModule,PartnersComponent,AboutRoadmapInfoCardComponent,ThumbnailComponent],
  imports: [InfoCardComponent,MatIconModule,PartnersComponent,ThumbnailComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
