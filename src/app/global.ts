'use strict';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { environment } from '../environments/environment';
import { ToastrService } from 'ngx-toastr';
export const APP_SHORT_NAME = 'SFT Travel Desk!';
export const APP_NAME = environment.APP_NAME;
export const BACKEND_URL = environment.API_BASE_URL;
export const API_URL = environment.API_URL;
export const MAX_AMOUNT = 9999999.99;
export const CUURENT_YEAR = new Date().getFullYear();
export const CUURENT_MONTH = new Date().getMonth() + 1;
export const MAX_DATE = new Date();
export const COMPANY = {
  ZHUZOOR: '77d519a7-6e7a-4f35-8c4e-948910c9b952',
};
export const ROLE = {
  RM: 'f9b4ccd2-6e06-443c-b964-23bf935f859e',
  TRAVEL_DESK: 'f72616be-260b-41bb-a4ee-89146622179a',
  ACCOUNTS: '241772cb-c907-4961-88cb-a0bf8004bbb2',
  EMPLOYEE: 'e1bd3dce-eecf-468d-b930-1875bd59d1f4',
  SUPERADMIN: 'f8b6ace9-a625-4397-bdf8-f34060dbd8e4',
};
export const CONVEYANCE = {
  WITH_IN_CITY: 'Conveyance (within a city)',
  OUTER_AREA: 'Conveyance (city to outer area)',
};
export const DUMMY = {
  VENDOR_ID: '3aa78320-df98-42f2-bf02-8e39205c3976',
  VENDOR_NAME: 'Dummy Vendor',
};
export const EXP_CATEGORY = {
  FARE: 'dcaa05b6-5f1e-402f-835e-0704a3a1a455',
  CONVEYANCE_WITH_IN_CITY: 'b1977db3-d909-4936-a5da-41bf84638963',
  CONVEYANCE_TO_OUTER_AREA: '5278397a-c8dd-475a-a7a7-c05708b2bb06',
  LODGING_METRO_CITY: 'fbf965bd-a53e-4d97-978a-34c2007202e5',
  LODGING_OTHER_CITY: '1aadd03d-90e1-4589-8b9d-6121049b490d',
  FOODING: 'bb0bf3aa-1fd9-4f1c-9fde-8498073c58a9',
  DA: 'ed69e9a0-2d54-4a91-a598-f79973b9fe99',
  OTHERS: '6c3eb31c-df53-495a-b871-e2eb3cef74d2',
};
export const EXP_TYPE = {
  POST: 'Post Trip',
  APPROVED: 'Approved Trip',
  LOCAL: 'Local Trip',
  LOCAL_CONVEYANCE: 'LOCAL_CONVEYANCE',
  BIKE_LOG: 'BIKE_LOG',
};
export const GST_TYPE = [
  {
    label: 'IGST',
    value: 'igst',
  },
  {
    label: 'CGST+SGST',
    value: 'cgst+sgst',
  },
];
export const ExpenseType = [
  {
    label: 'Bike',
    value: 'Bike',
  },
  {
    label: 'Car',
    value: 'Car',
  },
];
export const FuelType = [
  {
    label: 'Petrol',
    value: 'Petrol',
  },
  {
    label: 'Diesel',
    value: 'Diesel',
  },
];
export const STATUS = {
  ROLLBACK: 'ROLLBACK',
  RESCHEDULE_REQUEST: 'RESCHEDULE REQUEST',
  CANCEL_REQUEST: 'CANCEL REQUEST',
  CANCEL_APPROVED: 'CANCEL APPROVED',
  YET_TO_SUBMIT: 'YET TO SUBMIT',
  APPLIED: 'APPLIED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING',
  REIMBURSED: 'REIMBURSED',
  COMPLETED: 'COMPLETED',
};
export const ININERY_BOOKING_STATUS = {
  BOOKED: 'BOOKED',
  NOT_BOOKED: 'NOT BOOKED',
};
export const TRIP_APPROVAL_STATUS = {
  CONFIRMED: 'CONFIRMED',
  APPROVED: 'APPROVED',
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING',
};
export const EXPENSE_APPROVAL_STATUS = {
  REJECTED: 'REJECTED',
  CONFIRMED: 'CONFIRMED',
  APPROVED: 'APPROVED',
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING',
};
export const EXPENSE_BY_USER = {
  TRAVEL_DESK: 'Travel Desk',
  SUBMITTER: 'Submitter',
};
export const MONTHS = [
  {
    label: 'January',
    value: 1,
  },
  {
    label: 'February',
    value: 2,
  },
  {
    label: 'March',
    value: 3,
  },
  {
    label: 'April',
    value: 4,
  },
  {
    label: 'May',
    value: 5,
  },
  {
    label: 'June',
    value: 6,
  },
  {
    label: 'July',
    value: 7,
  },
  {
    label: 'August',
    value: 8,
  },
  {
    label: 'September',
    value: 9,
  },
  {
    label: 'October',
    value: 10,
  },
  {
    label: 'November',
    value: 11,
  },
  {
    label: 'December',
    value: 12,
  },
];
export function resetForm(formGroup: FormGroup) {
  formGroup.reset();
  for (const key in formGroup.controls) {
    if (Object.prototype.hasOwnProperty.call(formGroup.controls, key)) {
      const element = formGroup.controls[key];

      element.markAsUntouched();
      element.markAsPristine();
    }
  }
}

export function isFormValidationAvailable(
  formGroup: FormGroup,
  control: any,
  rules: any
) {
  const formControl: any = formGroup.get(control);
  if (formControl) {
    const validator =
      formControl.validator && formControl.validator(new FormControl());
    if (validator && validator[rules]) {
      return true;
    }
  }

  return false;
}

