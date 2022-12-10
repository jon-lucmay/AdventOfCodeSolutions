export const day10 = (arrayOfData: string[]) => {
  let total1 = 0;

  let x = 1;

  let clock = 0;

  const screen: string[][] = [];

  screen.push([]);

  const addx = (value: number) => {
    clock++;
    readSignal();
    clock++;
    readSignal();
    x += value;
  };

  const noop = () => {
    clock++;
    readSignal();
  };

  const readSignal = () => {
    if (clock === 20) {
      total1 += x * clock;
    } else if ((clock - 20) % 40 === 0) {
      total1 += x * clock;
    }

    const crtLine = Math.floor((clock - 1) / 40);

    if (screen.length <= crtLine) {
      screen.push([]);
    }

    if ([x, x + 1, x + 2].find(value => value === clock - 40 * crtLine)) {
      screen[crtLine].push('#');
    } else {
      screen[crtLine].push('.');
    }
  };

  arrayOfData.forEach(line => {
    const splitLine = line.split(' ');

    const command = splitLine[0];
    const value = parseInt(splitLine[1]);

    switch (command) {
      case 'noop':
        noop();
        break;
      case 'addx':
        addx(value);
        break;

      default:
        throw new Error('Bad Line');
    }
  });

  console.log('part1: ' + total1);
  console.log('part2: ');
  screen.forEach(line => console.log(line.join('')));
};
