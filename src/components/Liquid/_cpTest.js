import interpolate from '../interpolate';

// created by zh_

var the_data = [
  [ 0.0,   0.0,  10.0,  20.0],
  [12.2, 3.977, 3.998, 4.019],
  [16.0, 3.894, 3.915, 3.936],
  [19.8, 3.852, 3.873, 3.894]
];

function calculateCp (t, pc, dataArray)
{
  /*
    TODO:
      - [ ] проверка на допустимый диапазон t
      - [ ] проверка на допустимый диапазон pc
  */

  var i1, i2;
  var j1, j2;

  for (i2 = 1; dataArray[i2][0] < pc; i2++);
  i1 = i2 - 1;

  for (j2 = 1; dataArray[0][j2] < t; j2++);
  j1 = j2 - 1;

  var cP = interpolate.biLine ({x: t,
                    y: pc,
                    x1: dataArray[0][j1],
                    y1: dataArray[i1][0],
                    x2: dataArray[0][j2],
                    y2: dataArray[i2][0],
                    q11: dataArray[i1][j1],
                    q12: dataArray[i1][j2],
                    q21: dataArray[i2][j1],
                    q22: dataArray[i2][j2]
                  })
  return (cP);
}

function getCpTest (t, pc)
{
  var f = calculateCp (t, pc, the_data);
  return (f);
}

export default getCpTest;
