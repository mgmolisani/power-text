const setProperty = (object, key, value) => {
  return {
    ...object,
    [key]: value,
  };
};

const deleteProperty = (object, key) => {
  const newObject = {
    ...object,
  };
  delete newObject[key];
  return newObject;
};

module.exports = {
  setProperty,
  deleteProperty,
};
