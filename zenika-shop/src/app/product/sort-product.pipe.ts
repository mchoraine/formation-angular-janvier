import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product'

@Pipe({
  name: 'sortProduct',
  pure: true
})
export class SortProductPipe implements PipeTransform {

  transform (products: Product[], column: keyof Product = "title"): Product[] {
    return products.sort((p1, p2) => {
      return p1[column].toString().localeCompare(p2[column].toString())
    });
  }
}
