import { Injectable } from '@angular/core';
import { Product } from '../model/product'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://ec2-13-38-118-140.eu-west-3.compute.amazonaws.com:8080/rest/products");
  }

  isTheLast(product: Product) {
    return product.stock === 1;
  }

  isAvailable(product: Product) {
    return product.stock > 0
  }

  decreaseStock(product: Product) {
    product.stock--;
  }
}
