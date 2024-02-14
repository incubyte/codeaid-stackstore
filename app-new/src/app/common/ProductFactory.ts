// Import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';

// Angular Service Definition
@Injectable({
  providedIn: 'root',
})
export class ProductFactory {
  constructor(private http: HttpClient) {}

  getDream(id: number): Promise<any> {
    const URL = `/api/dreams/${id}`;
    const response = this.http
      .get(URL)
      .toPromise()
      .then((res) => ({ data: res }));
    return response;
  }

  getAllDreams(): Promise<any> {
    const URL = '/api/dreams';
    const response = this.http
      .get(URL)
      .toPromise()
      .then((res) => {
        console.log(res);
        return res;
      });
    return response;
  }
}

// Downgrade Component for AngularJS Compatibility
angular
  .module('originalModuleName', [])
  .service('ProductFactory', downgradeInjectable(ProductFactory));