import * as fs from 'fs';
import path from 'path';
import {fetchData} from './DataFetching';

export const getData = async (day: number): Promise<string[] | void> => {
  try {
    const rawData = await fs.promises.readFile(
      path.join(__dirname, '../input/day' + day),
      'utf8'
    );

    const arrayOfData = rawData.split('\n');

    return arrayOfData;
  } catch (e) {
    console.error(
      'Unable to retrieve input from file. Attempting to get from AOC site.'
    );
    const data = await fetchData(day);

    if (data) {
      if (!fs.existsSync(path.join(__dirname, '../input'))) {
        fs.mkdirSync(path.join(__dirname, '../input'));
      }

      fs.writeFile(
        path.join(__dirname, '../input/day') + day.toString(),
        data,
        err => {
          if (err) {
            console.error(err);
            throw new Error('Error writing to file');
          }
        }
      );
      return new Promise(resolve => {
        resolve(data.split('\n'));
      });
    } else {
      throw new Error('Failed to get input data from AOC site');
    }
  }
};
