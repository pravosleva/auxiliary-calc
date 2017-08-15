let interpolate = (function() {
  return {
    line(obj){
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
