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
  }
})();

export default interpolate;
