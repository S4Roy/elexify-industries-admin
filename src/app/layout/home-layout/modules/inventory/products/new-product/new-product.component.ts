import { NgFor, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { PageService } from 'app/core/services/page.service';
import { MenuComponent } from 'app/layout/home-layout/includes/menu/menu.component';
import { PaginationComponent } from 'app/layout/home-layout/includes/pagination/pagination.component';
import { ToastrService } from 'ngx-toastr';
import * as Global from 'app/global';
import { MatSelectModule } from '@angular/material/select';
import { InventoryService } from 'app/core/services/inventory.service';
import FilterOptions from 'app/core/models/FilterOptions';
import PaginationOptions from 'app/core/models/PaginationOptions';
import { NgSelectModule } from '@ng-select/ng-select';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Editor, NgxEditorModule } from 'ngx-editor';
@Component({
  selector: 'app-new-product',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MenuComponent,
    NgFor,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule,
    NgIf,
    NgSelectModule,
    NgxEditorModule,
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export class NewProductComponent {
  Global = Global;
  formGroup!: FormGroup;
  categories: any = [];
  brands: any = [];
  categoryPagination: PaginationOptions;
  brandPagination: PaginationOptions;
  categoryFilter: FilterOptions;
  brandFilter: FilterOptions;
  categorySearchSubject = new Subject<any>();
  brandsSearchSubject = new Subject<any>();
  editor!: Editor;
  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewProductComponent>
  ) {
    this.editor = new Editor();
    this.categoryPagination = Global.resetPaginationOptions();
    this.categoryFilter = Global.resetTableFilterOptions();

    this.brandPagination = Global.resetPaginationOptions();
    this.brandFilter = Global.resetTableFilterOptions();

    this.formGroup = this.fb.group({
      name: [this.data?.name ?? '', Validators.compose([Validators.required])],
      description: [
        this.data?.description ?? '',
        Validators.compose([Validators.required]),
      ],
      category: [null, Validators.required],
      brand: [this.data?.brand?._id ?? null, Validators.required],
      status: [
        this.data?.status ?? 'active',
        Validators.compose([Validators.required]),
      ],
      files_previews: this.fb.array([]),
      images: this.fb.array([]),
      meta_title: [this.data?.seo?.meta_title ?? ''],
      meta_description: [this.data?.seo?.meta_description ?? ''],
      meta_keywords: [this.data?.seo?.meta_keywords ?? ''],
    });
    if (this.data?.categories?.length) {
      let categoryIds = this.data?.categories.map(
        (category: any) => category._id
      );
      this.formGroup.patchValue({
        category: categoryIds,
      });
      this.categories = this.data?.categories;
    } else {
      this.fetchCategoryList();
    }
  }
  ngOnInit(): void {
    this.categorySearchSubject
      .pipe(
        debounceTime(300), // Adjust debounce time as needed
        distinctUntilChanged()
      )
      .subscribe((data: any) => {
        this.categories = [];
        this.categoryPagination = Global.resetPaginationOptions();
        this.categoryFilter = Global.resetTableFilterOptions();
        this.categoryFilter.search_key = data?.term ?? '';
        this.fetchCategoryList();
      });

    this.brandsSearchSubject
      .pipe(
        debounceTime(300), // Adjust debounce time as needed
        distinctUntilChanged()
      )
      .subscribe((data: any) => {
        this.brands = [];
        this.brandPagination = Global.resetPaginationOptions();
        this.brandFilter = Global.resetTableFilterOptions();
        this.brandFilter.search_key = data?.term ?? '';
        this.fetchBrandList();
      });
    if (this.data?.brand) {
      this.brands = [this.data?.brand];
    } else {
      this.fetchBrandList();
    }
  }
  get images(): FormArray {
    return this.formGroup.get('images') as FormArray;
  }
  get files_previews(): FormArray {
    return this.formGroup.get('files_previews') as FormArray;
  }
  fetchCategoryList() {
    let params = new URLSearchParams();
    if (this.categoryPagination.page) {
      params.set('page', String(this.categoryPagination.page));
    }
    if (this.categoryFilter.slug) {
      params.set('slug', this.categoryFilter.slug);
    }
    if (this.categoryFilter.category) {
      params.set('category', this.categoryFilter.category);
    }
    if (this.categoryFilter.search_key) {
      params.set('search_key', this.categoryFilter.search_key);
    }
    this.inventoryService.categoryList(params).subscribe({
      next: (res: any) => {
        this.categories = [...this.categories, ...res?.data?.docs];
        this.categoryPagination = {
          ...res?.data,
        };
      },
      error: (err) => {},
    });
  }
  onSubmit() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      this.formGroup.disable();
      const rawValue = this.formGroup.getRawValue();

      if (this.data?._id) {
        rawValue._id = this.data._id;
      }

      const IMAGES = rawValue.images || [];
      delete rawValue.files_previews;
      delete rawValue.images;

      const formData = new FormData();
      Object.keys(rawValue).forEach((key) => {
        const value = rawValue[key];
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      IMAGES.forEach((file: any, index: number) => {
        formData.append(`images`, file);
      });

      const isAdd = !this.data?._id;
      this.inventoryService.submitProduct(formData, isAdd).subscribe({
        next: (res: any) => {
          this.formGroup.enable();
          this.dialogRef.close(res);
          this.toastr.success(res?.message);
        },
        error: () => {
          this.formGroup.enable();
        },
      });
    }
  }

  loadMoreCategories() {
    if (this.categoryPagination.hasNextPage) {
      this.categoryPagination.page = this.categoryPagination.nextPage;
      this.fetchCategoryList();
    }
  }
  loadMoreBrands() {
    if (this.brandPagination.hasNextPage) {
      this.brandPagination.page = this.brandPagination.nextPage;
      this.fetchBrandList();
    }
  }
  fetchBrandList() {
    let params = new URLSearchParams();
    if (this.brandPagination.page) {
      params.set('page', String(this.brandPagination.page));
    }
    if (this.brandFilter.slug) {
      params.set('slug', this.brandFilter.slug);
    }
    if (this.brandFilter.category) {
      params.set('brand', this.brandFilter.category);
    }
    if (this.brandFilter.search_key) {
      params.set('search_key', this.brandFilter.search_key);
    }
    this.inventoryService.brandList(params).subscribe({
      next: (res: any) => {
        this.brands = [...this.brands, ...res?.data?.docs];
        this.brandPagination = {
          ...res?.data,
        };
      },
      error: (err) => {},
    });
  }
}
