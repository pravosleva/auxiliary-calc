const interpolate = require('./interpolate');

test('interpolate.line', () => {
  //{ 1, 0, 2, 2, 0 } as { x, x1, y1, x2, y2 } should be 1
  expect(interpolate.line({ x:1, x1:0, y1:2, x2:2, y2:0 })).toBe(1)
});

test('interpolate.byTableInside', () => {
  expect(interpolate.byTableInside({
    x: 0,// C
    y: 4.6,// %
    tableAsDoubleArray: [
      [0.0,   -30.0,    -25.0,    -20.0,    -15.0,    -10.0,    -5.0,     0.0,    10.0,     20.0,   50.0],
      [4.6,   4.10300,  4.10300,  4.10300,  4.10300,  4.10300,  4.10300,  4.103,  4.124,    4.145,  4.145],
    ]
  })).toBe(4.103)
});
