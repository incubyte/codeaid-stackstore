// Import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';

// Angular Service Definition
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  //admin view all dreams
  fetchDreams() {
    const URL = "/api/dreams";
    const response = this.http
      .get(URL)
      .toPromise()
      .then((dreams) => dreams.data);
    return response;
  }

  fetchOneDream(id) {
    const URL = "/api/dreams/" + id;
    const response = this.http
      .get(URL)
      .toPromise()
      .then((dream) => dream.data);
    return response;
  }

  //admin create dream
  createDream(data) {
    const URL = "/api/dreams/";
    const response = this.http
      .post(URL, data)
      .toPromise()
      .then((dream) => dream.data);
    return response;
  }

  //admin update one dream
  updateDream(dreamId, data) {
    const URL = "/api/dreams/" + dreamId;
    const response = this.http
      .put(URL, data)
      .toPromise()
      .then((dream) => dream.data);
    return response;
  }

  //admin delete one dream
  deleteDream(id) {
    const URL = "/api/dreams/" + id;
    const response = this.http
      .delete(URL)
      .toPromise()
      .then((response) => response.data);
    return response;
  }

  //admin view all users
  fetchUsers() {
    const URL = "/api/users";
    const response = this.http
      .get(URL)
      .toPromise()
      .then((users) => users.data);
    return response;
  }

  //admin create user
  createUser(data) {
    const URL = "/api/users";
    const response = this.http
      .post(URL, data)
      .toPromise()
      .then((createdUser) => createdUser.data);
    return response;
  }

  //admin update one user
  updateUser(id, data) {
    const URL = "/api/users/" + id;
    const response = this.http
      .put(URL, data)
      .toPromise()
      .then((user) => user.data);
    return response;
  }

  //admin delete one user
  deleteUser(id) {
    const URL = "/api/users/" + id;
    const response = this.http
      .delete(URL)
      .toPromise()
      .then((response) => response.data);
    return response;
  }

  //admin view list of all orders
  fetchOrders() {
    const URL = "/api/orders";
    const response = this.http
      .get(URL)
      .toPromise()
      .then((response) => response.data);
    return response;
  }

  //admin edit one order
  fetchOrder(id, data) {
    const URL = "/api/orders/" + id;
    const response = this.http
      .get(URL, data)
      .toPromise()
      .then((order) => order.data);
    return response;
  }

  //admin delete one order
  deleteOrder(id) {
    const URL = "/api/orders/" + id;
    const response = this.http
      .delete(URL)
      .toPromise()
      .then((response) => response.data);
    return response;
  }
}

// Downgrade Component for AngularJS Compatibility
angular
  .module('app')
  .service('AdminFactory', downgradeInjectable(AdminService));