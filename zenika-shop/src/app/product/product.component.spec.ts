import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ProductService } from '../services/product.service'
import { Product } from '../model/product'
import { HttpClient } from '@angular/common/http'

const testProduct = { title: 'title', description: 'description', photo: 'photo', price: 42, stock: 2, id: '1' };

class FakeProductService extends ProductService {

  constructor () {
    super({} as HttpClient)
  }
  private _isTheLast!: boolean

  withIsTheLast(isTheLAst: boolean) {
    this._isTheLast = isTheLAst
  }

  override isTheLast (product: Product): boolean {
    return this._isTheLast;
  }
}

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let service = new FakeProductService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        {
          provide: ProductService,
          useValue: service
        }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = testProduct;
    fixture.detectChanges();
  });

  it('should bind title and price in the h3', () => {
    const h3Content = fixture.nativeElement.querySelector('h3').textContent;
    expect(h3Content).toContain(testProduct.title.toLocaleUpperCase());
  });

  it('should bind the photo url', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain(testProduct.photo);
  });

  it('should emit addToBasket event on a click on the button', () => {
    jest.spyOn(component.addToBasket, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.addToBasket.emit).toHaveBeenCalledWith(testProduct);
  });

  it('should not add "last" class if stock > 1', () => {
    service.withIsTheLast(false);

    fixture.detectChanges();
    const thumbnail = fixture.nativeElement.querySelector('.thumbnail');
    expect(thumbnail.classList).not.toContain('last');
  });

  it('should add "last" class if stock == 1', () => {
    service.withIsTheLast(true);

    fixture.detectChanges();
    const thumbnail = fixture.nativeElement.querySelector('[data-test-id="my-product"]');
    expect(thumbnail.classList).toContain('last');
  });

});
