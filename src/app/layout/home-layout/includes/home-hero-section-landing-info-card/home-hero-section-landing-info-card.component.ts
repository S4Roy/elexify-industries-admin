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
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../../../../core/services/master.service';

@Component({
  selector: 'app-home-hero-section-landing-info-card',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    //MatIcon,MatMenu,
    MatMenuModule, MatButtonModule,
    MatIconModule, RouterModule,
    NgIf
  ],
  templateUrl: './home-hero-section-landing-info-card.component.html',
  styleUrl: './home-hero-section-landing-info-card.component.scss'
})
export class HomeHeroSectionLandingInfoCardComponent {

  homeHeroSecForm: FormGroup;
  isEditMode: boolean = false; // Flag to check if we are in edit mode
  currentItemIndex: number | null = null; // To track the current item index

  //myForm: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  // constructor(private fb: FormBuilder) {
  //   this.myForm = this.fb.group({
  //  image: [null] // Form control for the image
  //   });
  // }

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private master: MasterService
  ) {
    //   // Initialize the form
    this.homeHeroSecForm = this.fb.group({
      hero_sec_main_heading: [''],
      hero_sec_sub_heading: [''],
      file: [null] // Form control for the image
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  // Method to save or update the item
  // save() {
  //   const itemData = this.homeHeroSecForm.value;

  //   if (this.isEditMode && this.currentItemIndex !== null) {
  //     this.updateItem(itemData);
  //   } else {
  //     this.saveItem(itemData);
  //     this.isEditMode = true;
  //   }
  // }

  // Method to save a new item
  saveItem(itemData: any) {
    const items = this.getItemsFromLocalStorage();
    items.push(itemData);
    localStorage.setItem('items', JSON.stringify(items));
    this.homeHeroSecForm.patchValue(items); // Update the form with the saved data
    //this.resetForm();
    console.log('Item saved:', itemData);
  }

  // Method to update an existing item
  updateItem(itemData: any) {
    const items = this.getItemsFromLocalStorage();
    if (this.currentItemIndex !== null) {
      items[this.currentItemIndex] = itemData; // Update the item at the current index
      localStorage.setItem('items', JSON.stringify(items));
      //this.resetForm();
      console.log('Item updated:', itemData);
    }
  }

  // Method to reset the form
  // resetForm() {
  //   this.homeHeroSecForm.reset();
  //   this.isEditMode = false; // Reset to create mode
  //   this.currentItemIndex = null; // Reset the current item index
  // }

  // Method to load items from local storage
  loadItems() {
    const items = this.getItemsFromLocalStorage();
    // You can implement logic to display these items or set them for editing
    console.log('Loaded items:', items);
  }

  // Helper method to get items from local storage
  getItemsFromLocalStorage() {
    const items = localStorage.getItem('items');
    return items ? JSON.parse(items) : [];
  }

  // Method to set the component in edit mode with existing item data
  editItem(index: number) {
    const items = this.getItemsFromLocalStorage();
    this.homeHeroSecForm.setValue(items[index]); // Set the form values to the selected item
    this.isEditMode = true; // Set to edit mode
    this.currentItemIndex = index; // Set the current item index
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedImage = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Set the image preview
      };
      reader.readAsDataURL(this.selectedImage);
      this.confirmUpload();
    }
  }

  confirmUpload() {
    const confirmation = confirm('Are you sure you want to upload this image?');
    if (!confirmation) {
      this.selectedImage = null; // Reset if not confirmed
      this.imagePreview = null; // Reset preview
      this.homeHeroSecForm.reset(); // Reset the form
    }
  }

  onSubmit() {
    // Check if an image is selected
    if (this.selectedImage) {
      const formData = new FormData();

      // Append the selected image file to the FormData
      formData.append('file', this.selectedImage, this.selectedImage.name);
      // Append other form values to the FormData
      formData.append('hero_sec_main_heading', this.homeHeroSecForm.get('hero_sec_main_heading')?.value);
      formData.append('hero_sec_sub_heading', this.homeHeroSecForm.get('hero_sec_sub_heading')?.value);

      // Mark all form controls as touched
      this.homeHeroSecForm.markAllAsTouched();

      // Check if the form is valid
      if (this.homeHeroSecForm.valid) {
        this.homeHeroSecForm.disable(); // Disable the form to prevent multiple submissions

        // Call the service to send the FormData to the backend
        this.master.addHeroSectionData(formData).subscribe({
          next: (response) => {
            console.log('Upload successful', response);
            // Handle success response
          },
          error: (error) => {
            console.error('Upload failed', error);
            // Handle error response
          },
          complete: () => {
            this.homeHeroSecForm.enable(); // Re-enable the form after the request completes
          }
        });
      }
    } else {
      console.error('No image selected');
    }
  }
}
