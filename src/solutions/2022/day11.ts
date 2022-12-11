export const day11 = (arrayOfData: string[]) => {
  class Monkey {
    items: number[];
    operation: (item: number) => number;
    test: (item: number) => void;
    inspections: number;

    constructor(
      items: number[],
      operation: (item: number) => number,
      test: (item: number) => void
    ) {
      this.items = items;
      this.operation = operation;
      this.test = test;
      this.inspections = 0;
    }
  }

  const monkeysRaw: string[][] = [];

  let currentMonkey = 0;

  arrayOfData.forEach(line => {
    if (monkeysRaw.length <= currentMonkey) {
      monkeysRaw.push([]);
    }
    monkeysRaw[currentMonkey].push(line);

    if (line.trim() === '') {
      monkeysRaw[currentMonkey].pop();
      currentMonkey++;
    }
  });

  const monkeys: Monkey[] = [];

  const denominators: number[] = [];

  monkeysRaw.forEach(monkey => {
    const testDivisor = parseInt(monkey[3].split(' ')[5]);

    const opFactor = parseInt(monkey[2].split(' ')[7]);
    const opSymbol = monkey[2].split(' ')[6];

    const trueMonkeyIndex = parseInt(monkey[4].split(' ')[9]);
    const falseMonkeyIndex = parseInt(monkey[5].split(' ')[9]);

    denominators.push(testDivisor);

    monkeys.push(
      new Monkey(
        monkey[1]
          .split(' ')
          .slice(4)
          .map(string => string.replace(',', ''))
          .map(Number),
        (item: number) => {
          if (opSymbol === '*') {
            if (isNaN(opFactor)) {
              return Math.floor((item * item) / 3);
            } else {
              return Math.floor((item * opFactor) / 3);
            }
          } else {
            return Math.floor((item + opFactor) / 3);
          }
        },
        (item: number) => {
          if (item % testDivisor === 0) {
            monkeys[trueMonkeyIndex].items.push(item);
          } else {
            monkeys[falseMonkeyIndex].items.push(item);
          }
        }
      )
    );
  });

  for (let i = 0; i < 20; i++) {
    monkeys.forEach(monkey => {
      const itemLength = monkey.items.length;
      for (let i = 0; i < itemLength; i++) {
        const currentItem = monkey.items.shift();
        if (currentItem) {
          const inspectedItem = monkey.operation(currentItem);
          monkey.test(inspectedItem);
          monkey.inspections++;
        }
      }
    });
  }

  const monkeyBusiness: number[] = [];

  monkeys.forEach(monkey => {
    monkeyBusiness.push(monkey.inspections);
  });

  monkeyBusiness.sort((a, b) => a - b);

  console.log(
    monkeyBusiness
      .slice(-2)
      .reduce((accumulator, currentValue) => accumulator * currentValue)
  );

  const lowestCommonDenominator = denominators.reduce(
    (accumulator, currentValue) => accumulator * currentValue
  );

  // Part 2

  const monkeys2: Monkey[] = [];

  monkeysRaw.forEach(monkey => {
    const testDivisor = parseInt(monkey[3].split(' ')[5]);

    const opFactor = parseInt(monkey[2].split(' ')[7]);
    const opSymbol = monkey[2].split(' ')[6];

    const trueMonkeyIndex = parseInt(monkey[4].split(' ')[9]);
    const falseMonkeyIndex = parseInt(monkey[5].split(' ')[9]);

    monkeys2.push(
      new Monkey(
        monkey[1]
          .split(' ')
          .slice(4)
          .map(string => string.replace(',', ''))
          .map(Number),
        (item: number) => {
          if (opSymbol === '*') {
            if (isNaN(opFactor)) {
              return (item * item) % lowestCommonDenominator;
            } else {
              return (item * opFactor) % lowestCommonDenominator;
            }
          } else {
            return (item + opFactor) % lowestCommonDenominator;
          }
        },
        (item: number) => {
          if (item % testDivisor === 0) {
            monkeys2[trueMonkeyIndex].items.push(item);
          } else {
            monkeys2[falseMonkeyIndex].items.push(item);
          }
        }
      )
    );
  });

  for (let i = 0; i < 10000; i++) {
    monkeys2.forEach(monkey => {
      const itemLength = monkey.items.length;
      for (let i = 0; i < itemLength; i++) {
        const currentItem = monkey.items.shift();
        if (currentItem) {
          const inspectedItem = monkey.operation(currentItem);
          monkey.test(inspectedItem);
          monkey.inspections++;
        }
      }
    });
  }

  const monkeyBusiness2: number[] = [];

  monkeys2.forEach(monkey => {
    monkeyBusiness2.push(monkey.inspections);
  });

  monkeyBusiness2.sort((a, b) => a - b);

  console.log(
    monkeyBusiness2
      .slice(-2)
      .reduce((accumulator, currentValue) => accumulator * currentValue)
  );
};
