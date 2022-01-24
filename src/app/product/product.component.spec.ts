import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Product } from '../model/product';

const testProduct = { title: 'title', description: 'description', photo: 'photo', price: 42 };

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent]
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
    expect(h3Content).toContain(testProduct.title);
  });

  it('should bind the photo url', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain(testProduct.photo);
  });

  it('should emit addToBasket event on a click on the button', () => {
    jest.spyOn(component.addToBasket, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.addToBasket.emit).toHaveBeenCalledWith(testProduct.price);
  });
});
