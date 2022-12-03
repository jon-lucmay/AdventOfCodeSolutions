export const intcodeComputer = (numberArray: number[]): number[] => {
  for (let i = 0; i < numberArray.length; i++) {
    switch (numberArray[i]) {
      case 1:
        numberArray[numberArray[i + 3]] =
          numberArray[numberArray[i + 1]] + numberArray[numberArray[i + 2]];
        i += 3;
        break;
      case 2:
        numberArray[numberArray[i + 3]] =
          numberArray[numberArray[i + 1]] * numberArray[numberArray[i + 2]];
        i += 3;
        break;
      case 99:
        i = numberArray.length;
        break;
      default:
        console.log(i, numberArray[i]);
        throw new Error('Unknown opcode');
    }
  }
  return numberArray;
};
