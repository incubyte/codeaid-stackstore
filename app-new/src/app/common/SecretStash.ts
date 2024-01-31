// Import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';

// Angular Service Definition
@Injectable({
  providedIn: 'root',
})
export class SecretStashService {
  constructor(private http: HttpClient) {}

  getStash() {
    const URL = '/api/members/secret-stash';
    const response = this.http
      .get(URL)
      .toPromise()
      .then((res) => ({ data: res }));
    return response;
  }
}

// Downgrade Component for AngularJS Compatibility
angular
  .module('originalModuleName', [])
  .service('SecretStash', downgradeInjectable(SecretStashService));