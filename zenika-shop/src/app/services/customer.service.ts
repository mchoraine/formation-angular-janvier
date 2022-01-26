import { Inject, Injectable } from '@angular/core';
import { Product } from '../model/product'
import { ProductService } from './product.service'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private basket: Product[] = []

  constructor(private productService: ProductService, private httpClient: HttpClient) { }

  addProduct(product: Product) {
    return this.httpClient.post("http://ec2-13-38-118-140.eu-west-3.compute.amazonaws.com:8080/rest/basket", product)
               .pipe(tap(() => this.basket.push(product)));
  }

  getBasket() {
    return this.httpClient.get<Product[]>("http://ec2-13-38-118-140.eu-west-3.compute.amazonaws.com:8080/rest/basket")
               .pipe(tap((products) => this.basket = products));
  }

  getTotal() {
    return this.basket.reduce((total, p) => p.price + total, 0)
  }
}
