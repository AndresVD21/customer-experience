import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { Customer } from '../feature-customer/models/customer';
import { v4 as uuid } from 'uuid';

interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getRandomStatus() {
    const statuses = ['active','pending','inactive']
    const randomNumber = Math.floor(Math.random()*statuses.length);
    return statuses[randomNumber];
  }

  getUsers() {
    return this.http.get<IUser[]>(`${environment.usersUrl}/users`)
      .pipe(map((users) => 
        users.map(user => 
          new Customer(uuid(), user.firstName, user.lastName, this.getRandomStatus(), user.email, user.phone)
        )
      ))
  }
}