export function isInputValid(formGroup: FormGroup, control: any) {
  let valid: boolean = true;

  let cntrls = control.split('.');
  let fgroupcontrols: any = formGroup;
  if (cntrls.length > 1) {
    cntrls.forEach((c: any) => {
      fgroupcontrols = fgroupcontrols.controls[c];
    });
  } else {
    fgroupcontrols = fgroupcontrols.controls[control];
  }

  if (
    !['VALID', 'DISABLED'].includes(fgroupcontrols.status) &&
    (fgroupcontrols.touched || fgroupcontrols.dirty)
  ) {
    valid = false;
  }

  return valid;
}

export function isInputRuleValid(
  formGroup: FormGroup,
  control: any,
  rule: any
) {
  let valid: boolean = true;

  let cntrls = control.split('.');
  let fgroupcontrols: any = formGroup;
  if (cntrls.length > 1) {
    cntrls.forEach((c: any) => {
      fgroupcontrols = fgroupcontrols.controls[c];
    });
  } else {
    fgroupcontrols = fgroupcontrols.controls[control];
  }

  if (rule instanceof Array) {
    rule.forEach((r) => {
      if (
        fgroupcontrols.hasError(r) &&
        (fgroupcontrols.touched || fgroupcontrols.dirty)
      ) {
        valid = false;
      }
    });
  } else {
    if (
      fgroupcontrols.hasError(rule) &&
      (fgroupcontrols.touched || fgroupcontrols.dirty)
    ) {
      valid = false;
    }
  }

  return valid;
}
export function isArrayFormValidationAvailable(
  formGroup: FormGroup,
  control: string,
  type: string,
  index: number,
  rules: string
) {
  const arrayFormGroup = formGroup.get(type) as FormArray;
  const formControl = arrayFormGroup.at(index).get(control);

  if (formControl) {
    const validator =
      formControl.validator && formControl.validator(new FormControl());
    if (validator && validator[rules]) {
      return true;
    }
  }

  return false;
}

