import { Injectable } from '@angular/core';
import { Product } from '../model/product'
import { ProductService } from './product.service'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private basket: Product[] = []

  constructor(private productService: ProductService) { }

  addProduct(product: Product) {
    this.basket.push(product)
    this.productService.decreaseStock(product)
  }

  getBasket() {
    return this.basket
  }

  getTotal() {
    return this.basket.reduce((total, p) => p.price + total, 0)
  }
}
