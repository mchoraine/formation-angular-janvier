import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../model/product'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product!: Product;
  @Output() addToBasket = new EventEmitter<Product>();

  constructor (public productService: ProductService) {
  }

  addToBasketClick () {
    this.addToBasket.emit(this.product)
  }
}
