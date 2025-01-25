import { Component } from '@angular/core';
//import { InfoCardComponent } from '../../../includes/info-card/info-card.component';
import { AboutRoadmapInfoCardComponent } from '../../../includes/about-roadmap-info-card/about-roadmap-info-card.component'
import { TaggedSectionComponent } from '../../../includes/tagged-section/tagged-section.component';
import { ThumbnailComponent } from '../../../includes/thumbnail/thumbnail.component';
import { MenuComponent } from '../../../includes/menu/menu.component';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PartnersComponent } from '../../../includes/master/partners/partners.component';
import { HomeSection2LandingInfoCardComponent } from '../../../includes/home-section2-landing-info-card/home-section2-landing-info-card.component';
import { HomeSection3LandingInfoCardComponent } from '../../../includes/home-section3-landing-info-card/home-section3-landing-info-card.component';
import { HomeSection4LandingServiceInfoCardComponent } from '../../../includes/home-section4-landing-service-info-card/home-section4-landing-service-info-card.component';

@Component({
  selector: 'app-home',
  //imports:[],
  //imports: [InfoCardComponent,TaggedSectionComponent,MatIconModule,PartnersComponent,AboutRoadmapInfoCardComponent,ThumbnailComponent],
  imports: [TaggedSectionComponent,MatIconModule,PartnersComponent,
    AboutRoadmapInfoCardComponent,HomeSection2LandingInfoCardComponent,
    HomeSection3LandingInfoCardComponent,
    HomeSection4LandingServiceInfoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
