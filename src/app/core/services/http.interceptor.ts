import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const authReq = req.clone({
    setHeaders: {
      'x-api-key': environment.X_API_KEY,
      Authorization: `Bearer ${authService.getUserToken()}`,
    },
  });
  return next(authReq).pipe(
    catchError((error) => {
      if (error?.status === 401) {
        let message = 'Unauthorized';
        if (error.error) {
          message = error.error[0];
        }
        toastr.error(message);
        authService.userLogout();
      } else if (error?.status === 403) {
        let message = 'Forbidden';
        if (error?.title) {
          message = error?.title;
        }
        toastr.error(message);
        // authService.userLogout();
      } else if (error?.status === 409) {
        toastr.error(error.error[0] ?? 'Conflict Error');
      } else if (error?.status === 415) {
        toastr.error(error?.error?.title ?? 'Validation Error');
      } else if (error?.status === 404) {
        let message = JSON.stringify(error.message);
        toastr.error(message ?? '404 Not Found');
      } else if (error?.status === 400) {
        // Handle 400 Bad Request specifically
        let errorMessage = '';
        if (error.error?.validation) {
          errorMessage =
            error.error?.validation?.body?.message || 'Validation failed';
        } else {
          let result = error.error;
          for (const key in result) {
            const element = result[key];
            for (const errKey in element) {
              errorMessage = element[errKey];
            }
          }
        }

        toastr.error(errorMessage); // Show the specific validation message
      } else {
        toastr.error('Something went wrong.');
      }
      return throwError(() => error);
    })
  );
};
