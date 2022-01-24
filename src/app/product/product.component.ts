import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../model/product'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product!: Product;
  @Output() addToBasket = new EventEmitter<number>();

  addToBasketClick () {
    this.addToBasket.emit(this.product.price)
  }
}
