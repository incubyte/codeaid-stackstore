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
export class DreamsFactory {
  constructor(private http: HttpClient) {}

  getAll() {
    const URL = "/api/dreams/";
    const response = this.http
      .get(URL)
      .toPromise()
      .then((dreams) => dreams.data);
    return response;
  }
}

// Downgrade Component for AngularJS Compatibility
angular
  .module(<original module name or ng>)
  .service('DreamsFactory', downgradeInjectable(DreamsFactory));