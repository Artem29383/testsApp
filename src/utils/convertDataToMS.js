export const convertDataToMS = data => {
  const parseData = data.split('.');
  return Date.UTC(parseData[2], parseData[1], parseData[0]);
};
