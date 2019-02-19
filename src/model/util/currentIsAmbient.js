const singleCurrentIsAmbient = (currentReading, baseline) => {
  const upperBound = baseline * 1.05;
  return currentReading <= upperBound;
};

module.exports = (currentReadings, baseline) => {
  return currentReadings.every(currentReading =>
    singleCurrentIsAmbient(currentReading, baseline)
  );
};
