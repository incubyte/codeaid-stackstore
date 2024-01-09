// Import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';

// Angular Service Definition
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getOneDreamReviews(dreamId: number): Promise<any> {
    const id = +dreamId;
    const URL = `/api/dreams/${id}/reviews`;

    const response = this.http
      .get(URL)
      .toPromise()
      .then((reviews) => {
        console.log("Here is the reviews for ya", reviews);
        return reviews;
      });

    return response;
  }

  addReview(review: any): Promise<any> {
    const id = +review.dreamId;
    const URL = `/api/dreams/${id}/reviews`;

    const response = this.http
      .post(URL, review, { user: review.userId })
      .toPromise()
      .then((newReview) => {
        console.log("Thanks for the review");
      })
      .catch(() => {
        console.log("Review error!!!");
      });

    return response;
  }
}

// Downgrade Component for AngularJS Compatibility
angular
  .module('originalModuleName', [])
  .service('ReviewFactory', downgradeInjectable(ReviewService));