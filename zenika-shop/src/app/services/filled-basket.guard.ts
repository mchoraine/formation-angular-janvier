import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CustomerService } from './customer.service'

@Injectable({
  providedIn: 'root'
})
export class FilledBasketGuard implements CanActivate {

  constructor (private basketService: CustomerService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.basketService.getBasket().pipe(
      map(basket => basket.length > 0)
    );
  }

}
