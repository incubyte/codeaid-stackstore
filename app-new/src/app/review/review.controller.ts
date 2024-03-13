import { Component, OnInit } from '@angular/core';
import { ReviewFactoryService } from './review-factory.service'; // Assuming ReviewFactory is now a service
import { Location } from '@angular/common';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  constructor(private reviewFactoryService: ReviewFactoryService, private location: Location) {}

  ngOnInit(): void {}

  addReview(review: any): void {
    this.reviewFactoryService.addReview(review).subscribe(() => {
      this.location.reload();
    });
  }
}