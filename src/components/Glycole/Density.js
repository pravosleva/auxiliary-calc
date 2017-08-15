import interpolate from '../interpolate';
//console.log(interpolate.line({x:0.5, x1:0, y1:1, x2:1, y2:2}));

let Density = (function() {
  return {
    density: function(obj){
      let diagram;
      let glycoleType = obj.glycoleType,
        temperature = obj.temperature,
        percentage = obj.percentage;
      //console.log(`${glycoleType} t=${temperature} %=${percentage}`);
      switch(glycoleType){
        case 'MEG':
          diagram = {
            percentage: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            temperature: [-45, -40, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
            data: [
              {// 10%
                range: { tMin: -10, tMax: 100 },
                density: [1017, 1016, 1015, 1014, 1013, 1012, 1011, 1009, 1007, 1006, 1004, 1002, 999, 996, 994, 991, 988, 986, 983, 979, 976, 973, 969]
              },
              {// 20%
                range: { tMin: -10, tMax: 100 },
                density: [1320, 1310, 1030, 1029, 1027, 1026, 1024, 1022, 1021, 1019, 1017, 1014, 1012, 1009, 1006, 1003, 1000, 997, 994, 990, 987, 983, 980]
              },
            ]
          };
          break;
        case 'MPG':
          //...
          break;
        default: break;
      }
      //...
      return 1000;
    }
  }
})();

export default Density;
