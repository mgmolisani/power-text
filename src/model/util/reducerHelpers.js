const setProperty = (prevObject, entry) => {
  return {
    ...prevObject,
    ...entry,
  };
};

const deleteProperty = (prevObject, key) => {
  const newObject = {
    ...prevObject,
  };
  delete newObject[key];
  return newObject;
};

module.exports = {
  setProperty,
  deleteProperty,
};
