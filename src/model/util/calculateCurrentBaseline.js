module.exports = currentReadings => {
  if (currentReadings.length) {
    return (
      currentReadings.reduce((acc, val) => acc + val) / currentReadings.length
    );
  }
  throw new Error(`No current readings were provided.`);
};
