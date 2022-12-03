export const day3 = (arrayOfData: string[]) => {
  let total = 0;
  let total2 = 0;

  const testLower = new RegExp('^[a-z]$');
  arrayOfData.forEach(rucksack => {
    const compartmentOne = rucksack.slice(0, rucksack.length / 2);
    const compartmentTwo = rucksack.slice(rucksack.length / 2);

    const compartmentOneArray = Array.from(compartmentOne);
    const compartmentTwoArray = Array.from(compartmentTwo);

    const sharedItems: Set<string> = new Set();

    compartmentOneArray.forEach(item => {
      if (compartmentTwoArray.includes(item)) {
        sharedItems.add(item);
      }
    });

    sharedItems.forEach(value => {
      if (value) {
        if (testLower.test(value)) {
          total += value.charCodeAt(0) - 96;
        } else {
          total += value.charCodeAt(0) - 38;
        }
      }
    });
  });

  for (let i = 1; i <= arrayOfData.length; i++) {
    if (i % 3 === 0) {
      new Set(arrayOfData[i - 1].split('')).forEach(character => {
        if (
          new Set(arrayOfData[i - 2].split('')).has(character) &&
          new Set(arrayOfData[i - 3].split('')).has(character)
        ) {
          if (testLower.test(character)) {
            total2 += character.charCodeAt(0) - 96;
          } else {
            total2 += character.charCodeAt(0) - 38;
          }
        }
      });
    }
  }

  console.log('part1: ' + total);
  console.log('part2: ' + total2);
};
