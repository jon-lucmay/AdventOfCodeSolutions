import {stdin, stdout} from 'process';
import * as readline from 'readline';
import * as dotenv from 'dotenv';
import {solutions} from './solutions/solutions';
import {getData} from './DataHandling/DataCacheing';

dotenv.config();

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
