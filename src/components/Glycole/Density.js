import interpolate from '../interpolate';
//console.log(interpolate.line({x:0.5, x1:0, y1:1, x2:1, y2:2}));

let Density = (function() {
  return {
    density: function(obj){
      let diagram = {}, result, t1, t2, numOfDataObj, d1, d2,
        { glycoleType, temperature, percentage } = obj;
      diagram.percentage = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      //console.log(`${glycoleType} t=${temperature} %=${percentage}`);
      switch(glycoleType){
        case 'MEG':
          diagram.temperature = [-45, -40, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
          diagram.data = [
            {// 10%
              range: { tMin: -10, tMax: 100 },
              density: [0, 0, 0, 0, 0, 0, 0, 1017, 1016, 1015, 1014, 1013, 1012, 1011, 1009, 1007, 1006, 1004, 1002, 999, 996, 994, 991, 988, 986, 983, 979, 976, 973, 969]
            },
            {// 20%
              range: { tMin: -10, tMax: 100 },
              density: [0, 0, 0, 0, 0, 0, 0, 1320, 1310, 1030, 1029, 1027, 1026, 1024, 1022, 1021, 1019, 1017, 1014, 1012, 1009, 1006, 1003, 1000, 997, 994, 990, 987, 983, 980]
            },
            {// 30%
              range: { tMin: -10, tMax: 100 },
              density: [0, 0, 0, 0, 0, 0, 0, 1048, 1047, 1046, 1044, 1042, 1041, 1038, 1036, 1034, 1032, 1029, 1026, 1023, 1021, 1018, 1014, 1011, 1008, 1005, 1001, 997, 993, 990]
            },
            {// 40%
              range: { tMin: -25, tMax: 100 },
              density: [0, 0, 0, 0, 1068, 1067, 1066, 1064, 1062, 1061, 1059, 1056, 1054, 1052, 1050, 1047, 1045, 1041, 1038, 1035, 1032, 1029, 1026, 1023, 1019, 1016, 1012, 1009, 1005, 1000]
            },
            {// 50%
              range: { tMin: -35, tMax: 100 },
              density: [0, 0, 1087, 1086, 1085, 1083, 1081, 1079, 1077, 1075, 1073, 1070, 1067, 1064, 1061, 1058, 1055, 1052, 1049, 1046, 1043, 1040, 1037, 1034, 1029, 1026, 1022, 1018, 1014, 1010]
            },
            {// 60%
              range: { tMin: -45, tMax: 100 },
              density: [1110, 1108, 1105, 1103, 1101, 1098, 1096, 1094, 1091, 1088, 1085, 1083, 1080, 1077, 1074, 1071, 1067, 1064, 1060, 1057, 1054, 1051, 1047, 1044, 1040, 1036, 1032, 1028, 1024, 1020]
            },
          ];
          console.group(`Test`);
          diagram.data.map((e, i)=>{ console.log(`For ${diagram.percentage[i]}%: ${diagram.data[i].density.length} elements`) });
          console.groupEnd(`Test`);
          break;
        case 'MPG':

          //...
          break;
        case 'WATER':

          //...
          break;
        default: break;
      };

      // Out of percentage range:
      if(
        (percentage < diagram.percentage[0]) ||
        (percentage > diagram.percentage[diagram.percentage.length-1])
      ){ result = 0 }
      // If =last then last range:
      diagram.percentage.map(function(e, i){ if(percentage === e){ numOfDataObj = i } });
      //console.log(`numOfDataObj = ${numOfDataObj}`);

      // Out of temperature range:
      if(
        (temperature < diagram.temperature[0]) ||
        (temperature > diagram.temperature[diagram.temperature.length-1])
      ){ result = 0 }
      // If =last then last range:
      console.log(diagram.temperature[diagram.temperature.length-1])
      if(temperature === diagram.temperature[diagram.temperature.length-1]){
        t1 = diagram.temperature[diagram.temperature.length-2];
        t2 = diagram.temperature[diagram.temperature.length-1];
        d1 = diagram.data[numOfDataObj].density[diagram.temperature.length-2];
        d2 = diagram.data[numOfDataObj].density[diagram.temperature.length-1];
      }else{
        // DETECT the t1 & t2 - is the min & max values of local t range
        // ...and d1 & d2
        for(let i=0, max=diagram.temperature.length; i<max; i++){//console.log(i);
          if(temperature < diagram.temperature[diagram.temperature.length-1] && temperature > diagram.temperature[diagram.temperature.length-2]){
            t1 = diagram.temperature[diagram.temperature.length-2];
            t2 = diagram.temperature[diagram.temperature.length-1];
            d1 = diagram.data[numOfDataObj].density[diagram.temperature.length-2];
            d2 = diagram.data[numOfDataObj].density[diagram.temperature.length-1];
          }else if(temperature >= diagram.temperature[i] && temperature < diagram.temperature[i+1]){
            t1 = diagram.temperature[i];
            t2 = diagram.temperature[i+1];
            d1 = diagram.data[numOfDataObj].density[i];
            d2 = diagram.data[numOfDataObj].density[i+1];
          }else{
            //console.error(`${diagram.temperature[i]} -- ${diagram.temperature[i+1]} wtf`);
          }
        };
        console.group(`That was set`);
        console.log(`t1 = ${t1}, t2 = ${t2}`);
        console.log(`d1 = ${d1}, d2 = ${d2}`);
        console.groupEnd(`That was set`);
      }

      result = interpolate.line({
        x: temperature,
        x1: t1,
        y1: d1,
        x2: t2,
        y2: d2
      });

      return result;
    }
  }
})();

export default Density;
