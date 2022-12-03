import {intcodeComputer} from './intcode';

export const day2 = (arrayOfData: string[]) => {
  arrayOfData.pop();

  arrayOfData = arrayOfData[0].split(',');

  const numberArray = arrayOfData.map(number => {
    return parseInt(number);
  });

  const initArray = Array.from(numberArray);

  numberArray[1] = 12;
  numberArray[2] = 2;

  const result = intcodeComputer(numberArray);

  console.log('part1: ' + result[0]);

  for (let noun = 0; noun <= 99; noun++)
    for (let verb = 0; verb <= 99; verb++) {
      const tempArray = Array.from(initArray);
      tempArray[1] = noun;
      tempArray[2] = verb;
      if (intcodeComputer(tempArray)[0] === 19690720) {
        console.log(100 * noun + verb);
      }
    }
};
