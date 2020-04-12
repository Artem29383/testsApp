export const removePropFromObject = (obj, id) => {
  const res = { ...obj };
  delete res[id];
  return res;
};
