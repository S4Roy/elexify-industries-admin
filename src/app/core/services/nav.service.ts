import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private navStatus = new BehaviorSubject<boolean>(true);
  private isMobileNav = new BehaviorSubject<boolean>(false);
  private isMobileNavOpen = new BehaviorSubject<boolean>(false);
  private sideNav = new BehaviorSubject<any>({ toogle: false });

  constructor() {}
  setIsMobileNav(op: any) {
    this.isMobileNav.next(op);
  }
  getIsMobileNav(): Observable<any> {
    return this.isMobileNav.asObservable();
  }  
  setIsMobileNavOpen(op: any) {
    this.isMobileNavOpen.next(op);
  }
  getIsMobileNavOpen(): Observable<any> {
    return this.isMobileNavOpen.asObservable();
  }
  openSideNav(op: any) {
    this.sideNav.next(op);
  }
  getSideNav(): Observable<any> {
    return this.sideNav.asObservable();
  }
  updateNav(type: boolean) {
    this.navStatus.next(type);
  }
  isNavOpen(): Observable<any> {
    return this.navStatus.asObservable();
  }
  NavList() {
    let nav = [
      {
        label: 'Dashboard',
        image_path: 'assets/images/d-1.png',
        url: '/dashboard',
        always: true,
      },
      {
        label: 'Trips',
        image_path: 'assets/images/d-2.png',
        url: '/trip',
        claimType: 'TRP_VIEW_TRIP',
      },
      {
        label: 'Expenses',
        image_path: 'assets/images/d-3.png',
        url: '/expense',
        claimType: 'EXP_VIEW_EXPENSE',
      },
      {
        label: 'Advanced Money',
        image_path: 'assets/images/3d-report.png',
        url: '/advanced-money',
        // always: true,
        claimType: 'ADV_VIEW_ADVANCE_MONEY'
      },
      // {
      //   label: 'Reports',
      //   image_path: 'assets/images/3d-report.png',
      //   url: '/reports',
      //   claimType: 'REPORT_VIEW_REPORT'
      // },
      {
        label: 'Settings',
        image_path: 'assets/images/d-4.png',
        url: '/settings',
        always: true,
      },
    ];
    return nav;
  }
  SettingsNavList() {
    let nav = [
      {
        label: 'Basic Information',
        image_path: 'assets/images/icon-1.png',
        url: '/settings/basic-information',
        claimType: 'SETT_VIEW_BASIC_INFORMATION',
      },
      {
        label: 'Travel Documents',
        image_path: 'assets/images/icon-2.png',
        url: '/settings/travel-documents',
        claimType: 'SETT_VIEW_TRAVEL_DOCUMENTATION',
      },
      {
        label: 'Organization',
        url: '/settings/organization',
        claimType: 'ORG',
        child: [
          {
            label: 'Organization Profile',
            image_path: 'assets/images/org.png',
            url: '/settings/organization/profile',
            claimType: 'ORG_VIEW_ORGANIZATION',
          },
          {
            label: 'Expense Categories',
            image_path: 'assets/images/category.png',
            url: '/settings/organization/expense-categories',
            claimType: 'EXP_CAT_VIEW_EXPENSE',
          },
          {
            label: 'Branch Master',
            image_path: 'assets/images/branch_img.png',
            url: '/settings/organization/branch-master',
            claimType: 'EXP_CAT_VIEW_EXPENSE',
          },
          {
            label: 'Vendor Master',
            image_path: 'assets/images/employee.png',
            url: '/settings/organization/vendors',
            claimType: 'VND_VIEW_VENDOR',
          },
          // {
          //   label: 'GST',
          //   image_path: 'assets/images/tax.png',
          //   url: '/settings/organization/taxes',
          //   claimType:'GST_VIEW_GST'
          // },
        ],
      },
      {
        label: 'Employees & Controls',
        url: '/settings/controls',
        claimType: 'EMPLOYEE_CONTROLS',
        child: [
          {
            label: 'Employees',
            image_path: 'assets/images/employee.png',
            url: '/settings/controls/employees',
            claimType: 'USR_VIEW_USERS',
          },
          {
            label: 'Roles & Permission',
            image_path: 'assets/images/roles.png',
            url: '/settings/controls/roles-and-permission',
            claimType: 'ROLES_VIEW_ROLES',
          },
          {
            label: 'Departments',
            image_path: 'assets/images/dept.png',
            url: '/settings/controls/departments',
            claimType: 'DPT_VIEW_DEPARTMENT',
          },
          {
            label: 'Policies',
            image_path: 'assets/images/policy.png',
            url: '/settings/controls/policies',
            claimType: 'PLC_VIEW_POLICY',
          },
        ],
      },
      {
        label: 'Customization',
        url: '/settings/customization',
        claimType: 'CUSTOMIZATION',
        child: [
          {
            label: 'Grade Management',
            image_path: 'assets/images/grade.png',
            url: '/settings/customization/grade-management',
            claimType: 'GRD_VIEW_GRADE',
          },
          {
            label: 'Vehicle Management',
            image_path: 'assets/images/location.png',
            url: '/settings/customization/vehicle-management',
            claimType: 'VHCL_VIEW_VEHICLE',
          },
          // {
          //   label: 'Multi Level Approvals',
          //   image_path: 'assets/images/like.png',
          //   url: '/settings/customization/multi-level-approvals',
          // },
        ],
      },
      {
        label: 'Integrations',
        disabled: true,
        claimType: 'INTEGRATIONS',
        child: [
          {
            label: 'SAP',
            image_path: 'assets/images/icon-1.png',
            url: '/settings/grade-management',
            claimType: 'SAP',
          },
          {
            label: 'HRMS',
            image_path: 'assets/images/icon-2.png',
            url: '/settings/vehicle-management',
            claimType: 'HRMS',
          },
        ],
      },
    ];
    return nav;
  }
  adminNavList() {
    let nav = [
      {
        label: 'Dashboard',
        image_path: 'assets/images/d-1.png',
        url: '/admin/dashboard',
      },
      {
        label: 'Trip Request',
        image_path: 'assets/images/d-2.png',
        url: '/admin/trip-request',
      },
      {
        label: 'Expense Request',
        image_path: 'assets/images/d-3.png',
        url: '/admin/expense-request',
      },
      {
        label: 'Reports',
        image_path: 'assets/images/3d-report.png',
        url: '/admin/reports',
      },
      {
        label: 'Settings',
        image_path: 'assets/images/d-4.png',
        url: '/admin/settings',
      },
    ];
    return nav;
  }
  adminSettingsNavList() {
    let nav = [
      {
        label: 'Organization',
        url: '/admin/settings/organization',
        child: [
          {
            label: 'Organization Profile',
            image_path: 'assets/images/org.png',
            url: '/admin/settings/organization/profile',
          },
          {
            label: 'Expense Categories',
            image_path: 'assets/images/category.png',
            url: '/admin/settings/organization/expense-categories',
          },
          {
            label: 'GST',
            image_path: 'assets/images/tax.png',
            url: '/admin/settings/organization/taxes',
          },
        ],
      },
      {
        label: 'Employees & Controls',
        url: '/admin/settings/controls',
        child: [
          {
            label: 'Employees',
            image_path: 'assets/images/employee.png',
            url: '/admin/settings/controls/employees',
          },
          {
            label: 'Roles & Permission',
            image_path: 'assets/images/roles.png',
            url: '/admin/settings/controls/roles-and-permission',
          },
          {
            label: 'Departments',
            image_path: 'assets/images/dept.png',
            url: '/admin/settings/controls/departments',
          },
          {
            label: 'Policies',
            image_path: 'assets/images/policy.png',
            url: '/admin/settings/controls/policies',
          },
        ],
      },
      {
        label: 'Customization',
        url: '/admin/settings/customization',
        child: [
          {
            label: 'Grade Management',
            image_path: 'assets/images/grade.png',
            url: '/admin/settings/customization/grade-management',
          },
          {
            label: 'Vehicle Management',
            image_path: 'assets/images/location.png',
            url: '/admin/settings/customization/vehicle-management',
          },
          {
            label: 'Multi Level Approvals',
            image_path: 'assets/images/like.png',
            url: '/admin/settings/customization/multi-level-approvals',
          },
        ],
      },
      {
        label: 'Integrations',
        disabled: true,
        child: [
          {
            label: 'SAP',
            image_path: 'assets/images/icon-1.png',
            url: '/admin/settings/grade-management',
          },
          {
            label: 'HRMS',
            image_path: 'assets/images/icon-2.png',
            url: '/admin/settings/vehicle-management',
          },
        ],
      },
    ];
    return nav;
  }
  employeeNavList() {
    let nav = [
      {
        label: 'Dashboard',
        image_path: 'assets/images/d-1.png',
        url: '/employee/dashboard',
      },
      {
        label: 'My Trips',
        image_path: 'assets/images/d-2.png',
        url: '/employee/my-trips',
      },
      {
        label: 'My Expenses',
        image_path: 'assets/images/d-3.png',
        url: '/employee/my-expenses',
      },

      {
        label: 'My Settings',
        image_path: 'assets/images/d-4.png',
        url: '/employee/my-settings',
      },
    ];
    return nav;
  }
  employeeSettingsNavList() {
    let nav = [
      {
        label: 'Basic Information',
        image_path: 'assets/images/icon-1.png',
        url: '/employee/my-settings/basic-information',
      },
      {
        label: 'Travel Documents',
        image_path: 'assets/images/icon-2.png',
        url: '/employee/my-settings/travel-documents',
      },
    ];
    return nav;
  }
}
