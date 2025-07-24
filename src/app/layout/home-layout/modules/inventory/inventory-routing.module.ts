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
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrderPackingComponent } from './orders/order-packing/order-packing.component';
import { PickItemComponent } from './orders/order-packing/pick-item/pick-item.component';
import { PackItemComponent } from './orders/order-packing/pack-item/pack-item.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: { pageTitle: '', breadcrumb: 'Inventory' },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { pageTitle: 'Dashboard', breadcrumb: 'Dashboard' },
      },
      {
        path: 'brands',
        component: BlankLayoutComponent,
        data: { pageTitle: 'Brands', breadcrumb: 'Brands' },
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
                route.paramMap.get('slug')?.replace(/-/g, ' ') ?? 'Brands',
            },
          },
        ],
      },
      {
        path: 'categories',
        component: BlankLayoutComponent,
        data: { pageTitle: 'Categories', breadcrumb: 'Categories' },
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
        data: { pageTitle: 'Products', breadcrumb: 'Products' },
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
        data: { pageTitle: 'Orders', breadcrumb: 'Orders' },
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
          {
            path: 'details/:_id',
            component: OrderDetailsComponent,
            data: {
              pageTitle: 'Order Details',
              breadcrumb: 'Details',
            },
          },
          {
            path: ':order_status',
            component: OrdersComponent,
            data: {
              pageTitle: (data: any, route: ActivatedRouteSnapshot) => {
                const status = route.paramMap.get('order_status') ?? '';
                const formattedStatus = status
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, (char) => char.toUpperCase());
                return `Orders - ${formattedStatus}`;
              },
              breadcrumb: (data: any, route: ActivatedRouteSnapshot) => {
                const status = route.paramMap.get('order_status') ?? '';
                return status
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, (char) => char.toUpperCase());
              },
            },
          },
          {
            path: ':order_status',
            component: BlankLayoutComponent,
            data: {
              pageTitle: (data: any, route: ActivatedRouteSnapshot) => {
                const status = route.paramMap.get('order_status') ?? '';
                const formattedStatus = status
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, (char) => char.toUpperCase());
                return `Orders - ${formattedStatus}`;
              },
              breadcrumb: (data: any, route: ActivatedRouteSnapshot) => {
                const status = route.paramMap.get('order_status') ?? '';
                return status
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, (char) => char.toUpperCase());
              },
            },
            children: [
              {
                path: ':_id',
                component: OrderPackingComponent,

                children: [
                  {
                    path: '',
                    redirectTo: 'pick-item',
                    pathMatch: 'full',
                  },
                  {
                    path: 'pick-item',
                    component: PickItemComponent,
                    data: {
                      pageTitle: 'Order - Pick Item',
                      breadcrumb: 'Pick Item',
                    },
                  },
                  {
                    path: 'pack-item',
                    component: PackItemComponent,
                    data: {
                      pageTitle: 'Order - Pack Item',
                      breadcrumb: 'Pack Item',
                    },
                  },
                ],
              },
            ],
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
