export const day2 = (arrayOfData: string[]) => {
  let total = 0;
  let total2 = 0;
  /*
  A: Rock
  B: Paper
  C: Scissors

  X: Rock
  Y: Paper
  Z: Scissors
*/

  arrayOfData.forEach(pair => {
    const moves = pair.split('');
    switch (moves[0]) {
      case 'A':
        switch (moves[2]) {
          case 'X':
            total += 4;
            break;
          case 'Y':
            total += 8;
            break;
          case 'Z':
            total += 3;
            break;

          default:
            break;
        }
        break;
      case 'B':
        switch (moves[2]) {
          case 'X':
            total += 1;
            break;
          case 'Y':
            total += 5;
            break;
          case 'Z':
            total += 9;
            break;

          default:
            break;
        }
        break;
      case 'C':
        switch (moves[2]) {
          case 'X':
            total += 7;
            break;
          case 'Y':
            total += 2;
            break;
          case 'Z':
            total += 6;
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }
  });

  /*
  A: Rock
  B: Paper
  C: Scissors

  X: lose
  Y: draw
  Z: win
*/

  arrayOfData.forEach(pair => {
    const moves = pair.split('');
    switch (moves[0]) {
      case 'A':
        switch (moves[2]) {
          case 'X':
            total2 += 3;
            break;
          case 'Y':
            total2 += 4;
            break;
          case 'Z':
            total2 += 8;
            break;

          default:
            break;
        }
        break;
      case 'B':
        switch (moves[2]) {
          case 'X':
            total2 += 1;
            break;
          case 'Y':
            total2 += 5;
            break;
          case 'Z':
            total2 += 9;
            break;

          default:
            break;
        }
        break;
      case 'C':
        switch (moves[2]) {
          case 'X':
            total2 += 2;
            break;
          case 'Y':
            total2 += 6;
            break;
          case 'Z':
            total2 += 7;
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }
  });

  console.log('part1: ' + total);
  console.log('part2: ' + total2);
};
