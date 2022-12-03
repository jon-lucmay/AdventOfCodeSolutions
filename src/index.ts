import {stdin, stdout} from 'process';
import * as readline from 'readline';
import * as dotenv from 'dotenv';
import {solutions} from './solutions/solutions';
import {getData} from './DataHandling/DataCacheing';

dotenv.config();
/*
  expected .env vars
  COOKIE = Advent of Code session cookie as a string. ex: "3131646134634136532"
  YEAR = the year of puzzles that you want to run, as a string. ex: "2022"
*/

const main = async () => {
  const readlineInterface = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  const whatDay = (): Promise<string> => {
    return new Promise(resolve => {
      readlineInterface.question('What day should we run?: ', day => {
        resolve(day);
      });
    });
  };

  const shouldUseTestData = (): Promise<boolean> => {
    return new Promise(resolve => {
      readlineInterface.question(
        'Should we use test data? [y,n]: ',
        useTestData => {
          resolve(useTestData.toUpperCase() === 'Y' ? true : false);
        }
      );
    });
  };
  const day = await whatDay();

  const useTestData = await shouldUseTestData();

  const data = await getData(parseInt(day), useTestData);

  if (data) {
    solutions[process.env.YEAR as string][parseInt(day) - 1](data);
  } else {
    console.error('no data');
  }

  readlineInterface.close();
};

main();

// TODO Send data to server
