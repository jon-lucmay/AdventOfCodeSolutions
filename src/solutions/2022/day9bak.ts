export const day9 = (arrayOfData: string[]) => {
  let maxPossibleHeight = 0;
  let maxPossibleWidth = 0;

  let maxR = 0;
  let maxL = 0;
  let maxU = 0;
  let maxD = 0;

  arrayOfData.forEach(values => {
    if (values[0] === 'U') {
      maxU += parseInt(values[2]);
    }

    if (values[0] === 'R') {
      maxR += parseInt(values[2]);
    }

    if (values[0] === 'D') {
      maxD += parseInt(values[2]);
    }

    if (values[0] === 'L') {
      maxL += parseInt(values[2]);
    }

    maxPossibleWidth = Math.max(maxR, maxL);
    maxPossibleHeight = Math.max(maxU, maxD);
  });

  const array2d = [...Array(maxPossibleHeight * 2)].map(() =>
    [...Array(maxPossibleWidth * 2)].map(() => 0)
  );
  // [y, x]]
  const start = [maxPossibleHeight, maxPossibleWidth];

  array2d[maxPossibleHeight][maxPossibleWidth] = 1;

  let headPos = [...start];
  let tailPos = [...start];

  arrayOfData.forEach(line => {
    for (let i = parseInt(line[2]); i > 0; i--) {
      const initTailPos = [...tailPos];
      const initHeadPos = [...headPos];

      switch (line[0]) {
        case 'U':
          headPos = [headPos[0] - 1, headPos[1]];
          break;
        case 'D':
          headPos = [headPos[0] + 1, headPos[1]];
          break;
        case 'R':
          headPos = [headPos[0], headPos[1] + 1];
          break;
        case 'L':
          headPos = [headPos[0], headPos[1] - 1];
          break;
        default:
          throw new Error('Bad line! ' + JSON.stringify(line));
      }

      const xDifference = headPos[1] - tailPos[1];
      const yDifference = headPos[0] - tailPos[0];

      if (Math.abs(xDifference) > 1) {
        tailPos = [...initHeadPos];
      }
      if (Math.abs(yDifference) > 1) {
        tailPos = [...initHeadPos];
      }

      console.log(headPos);
      console.log(tailPos);

      if (initTailPos !== tailPos) {
        array2d[tailPos[0]][tailPos[1]] = 1;
      }
    }
  });

  const total1 = array2d.reduce(
    (subtotal, numberArray) =>
      subtotal +
      numberArray.reduce((tempTotal, number) => tempTotal + number, 0),
    0
  );

  // console.log(array2d);
  console.log('part1: ' + total1);
};
