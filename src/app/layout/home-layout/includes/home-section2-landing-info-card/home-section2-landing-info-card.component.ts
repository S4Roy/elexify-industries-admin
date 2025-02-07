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
@Component({
  selector: 'app-home-section2-landing-info-card',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    //MatIcon,MatMenu,
    MatMenuModule,MatButtonModule, 
    MatIconModule,RouterModule,
    NgIf
    ],
  templateUrl: './home-section2-landing-info-card.component.html',
  styleUrl: './home-section2-landing-info-card.component.scss'
})

export class HomeSection2LandingInfoCardComponent {

  homeSec2Form: FormGroup;
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

  constructor(private fb: FormBuilder) {
  //   // Initialize the form
    this.homeSec2Form = this.fb.group({
      homeSec2_main_heading: [''],
      homeSec2_sub_heading: [''],
      homeSec2_description: [''],
      homeSec2_image: [null] // Form control for the image
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  // Method to save or update the item
  // save() {
  //   const itemData = this.homeSec2Form.value;

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
    this.homeSec2Form.patchValue(items); // Update the form with the saved data
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
  //   this.homeSec2Form.reset();
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
    this.homeSec2Form.setValue(items[index]); // Set the form values to the selected item
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
      this.homeSec2Form.reset(); // Reset the form
    }
  }

  onSubmit() {
    const itemData = this.homeSec2Form.value;

    if (this.isEditMode && this.currentItemIndex !== null) {
      this.updateItem(itemData);
    } else {
      this.saveItem(itemData);
      this.isEditMode = true;
    }
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('homeSec2_image', this.selectedImage, this.selectedImage.name);

      // this.yourService.uploadImage(formData).subscribe(
      //   (response) => {
         // console.log('Image uploaded successfully:', response);
          // Assuming the response contains the image URL
         // const imageUrl = response.imageUrl; // Adjust based on your API response
          
          // Store the image URL in local storage
        //  localStorage.setItem('uploadedImageUrl', imageUrl);

          // Update the image preview with the uploaded image URL
         // this.imagePreview = imageUrl; // Use the URL returned from the server

          // Optionally reset the form or show a success message
          this.homeSec2Form.reset();
          this.selectedImage = null;
      //   },
      //   (error) => {
      //     console.error('Error uploading image:', error);
      //   }
      // );
   // }
    }
  }
}
