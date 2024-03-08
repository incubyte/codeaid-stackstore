import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecretStashService {
  private stashUrl = '/api/members/secret-stash';

  constructor(private http: HttpClient) { }

  getStash(): Observable<any> {
    return this.http.get(this.stashUrl);
  }
}