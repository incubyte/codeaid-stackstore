// Import statements
import { Injectable } from '@angular/core';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';

// Angular Service Definition
@Injectable({
  providedIn: 'root',
})
export class RandomGreetings {
  greetings: string[] = [
    'Hello, world!',
    'At long last, I live!',
    'Hello, simple human.',
    'What a beautiful day!',
    'I\'m like any other project, except that I am yours. :)',
    'This empty string is for Lindsay Levine.',
    'こんにちは、ユーザー様。',
    'Welcome. To. WEBSITE.',
    ':D',
    'Yes, I think we\'ve met before.',
    'Gimme 3 mins... I just grabbed this really dope frittata',
    'If Cooper could offer only one piece of advice, it would be to nevSQUIRREL!',
  ];

  getRandomFromArray(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  getRandomGreeting(): string {
    return this.getRandomFromArray(this.greetings);
  }
}

// Downgrade Component for AngularJS Compatibility
angular
  .module('FullstackGeneratedApp')
  .service('RandomGreetings', downgradeInjectable(RandomGreetings));