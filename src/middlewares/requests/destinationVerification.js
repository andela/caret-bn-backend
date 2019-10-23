const verify = destinations => {
  let FinalFlag = false;
  for (let counter = 0; counter < destinations.length; counter += 1) {
    if (counter > 0) {
      if (destinations[counter - 1].isFinal === true) {
        return {
          flagError: true,
          flagMessage: 'You are already set the previous destination as your final.'
        };
      }
    }
    FinalFlag = destinations[counter].isFinal;
  }

  if (!FinalFlag) {
    return {
      flagError: true,
      flagMessage: 'You need to set a destination as final.'
    };
  }

  return {
    flagError: false,
    flagMessage: ''
  };
};


module.exports = {
  verify
};
