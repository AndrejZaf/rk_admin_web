import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  show(title: string, message: string): void {
    this.toastr.success(title, message, {
      tapToDismiss: true,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }

  warn(title: string, message: string): void {
    this.toastr.error(title, message, {
      tapToDismiss: true,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }
}
