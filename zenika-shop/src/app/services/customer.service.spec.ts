import { TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

const product1 = { title: 'title', description: 'description', photo: 'photo', price: 42, stock: 0 };
const product2 = { title: 'title', description: 'description', photo: 'photo', price: 666, stock: 0 };

describe('CustomerService', () => {
  let service: CustomerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CustomerService);
  });

  it('should be created with no product',
    waitForAsync(() => {
        let http = TestBed.inject(HttpTestingController)

        expect(service).toBeTruthy();
        service.getBasket().subscribe(basket => {
          expect(basket.length).toBe(0);
        })

        http.expectOne("http://ec2-13-38-118-140.eu-west-3.compute.amazonaws.com:8080/rest/basket").flush([])

      }
    ));

  it('should add products to the list when using addProduct',
    () => {
      let http = TestBed.inject(HttpTestingController)

      service.addProduct(product1).subscribe();

      http.expectOne("http://ec2-13-38-118-140.eu-west-3.compute.amazonaws.com:8080/rest/basket").flush(null)
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
