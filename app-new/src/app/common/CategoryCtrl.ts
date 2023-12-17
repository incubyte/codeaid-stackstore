// Import statements
import { Injectable } from '@angular/core';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';
//TODO: Add additional imports here

// Angular Service Definition
@Injectable({
  providedIn: 'root',
})
export class CategoryCtrl {
  dreams: any;

  constructor(private theDreams: any) {
    this.dreams = theDreams;
  }
}

// Downgrade Component for AngularJS Compatibility
angular
  .module('FullstackGeneratedApp')
  .service('CategoryCtrl', downgradeInjectable(CategoryCtrl));