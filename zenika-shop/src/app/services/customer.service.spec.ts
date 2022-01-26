import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';

const product1 = { title: 'title', description: 'description', photo: 'photo', price: 42, stock: 0 };
const product2 = { title: 'title', description: 'description', photo: 'photo', price: 666, stock: 0 };

describe('CustomerService', () => {
  let service : CustomerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService]
    });
    service = TestBed.inject(CustomerService);
  });

  it('should be created with no product',
    () => {
      expect(service).toBeTruthy();
      expect(service.getBasket().length).toBe(0);
    }
  );

  it('should add products to the list when using addProduct',
    () => {
      service.addProduct(product1);
      expect(service.getBasket()).toEqual([product1]);
    }
  );

  it('should calculate the total price when using getTotal',
    () => {
      service.addProduct(product1);
      service.addProduct(product2);
      expect(service.getTotal()).toBe(product1.price + product2.price);
    }
  );

});
