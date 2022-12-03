export const day1 = (arrayOfData: string[]) => {
  const totals: number[] = [];

  let tempTotal = 0;

  arrayOfData.forEach(val => {
    const number = Number(val);

    if (number === 0) {
      totals.push(tempTotal);
      tempTotal = 0;
    } else {
      tempTotal += number;
    }
  });
  totals.sort((a: number, b: number) => b - a);
  console.log('day 1, part1: ' + totals[0]);
  console.log('day 1, part2: ' + (totals[0] + totals[1] + totals[2]));
};
