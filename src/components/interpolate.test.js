const interpolate = require('./interpolate');

test('interpolate.line { 1, 0, 2, 2, 0 } as { x, x1, y1, x2, y2 } should be 1', () => {
  expect(interpolate.line({ x:1, x1:0, y1:2, x2:2, y2:0 })).toBe(1)
});
