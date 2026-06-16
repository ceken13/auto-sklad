export const calculateLoanRepayment = (price) => {
  if (!price) return null;

  const creditAmount = Number(price) * 0.3;
  const months = 36;
  const annualRate = 0.01; // %

  const monthlyRate = annualRate / 100 / 12;

  const payment =
    (creditAmount * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1);

  return Math.round(payment);
};
