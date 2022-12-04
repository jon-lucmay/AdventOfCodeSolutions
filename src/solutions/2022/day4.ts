export const day4 = (arrayOfData: string[]) => {
  let total = 0;
  let total2 = 0;

  const nestedElves = arrayOfData.map(elves =>
    elves.split(',').map(elf => elf.split('-').map(Number))
  );

  for (const elv of nestedElves) {
    if (
      (elv[0][0] >= elv[1][0] && elv[0][1] <= elv[1][1]) ||
      (elv[0][0] <= elv[1][0] && elv[0][1] >= elv[1][1])
    ) {
      total++;
    }

    if (
      (elv[0][0] >= elv[1][0] && elv[0][0] <= elv[1][1]) ||
      (elv[0][1] >= elv[1][0] && elv[0][1] <= elv[1][1]) ||
      (elv[1][1] >= elv[0][0] && elv[1][1] <= elv[0][1]) ||
      (elv[1][0] >= elv[0][0] && elv[1][0] <= elv[0][1])
    ) {
      total2++;
    }
  }

  console.log('part1: ' + total);
  console.log('part2: ' + total2);
};
