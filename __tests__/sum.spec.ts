import sum from '../src/sum';

let item: (a: number, b: number) => number;

describe('A suite is just a function', () => {
  beforeEach(() => {
    item = sum;
  });

  it('adds 1 + 2 to equal 3', () => {
    const res = item(1, 2);

    expect(res).toBe(3);
  });
});
