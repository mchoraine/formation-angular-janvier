import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { BasketComponent } from './pages/basket/basket.component'
import { FilledBasketGuard } from './services/filled-basket.guard'
import { DetailProductComponent } from './pages/detail-product/detail-product.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'basket',
    component: BasketComponent,
    canActivate: [FilledBasketGuard]
  },
  {
    path: 'product/:id',
    component: DetailProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
