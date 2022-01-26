import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'
import { ActivatedRoute } from '@angular/router'
import { map, mergeMap, Observable } from 'rxjs'
import { Product } from '../../model/product'

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  product$!: Observable<Product>

  constructor(private productService: ProductService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.product$ = this.activateRoute.params.pipe(
      map((params) => params['id']),
      mergeMap(id => this.productService.getProduct(id))
    )
  }

}
