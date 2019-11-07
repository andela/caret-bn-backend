export default array => {
  const result = [];
  const map = new Map();

  array.forEach(value => {
    if (!map.has(value.id)) {
      map.set(value.id, true);
      result.push(value);
    }
  });

  return result;
};
