import * as days2022 from './2022/index';
import * as days2019 from './2019/index';

const solutionsFor2022 = [days2022.day1, days2022.day2, days2022.day3];
const solutionsFor2019 = [days2019.day1];

interface solutions {
  [index: string]: ((arrayOfData: string[]) => void)[];
}

export const solutions: solutions = {
  '2022': solutionsFor2022,
  '2019': solutionsFor2019,
};
