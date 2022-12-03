import {day1} from './2022/day1';
import {day2} from './2022/day2';
import {day3} from './2022/day3';

const solutionsFor2022 = [day1, day2, day3];

interface solutions {
  [index: string]: ((arrayOfData: string[]) => void)[];
}

export const solutions: solutions = {'2022': solutionsFor2022};
