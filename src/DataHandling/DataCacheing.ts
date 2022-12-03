import * as fs from 'fs';
import path from 'path';
import * as readline from 'readline';
import {stdin, stdout} from 'process';
import {fetchData} from './DataFetching';

export const getData = async (
  day: number,
  shouldUseTestData: boolean
): Promise<string[] | void> => {
  const year = process.env.YEAR;
  const dayString = day.toString();

  const newLine = '\n';

  const testInputPath = path.join(
    __dirname,
    `../testInput/${year}/day${dayString}`
  );
  const inputPath = path.join(__dirname, '../input');
  const solutionPath = path.join(__dirname, `../input/${year}/day${dayString}`);

  const getTestInput = (): Promise<string> => {
    const readlineInterface = readline.createInterface({
      input: stdin,
      output: stdout,
    });

    return new Promise(resolve => {
      let input = '';

      console.log(
        'No test data cached. Please paste test data followed by enter. Then press Ctrl + C'
      );
      readlineInterface.prompt();

      readlineInterface.on('line', data => {
        input += data + newLine;
      });

      readlineInterface.on('close', () => {
        resolve(input);
      });
    });
  };

  try {
    if (shouldUseTestData) {
      console.warn('Running with Test data!');
      if (fs.existsSync(testInputPath)) {
        const rawData = fs.promises.readFile(testInputPath, 'utf8');
        return (await rawData).split(newLine);
      } else {
        const newTestInput = await getTestInput();

        fs.writeFile(testInputPath, newTestInput, err => {
          if (err) {
            console.error(err);
            throw new Error('Error writing to testInput file');
          }
        });

        return newTestInput.split(newLine);
      }
    }
  } catch (e) {
    console.error('Failed while reading test data.');
    console.error('Please validate test input in: ' + testInputPath);
    throw e;
  }

  try {
    const rawData = await fs.promises.readFile(solutionPath, 'utf8');

    const arrayOfData = rawData.split(newLine);

    return arrayOfData;
  } catch (e) {
    console.error(
      'Unable to retrieve input from file. Attempting to get from AOC site.'
    );
    const data = await fetchData(day);

    if (data) {
      if (!fs.existsSync(inputPath)) {
        fs.mkdirSync(inputPath);
      }

      fs.writeFile(solutionPath, data, err => {
        if (err) {
          console.error(err);
          throw new Error('Error writing to file');
        }
      });
      return new Promise(resolve => {
        resolve(data.split(newLine));
      });
    } else {
      throw new Error('Failed to get input data from AOC site');
    }
  }
};
