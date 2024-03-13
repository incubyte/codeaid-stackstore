import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orders: any;

  constructor(private previousOrders: any) {}

  ngOnInit(): void {
    this.orders = this.previousOrders;
  }
}