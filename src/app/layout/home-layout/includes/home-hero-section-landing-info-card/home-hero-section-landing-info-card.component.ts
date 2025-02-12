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
  isEditMode: boolean = false; // Flag to check if we are in edit mode
  currentItemIndex: number | null = null; // To track the current item index
  heroSectionData: any = [];
  //myForm: FormGroup;
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
    this.loadItems();
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
  // formItem(){
  //   return this.fb.control({
  //     hero_sec_main_heading: [''],
  //     hero_sec_sub_heading: [''],
  //     file: [''] // Form control for the image
  //   })
  // }
  // addForm() {

  // }

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

  // Method to save a new item LocalStorage Work
  saveItem(itemData: any) {
    const items = this.getItemsFromLocalStorage();
    items.push(itemData);
    localStorage.setItem('items', JSON.stringify(items));
    this.homeHeroSecForm.patchValue(items); // Update the form with the saved data
    //this.resetForm();
    //console.log('Item saved:', itemData);
  }

  // Method to update an existing item LocalStorage Work
  updateItem(itemData: any) {
    const items = this.getItemsFromLocalStorage();
    if (this.currentItemIndex !== null) {
      items[this.currentItemIndex] = itemData; // Update the item at the current index
      localStorage.setItem('items', JSON.stringify(items));
      //this.resetForm();
     // console.log('Item updated:', itemData);
    }
  }

  //Method to reset the form
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


  // fileUploader(ev:any, form:any, formKey:any, fileTypeExtention?:any){
  //   if(ev){
  //     const fileType: any[] = fileTypeExtention;
  //     let file=ev.target.files[0];
  //     const filesExtention = file['name'].split(".").pop().toLowerCase();
  //     const uploadDataType = fileType.find((x:any)=>x == filesExtention)
  //     if(uploadDataType && filesExtention.match(uploadDataType.toLowerCase())) {  
  //       form.get(formKey)?.patchValue(file);      
  //     }else{
  //       this.toaster.warning('File Format Not Matched')
  //     }
  //   }else{
  //     form.get(formKey)?.patchValue(null); 
  //   }
  // }
  getFilePreview(data: any) {
    //return this.masterService.getFilePreviewer(data)
    if (typeof (data) == 'string') {
      // return Helper.getIcon(data)
      return;
    } else {
      let exc = data['name']?.split(".").pop().toLowerCase();
      if (exc != 'pdf') {
        return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
      } else {
        // return Helper.getIcon(data.name)
        return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
      }
    }
  }
  fileConverter(data: any) {
    // return this.masterService.fileConverter(data)
    if (typeof (data) == 'string') {
      return data;
    } else {
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
    }
  }

  addDetails() {
   // console.log("Add more called...");
  }

  
  deleteItem(item?: any) {
   // console.log(item,"itemmmm");
    const deletePayload = {
      id: item.id, 
      setting_id: item.setting_id,
    };
    
     this.master.deleteHeroSectionData(deletePayload)
       .subscribe(
         (response) => {
           
           console.log('Item deleted successfully!', response);
           this.getHeroSectionData();
         },
         (error) => {
           
           console.error('Error deleting item:', error);
         }
       );
   }

}
