import { SortProductPipe } from './sort-product.pipe';

describe('SortProductPipe', () => {
  it('create an instance', () => {
    const pipe = new SortProductPipe();
    expect(pipe).toBeTruthy();
  });

  it('should sort objects by property in argument', () => {
    const pipe = new SortProductPipe();
    const data = [
      { title: 'zyxw', description: '', photo: '', stock: 0, price: 0 },
      { title: '1234', description: '', photo: '', stock: 0, price: 0 },
      { title: 'abcd', description: '', photo: '', stock: 0, price: 0 }
    ];
    const expected = [
      { title: '1234', description: '', photo: '', stock: 0, price: 0 },
      { title: 'abcd', description: '', photo: '', stock: 0, price: 0 },
      { title: 'zyxw', description: '', photo: '', stock: 0, price: 0 }
    ];
    expect(pipe.transform(data, 'title')).toEqual(expected);
  });
});
