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

  readlineInterface.question('What day would you like to run?: ', async day => {
    const data = await getData(parseInt(day));
    readlineInterface.close();

    if (data) {
      solutions[process.env.YEAR as string][parseInt(day) - 1](data);
    } else {
      console.error('no data');
    }
  });
};

main();

// TODO Send data to server
