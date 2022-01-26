import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Product } from '../../model/product'
import { ProductService } from '../../services/product.service'
import { CustomerService } from '../../services/customer.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products$!: Observable<Product[]>;
  sortKey: keyof Product = 'title'

  constructor (
    @Inject("title") public title: string,
    private productService: ProductService,
    private customerService: CustomerService) {
  }

  ngOnInit (): void {
    this.products$ = this.productService.getProducts()
  }

  addToBasket (product: Product) {
    this.customerService.addProduct(product).subscribe()
  }

  get total () {
    return this.customerService.getTotal()
  }

  isAvailable (product: Product) {
    return this.productService.isAvailable(product)
  }

}
