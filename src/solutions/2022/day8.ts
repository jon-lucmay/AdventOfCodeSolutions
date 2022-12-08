export const day8 = (arrayOfData: string[]) => {
  arrayOfData.forEach(() => {});

  let total1 = 0;

  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  const scenicScores = [...Array(arrayOfData.length)].map(() => Array());

  const isVisible = (i: number, x: number) => {
    /*
      if (up, left visible till 0)
      if (right visibile till line.length)
      if (down visible till array.length)
    */
    const initI = i;
    const initX = x;

    const test = {left: true, right: true, down: true, up: true};

    let up = initI - 1;
    let left = initX - 1;
    let right = initX + 1;
    let down = initI + 1;

    while (up >= 0) {
      if (
        parseInt(arrayOfData[initI][initX]) <= parseInt(arrayOfData[up][initX])
      ) {
        test.up = false;
      } else {
        //console.log('up true');
      }

      up--;
    }

    while (left >= 0) {
      if (
        parseInt(arrayOfData[initI][initX]) <=
        parseInt(arrayOfData[initI][left])
      ) {
        test.left = false;
      } else {
        //console.log('left true');
      }

      left--;
    }

    while (right < arrayOfData[i].length) {
      if (
        parseInt(arrayOfData[initI][initX]) <=
        parseInt(arrayOfData[initI][right])
      ) {
        test.right = false;
      } else {
        //console.log('right true');
      }

      right++;
    }

    while (down < arrayOfData.length) {
      if (
        parseInt(arrayOfData[initI][initX]) <=
        parseInt(arrayOfData[down][initX])
      ) {
        test.down = false;
      } else {
        //console.log('down true');
      }

      down++;
    }

    return test;
  };

  const scenicScore = (i: number, x: number) => {
    /*
      if (up, left visible till 0)
      if (right visibile till line.length)
      if (down visible till array.length)
    */
    const initI = i;
    const initX = x;

    const test = {left: 0, right: 0, down: 0, up: 0};

    let up = initI - 1;
    let left = initX - 1;
    let right = initX + 1;
    let down = initI + 1;

    while (up >= 0) {
      if (
        parseInt(arrayOfData[initI][initX]) <= parseInt(arrayOfData[up][initX])
      ) {
        test.up += 1;
        break;
      } else {
        test.up += 1;
        //console.log('up true');
      }

      up--;
    }

    while (left >= 0) {
      if (
        parseInt(arrayOfData[initI][initX]) <=
        parseInt(arrayOfData[initI][left])
      ) {
        test.left += 1;
        break;
      } else {
        test.left += 1;
        //console.log('left true');
      }

      left--;
    }

    while (right < arrayOfData[i].length) {
      if (
        parseInt(arrayOfData[initI][initX]) <=
        parseInt(arrayOfData[initI][right])
      ) {
        test.right += 1;
        break;
      } else {
        test.right += 1;
        //console.log('right true');
      }

      right++;
    }

    while (down < arrayOfData.length) {
      if (
        parseInt(arrayOfData[initI][initX]) <=
        parseInt(arrayOfData[down][initX])
      ) {
        test.down += 1;
        break;
      } else {
        test.down += 1;
        //console.log('down true');
      }

      down++;
    }

    return test;
  };

  for (let i = 0; i < arrayOfData.length; i++) {
    for (let x = 0; x < arrayOfData[i].length; x++) {
      if (
        i === 0 ||
        i === arrayOfData.length - 1 ||
        x === 0 ||
        x === arrayOfData[i].length - 1
      ) {
        continue;
      }
      const result = isVisible(i, x);

      if (Object.values(result).indexOf(true) > -1) {
        //console.log(i, x);
        //console.log(result);
        total1++;
      }
    }
  }

  for (let i = 0; i < arrayOfData.length; i++) {
    for (let x = 0; x < arrayOfData[i].length; x++) {
      if (
        i === 0 ||
        i === arrayOfData.length - 1 ||
        x === 0 ||
        x === arrayOfData[i].length - 1
      ) {
        continue;
      }
      const result = scenicScore(i, x);
      scenicScores[i][x] = result.down * result.up * result.left * result.right;
    }
  }

  scenicScores.shift();
  scenicScores.pop();

  scenicScores.forEach(line => {
    if (line[0] === undefined) {
      line.shift();
    }
  });
  scenicScores.forEach(line => {
    line.sort((a, b) => a - b);
    line.reverse();
  });

  scenicScores.sort((a, b) => a[0] - b[0]).reverse();

  console.log(
    'part1: ' +
      (total1 + arrayOfData.length * 2 + arrayOfData[0].length * 2 - 4)
  );

  console.log('part2: ' + scenicScores[0][0]);
};
