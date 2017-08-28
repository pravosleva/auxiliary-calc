import interpolate from '../interpolate';
//console.log(interpolate.line({x:0.5, x1:0, y1:1, x2:1, y2:2}));

let LiquidParameters = (function() {
  return {
    cp(obj){// Should be as function by liquidType & percentage & temp...
      let { liquidType, percentage, temperature } = obj,
        dataObj,
        result;// kJ/kg.K
      switch(liquidType){
        case 'MEG':
          result = 2.4;// tmp value (+20 C)
          dataObj = [
            {
              percentage: 4.6,
              temperatureDataObj: [
                { temperature: 50, cp: 4.145 },
                { temperature: 20, cp: 4.145 },
                { temperature: 10, cp: 4.124 },
                { temperature: 0, cp: 4.103 },
              ]
            },
            {
              percentage: 46.4,
              temperatureDataObj: [
                { temperature: 50, cp: 3.517 },
                { temperature: 20, cp: 3.391 },
                { temperature: 0, cp: 3.349 },
                { temperature: -10, cp: 3.308 },
                { temperature: -15, cp: 3.287 },
                { temperature: -20, cp: 3.266 },
                { temperature: -25, cp: 3.245 },
                { temperature: -30, cp: 3.224 },
              ]
            }
          ];

          //...
          break;
        case 'MPG':
          result = 3.7;// tmp value (+20 C 37 %)

          //...
          break;
        default:// WATER
          result = 4.19;

          dataObj = [
            {
              percentage: 0,
              temperatureDataObj: [
                { temperature: 20, cp: 4.19 },
                { temperature: 0, cp: 4.18 },// need to change
              ]
            },
            {
              percentage: 100,
              temperatureDataObj: [
                { temperature: 20, cp: 4.19 },
                { temperature: 0, cp: 4.18 },// need to change
              ]
            }
          ];

          //...
          break;
      }
      /*
      if(percentage < dataObj[0].percentage){
        result = dataObj[0].temperatureDataObj[dataObj[0].temperatureDataObj.length-1].cp;// lowest value
      }else if(percentage >= dataObj[0].percentage && percentage <= dataObj[dataObj.length-1].percentage){
        dataObj.reduce(function(ePrevious, eCurrent, i, a){
          console.log(ePrevious, eCurrent);
          // Это выполнится для всех элементов кроме первого
          if(ePrevious.percentage <= percentage && percentage <= eCurrent.percentage){
            p1 = ePrevious.percentage;
            p2 = eCurrent.percentage;
            t1DataObj = ePrevious.temperatureDataObj;
            t2DataObj = eCurrent.temperatureDataObj;

            if(temperature < t1DataObj[t1DataObj.length-1].temperature){
              result = t1DataObj[t1DataObj.length-1].cp;// lowest value
            }else if(temperature >= t1DataObj[t1DataObj.length-1].temperature && temperature <= t2DataObj[0].temperature){
              result = ;
            }else if(temperature > t2DataObj[0].temperature){
              result = t2DataObj[0].cp;// highest value
            }else{

            }

            t1 = ePrevious.freezingTemperature;
            t2 = eCurrent.freezingTemperature;
          }
          return ePrevious;
        });
        //result =
      }else if(percentage > dataObj[dataObj.length-1].percentage){
        result = dataObj[dataObj.length-1].temperatureDataObj[dataObj[dataObj.length-1].temperatureDataObj.length-1].cp;// lowest value
      }else{}
      */
      return { result };
    },
    freezingTemperature(obj){
      // This function created to get freezingTemperature by Liquid type & %
      let { liquidType, percentage } = obj,
        dataObj = [],
        result,
        p1, p2, f1, f2;
      switch(liquidType){
        case 'MEG':
          dataObj = [
            { percentage: 30, freezingTemperature: -15 },
            { percentage: 35, freezingTemperature: -20 },
            { percentage: 40, freezingTemperature: -25 },
            { percentage: 45, freezingTemperature: -30 },
            { percentage: 50, freezingTemperature: -35 },
            { percentage: 55, freezingTemperature: -43 },
            { percentage: 60, freezingTemperature: -50 },
            { percentage: 65, freezingTemperature: -60 },
            { percentage: 70, freezingTemperature: -70 },
          ];
          break;
        case 'MPG':
          dataObj = [
            { percentage: 30, freezingTemperature: -13 },
            { percentage: 35, freezingTemperature: -20 },
            { percentage: 40, freezingTemperature: -25 },
            { percentage: 45, freezingTemperature: -30 },
            { percentage: 50, freezingTemperature: -35 },
            { percentage: 55, freezingTemperature: -45 },
            { percentage: 60, freezingTemperature: -55 },
            { percentage: 65, freezingTemperature: -60 },
            { percentage: 70, freezingTemperature: -65 },
          ];
          break;
        default:// WATER
          dataObj = [
            { percentage: 0, freezingTemperature: 0 },
            { percentage: 100, freezingTemperature: 0 },
          ];
          break;
      }

      if(percentage < dataObj[0].percentage){
        result = interpolate.line({
          x: percentage,
          x1: 0,
          y1: 0,
          x2: dataObj[0].percentage,
          y2: dataObj[0].freezingTemperature
        });
      }else if(percentage >= dataObj[0].percentage && percentage <= dataObj[dataObj.length-1].percentage){
        dataObj.reduce(function(ePrevious, eCurrent, i, a){
          console.log(ePrevious, eCurrent);
          // Это выполнится для всех элементов кроме первого
          if(ePrevious.percentage <= percentage && percentage <= eCurrent.percentage){
            p1 = ePrevious.percentage;
            p2 = eCurrent.percentage;
            f1 = ePrevious.freezingTemperature;
            f2 = eCurrent.freezingTemperature;
          }
          return ePrevious;
        });
        result = interpolate.line({
          x: percentage,
          x1: p1,
          y1: f1,
          x2: p2,
          y2: f2
        });
      }else if(percentage > dataObj[dataObj.length-1].percentage){
        result = 0;
      }else{/* imposible */}
      return result;
    },
    density(obj){
      let diagram = {}, result, t1, t2, numOfDataObj, d1, d2,
        { liquidType, temperature, percentage } = obj,
        error = false, report = 'Ok';
      //console.log(`${liquidType} t=${temperature} %=${percentage}`);
      //console.log(obj);
      switch(liquidType){
        case 'MEG':
          diagram.percentage = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
          diagram.temperature = [-45, -40, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
          diagram.data = [
            {// 10%
              percentage: 10,
              range: { tMin: -10, tMax: 100 },
              density: [0, 0, 0, 0, 0, 0, 0, 1017, 1016, 1015, 1014, 1013, 1012, 1011, 1009, 1007, 1006, 1004, 1002, 999, 996, 994, 991, 988, 986, 983, 979, 976, 973, 969]
            },
            {// 20%
              percentage: 20,
              range: { tMin: -10, tMax: 100 },
              density: [0, 0, 0, 0, 0, 0, 0, 1320, 1310, 1030, 1029, 1027, 1026, 1024, 1022, 1021, 1019, 1017, 1014, 1012, 1009, 1006, 1003, 1000, 997, 994, 990, 987, 983, 980]
            },
            {// 30%
              percentage: 30,
              range: { tMin: -10, tMax: 100 },
              density: [0, 0, 0, 0, 0, 0, 0, 1048, 1047, 1046, 1044, 1042, 1041, 1038, 1036, 1034, 1032, 1029, 1026, 1023, 1021, 1018, 1014, 1011, 1008, 1005, 1001, 997, 993, 990]
            },
            {// 40%
              percentage: 40,
              range: { tMin: -25, tMax: 100 },
              density: [0, 0, 0, 0, 1068, 1067, 1066, 1064, 1062, 1061, 1059, 1056, 1054, 1052, 1050, 1047, 1045, 1041, 1038, 1035, 1032, 1029, 1026, 1023, 1019, 1016, 1012, 1009, 1005, 1000]
            },
            {// 50%
              percentage: 50,
              range: { tMin: -35, tMax: 100 },
              density: [0, 0, 1087, 1086, 1085, 1083, 1081, 1079, 1077, 1075, 1073, 1070, 1067, 1064, 1061, 1058, 1055, 1052, 1049, 1046, 1043, 1040, 1037, 1034, 1029, 1026, 1022, 1018, 1014, 1010]
            },
            {// 60%
              percentage: 60,
              range: { tMin: -45, tMax: 100 },
              density: [1110, 1108, 1105, 1103, 1101, 1098, 1096, 1094, 1091, 1088, 1085, 1083, 1080, 1077, 1074, 1071, 1067, 1064, 1060, 1057, 1054, 1051, 1047, 1044, 1040, 1036, 1032, 1028, 1024, 1020]
            },
            {// 70%
              percentage: 70,
              range: { tMin: -45, tMax: 100 },
              density: [1125, 1122, 1120, 1118, 1115, 1112, 1109, 1107, 1104, 1101, 1097, 1094, 1091, 1088, 1084, 1081, 1078, 1074, 1071, 1067, 1064, 1060, 1057, 1053, 1050, 1046, 1042, 1038, 1034, 1030]
            },
            {// 80%
              percentage: 80,
              range: { tMin: -45, tMax: 100 },
              density: [1137, 1134, 1131, 1129, 1126, 1123, 1120, 1117, 1114, 1111, 1108, 1105, 1102, 1098, 1094, 1091, 1087, 1084, 1081, 1077, 1073, 1069, 1065, 1062, 1058, 1054, 1050, 1046, 1043, 1040]
            },
            {// 90%
              percentage: 90,
              range: { tMin: -20, tMax: 100 },
              density: [0, 0, 0, 0, 0, 1133, 1130, 1127, 1123, 1120, 1160, 1113, 1100, 1106, 1102, 1099, 1096, 1093, 1089, 1085, 1082, 1078, 1074, 1070, 1066, 1063, 1059, 1055, 1051, 1047]
            },
            {// 100%
              percentage: 100,
              range: { tMin: -15, tMax: 100 },
              density: [0, 0, 0, 0, 0, 0, 1137, 1134, 1131, 1127, 1124, 1120, 1117, 1113, 1110, 1106, 1103, 1099, 1096, 1093, 1089, 1085, 1081, 1078, 1074, 1070, 1067, 1063, 1059, 1055]
            },
          ];
          /*
          console.group(`Test`);
          console.log(diagram.temperature.length);
          diagram.data.map((e, i)=>{ console.log(`For ${diagram.percentage[i]}%: ${diagram.data[i].density.length} elements`) });
          console.groupEnd(`Test`);
          */
          break;
        case 'MPG':
          diagram.percentage = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
          diagram.temperature = [-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25];
          diagram.data = [
            {// 10%
              percentage: 10,
              range: { tMin: -5, tMax: 25 },
              density: [0, 0, 0, 0, 0, 1010, 1009, 1008, 1008, 1008, 1006, 1004]
            },
            {// 20%
              percentage: 20,
              range: { tMin: -15, tMax: 25 },
              density: [0, 0, 0, 1024, 1022, 1020, 1020, 1019, 1018, 1017, 1015, 1012]
            },
            {// 30%
              percentage: 30,
              range: { tMin: -10, tMax: 25 },
              density: [0, 0, 0, 0, 1038, 1035, 1033, 1031, 1030, 1026, 1023, 1020]
            },
            {// 40%
              percentage: 40,
              range: { tMin: -20, tMax: 25 },
              density: [0, 0, 1055, 1052, 1050, 1047, 1044, 1041, 1038, 1034, 1032, 1027]
            },
            {// 50%
              percentage: 50,
              range: { tMin: -20, tMax: 25 },
              density: [0, 0, 1064, 1061, 1058, 1055, 1052, 1048, 1044, 1042, 1039, 1032]
            },
            {// 60%
              percentage: 60,
              range: { tMin: -20, tMax: 25 },
              density: [0, 0, 1068, 1065, 1062, 1059, 1056, 1052, 1049, 1046, 1042, 1037]
            },
            {// 70%
              percentage: 70,
              range: { tMin: 5, tMax: 25 },
              density: [0, 0, 0, 0, 0, 0, 0, 1055, 1051, 1048, 1044, 1040]
            },
            {// 80%
              percentage: 80,
              range: { tMin: 5, tMax: 25 },
              density: [0, 0, 0, 0, 0, 0, 0, 1055, 1051, 1048, 1044, 1040]
            },
            {// 90%
              percentage: 90,
              range: { tMin: 5, tMax: 25 },
              density: [0, 0, 0, 0, 0, 0, 0, 1052, 1049, 1045, 1041, 1037]
            },
            {// 100%
              percentage: 100,
              range: { tMin: -30, tMax: 25 },
              density: [1073, 1069, 1065, 1062, 1059, 1055, 1051, 1047, 1044, 1040, 1037, 1033]
            },
          ];
          break;
        case 'WATER':
          diagram.percentage = [100, 100];// Need to have the range.
          diagram.temperature = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50];
          diagram.data = [
            {
              percentage: 100,
              range: { tMin: 0, tMax: 50 },
              density: [999.87, 999.97, 1000.0, 999.97, 999.88, 999.73, 999.53, 999.27, 998.97, 998.62, 998.23, 997.80, 997.33, 996.81, 996.26, 995.68, 995.06, 994.4, 993.72, 993.0, 992.25, 991.47, 990.7, 989.8, 989.0, 988.1]// For each temp value
            },
            {// Copyed.
              percentage: 100,
              range: { tMin: 0, tMax: 50 },
              density: [999.87, 999.97, 1000.0, 999.97, 999.88, 999.73, 999.53, 999.27, 998.97, 998.62, 998.23, 997.80, 997.33, 996.81, 996.26, 995.68, 995.06, 994.4, 993.72, 993.0, 992.25, 991.47, 990.7, 989.8, 989.0, 988.1]
            },
          ];
          break;
        default: break;
      };
      //console.log(diagram)

      // --- Should be refactored! numOfDataObj must die.

      // Out of percentage range:
      let p1, p2;
      if(
        (percentage < diagram.percentage[0]) ||
        (percentage > diagram.percentage[diagram.percentage.length-1])
      ){
        error = true;
        result = 1000;
        report = `Out of percentage range for ${percentage} %`;
      }else{
        // If =last then last range:
        numOfDataObj = diagram.percentage.findIndex(function(e, i, a){ return (percentage === e) });
        if(numOfDataObj===-1){
          report += `Not table percentage value`;
          // Попали в промежуток между 2-мя табличными значениями percentage...
          // Need to detect { diagram, error, result, report }
          if(
            (temperature < diagram.temperature[0]) ||
            (temperature > diagram.temperature[diagram.temperature.length-1])
          ){
            error = true;
            result = 1000;
            report += `Out of main temperature range for ${liquidType}`;
          }

          p1 = diagram.percentage.find(function(e, i, a){
            if( (percentage>=e && percentage<a[i+1]) ){
              p2 = a[i+1];
              return true;
            }else{ return false }
          });
          //error = true;
          let dataObj1 = diagram.data.find(function(e, i, a){
              let res;
              e.percentage===p1 ? res = true : res = false;
              return res;
            }),
            dataObj2 = diagram.data.find(function(e, i, a){
              let res;
              e.percentage===p2 ? res = true : res = false;
              return res;
            });
          let t1_index, t2_index;
          t1 = diagram.temperature.find(function(e, i, a){
            if( (temperature>=e && temperature<a[i+1]) ){
              t2 = a[i+1];
              t1_index = i;
              t2_index = i+1;
              return true;
            }else{ return false }
          });
          //console.log(t1, t2);
          d1 = dataObj1.density[t1_index];
          d2 = dataObj2.density[t2_index];
          //console.log(d1, d2);

          /*
            interpolate.biLine args: x, y, x1, y1, x2, y2, q11, q12, q21, q22
            For example: f(x1, y2) = q12
          */

          result = interpolate.biLine({
            x: temperature,
            y: percentage,
            x1: t1,
            y1: p1,
            x2: t2,
            y2: p2,
            q11: d1,
            q12: d1,
            q21: d2,
            q22: d2
          });
          report += ` / biLine interpolated between t1 = ${t1} and t2 = ${t2} & d1 = ${d1} and d2 = ${d2}`;
        }else{
          if(
            (temperature < diagram.temperature[0]) ||
            (temperature > diagram.temperature[diagram.temperature.length-1]) ||
            (temperature < diagram.data[numOfDataObj].range.tMin) ||
            (temperature > diagram.data[numOfDataObj].range.tMax)
          ){
            error = true;
            result = 1000;
            report = `Out of temperature range for ${liquidType} ${percentage} % / Temp value should be between ${diagram.data[numOfDataObj].range.tMin} & ${diagram.data[numOfDataObj].range.tMax} C`
          }

          if(error===false){
            // If =last then last range:
            //console.log(diagram.temperature[diagram.temperature.length-1])
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
              }
            }

            report += ` / line interpolated between t1 = ${t1} and t2 = ${t2} & d1 = ${d1} and d2 = ${d2}`;
            result = interpolate.line({
              x: temperature,
              x1: t1,
              y1: d1,
              x2: t2,
              y2: d2
            });
          }
        }
        console.group(`Local range`);
        console.table({
          temperature: `${t1} <> ${temperature} <> ${t2}`,
          density: `${d1} <> ${result} <> ${d2}`,
          percentage: `${p1} <> ${percentage} <> ${p2}`,
        });
        console.groupEnd(`Local range`);
      }

      // --- ---

      return { diagram, error, result, report };
    }
  }
})();

export default LiquidParameters;
