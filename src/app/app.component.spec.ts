import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component'
import { Product } from './model/product'

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have a total starting at 0', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.total).toEqual(0);
  }));

  it('should have the total bound in the header', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    app.total = 42;
    fixture.detectChanges();
    expect(compiled.querySelector('header').textContent).toContain('42€');
  }));

  it('should update price with the product price', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;

    app.total = 42;
    app.addToBasket({ stock: 2, price: 666 } as Product);
    expect(app.total).toBe(42 + 666);
  }));

  it('should decrease product stock on add to basket', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    const productAddedToBasket = { stock: 2, price: 666 } as Product

    app.addToBasket(productAddedToBasket);

    expect(productAddedToBasket.stock).toBe(1);
  }));

  it('should bind each product component with its product', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    const products = compiled.querySelectorAll('app-product');
    products.forEach((productComponent: ProductComponent, i: number) => {
      expect(productComponent.product).toBe(app.products[i]);
    });
  }));

  it('should hide product when no stock', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    app.products[0].stock = 0;

    fixture.detectChanges();
    const products = compiled.querySelectorAll('app-product');
    expect(products.length).toBe(app.products.length - 1)
  }));

});
