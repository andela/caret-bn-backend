const dateValidator = (lesserDate, greaterDate) => {
  if (lesserDate > greaterDate) {
    return true;
  }

  return false;
};

export default dateValidator;
