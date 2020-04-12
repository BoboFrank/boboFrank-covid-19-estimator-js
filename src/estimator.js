/* eslint-disable linebreak-style */
const covid19ImpactEstimator = (data) => {
  class Data {
    constructor(est, num) {
      this.incomePop = est.region.avgDailyIncomePopulation;
      this.incomeMultiple = est.region.avgDailyIncomeInUSD * est.timeToElapse;
      this.factors = Math.trunc((2 ** Math.trunc((est.timeToElapse / 3))));
      this.currentlyInfected = Math.trunc((est.reportedCases * num));
      this.infectionsByRequestedTime = Math.trunc((this.currentlyInfected * this.factors));
      this.severeCasesByRequestedTime = Math.trunc((this.infectionsByRequestedTime * 0.15));
      this.hospitalBedsRequested = (est.totalHospitalBeds * 0.35) - this.severeCasesByRequestedTime;
      this.hospitalBedByRequestedTime = Math.trunc(this.hospitalBedsRequested);
      this.casesForICUByRequestedTime = Math.trunc(((this.infectionsByRequestedTime) * 0.05));
      this.casesForVentilatorsByRequestedTime = Math.trunc((this.infectionsByRequestedTime) * 0.02);
      // eslint-disable-next-line max-len
      this.dollarsInFlight = Math.trunc(this.infectionsByRequestedTime * this.incomePop * this.incomeMultiple);
    }
  }
  return {
    input: data,
    impact: new Data(data, 10),
    severeImpact: new Data(data, 50)
  };
};

export default covid19ImpactEstimator;

/* const estimate = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5.50,
    avgDailyIncomePopulation: 0.85
  },
  periodType: 'days',
  timeToElapse: 30,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
}; */
