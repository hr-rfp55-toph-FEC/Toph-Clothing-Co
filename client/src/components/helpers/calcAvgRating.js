const calcAvgRating = (ratings) => {
  if (!Object.keys(ratings).length) {
    return 0;
  }
  const weights = Object.keys(ratings);
  const rates = Object.values(ratings);
  let weightedSum = 0;
  let totalRates = 0;
  weights.forEach((weight, index) => {
    weightedSum += weight * rates[index];
    totalRates += Number(rates[index]);
  });
  return weightedSum / totalRates;
};

export default calcAvgRating;
