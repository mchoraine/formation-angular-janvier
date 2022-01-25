import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component'
import { Product } from './model/product'
import { CustomerService } from './services/customer.service'
import { ProductService } from './services/product.service'

class FakeCustomerService extends CustomerService {
  private _total!: number

  constructor () {
    super({} as ProductService)
  }

  withTotal(total: number) {
    this._total = total;
  }

  override getTotal (): number {
    return this._total;
  }

  override addProduct (product: Product) {

  }
}

class FakeProductService extends ProductService {
  private _products!: Product[]

  withProducts(products: Product[]) {
    this._products = products
  }

  override getProducts (): Product[] {
    return this._products
  }

}

describe('AppComponent', () => {

  let customerService = new FakeCustomerService();
  let productService = new FakeProductService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: 'title',
          useValue: 'Hello world'
        },
        {
          provide: CustomerService,
          useValue: customerService
        },
        {
          provide: ProductService,
          useValue: productService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('display title', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges()

    const title = fixture.nativeElement.querySelector("header")
    expect(title.textContent).toContain("Hello world");
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have a total starting at 0', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    customerService.withTotal(0)

    expect(app.total).toEqual(0);
  }));

  it('should have the total bound in the header', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;

    customerService.withTotal(42)

    fixture.detectChanges();
    expect(compiled.querySelector('header').textContent).toContain('42€');
  }));

  it('should decrease product stock on add to basket', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    let addProductSpy = jest.spyOn(customerService, 'addProduct')

    app.addToBasket({} as Product);

    expect(addProductSpy).toHaveBeenCalled()
  }));

  it('should bind each product component with its product', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    productService.withProducts([{} as Product])

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

    let products = [{stock: 1} as Product, {stock: 0} as Product]
    productService.withProducts(products)

    fixture.detectChanges();
    const productsComponent = compiled.querySelectorAll('app-product');
    expect(productsComponent.length).toBe(products.length - 1)
  }));

});
