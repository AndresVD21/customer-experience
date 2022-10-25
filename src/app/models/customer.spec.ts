import { Customer } from './customer';

describe('Costumer', () => {
  it('should create an instance', () => {
    expect(new Customer('000', 'test', 'test', 'active', 'email')).toBeTruthy();
  });
});
