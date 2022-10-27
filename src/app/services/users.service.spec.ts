import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Customer } from '../feature-customer/models/customer';
import { Customers } from '../utils/mock/customers';

const expectedUrl = 'https://63575e2e2712d01e14069970.mockapi.io//users';

describe('UsersService', () => {
  let service: UsersService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('searches for users', () => {
    let users: Customer[];
    service.getUsers().subscribe((data) => {
      users = data;
    });
    const request = controller.expectOne(expectedUrl);
    request.flush(Customers);
    expect(users.length).toEqual(3);
  });
});