export function isArrayInputRuleValid(
  formGroup: FormGroup,
  control: any,
  type: any,
  index: number,
  rule: any
) {
  const arrayFormGroup = (formGroup.get(type) as FormArray).controls;
  let valid: boolean = true;

  let cntrls = control.split('.');
  let fgroupcontrols: any = arrayFormGroup.at(index);
  if (cntrls.length > 1) {
    cntrls.forEach((c: any) => {
      fgroupcontrols = fgroupcontrols.controls[c];
    });
  } else {
    fgroupcontrols = fgroupcontrols.controls[control];
  }

  if (rule instanceof Array) {
    rule.forEach((r) => {
      if (
        fgroupcontrols.hasError(r) &&
        (fgroupcontrols.touched || fgroupcontrols.dirty)
      ) {
        valid = false;
      }
    });
  } else {
    if (
      fgroupcontrols.hasError(rule) &&
      (fgroupcontrols.touched || fgroupcontrols.dirty)
    ) {
      valid = false;
    }
  }

  return valid;
}
export function isArrayInputValid(
  formGroup: FormGroup,
  control: any,
  type: any,
  index: number
) {
  let valid: boolean = true;
  const arrayFormGroup = (formGroup.get(type) as FormArray).controls;
  let cntrls = control.split('.');
  let fgroupcontrols: any = arrayFormGroup.at(index);
  if (cntrls.length > 1) {
    cntrls.forEach((c: any) => {
      fgroupcontrols = fgroupcontrols.controls[c];
    });
  } else {
    fgroupcontrols = fgroupcontrols.controls[control];
  }

  if (
    !['VALID', 'DISABLED'].includes(fgroupcontrols.status) &&
    (fgroupcontrols.touched || fgroupcontrols.dirty)
  ) {
    valid = false;
  }

  return valid;
}
export function isInputRuleAvailable(
  formGroup: FormGroup,
  control: any,
  rule: any
) {
  const formControl: any = formGroup.get(control);
  if (formControl) {
    const validator =
      formControl.validator && formControl.validator(new FormControl());
    if (validator && validator[rule]) {
      return true;
    }
  }

  return false;
}
export function minLengthArrayValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Cast the control to FormArray
    const formArray = control as FormArray;
    const length = formArray.controls ? formArray.controls.length : 0;
    return length >= min ? null : { required: true };
  };
}
export function onFileUploaded(
  formGroup: FormGroup,
  event: any,
  sourceKey: any,
  type: any = 'single'
) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    formGroup.patchValue({
      [sourceKey]: file,
    });
  } else {
    formGroup.patchValue({
      [sourceKey]: null,
    });
  }
}
export function onFileUploadedToBase64(
  formGroup: FormGroup,
  event: any,
  sourceKey: any,
  toastr: ToastrService,
  allowedTypes: string[] = ['image/jpeg', 'image/png'], // Default allowed types are JPEG and PNG
  fileNameKey: any,
  type: any = 'single' // 'single' or 'multiple'
) {
  if (event.target.files.length > 0) {
    const files = event.target.files;
    const maxSize: number = 5000000; // Default max size is 5MB

    // Initialize the array in the form group if it doesn't exist
    if (type == 'multiple') {
      if (!formGroup.get(sourceKey)) {
        formGroup.setControl(sourceKey, new FormControl([]));
      }

      const fileArrayControl = formGroup.get(sourceKey) as FormArray;
      fileArrayControl.clear();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Check file size
        if (file.size > maxSize) {
          toastr.error('File size exceeds the limit');
          continue; // Skip this file and continue with the next one
        }

        // Check file type
        if (!allowedTypes.includes(file.type)) {
          toastr.error('File type is not allowed');
          continue; // Skip this file and continue with the next one
        }

        var reader = new FileReader();

        reader.onloadend = function () {
          // Explicitly assert reader.result as string to avoid TypeScript error
          // var base64String = (reader.result as string).replace(
          //   /^data:.+;base64,/,
          //   ''
          // );
          // Append the Base64 string to the array in the form group
          fileArrayControl.push(new FormControl(reader.result));
        };

        reader.readAsDataURL(file);
      }
    } else {
      const file = event.target.files[0];
      if (file.size > maxSize) {
        toastr.error('File size exceeds the limit');
        return; // Skip this file and continue with the next one
      }

      // Check file type
      if (!allowedTypes.includes(file.type)) {
        toastr.error('File type is not allowed');
        return; // Skip this file and continue with the next one
      }
      var reader = new FileReader();

      reader.onloadend = function () {
        // Explicitly assert reader.result as string to avoid TypeScript error
        var base64String = (reader.result as string).replace(
          /^data:.+;base64,/,
          ''
        );

        // Append the Base64 string to the array in the form group
        formGroup.patchValue({
          [sourceKey]: reader.result,
          [fileNameKey]: file.name,
        });
      };

      reader.readAsDataURL(file);
    }
  } else {
    formGroup.patchValue({
      [sourceKey]: null,
      [fileNameKey]: null,
    });
  }
}
export function onFileSelected(
  formGroup: FormGroup,
  event: any,
  sourceKey: any,
  toastr: ToastrService,
  allowedTypes: string[] = ['image/jpeg', 'image/png'], // Default allowed types are JPEG and PNG
  fileNameKey: any
) {
  if (event.target.files.length > 0) {
    const files = event.target.files;
    const maxSize: number = 10000000; // Default max size is 5MB

    const file = event.target.files[0];
    if (file.size > maxSize) {
      toastr.error('File size exceeds the limit');
      return; // Skip this file and continue with the next one
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      toastr.error('File type is not allowed');
      return; // Skip this file and continue with the next one
    }
    var reader = new FileReader();

    reader.onloadend = function () {
      // Append the Base64 string to the array in the form group
      formGroup.patchValue({
        [sourceKey]: file,
        [fileNameKey]: reader.result,
      });
    };

    reader.readAsDataURL(file);
  } else {
    formGroup.patchValue({
      [sourceKey]: null,
      [fileNameKey]: null,
    });
  }
}
export function onFileUploadedToBase64Array(
  formGroup: FormGroup,
  index: number,
  type: any,
  event: any,
  sourceKey: any,
  fileNameKey: any,
  toastr: ToastrService,
  allowedTypes: string[] = ['image/jpeg', 'image/png'] // Default allowed types are JPEG and PNG
) {
  const arrayFormGroup = (formGroup.get(type) as FormArray).controls;
  let fgroupcontrols: any = arrayFormGroup.at(index);

  if (event.target.files.length > 0) {
    const maxSize: number = 5000000; // Default max size is 5MB
    const file = event.target.files[0];
    if (file.size > maxSize) {
      toastr.error('File size exceeds the limit');
      return; // Skip this file and continue with the next one
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      toastr.error('File type is not allowed');
      return; // Skip this file and continue with the next one
    }
    var reader = new FileReader();

    reader.onloadend = function () {
      // Append the Base64 string to the array in the form group
      fgroupcontrols.patchValue({
        [sourceKey]: reader.result,
        [fileNameKey]: file.name,
      });
    };

    reader.readAsDataURL(file);
  } else {
    fgroupcontrols.patchValue({
      [sourceKey]: null,
      [fileNameKey]: null,
    });
  }
}
export function clearFile(
  formGroup: FormGroup,
  index: number,
  type: any,
  sourceKey: any,
  fileNameKey: any
) {
  const arrayFormGroup = (formGroup.get(type) as FormArray).controls;
  let fgroupcontrols: any = arrayFormGroup.at(index);
  fgroupcontrols.patchValue({
    [sourceKey]: null,
    [fileNameKey]: null,
  });
}
export function getFormGroupArray(formGroup: FormGroup, type: any) {
  return (formGroup.get(type) as FormArray).controls;
}

export function removeFormGroupArrRow(
  formGroup: FormGroup,
  type: any,
  index: number
) {
  const control = <FormArray>formGroup.get(type);
  control.removeAt(index);
}

export function resetFormGroupArrRow(formGroup: FormGroup, type: any) {
  const control = <FormArray>formGroup.get(type);
  control.clear();
}

