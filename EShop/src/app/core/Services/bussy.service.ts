import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BussyService {
  busyRequestCount = 0;

  constructor(private spinerService: NgxSpinnerService) { }


  busy() {
    this.busyRequestCount++;
    this.spinerService.show(undefined, {
      type: 'ball-scale-multiple',
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333'
    });
  }
  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinerService.hide();
    }

  }
}
