/* eslint-disable linebreak-style */
// covid estimator app
const time = (info) => {
  let elapsedTime;
  const { periodType } = info;
  const { timeToElapse } = info;

  if (periodType === 'days') {
    elapsedTime = timeToElapse;
  } else if (info.periodType === 'weeks') {
    elapsedTime = timeToElapse * 7;
  } else {
    elapsedTime = timeToElapse * 30;
  }

  return elapsedTime;
};

const covid19ImpactEstimator = (data) => {
  class Data {
    constructor(est, num) {
      this.timeToElapse = time(est);
      this.incomePop = est.region.avgDailyIncomePopulation;
      this.incomeMultiple = est.region.avgDailyIncomeInUSD;
      this.factors = Math.trunc((2 ** Math.trunc((this.timeToElapse / 3))));
      this.currentlyInfected = Math.trunc((est.reportedCases * num));
      this.infectionsByRequestedTime = Math.trunc((this.currentlyInfected * this.factors));
      this.severeCasesByRequestedTime = Math.trunc((this.infectionsByRequestedTime * 0.15));
      this.hospitalBedsRequested = (est.totalHospitalBeds * 0.35) - this.severeCasesByRequestedTime;
      this.hospitalBedsByRequestedTime = Math.trunc(this.hospitalBedsRequested);
      this.casesForICUByRequestedTime = Math.trunc((this.infectionsByRequestedTime) * 0.05);
      this.casesForVentilatorsByRequestedTime = Math.trunc((this.infectionsByRequestedTime) * 0.02);
      // eslint-disable-next-line max-len
      this.dollarsInFlight = Math.trunc((this.infectionsByRequestedTime * this.incomePop * this.incomeMultiple) / this.timeToElapse);
    }
  }
  return {
    input: data,
    impact: new Data(data, 10),
    severeImpact: new Data(data, 50)
  };
};

export default covid19ImpactEstimator;
