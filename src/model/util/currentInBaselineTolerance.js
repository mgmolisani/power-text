const currentReadingInTolerance = (currentReading, baseline) => {
  const upperBound = baseline + baseline * 0.05;
  return currentReading <= upperBound;
};

module.exports = (currentReadings, baseline) => {
  return currentReadings.every(currentReading =>
    currentReadingInTolerance(currentReading, baseline)
  );
};
