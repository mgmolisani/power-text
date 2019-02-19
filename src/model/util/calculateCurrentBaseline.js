module.exports = currentReadings => {
  if (currentReadings.length) {
    return (
      currentReadings.reduce((acc, val) => acc + val) / currentReadings.length
    );
  }
};
