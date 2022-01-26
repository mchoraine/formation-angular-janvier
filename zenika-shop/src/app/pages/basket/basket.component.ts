import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service'
import { Observable } from 'rxjs'
import { Product } from '../../model/product'
import { Router } from '@angular/router'
import { Customer } from '../../model/customer'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$!: Observable<Product[]>;
  customer: Customer = new Customer();

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.basket$ = this.customerService.getBasket()
  }

  checkout() {
    this.customerService.checkout(this.customer).subscribe(() => this.router.navigate(['']));
  }
}
