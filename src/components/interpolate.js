let interpolate = (function() {
  return {
    line(obj){
      /* obj.type
        0 - x1<x2, y1<y2
        1 - x1>x2, y1<y2
        2 - x1>x2, y1>y2
        3 - x1<x2, y1>y2
      */
      let { x, x1, y1, x2, y2 } = obj;
      return ((x-x1)*(y2-y1)/(x2-x1) + y1);
    },
    getKB(obj){
      let { x1, y1, x2, y2 } = obj,
        k = (y1-y2)/(x2-x1),
        b = y1-k*x1;
      return { k, b }
    }
  }
})();

export default interpolate;