export function fetchFormGroupIndexOfControl(
  formGroup: FormGroup,
  type: any,
  s_key: any,
  s_value: any
) {
  let arr: any[] = formGroup.value?.[type];
  if (Array.isArray(arr)) {
    let index: any = arr.findIndex((x) => x[s_key] == s_value);
    return index;
  }

  return false;
}
export function applyValidatorsAndUpdate(
  formGroup: FormGroup,
  controlNames: string[]
) {
  controlNames.forEach((controlName) => {
    const control = formGroup.get(controlName);
    if (control) {
      control.setValidators(Validators.required);
      control.markAsUntouched();
      control.updateValueAndValidity();
    }
  });
}
export function removeValidatorsAndUpdate(
  formGroup: FormGroup,
  controlNames: string[]
) {
  controlNames.forEach((controlName) => {
    const control = formGroup.get(controlName);
    if (control) {
      control.clearValidators();
      control.markAsUntouched();
      control.updateValueAndValidity();
    }
  });
}
export function humanize(str: string) {
  var i,
    frags = str.split('_');
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}
export function resetPaginationOptions() {
  return {
    limit: 10,
    page: 1,
    total_pages: 0,
    total_records: 0,
  };
}
export function resetTableFilterOptions() {
  return {
    list_type: '',
  };
}
export function openBase64File(base64: string) {
  return window.open(base64, '_blank');
}
export function scrollToQuery(query: any) {
  let $_errFormControl = document.querySelectorAll(query);
  if ($_errFormControl.length > 0) {
    const firstErr: Element = $_errFormControl[0];
    firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
export function filePlaceHolder(filename: string) {
  var splitFileName = filename.split('.');
  let image_path = 'assets/images/file.png';
  switch (splitFileName[1]) {
    case 'pdf':
      image_path = 'assets/images/pdf.png';
      break;

    case 'png':
      image_path = 'assets/images/png.png';
      break;

    default:
      image_path;
      break;
  }
  return image_path;
}
export function formatDateToUTC(dateString: string): string {
  // Check if the date string is in UTC format
  if (dateString?.endsWith('Z')) {
    // Remove the 'Z' to indicate the date is in local time
    dateString = dateString.slice(0, -1);
  }
  // Return the adjusted date string
  return dateString;
}
export function isImage(fileName: string) {
  // List of common image file extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

  // Convert the file name to lowercase and remove the leading dot
  const lowerCaseFileName = fileName.toLowerCase().replace(/^\./, '');

  // Check if the file name ends with any of the image extensions
  return imageExtensions.some((extension) =>
    lowerCaseFileName.endsWith(extension)
  );
}
export const LOGO =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABACAYAAACzzl09AAAABHNCSVQICAgIfAhkiAAAH71JREFUeF7tnQeUVEXWx6vD9OQZZkZgyEEyElYUUFSCWTChnwqmwbSIihjANYKKrgddzIpZ1BXFgDl9KGBGRAUTIkjSIQ1hcuzu7/d/vMc2zcx0z8CgH9vvnDr9Xr2qW7du/averVu3ql0mdu1pCbjTk5OH5BcXz6Fg/54ufG8vz7W3V/BPrF8KZReFl5+ZmXpQ0j8XH1h8dc+FWwoLP/sT+dsri44BuoGaNTU19QRf6x5ri5d/nldWZtZRTGl2Sma3wpwH+pVm7vtEqj//9MB9pywqLCxcyjt3cnJy4wRXZWaFKz6DuM8biK29nmwM0A3UxFnp6UMKrnxvWtLGFa8kLpo1y//NOxVm4Oi0vL+dOicYCLhdHndF1tz7D/b/+EZ5amrHQMl+fQ8r7jdqkG/K4Y+hjnzYQGzt9WRjgG6gJs7M7tB98+jnFpvKSndSnKv0sOyfH+/uW3Z6u4rlTZIC5Wa9N9Ms83T6ef7mDjN/Lmx1YSAQbO5yBUrS7j952NatedKvY1c9JBADdD2EFk2WTudMbrG01ZFrzun2ruuSn1807T78w/h/CRp/hcu43EFjKl3G18RvyvsmmU+O7G0mFvzd/JrfsiLz36MP2fTbdwuiKSOWZmcJxAC9e1CRlZCQkGLKylwpqam+yviU1Owrnkqb3Paujw69eb7xF7mN7/QqUzggaLamAmiv33gqPCbzd2N8b7pN+Qce4xtpzLiB1/rfnJnfu+rD2wviykxJoTFlsFdJqCDQC2JXJAnEAB1JQlG8T0tL658w4l+pRU06jvR7vNmBoK/Jt91yWmaM+qNJ4rkB89NREGkUNC33qTDpWUHz2edJpm+fErNxQ5zZsMVj2mwNGN+1XhPfzB+877oL3pn64RFL3Wu+WOfekLvKvXn1z/7VC0oKCgqWRcHKf32SGKB3DwQ8LU8Z3/73bsOXuPyV7if6TjVHnTHHJF5VZT7ez2sGHVpi0hOrjEHaXyxMNenPeEzbKYUmyec3Qbcx33yfZBJ4l5XjNd7OATP4yMfMj5taBl1eb3navPsOyZ/z/MLdw+beTyUG6N3UxunpKUOKL3//vjbJa7vPfznHVKW5zPzRLjN0SLHxmIClL5T5PeanCSmm2b+N+eohlznx1K2GVxbQf1qWYBIK3CZ+mNdsvqeJ6b36SeMNVn6Ufu+wCXklJTFAR9lOMUBHKahIyTIyTHrRyPdOmDf8uuktj/jN5fm+zGwqijOuciF2m/q7Ni/O9Lw5aIJMDAO9gyb3gqBJiNu2WFgZdJn1m92m76cBUzHLbY4ZNy2w7qNvD17/+l0/8Lo4Uvmx99skEAP07kGCu1FyXI+SIdM7r0u9aEZVrts96ySPGXFaoVl+R6rJelkjtNs0/6rQeJIBsKQecJn8lxJNwSSvcXtc5usb3eaIEwrN5rU89403n74+YMvYoW/322jMKlJrUhi7opBADNBRCClCktTslp26Vpw37dSsrPwrP7pplKfxlDKzsrfbdOpQauZ9kWa6nI01Y6TfNLq12LhCbBVBkL22c6rJ399lWj5ZbFKSqszr76SYAy+lWe5ODrb/+aWZme9Numf94tm/wsOmXWd176cQA/QutHFWVlZXT4dBcfnHTXiwvLLykKGdvjbTLrrZpL1WYny9Kk28D/UCCc+7o5EZOCHfuELRbJdb8qXPfFaaYI4cXGDFPPV8qhn6XND4jg6azPLZxpcY+C519gPjixa8sqK8vHz5LrD7X5E1Buhda+bEtMymvVwX//vkQpNw1bAuCzwPXDgJQJebhN4Vxhe3DdAfAejDx+fjsbGzKblsoc98XJBgjrIB/fTzaWbYDL/xDjYms2q2cfmqAsku80jS3cc+t6Gw8AvYjdmja2mzGKB3DdDWPCQzxdfNDLuhX4vDutz7zjUXpTR+oMzk9nKZdq3KzMcLUkzHMz0m/qwKkzGxNAyOLpPbLcVs6eM1rR8vMCkJfvPKG6nmoPHGeG7zmRYr3ypq9McXE1wzrvl4c0WF7NDlu87u3k0hBujd1L6oH13MiOebL1l+6mw3xo1Xj3CbM08vMssmNzKZzzERdLtN9uIC406S1WPbOFv8coIpmOAzLg9mvNvd5qiTCkzu7z4T39dnfnl7vw2nTel4cvHi5/PK88qlQ8dG5ijaKgboKIQUTRLcP3uXXTp77LeDzx3VaOh6U/ZlJe4aQVOGqdmZCW7Jjzf73SFkuoy/W9D8PqLKxHlZcOG5wu8yZVVxpvfiKlN2b5wZMfHOLYvGXjpwS0XF99GUH0uzTQIxQO8mJDTqdnDvglPu/LJn1vL49x8cY1wHuMy8oW4zfGgReN42KpdVeczS8ammMZO++fd6zElnbd62sMK1dnOc2bQyzmSe5DWlN6SaLoUvBNM2Lj4+OHPMZ1u3GnWL2BWFBGKAjkJIkZLgzN85MO6144tdiXe6/AHzVq9rTY8zvjcpD1WaL5uw9H1w8bYFFKT96VfYpafjvzF129I3y4hm6W/xZsM6r+mM2qGFmBEXTTEfrtjPxLkDXyZOPW5sQUlJzPsuUiPY72OAjlJQtSVLT08/ynvQWckmvWmLqk79ugbj09v90OTkwa4xpQlJN1Sa7w50m+TEgOnZpdx4+Z37SZoZNKDAbNzkNYt/SDRt06pMxj88Joil+dEpZ5bd8t3Z+e44V67X412R8ezo63OXLlyyG9j8ryARA/Tuaea4lBTTqKoqIRly7mSXv3HCta9OnJFx47Gdbsc40Zxh+JwqsyobV9HUoPF4GYnLgiZlS9C0+jFoCh72miRcSx84/8ySe+6qPCx5zTvF/s255aXBeG9ZMOipqKjQNi1bOdk9DO+tVGKAboCWZcRuX3n5m2dWBYO3jOv0khm78EXjmVlhAiWgPZVJYRyhCBt1CX7SParMsjPbm/HBsebzjT1Wpk8deN7WorLYjpV6tksM0PUUXIRsjdMmzelTUOV515g4k5Ec+PHq/q+/lbls1TXNN/5h4ioDpjAl0ZR0zJz7VN7x2R8v79KFPbTozOYT3x1HXFZcWbmoYdja+6nGAN0wbezZ58oX9i3JbDclYcHM51w/z14d2Lg6rmTsu+dUVFVepCVwlyt+VfzjF5+SmOHzmu6HdyrY7/hLPMUF33sePPnG4uJi7RKPXfWQQAzQ9RBaNFkaNWrU21NSUlbq9WKkKMklj2ufZq3333LhjFnBoCur6fwXDiv64qlVHFmQx/attplxcfHBPielli9+e+nmzZu3OXbErjpLIAboOoss6gxJpERr/s/FVq3M+AHntvG37tIp7rXrFqxfn/9b+Hu2WsnmHJsARi3mHRPGAF1PwdU3m0buIJaL/Pz82C6U+gqxlnwxQDeAUKMgyU7C2CgchZzqnCQG6DqLLJbhryyBGKD/yq0T463OEogBus4ii2X4K0vAAfS+Xq/3vEAgsC8TFm9tDLtcriq3272M9I+XlZWttNOmEvcweRN4D5nANcSviFTxuLi4u6qqqtqSzkXeB/md4/P5bqusrOzk5IXuc36//3Wea/QHJs1Y8h+mPNy74+PjL8FUttahwfOlLB8Pst8XQW809zqVqKYrnXo8Lr48Hs9ieLy1tvLDiJDF8ywy8EGjjF92FEbty9wEuV5Gng7Uh/XEmi9o+6nqSsp6gq1Zv3J/JXkOiiTzGt4HKfcuaHZE9ifVlQb55sHz/Xa+xvD0MM91IgONCvJcRCbrCGLqcw31OVD38PYefKk9Il4CdAbEFpB534ipQxKQ53fy7E8UG5NNFmElQWciy8H3AEKk1S7OUfHOBywW01w5hOmEltCe6/CjiiKgo0k3tzr+6AAjAKvyCQABTGM5mL6e497pAKrfr9ATj9aVmJg4orS09IVa6tuYd+oQOGGYIL7Ox7LY8X4t6be/UmPaHUZxMsFlhvBSGwkPfK6CzxbRlOOkIU8+eZoBgCcAxIi65A1JK/QNh0Y/aFxbDxpPkec8O19rfmWOlOzqcsnE2ZKwRZmo1yvUa7ju4et++BobDTGB6jDAMs9OLK+ulREytuN9ZzUSI99QRgeWd+sN6C8pu69dXg6/Aqau9lRoDhWScHSpkgMJOzi777PPPoPz8vLeIF4dSRUfQ8WniTenDsRNI+7voXWCdiG0JbyaFjBCAS3hlpCe5WmzpjbZ0LlOo3OpozhfvqgBnZGRkb5lyxbL75nyVlPeT7WVRZpmpOmlNLTDCYxg/annoPA8pEshXU87XufkzZeowtJJXtcjq6MdQJNvHfk+rY0H+52LfKEjdCigdejIO4Roto6JtwsJ1hkk9QY0dtETt27d+prN3NX8To1QCakT19sj9Bju5UhT3xG6JkCLhR6UMRuhNnEamRW1QxhZHVD1tAXZiPdBwHQtYLqT+9BvnYT7MyGJtItQcbbSAdUx9Bm7k86kulSnyuwAaLt8jfICEBsDq704Dte1jDSJIW+jBjSg3BferPPr4PU+gDWutnbgS3AmX4JHKPMP0l/N/ZvVpWdrWN9NmzZ9addhA/w1FV6qSRuEzu0OoKH/LjSPi4CF6l6HAlpqXXOCNerW5dqdgP5XhILbCg+E1QTnAJT6Aro6lWN78QCwPyOPeniG3SA/0iDsh+YoOJfrc3uUNYD5VsB8M/E7/GcJoJ0DaAcRH7zssssGv/rqq8tzc3OX2qAT7x0I1Y262wFNw35Ew6pM6dPS58/lPlxB9ACGpYBBX5a10M+2QVMXQHeQLqx6QusBaF0WoR2kmmg1Uu1Q4wiYmZnZn6V07RbXqOcAulrSYYB+j7oeWxcQ2mnDAa0vYZ3PFKk3oJOSko5nAqXPtiPIFyNUQiPa+loALVDpE78qkjDskairnS6HX0fl2J6VketoGvoVIuRrbADV+wCmHQ1uTRwB7X2A9ipupbtvv4gfQvx7RMRx/5kN7CrA/yzgP8um9SaNpklQOEC3A1r6NuVP1oRZefhKjGIy/HRoWZoEQseiSSc8gE74lcRJiBrQ8ueArjWRht7L0Ls3gvzUDnmElYSGAPSn8KBOtcNojvz8yE/q0A7yDuE1FNAVyP5IZM/JwDtdmqPU6IRVb0BDVJMy9eC6KPGaqM2lwqfbjRY6Qkdohxpf5/BmJ0ArNUIcjhA10Qv9nKvhn4SHi4kPPypLI+Y3gFC6o9SRbuS3dn107dq12ZIlS36hU+CZbAHwIABofZJDrlBAn4Ga8y0C/p48PjUk9PaHnqXPA8SzAOIzanjib7bVHunmdQI06dVhd/qToQjCrEQGX9tfkGpBXd8RuqZykcNm5KA5lDpTdVe0k8KJZL6llnLqNykUSBDKawjlCLsRIsjwP6/Jdxb5OEtzBx1aCf5zQmHt1NTozgiQw321gBYJgHchwJNpzzJnUfYsyuaY8J3Nb7w7l3eaebvI9xz5RHu7OkLck8SNEh2A/xPAl7UmFBDhgH6RPOeS50llsSdM+kI05V5qkI8yF1Bmf8mTUB9Au6HxITRkfgyftNUqRUbBqxgFq5377AKg1YaaqO1wUd+t1Lc7kTWpEeGArumw9snQUKj22pURWgQ1OvSn0drRaBqFarv06b3SBsMtgEE9LXSE9tMw502cODHisVWTJk16jPy1qhxhjHDmvbHMWqgiR6EK/G81jCYjjOX25CfQuHHjK3v06CH3ze3XsmXLEtesWfM4aazOgVpxOqPwzJAkOwGad9KhpQpYpiTuP4b3ltBoz6NUC1l/9CtZ1gfQIit+DqEd9o3UDoA4AxBbgLA7t8VX+FVfQEPzE+p6ieodRlMDwy+EaFQODRJDCNV9eaRubKiOZ8XtKqA1ImhkkS0w0oEmg0jjbBH6J/fXEeo7KazNylFdXUMBLd36g/BENPQdNPSEkIaoqT7bGwrhFcmWGyL46gBtAY60vzmTUbvsALu+B+HX/In9vCuAFk+a6EU8PlfbvPDYswYN6vwWdT6+OoHtAqD/f04KEcbt9MTeCCONhjqmht4UKqu/MqAb26aztJp6fk3x6L9T0H//YXfomgCt7J0oYxGySrDBNBkw3RQyENQH0FoP+Ac0D7ZXCZ2vVo3ViAG6etFIkLQHJ6Bs04lkl41kBNeE4AaRQ/+8mQaYxO1fYoS2P73W0i31up56vVobsElzImn0ldHIWI7q0dG2c9cGaKk7Y/g6PEB5XzEYHELe0M9vfQCtL6S+PvpKiJZMg7Xq0axeZrF6eY/qB9+vwvcp1dW1viO03Wll14/k76P3Uh8c9S9Uh5YOfilhh40ONbSJvqQy0e60UggvsmzJKFDrRXtYeuHb9TSgS3cbQV6tjP3pgLbNZVrZikcAm2zdNuJWJluFkP6r+rxBfU6262MtfQMWWTl2MmXSGW6kMzxMmvDZfn0ALZ1xHjxb/ih1vaj7pfaEeaes9QV0XXhAbvNsS4tAGa2VI7yISurRl3p8pxehOnS0vFiA1uIFDTPD1iGjMd2JaZmLVAmZ7WRjFKC1yqUlaE0aNNu3GKvl0tdBOrQsDOrl5xNqtHLYdLSIoFHMxSh5XIgOLT+Ij6mDltFdfI5Hol+GTvJqZIN6DKMesnNbIyLyOBihyoauBRc3gD6rOkDXUi8B2jm6y5FNpHmJzH9tqY98WLQoE207VMH/QvjXxGsni4R4tAFt6ffIaCP0tXJX7WUvrHD2ad0uTZBtK5nq2YagBaJII3t4IQK0TKiWDxC8vgyvJ9aFEwvQdgY1glbNLJ+ICJfMOXJIkgOKsyChlUPZs53PpMAccWJDGunuKlt86DCVGme9Nk8CrCwBSq//HnGAIwD0s+PFg/wVov0bB6VXXod31U0LHI6PiWb0NdlcqxOV6AywZaPOHW7jrk28qls3QrTtwOF4ltxq6zCytzu+HFJnJJuaLoFRK3t1udQWage1h654gpzT6nqpDgKzgxvNI+TYVaerrr2oTsRjiWMS2NMSiAF6T0s8Vl6DSiAG6AYVb4z4npZADNB7WuKx8hpUAjFAN6h4Y8T3tAT+NEDLgw6znUxUe9WF+SrcJ7uIBRA5cOlKwAzYi8UobTSQ9SR27WYJ/BmA1padS7Eju7FBy21V9lOZbOQUJX5CTVChprc4bLWWDVVO9NiGrXz4c3OEXIkHGyYmzEonr3ygXdBXGmezqVOOyogDWEFobPuDk20bFpRXzw4NxTmmPCevnp1NxE6czFTKJyDLfOi8t+hQTl/K8cPbw/B6AnXX/r/V7HuUP4yzUbemDbEqQ/QcuTgrkg7PKiK0jqHwcOrjxIXWx1pLsF+E0nLSyhyr+oTmUVy4Q5LkYe27DHunOMeWHi7XUB53+/0eB7T2/QHmJEboRTTqPfJfoFaFgFT22tY8W7ZtAJkLIGUf9uP8M4BR7knHqR8av0LjbIAyn3fXFhUVXd2mTZsBK1eutHyeAfenpG3GYNkTOl9w34Qg++5m3v1Njv+U/xKj5GV0ksPxZ37Rdgnd7kZKGdeT52riS+FJHoal8n0mj5abPfYCRSnGfNmsx1HW69yfT57beKdGVHC1aNHiQLZAjYHOQkIF5XpJV0Dc56KpNPItJ1+4zZWowN/g/yV+O6sTOCu61OEc6qAFEG2QHQZdxzFqO0CguZY0R9t8JJLmQ+6z5eqqnSuEmdCdwiJUOxyrXtvGsnWJn5e0Ckqa94gXX3KZ/QNeptExty9+wdMk3p/C73p4O9Iuy8vzI8QPlL+L3E3J9wH5buR9NGsTuwTyPQpouZXSoJkAcart/vk03MuAXkDFfyFuunZ3E4I0WhlC0Plv2mIvn2M5A2nPo8AkYRcixO6MehMYoW9q3bp1j9WrV1sbS8m7CBraRNoamqPkd0G6MaR7REDGCWk4eynbs5dyFc+zeNaKlAvA7gu4tWCkS87naoRASNoXaKyhpNHCh7ziBGi5Ro6Cl5f41WaDO+H3WNVBRDp06LAAd9Vy+JgGzwJKKTT428FtGw5UruLhVdvMtDgl2gKfLgHyR9534b38Iax/COB5Cc9aCNPCitxXZymeMJCg5f6F8CWQncm9+BDN9ZRbygBwNwAeDph7S+1jz+HStWvX/gDN33lvbVrQsQHI7DW5BfC4FFrPkP5CQmvy9IZ37dNUJ/ma0Ib4BOrXjTxa5NHXZi7xPeks/0Lm/Uh/TO/eve/67rvv6rwKacsh6p89Bmg53RNaU7nb4c6PAI7R8QM0jHZTW4DmXt5uL4dzz7s8hPwMABegA+yQHsmIfQT5xwHUKwRoGqorDSWBqkEW0ZjNoddK6WkojaKFCL4/tFbL3RJaamyhaRO8vAlIT+N3vMBvl28BWnnpIBcT/76ABOjfpUNqA+t2QGtkhhf5e1xMmjso19q4G1YP7WiZQTr5MDuraqFJBOyvyKtVPakxVlWI05kbPuqTTf7u5M8Vz7zT0RNytN+HIPUhnaB4rQRqpTL0sgBNvdfQoSRvdQK5nj7arFmzewRo6vgIMtGmZ+fScRK/yb+FPKfqq8D7p21XATkRaf/kEmg+Svwl/N5qex1agIZnbZNry30a6eRGoD2gh4fxtdsf9wigEcLZcloHNGpMSw+zAT2Dil9BY5VR6bsJz6jX27UsJl5HJGiE/hZhddenOSUlZTYAfh8hajQJAOiJPE/UvkGeS0mnEUy+JFIVBOgywH4hasmj8PAKgDgJUHbU/j302wGA8xN++wPYGaT12Y0g/dECNHnugV4l+W7kdzN8X07ex3jnALqQOmijwnz5M5BmJM85dh1cHLXw9vr1651PrQdQvqE5hLN/MKRFBWiBtIfEY8cLHL8Tv4L4ruR7XPnJ+way0D7GUbzXrnjRdwCt/YxS40IvC9DkyVWdtfuHIxNuRmbD2ACxSoCWjKGvnePyk3mBwaFIgFaHIs/ryPgcqXqUeRRp5MujUX4m8j+Ad28TJx7leegAun2rVq32Z1PykeoIclOmbSwvzYa89gSg3QjwWQQz2f5UWfUBVIfyLF3LmkhJPSDNVoKc7dMQ3laEp21OAld7BHIXzwfzTg2o0W4m+c9FoNfYgP6F9w5wpC8XO4DmXtublvG+HbzMQMDa0Bpo2rTpmxs2bDicdM2hPw6BT2zSpEk2cdoEbAFaOjblTKO8I/n9ATrybHuadxagybeAhk0hyEEqUzqn9F3eBdU5srOz261bt26l04gchDMUfntQFn/BucNVHaAF7A2UoQ2rcsoK2qO45KDOfjn0WjAXkeoREdCkkZrAX78EvYD2cTrxaEbozgK05EGQ67AArY3B3wjQPFfqi0BdWsDHLPiWa2sxddQ+ykE5OTndp0+frpOiBsBLJ5zCpILNJRxklxWHzGbD/1DiovWvCRNN9I97AtDiJoNKPYaee9WKFSvkyaZLOp8sG25UiDgaRQ5NN1DxNxGWdNELEJI+jxJ0Qp8+faoWLlyYjlA70iDXkW4YAuyLgI+TysFo0IttVdJLdb6EHPCbhgDaAPxbSHcjI+YBHE4j3Vyf8z/EA+lf576pJlGMRuMYte8j7jbKv872glvK70iA/HfSPc/vU+SzAE0Q6FQXN7xdDF83oXO3Iq+bOuUB6PYAxqpz+/btD4DHseQ/p5omqg7QmjdsoRO+Ct0V0BxNojyCzIBunnXKkXRp+VJHBLS+MNTrGvJJrZKL7X4AWvypoz5PGVL5hAmpLlm2yvGuQAzIcwD53dTxNvmQ8y6X/NrlJIcylZ2oEZ930v+lQ3dCZpeQ51rStVFZxO+wFa4aGexy1J4CtBjdB6E9BHjHAajwiklNkA6tBpIOfaVALUADwCQsAr/SqNOdHSWMogcxin7atm3bw6E1EHVih0kh+b+Hnmb0lsqhwnGIvwq9Ww7rGvWXAdyDAO7HlCO/Z41M1ojK8xJ+96dxtBPlGj7JqZSxhuefeCfLQH4YoLc3Au8voczbbR1aI3a5A2jKayVVhXcaqXawVdsEqgO0POW22CrNfdxrgujXF4W4s+HlDoDWw7ZpRwS0vhzk6WofyjMZmfZBvuW2Dv0E9ZIzvi4NItk2oC0dGvkdg/ze1QQR4OvslkXcf0SQmtSYvOdB70F+r7ABLRC3g78j4O8dyh5P2XftMmIjENiTgBYrrRDmVIA5mt9m/I6honKs17aZ0xGAfKJ3ALQaX2Yf3g/WZA4hF2ok5VcjVGdG3svCrRwRAK0dN79S/hOUfx6jSBuAlte8eXOzceNG7c07FJotaYQrBGjSJlHWF/DWC1AeTFznUEDD093Eade3F36k6vQMBzT8FQAG0Zbfck07gqoDtPzM5bqqjjiJUEyiLVJrAM8Fsm0TJ9PmN4SoAS3TJXm/QfZ3oHY9Y1s55LutnSfykV+EbK60VY61dv3Feyr1HEIYgHykMumkgLkEjeb62ul0qT78zuHZAjT32tS8jDwfOGbHhgT1nga06tJB51cIUDTy5aGVQwBTeP6Myp+EsIchdJ1GqdEig55+O88DSCMVQaak63U2BiAbCSBPZ+S/lBOCnFOQ7ud9FgLMIa+lt5HuZNLlkF8nj66VDojQPaTR598aMW1T4iWMRjdCe38A+D+kHw6vV1F2P8xQ50KjD0G73rXLupzGf5F01v5CXdAtg+YZ3Mqe+1bLli3PZ2L0Ivl1rFZt526oLR4iyCfZOYJLgH4BOk9D83nKmgo/ss/LNDiY3wnwNl66Pelk0tNgIOf68IMNxd/L8LaOTncB99pz+TJ0V1CnychNk1znEt9LKe8W5CPLjTpKBfcr9KWgTFkwpkBHtnnRkv6uej8osx63sh7dwnNTnnXyqs5I0XmD6vDSv8MP9Qkpetdv/wxAi+teNM71NMrKsCo453TI5KWKh+7ckPlNq4xaYZSlxHnnnAESmtb5pO+QnzyiW1s+p1zx4SyOKH1oGeG8Vac+OGX4YVWjoeYE1rl1/88u4cORRYMCcXfJ5f8A7Y6uzlwt4xEAAAAASUVORK5CYII=';

export function openLinkInNewTab(relativeUrl: string): void {
  // Attempt to find the <base> tag and get its href attribute
  const baseElement = document.querySelector('base');
  let baseHref = '';

  if (baseElement) {
    baseHref = baseElement.getAttribute('href') || '';
  } else {
    console.warn(
      '<base> tag not found. Falling back to window.location.origin.'
    );
    // Fallback to using window.location.origin if no <base> tag is present
    baseHref = window.location.origin;
  }
  // Construct the full URL
  const fullUrl = `${baseHref}${relativeUrl}`;
  // Open the URL in a new tab
  window.open(fullUrl, '_blank');
}
export function MustMatch(controlName: string, matchingControlName: string) {
  return (group: AbstractControl) => {
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    // return if another validator has already found an error on the matchingControl
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  };
}
export function YEARS() {
  let startYear = 2024;
  let currentYear = new Date().getFullYear();
  let years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
}
