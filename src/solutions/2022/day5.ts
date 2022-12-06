import * as _ from 'lodash';

export const day5 = (arrayOfData: string[]) => {
  const columnIdentifiersIndex = arrayOfData.findIndex(line => line[1] === '1');

  const columnIdentifiers = _.compact(
    arrayOfData[columnIdentifiersIndex].split(' ')
  );

  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  const stacks = [...Array(columnIdentifiers.length)].map(e => Array());

  for (let i = 0; i < columnIdentifiersIndex; i++) {
    for (let z = 0; z < columnIdentifiers.length; z++) {
      stacks[z].push(arrayOfData[i][1 + 4 * z]);
    }
  }

  const filteredStacks = stacks.map(array => {
    return array.filter(character => character !== ' ').reverse();
  });

  for (let i = columnIdentifiersIndex + 2; i < arrayOfData.length; i++) {
    const instructionArray = arrayOfData[i].split(' ');

    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    const intermediateStack = Array();
    for (let y = 0; y < parseInt(instructionArray[1]); y++) {
      intermediateStack.push(
        filteredStacks[parseInt(instructionArray[3]) - 1].pop()
      );
    }
    for (let x = 0; x < parseInt(instructionArray[1]); x++) {
      filteredStacks[parseInt(instructionArray[5]) - 1].push(
        intermediateStack.pop()
      );
    }
  }

  for (const array of filteredStacks) {
    console.log(array.pop());
  }
};
