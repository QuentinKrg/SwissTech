import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(private _router: Router ) { }
  isPrinting = false;

  printDocument(id: number) {
    this.isPrinting = true;
    this._router.navigate(['/print/invoice/'+id]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      localStorage.removeItem('order');
      this._router.navigate(['/myprofile/myorders']);
    });
  }
}
