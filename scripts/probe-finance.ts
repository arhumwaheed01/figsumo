import {
  payment,
  interestRateFromPayment,
  amortizationSchedule,
} from "../lib/calc/finance-core";
import { interestRateDetailResult } from "../lib/calc/loan-detail";

// calculator.net default: 32000, 3y 0m, payment 960
const rate = interestRateFromPayment(32000, 960, 3);
console.log(
  JSON.stringify(
    {
      calcNetDefaults: {
        amount: 32000,
        years: 3,
        payment: 960,
        ourRate: rate,
        totalPaid: 960 * 36,
        totalInterest: 960 * 36 - 32000,
      },
      mortgage400k65: payment(400000, 6.5, 30),
      roundTrip: (() => {
        const p = payment(30000, 7.5, 5);
        return { p, solved: interestRateFromPayment(30000, p, 5) };
      })(),
      scheduleEnd: amortizationSchedule(32000, rate, 3).at(-1),
      detail: interestRateDetailResult({
        principal: 32000,
        monthlyPayment: 960,
        years: 3,
      }),
    },
    null,
    2,
  ),
);
