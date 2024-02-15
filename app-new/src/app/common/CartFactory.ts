// Import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';

// Angular Service Definition
@Injectable({
  providedIn: 'root',
})
export class CartFactory {
  constructor(private http: HttpClient) {}

  getItems(id: number): Promise<any> {
    const URL = `/api/cart/`;
    const response = this.http
      .get(URL)
      .toPromise()
      .then((res) => ({ data: res }));
    return response;
  }
}

// Downgrade Component for AngularJS Compatibility
angular
  .module('app')
  .service('CartFactory', downgradeInjectable(CartFactory));