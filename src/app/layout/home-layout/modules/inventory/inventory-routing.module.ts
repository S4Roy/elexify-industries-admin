import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeLayoutComponent } from '../../home-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlankLayoutComponent } from '../../includes/blank-layout/blank-layout.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { productNameResolver } from './resolver/product-name.resolver';
import { BrandsComponent } from './brands/brands.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: { pageTitle: '', breadcrumb: 'inventory' },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { pageTitle: 'Dashboard', breadcrumb: 'dashboard' },
      },
      {
        path: 'brands',
        component: BlankLayoutComponent,
        data: { pageTitle: 'Categories', breadcrumb: 'brands' },
        children: [
          {
            path: '',
            redirectTo: '',
            pathMatch: 'full',
          },
          {
            path: '',
            component: BrandsComponent,
            data: { pageTitle: 'Brands', breadcrumb: '' },
          },
          {
            path: ':slug',
            component: BrandsComponent,
            data: {
              pageTitle: 'Brands',
              breadcrumb: (data: any, route: ActivatedRouteSnapshot) =>
                route.paramMap.get('slug')?.replace(/-/g, ' ') ?? 'brands',
            },
          },
        ],
      },
      {
        path: 'categories',
        component: BlankLayoutComponent,
        data: { pageTitle: 'Categories', breadcrumb: 'categories' },
        children: [
          {
            path: '',
            redirectTo: '',
            pathMatch: 'full',
          },
          {
            path: '',
            component: CategoriesComponent,
            data: { pageTitle: 'Categories', breadcrumb: '' },
          },
          {
            path: ':slug',
            component: CategoriesComponent,
            data: {
              pageTitle: 'Categories',
              breadcrumb: (data: any, route: ActivatedRouteSnapshot) =>
                route.paramMap.get('slug')?.replace(/-/g, ' ') ?? 'Category',
            },
          },
        ],
      },
      {
        path: 'products',
        component: BlankLayoutComponent,
        data: { pageTitle: 'Products', breadcrumb: 'products' },
        children: [
          {
            path: '',
            redirectTo: '',
            pathMatch: 'full',
          },
          {
            path: '',
            component: ProductsComponent,
            data: { pageTitle: 'Products', breadcrumb: '' },
          },
          {
            path: 'details/:slug',
            component: ProductDetailsComponent,
            resolve: {
              product: productNameResolver,
            },
            data: {
              pageTitle: 'Products',
              breadcrumb: (data: any) => data.product.name, // Gets name from resolver
            },
          },
          {
            path: ':slug',
            component: ProductsComponent,
            data: {
              pageTitle: 'Products',
              breadcrumb: (data: any, route: ActivatedRouteSnapshot) =>
                route.paramMap.get('slug')?.replace(/-/g, ' ') ?? 'Product',
            },
          },
        ],
      },
      {
        path: 'orders',
        component: BlankLayoutComponent,
        data: { pageTitle: 'Orders', breadcrumb: 'orders' },
        children: [
          {
            path: '',
            redirectTo: '',
            pathMatch: 'full',
          },
          {
            path: '',
            component: OrdersComponent,
            data: { pageTitle: 'Orders', breadcrumb: '' },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
