export const day6 = (arrayOfData: string[]) => {
  let answer1 = 0;
  let answer2 = 0;
  for (const line of arrayOfData) {
    for (let i = 0; i < line.length; i++) {
      if ((line[i + 1] + line[i + 2] + line[i + 3]).includes(line[i])) {
        continue;
      } else if ((line[i + 2] + line[i + 3]).includes(line[i + 1])) {
        continue;
      } else if (line[i + 2] === line[i + 3]) {
        continue;
      } else {
        answer1 = i + 4;
        break;
      }
    }

    for (let i = 0; i < line.length; i++) {
      const set = new Set(line.slice(i, i + 14).split(''));
      if (set.size === 14) {
        answer2 = i + 14;
        break;
      }
    }
  }

  console.log('part1: ' + answer1);
  console.log('part2: ' + answer2);
};
