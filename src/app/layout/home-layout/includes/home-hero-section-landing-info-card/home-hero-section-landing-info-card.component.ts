import { Component } from '@angular/core';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { Editor } from 'ngx-editor';
import { MenuComponent } from '../menu/menu.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../../../../core/services/master.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { NewHeroSectionComponent } from './new-hero-section/new-hero-section.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-home-hero-section-landing-info-card',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule, MenuComponent,
    //MatIcon,MatMenu,
    MatMenuModule, MatButtonModule,
    MatIconModule, RouterModule,
    NgIf,
    NgFor,
    MatTooltipModule
  ],
  templateUrl: './home-hero-section-landing-info-card.component.html',
  styleUrl: './home-hero-section-landing-info-card.component.scss'
})
export class HomeHeroSectionLandingInfoCardComponent {

  homeHeroSecForm: FormGroup;

  heroSectionData: any = [];
 
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;



  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private master: MasterService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
    //   Initialize the form
    this.homeHeroSecForm = this.fb.group({
      hero_sec_main_heading: [''],
      hero_sec_sub_heading: [''],
      file: [''] // Form control for the image
    });

  }

  ngOnInit(): void {
    this.getHeroSectionData();
  }

  addItem(data: any = null) {
    this.dialog
      .open(NewHeroSectionComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
     //   console.log(res,"res-hero-sec");
       if (res) {
        this.getHeroSectionData();
       }
      });
  }
  
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.homeHeroSecForm.patchValue({
        file: target.files[0]
      })
      this.selectedImage = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Set the image preview

      };
      reader.readAsDataURL(this.selectedImage);
      this.confirmUpload();
    }
    else {
      this.homeHeroSecForm.patchValue({
        file: null
      })
    }

  }
  cancelImage() {
    // Implement your cancel image logic here
   // console.log('Cancel Image Clicked!');
  }
  confirmUpload() {
    const confirmation = confirm('Are you sure you want to upload this image?');
    if (!confirmation) {
      this.selectedImage = null; // Reset if not confirmed
      this.imagePreview = null; // Reset preview
      this.homeHeroSecForm.reset(); // Reset the form
    }
  }
  getHeroSectionData(data?: any) {
    let params: URLSearchParams = new URLSearchParams();
    this.master.getHeroSectionData(params).pipe().subscribe(
      (res: any) => {
       // console.log(res, "heroSectionData ressssssssss");
        this.heroSectionData = res;
      },
      err => {
        this.toastr.error(err.error.msg, '', {
          timeOut: 1000,
        });
        // this.loading = LoadingState.Ready;
      }
    );
  }

  addDetails() {
   // console.log("Add more called...");
  }

  
  deleteItem(item?: any) {
    const deletePayload = {
      id: item.id, 
      setting_id: item.setting_id,
    };
    
     this.master.deleteHeroSectionData(deletePayload)
       .subscribe(
         (response) => {  
           this.getHeroSectionData();
         },
         (error) => {
           
         //  console.error('Error deleting item:', error);
           this.homeHeroSecForm.enable();
         }
       );
  }

}
