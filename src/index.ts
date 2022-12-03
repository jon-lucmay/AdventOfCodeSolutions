import {stdin, stdout} from 'process';
import * as readline from 'readline';
import * as dotenv from 'dotenv';
import {day1} from './solutions/day1';
import {day2} from './solutions/day2';
import {day3} from './solutions/day3';
import {getData} from './utils/DataCacheing';

dotenv.config();

const main = async () => {
  const arrayOfSolutions = [day1, day2, day3];

  const readlineInterface = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  readlineInterface.question('What day would you like to run?: ', async day => {
    const data = await getData(parseInt(day));
    readlineInterface.close();

    if (data) {
      arrayOfSolutions[parseInt(day) - 1](data);
    } else {
      console.error('no data');
    }
  });
};

main();

// TODO Send data to server
