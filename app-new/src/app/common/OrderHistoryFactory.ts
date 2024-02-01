// Import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';
//TODO: Add additional imports here

// Angular Service Definition
@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  constructor(private http: HttpClient) {}

  viewOrders(id: string) {
    const URL = `/api/order/${id}`;
    const response = this.http
      .get(URL)
      .toPromise()
      .then((res) => {
        console.log("VIEW MY ORDERS", res);
        return res;
      });
    return response;
  }
}

// Downgrade Component for AngularJS Compatibility
angular
  .module(<original module name or ng>)
  .service('OrderHistoryFactory', downgradeInjectable(OrderHistoryService));