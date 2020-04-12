export const removeArrayElement = (array, id) => {
  const obj = [...array];
  const index = obj.indexOf(id);
  obj.splice(index, 1);
  return obj;
};
