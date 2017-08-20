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
    byLine(obj){
      let { x, x1, y1, x2, y2 } = obj,
        interpolateResult1 = this.line({ x, x1, y1, x2, y2:y1 }),
        interpolateResult2 = this.line({ x, x1, y1:y2, x2, y2 });
      //console.log(`byLine between ${interpolateResult1} & ${interpolateResult2}`);
      return this.line({ x, x1:x, x2:x, y1:interpolateResult1, y2:interpolateResult2 });
    },
  }
})();

export default interpolate;
