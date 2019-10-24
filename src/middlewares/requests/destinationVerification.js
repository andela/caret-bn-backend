const verify = destinations => new Promise(
  (resolve, reject) => Promise.all(
    destinations.map(destination => {
      if (destination.isFinal === true) {
        return true;
      }
    })
  ).then(res => {
    const len = destinations.length;
    const resultCount = res.filter(result => result === true);
    if (resultCount.length === 0) {
      reject(new Error('You need to set a destination as final.'));
    } else if (destinations[len - 1].isFinal !== true) {
      reject(new Error('You need to set your final destination as final.'));
    } else if (resultCount.length > 1) {
      reject(new Error('Cannot set multiple destinations as final.'));
    } else {
      resolve({
        flagError: false,
        flagMessage: ''
      });
    }
  })
);

module.exports = {
  verify
};
