let interpolate = (function() {
  return {
    line(obj){
      let { x, x1, y1, x2, y2 } = obj;
      if(x1===x2){
        return ((y1+y2)/2);
      }else{
        return ((x-x1)*(y2-y1)/(x2-x1) + y1);
      }
    },
    getKB(obj){
      let { x1, y1, x2, y2 } = obj,
        k = (y1-y2)/(x2-x1),
        b = y1-k*x1;
      return { k, b }
    },
    biLine(obj){
      /* See about it here:
        https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%BB%D0%B8%D0%BD%D0%B5%D0%B9%D0%BD%D0%B0%D1%8F_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BF%D0%BE%D0%BB%D1%8F%D1%86%D0%B8%D1%8F
      */
      let { x, y, x1, y1, x2, y2, q11, q12, q21, q22 } = obj,
        interResult1 = this.line({ x: x,
                                   x1: x1,
                                   y1: q11,
                                   x2: x2,
                                   y2: q12}),
        interResult2 = this.line({ x: x,
                                   x1: x1,
                                   y1: q21,
                                   x2: x2,
                                   y2: q22 });
      //console.log(`biLine between ${interResult1} & ${interResult2}`);
      return this.line({ x: y,
                         x1: y1,
                         y1: interResult1,
                         x2: y2,
                         y2: interResult2 });
    },
    byTableInside(obj){
      let { x, y, tableAsDoubleArray } = obj;
      /*
        tableAsDoubleArray should be realized as:
          head_y  | head_x  | head_x  | ..
          head_y  | point   | point   | ..
          head_y  | point   | point   | ..
        See also this example for tableAsDoubleArray:
          [
            [ 0.0,   0.0,  10.0,  20.0],
            [12.2, 3.977, 3.998, 4.019],
            [16.0, 3.894, 3.915, 3.936],
            [19.8, 3.852, 3.873, 3.894]
          ]
        BUT REMEMBER THAT:
          Your point should be have place in particular rectangle
          | | | | | |
          | |********
          | |*Inside*
      */
      let i1, i2, j1, j2;

      for (i2 = 1; tableAsDoubleArray[i2][0] < y; i2++);
      i1 = i2 - 1;

      for (j2 = 1; tableAsDoubleArray[0][j2] < x; j2++);
      j1 = j2 - 1;

      return this.biLine ({x,
                        y,
                        x1: tableAsDoubleArray[0][j1],
                        y1: tableAsDoubleArray[i1][0],
                        x2: tableAsDoubleArray[0][j2],
                        y2: tableAsDoubleArray[i2][0],
                        q11: tableAsDoubleArray[i1][j1],
                        q12: tableAsDoubleArray[i1][j2],
                        q21: tableAsDoubleArray[i2][j1],
                        q22: tableAsDoubleArray[i2][j2]
                      });
    },
  }
})();

//export default interpolate;
module.exports = interpolate;
