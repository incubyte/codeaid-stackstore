// Import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';

// Angular Service Definition
@Injectable({
  providedIn: 'root',
})
export class CheckoutFactory {
  constructor(private http: HttpClient) {}

  getUser(id: string): Promise<any> {
    const URL = `/api/users/${id}`;
    const response = this.http
      .get(URL)
      .toPromise()
      .then((res) => res.data);
    return response;
  }
}

// Downgrade Component for AngularJS Compatibility
angular
  .module('app')
  .factory('CheckoutFactory', downgradeInjectable(CheckoutFactory));