export const day9 = (arrayOfData: string[]) => {
  // [x,y]
  let headPos = [0, 0];
  let tailPos = [0, 0];

  const moreTailPos = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  const tailVisited = new Set();
  const longerRope = new Set();
  // NOTE: Set evaluates 2 identical arrays to be different...

  tailVisited.add([0, 0].toString());

  const calculateTailPos = (hPos: number[], tPos: number[]) => {
    const newTailPos = [...tPos];

    const xDifference = hPos[0] - tPos[0];
    const yDifference = hPos[1] - tPos[1];

    const absXDifference = Math.abs(xDifference);
    const absYDifference = Math.abs(yDifference);

    if (absXDifference > 1 || absYDifference > 1) {
      if (xDifference > 0) newTailPos[0]++;
      else if (xDifference < 0) newTailPos[0]--;
      if (yDifference > 0) newTailPos[1]++;
      else if (yDifference < 0) newTailPos[1]--;
    }

    return newTailPos;
  };

  arrayOfData.forEach(line => {
    const [direction, distanceString] = line.split(' ');
    const distance = parseInt(distanceString);

    for (let i = distance; i > 0; i--) {
      switch (direction) {
        case 'U':
          headPos = [headPos[0], headPos[1] + 1];
          break;
        case 'D':
          headPos = [headPos[0], headPos[1] - 1];
          break;
        case 'R':
          headPos = [headPos[0] + 1, headPos[1]];
          break;
        case 'L':
          headPos = [headPos[0] - 1, headPos[1]];
          break;
        default:
          throw new Error('Bad line');
      }

      //tail movement

      tailPos = calculateTailPos(headPos, tailPos);

      tailVisited.add(tailPos.toString());

      moreTailPos[0] = tailPos;

      for (let i = 1; i < moreTailPos.length; i++) {
        moreTailPos[i] = calculateTailPos(moreTailPos[i - 1], moreTailPos[i]);
      }

      longerRope.add(moreTailPos[moreTailPos.length - 1].toString());
    }
  });

  console.log('part1: ' + tailVisited.size);
  console.log('part2: ' + longerRope.size);
};
