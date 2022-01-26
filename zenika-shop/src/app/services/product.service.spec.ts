import { TestBed, waitForAsync } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Product } from '../model/product'

describe('ProductService', () => {
  let service : ProductService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created with 4 products',
    waitForAsync(() => {
      let http = TestBed.inject(HttpTestingController)
      expect(service).toBeTruthy();
      service.getProducts().subscribe((products) => {
        expect(products.length).toBe(1);
      })
      http.expectOne("http://ec2-13-38-118-140.eu-west-3.compute.amazonaws.com:8080/rest/products").flush([{} as Product])
    }
  ));

  [{stock: 0, isTheLast: false}, {stock: 1, isTheLast: true} ,{stock: 2, isTheLast: false}, {stock: 100, isTheLast: false}].forEach(({stock, isTheLast}) =>
    it(`should isTheLast return ${isTheLast} if stock is ${stock}`,
      () => {
        const product = { title: 'title', description: 'description', photo: 'photo', price: 42, stock: stock, id: '' };
        expect(service.isTheLast(product)).toBe(isTheLast);
      }
    ));


  [{stock: 0, isAvailable: false}, {stock: 1, isAvailable: true}, {stock: 2, isAvailable: true}, {stock: 100, isAvailable: true}].forEach(({stock, isAvailable}) =>
    it(`should isAvailable return ${isAvailable} if stock is ${stock}`,
      () => {
        const product = { title: 'title', description: 'description', photo: 'photo', price: 42, stock: stock, id: '' };
        expect(service.isAvailable(product)).toBe(isAvailable);
      }
    ));

  it('should decreaseStock decrease product stock of 1',
    () => {
      const product = { title: 'title', description: 'description', photo: 'photo', price: 42, stock: 42, id: '' };
      service.decreaseStock(product);
      expect(product.stock).toBe(42 - 1);
    }
  );
});
