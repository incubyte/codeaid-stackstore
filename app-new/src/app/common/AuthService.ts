// Import statements
import { Injectable } from '@angular/core';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';

// Angular Service Definition
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private session: SessionService, private router: Router, private eventService: EventService) {}

  // Uses the session service to see if an authenticated user is currently registered.
  isAuthenticated(): boolean {
    return !!this.session.user;
  }

  getLoggedInUser(fromServer?: boolean): Promise<User | null> {
    // If an authenticated session exists, we return the user attached to that session with a promise.
    // This ensures that we can always interface with this method asynchronously.
    // Optionally, if true is given as the fromServer parameter, then this cached value will not be used.
    if (this.isAuthenticated() && !fromServer) {
      return Promise.resolve(this.session.user);
    }

    // Make request GET /session.
    // If it returns a user, call onSuccessfulLogin with the response.
    // If it returns a 401 response, we catch it and instead resolve to null.
    const URL = '/session';
    const response = this.http
      .get(URL)
      .toPromise()
      .then((res) => this.onSuccessfulLogin(res))
      .catch(() => null);

    return response;
  }

  signup(credentials: Credentials): Promise<User> {
    const URL = '/signup';
    const response = this.http
      .post(URL, credentials)
      .toPromise()
      .then((res) => this.onSuccessfulLogin(res))
      .catch(() => {
        console.log('I CAUGHT THE POST REQUEST ERROR');
        return Promise.reject({ message: 'Invalid signup credentials.' });
      });

    return response;
  }

  login(credentials: Credentials): Promise<User> {
    const URL = '/login';
    const response = this.http
      .post(URL, credentials)
      .toPromise()
      .then((res) => this.onSuccessfulLogin(res))
      .catch(() => {
        console.log('THIS MESSAGE IS FROM AUTHSERVICE');
        return Promise.reject({ message: 'Invalid login credentials.' });
      });

    return response;
  }

  logout(): Promise<void> {
    const URL = '/logout';
    const response = this.http
      .get(URL)
      .toPromise()
      .then(() => {
        this.session.destroy();
        this.eventService.broadcast(AUTH_EVENTS.logoutSuccess);
      });

    return response;
  }

  private onSuccessfulLogin(response: any): User {
    const data = response.data;
    this.session.create(data.id, data.user);
    this.eventService.broadcast(AUTH_EVENTS.loginSuccess);
    return data.user;
  }
}

// Downgrade Component for AngularJS Compatibility
angular
  .module('fsaPreBuilt')
  .service('AuthService', downgradeInjectable(AuthService));