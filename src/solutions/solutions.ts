import * as days2022 from './2022/index';

const solutionsFor2022 = [days2022.day1, days2022.day2, days2022.day3];

interface solutions {
  [index: string]: ((arrayOfData: string[]) => void)[];
}

export const solutions: solutions = {'2022': solutionsFor2022};
