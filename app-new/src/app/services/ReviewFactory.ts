import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getOneDreamReviews(dreamId: number) {
    return this.http.get(`/api/dreams/${dreamId}/reviews`).toPromise();
  }

  addReview(review: any) {
    const id = +review.dreamId;
    return this.http
      .post(`/api/dreams/${id}/reviews`, review, { params: { user: review.userId } })
      .toPromise();
  }
}