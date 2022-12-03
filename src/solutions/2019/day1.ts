export const day1 = (arrayOfData: string[]) => {
  let total = 0;
  let total2 = 0;

  arrayOfData.pop();

  const calculateFuel = (weight: number) => {
    return Math.floor(weight / 3) - 2;
  };

  arrayOfData.forEach(module => {
    total += calculateFuel(parseInt(module));
  });

  const addFuelsFuel = (fuel: number) => {
    const additionalFuel = calculateFuel(fuel);
    console.log(additionalFuel);

    if (additionalFuel > 0) {
      total2 += additionalFuel;
      addFuelsFuel(additionalFuel);
    }
  };

  arrayOfData.forEach(module => {
    const moduleFuel = calculateFuel(parseInt(module));
    total2 += moduleFuel;
    addFuelsFuel(moduleFuel);
  });

  console.log('part1: ' + total);
  console.log('part2: ' + total2);
};
