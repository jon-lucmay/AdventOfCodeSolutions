export const fetchData = async (day: number) => {
  try {
    const response = await fetch(
      `https://adventofcode.com/${
        process.env.YEAR
      }/day/${day.toString()}/input`,
      {
        headers: {
          cookie: 'session=' + process.env.COOKIE,
          'User-Agent':
            'https://github.com/jon-lucmay/AdventOfCodeSolutions by jon-luc.may@bestbuy.com',
        },
      }
    );

    if (response.status !== 200) {
      throw new Error('Bad response');
    }

    return await response.text();
  } catch (e) {
    console.error('Failed to get data from AOC site.');
    return null;
  }
};
