import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  @Input() indexOfOrderDetail: number;
  @Input() ImagePath: string;
  @Input() id_Product: number;
  @Input() ProductName: string;
  @Input() Quantity: number;
  @Input() CourantUnitPrice: Float32Array;
  @Input() TotalPrice: Float32Array;
  constructor() { }

  ngOnInit() {
  }

}
