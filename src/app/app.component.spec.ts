import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { UsersService } from './services/users.service';
import { Customers } from './utils/mock/customers';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const initialState = {
    customers: Customers,
    customerSelected: Customers[0],
  };

  let store: MockStore;

  beforeEach(async () => {
    let store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [UsersService, provideMockStore({ initialState })],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should store customers in local storage', () => {
    app.setCustomersLocalStorage(Customers);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('should get customers in local storage', () => {
    app.getCustomersFromLocalStorage();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith('customers');
  });

  it('should check if store has data', () => {
    app.setCustomersLocalStorage(Customers);
    const isData = app.isDataInLocal();
    expect(isData).toBeTruthy();
  });

  it('should check if store is empty', () => {
    const isData = app.isDataInLocal();
    expect(isData).toBeFalsy();
  });
});
