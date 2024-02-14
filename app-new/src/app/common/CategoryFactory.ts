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
export class CategoryFactory {
  constructor(private http: HttpClient) {}

  findOne(category: string): Promise<any> {
    const URL = `/api/dreams/category/${category}`;
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
  .service('CategoryFactory', downgradeInjectable(CategoryFactory));