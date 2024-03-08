import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DreamsFactory {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get("/api/dreams/").pipe(
      map(dreams => dreams)
    );
  }
}