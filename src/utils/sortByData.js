import { convertDataToMS } from 'utils/convertDataToMS';

export const sortByData = (array, col, type = 'asc') => {
  let sortArray = [];

  if (typeof array === 'object') {
    Object.keys(array).forEach(item => {
      sortArray.push(array[item]);
    });
  } else {
    sortArray = array;
  }

  sortArray =
    type === 'asc'
      ? sortArray.sort((a, b) =>
          convertDataToMS(a[col]) < convertDataToMS(b[col]) ? -1 : 0
        )
      : sortArray.sort((a, b) =>
          convertDataToMS(a[col]) > convertDataToMS(b[col]) ? -1 : 0
        );

  return sortArray.reduce((obj, item) => [...obj, item], []);
};
