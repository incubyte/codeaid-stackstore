// Import statements
import { Injectable } from '@angular/core';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';

// Angular Service Definition
@Injectable({
  providedIn: 'root',
})
export class FullstackPics {
  getPics(): string[] {
    return [
      "/images/home/dream-left.jpg",
      "/images/home/dream-main.jpg",
      "/images/dreamdoor3.jpg",
      "/images/dreamdoorview.jpg",
      "/images/galaxy.jpg",
      "/images/monalisa.jpg",
      "/images/monet.jpg",
      "/images/Moon-logo.jpg",
      "/images/moons.jpg",
      "/images/soundofmusic.jpg",
      "/images/wildwildwest.jpg",
    ];
  }
}

// Downgrade Component for AngularJS Compatibility
angular
  .module('FullstackGeneratedApp')
  .service('FullstackPics', downgradeInjectable(FullstackPics));